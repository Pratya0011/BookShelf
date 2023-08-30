import User from "../model/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import {config} from 'dotenv'
config()

export const signup = async (req,res)=>{
    const {name, email,role, password} = req.body
    try{
        const user = await User.findOne({email:email})
        if(user){
            res.send({
                status:409,
                message:"User already exists"
            })
        }else{
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt)
            const user = new User({
                name,
                email,
                role,
                password:hashedPassword
            }) 
            await user.save()
            res.send({
                status:200,
                message:'Signup successful'
            })
        }
    }catch(err){
        res.send({
            status:500,
            message:'Internal server error'
        })
    }
}

export const login = async(req,res)=>{
    const {email , password}=  req.body;
    try{
        const user=await User.findOne({email:email});
        if(!user){
            res.send({
                status:403,
                message : `Email doesn't exist`
            })
        }else{
            bcrypt.compare(password, user.password).then((isPasswordValid)=>{
                if (isPasswordValid ){
                    const accessToken = jwt.sign(
                        {userId:user._id},
                        process.env.JWT_SECRET,
                        {expiresIn:"1m"}
                    );
                    const refreshToken = jwt.sign(
                        { userId: user._id },
                        process.env.JWT_REFRESHSECRET,
                        { expiresIn: "30d" }
                      );
                      res.send({
                        status: 200,
                        name: user.name,
                        email:user.email,
                        id: user._id,
                        message: "Login succesfull",
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                      });
                }else{
                    res.send({
                        status:403,
                        message:'Invalid Password'
                    })
                }
            }).catch(err=>{
                res.send({
                    status:404,
                    message:err.name
                })
            })
        }
    }catch(err){
        res.send({
            status:500,
            message:'Internal server error'
        })
    }
}

export const googleAuth = async(req,res)=>{
    const {clientId} = req.params
    const {name,email,role,picture} = req.body
    try{
        if(!clientId){
            res.send({
                status:401,
                message:'Could not Login'
            })
        }else{
            const user = await User.findOne({email:email})
            if(user){
                const accessToken = jwt.sign(
                    {userId:user._id},
                    process.env.JWT_SECRET,
                    {expiresIn:"1m"}
                );
                const refreshToken = jwt.sign(
                    { userId: user._id },
                    process.env.JWT_REFRESHSECRET,
                    { expiresIn: "30d" }
                  );
                res.send({
                    status:200,
                    message:'Login Successful user exists',
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                })
            }else{
                const user = new User({
                    name,
                    email,
                    role,
                    picture
                }) 
                const savedUser = await user.save()
                const accessToken = jwt.sign(
                    {userId:savedUser._id},
                    process.env.JWT_SECRET,
                    {expiresIn:"1m"}
                );
                const refreshToken = jwt.sign(
                    { userId: savedUser._id },
                    process.env.JWT_REFRESHSECRET,
                    { expiresIn: "30d" }
                  );
                res.send({
                    status:200,
                    message:'Login successful',
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                })
            }
        }
    }catch(err){
        res.send({
            status:500,
            message:'Internal server error'
        })
    }
}