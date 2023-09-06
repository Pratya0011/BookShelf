import React, { useState, useEffect, useRef } from "react";
import {useSelector, useDispatch} from 'react-redux'
import Login from "./Login";
import "../Style/Landing.css";
import Signup from "./Signup";
import { setIsLogin } from "../features/appSlice";
import img from '../Image/BS Final.png'

function Landing() {
  const [span, setSpan] = useState("Sign up");
  const [content, setContent] = useState(`Don't have an account?`)
  const formContainerRef = useRef(null)
  const loginForm = useSelector(state=>state.app.isLogin)
  const dispatch = useDispatch()

  useEffect(()=>{
    formContainerRef.current.classList.add('loaded');
  },[])

  const toggleForm = () => {
    if (loginForm) {
      dispatch(setIsLogin(false))
      setSpan("Login");
      setContent(`Already have an account?`)
    } else {
      dispatch(setIsLogin(true))
      setSpan("Sign up");
      setContent(`Don't have an account?`)
    }
  };
  return (
    <div className="landing">
      <div className="container">
        <div className="image">
            <div className="app-title">BookShelf</div>
          <div className="about">
            We provides users with a convenient digital space to curate,
            organize, and engage with their favorite books, connect with fellow
            book lovers, enhancing the overall reading experience in a virtual
            environment.
          </div>
        </div>
        <div className="form-container" ref={formContainerRef}>
          <div>{loginForm ? <Login /> : <Signup />}</div>
          <p className="toggle-form">
            {content} <span onClick={toggleForm}>{span}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
