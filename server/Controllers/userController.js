import User from "../model/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'
import {config} from 'dotenv'
config()

export const signup = async (req,res)=>{
    const {name, email,role, password} = req.body
    try{
        const user = await User.findOne({email:email})
        if(user){
            res.status(409).send({
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
            const transporter = nodemailer.createTransport({
                service: 'gmail', 
                auth: {
                  user: process.env.GOOGLE_ID, 
                  pass: process.env.GOOGLE_PASS     
                }
              });
              const mailOptions = {
                from: `"BookShelf" <${process.env.GOOGLE_ID}>`, // Sender's email address
                to: email, 
                subject: 'Welcome to BookShelf',
                text: `Dear ${name},

                Welcome to BookShelf! We're excited to have you as part of our community. Your registration was successful, and you are now ready to explore and enjoy all the features our app has to offer.
                
                Here are a few things you can do with your new account:
                - Browse a wide range of books and add them to your reading list.
                - Connect with fellow book lovers and share your thoughts on your favorite reads.
                - Stay updated with the latest book recommendations and reviews.
                - And much more!
                
                If you have any questions, need assistance, or just want to say hello, feel free to reach out to our support team at ${process.env.GOOGLE_ID}.
                
                Thank you for choosing BookShelf! Happy reading!
                
                Best regards,
                The BookShelf Team`
              };
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log('Error:', error);
                } else {
                  console.log('Email sent:', info.response);
                }
              });
            res.status(200).send({
                message:'Signup successful'
            })
        }
    }catch(err){
        res.status(500).send({
            message:'Internal server error'
        })
    }
}

export const login = async(req,res)=>{
    const {email , password}=  req.body;
    const header = { algorithm: 'HS256', typ: 'JWT' };
    try{
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(403).send({
                message : `Email doesn't exist`
            })
        }else{
            bcrypt.compare(password, user.password).then((isPasswordValid)=>{
                if (isPasswordValid ){
                    const accessToken = jwt.sign(
                        {jti:user._id},
                        process.env.JWT_SECRET,
                        {expiresIn:"1m",header:header}
                    );
                    const refreshToken = jwt.sign(
                        { jti: user._id },
                        process.env.JWT_REFRESHSECRET,
                        { expiresIn: "30d",header:header }
                      );
                    return res.status(200).send({
                        name: user.name,
                        email:user.email,
                        id: user._id,
                        message: "Login succesfull",
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                      });
                }else{
                    return res.status(403).send({
                        message:'Invalid Password'
                    })
                }
            }).catch(err=>{
               return res.status(404).send({
                    message:'invalid'
                })
            })
        }
    }catch(err){
        res.status(500).send({
            message:'Internal server error'
        })
    }
}

export const googleAuth = async(req,res)=>{
    const {clientId} = req.params
    const {name,email,role,picture} = req.body
    try{
        if(!clientId){
            res.status(401).send({
                message:'Could not Login'
            })
        }else{
            const user = await User.findOne({email:email})
            const header = { algorithm: 'HS256', typ: 'JWT' };
            if(user){
                const accessToken = jwt.sign(
                    {jti:user._id},
                    process.env.JWT_SECRET,
                    {expiresIn:"1m",header:header}
                );
                const refreshToken = jwt.sign(
                    { jti: user._id },
                    process.env.JWT_REFRESHSECRET,
                    { expiresIn: "30d",header:header }
                  );
                res.status(200).send({
                    userId:user._id,
                    message:'Login Successful',
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
                  const transporter = nodemailer.createTransport({
                    service: 'gmail', 
                    auth: {
                      user: process.env.GOOGLE_ID, 
                      pass: process.env.GOOGLE_PASS     
                    }
                  });
                  const mailOptions = {
                    from: `"BookShelf" <${process.env.GOOGLE_ID}>`, // Sender's email address
                    to: email, 
                    subject: 'Welcome to BookShelf',
                    text: `Dear ${name},
    
                    Welcome to BookShelf! We're excited to have you as part of our community. Your registration was successful, and you are now ready to explore and enjoy all the features our app has to offer.
                    
                    Here are a few things you can do with your new account:
                    - Browse a wide range of books and add them to your reading list.
                    - Connect with fellow book lovers and share your thoughts on your favorite reads.
                    - Stay updated with the latest book recommendations and reviews.
                    - And much more!
                    
                    If you have any questions, need assistance, or just want to say hello, feel free to reach out to our support team at ${process.env.GOOGLE_ID}.
                    
                    Thank you for choosing BookShelf! Happy reading!
                    
                    Best regards,
                    The BookShelf Team`
                  };
                  transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      console.log('Error:', error);
                    } else {
                      console.log('Email sent:', info.response);
                    }
                  });
                res.status(200).send({
                    userId: savedUser._id,
                    message:'Signup successful',
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                })
            }
        }
    }catch(err){
        res.status(500).send({
            message:'Internal server error'
        })
    }
}

