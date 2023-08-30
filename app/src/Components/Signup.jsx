import React, { useState, useEffect } from "react";
import "../Style/Login.css";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const onSuccessHandler = async (response) => {
    console.log(response);
  };
  const onErrorHandler = () => {
    toast.fail("Could not login");
  };
  return (
    <div>
      <div className="login">
        <form>
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
      </div>
    </div>
  );
}

export default Signup;
