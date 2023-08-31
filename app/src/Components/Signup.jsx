import React, { useState} from "react";
import "../Style/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { auth } from "./request";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

 const onSubmitHandler=(e)=>{
  e.preventDefault()
  if( password === cpassword){
    axios.post(`${auth.signup}`,{
      name,
      email,
      password
    }).then(res=>{
        toast.success(res.data.message)
        window.location.reload()
    }).catch(err=>{
      toast.err(err.response.data.message)
    })
  }
}
  return (
    <div>
      <div className="login">
        <form onSubmit={onSubmitHandler}>
          <h1>Welcome !</h1>
          <p>Please enter your details.</p>
          <div className="fields">
            <label>Name:</label>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <label>Email:</label>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label>Password:</label>
            <input
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <label>Confirm-Password:</label>
            <input
              type="text"
              placeholder="password"
              value={cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
              required
            />
            <button type="submit">Sign up</button>
          </div>
        </form>
        <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        theme="light"
      />
      </div>
    </div>
  );
}

export default Signup;
