import React, { useState, useEffect } from "react";
import "../Style/Login.css";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./request";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const onSuccessHandler = async (response) => {
    const clientId = response.clientId
    const credential = jwt_decode(response.credential)
    axios.post(`${auth.google}/${clientId}`,{
      name:credential.name,
      email:credential.email,
      picture:credential.picture,
      role:'user'
    }).then(res=>{
        toast.success(res.data.message)
        localStorage.setItem('accessToken',res.data.accessToken)
        localStorage.setItem('refreshToken',res.data.refreshToken)
        localStorage.setItem('userId',res.data.userId)
        setTimeout(()=>{
          window.location.reload()
        },1000)
        console.log(res.data.userId)
    }).catch(err=>{
      console.log(err)
      toast.error(err.response.data.message)
    })
  };
  const onErrorHandler = () => {
    toast.fail("Could not login");
  };
  const onSubmitHandler=(e)=>{
    e.preventDefault()
    axios.post(`${auth.login}`,{
      email,
      password
    }).then(res=>{
        toast.success(res.data.message)
        localStorage.setItem('accessToken',res.data.accessToken)
        localStorage.setItem('refreshToken',res.data.refreshToken)
        localStorage.setItem('userId',res.data.userId)
        setTimeout(()=>{
          window.location.reload()
        },1000)
        console.log(res.data.userId)
    }).catch(err=>{
      console.log(err)
      toast.error(err.response.data.message)
    })
  }
  return (
    <div className="login">
      <form onSubmit={onSubmitHandler}>
        <h1>Welcome back </h1>
        <p>Please enter your details.</p>
        <div className="fields">
          <label>Email</label>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <label>Password</label>
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <p className="forgot">Forgot password</p>
          <div className="google">
            <GoogleLogin
              onSuccess={onSuccessHandler}
              onError={onErrorHandler}
              width={window.innerWidth <= 430?"300px":"350px"}
              shape="rectangle"
              size="medium"
              theme="outline"
              logo_alignment="center"
            />
          </div>
          <button type="submit">Login</button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        theme="light"
      />
    </div>
  );
}

export default Login;
