import React,{useEffect, useState} from "react";
import { signInWithPopup } from "firebase/auth";

import './login.css'
import { useNavigate } from "react-router";

const Login=function()
{
    const history=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    // login event
    async function loginUser(event)
    {
        event.preventDefault();
        const response = await fetch("http://localhost:2000/auth/login", {
          method: "POST",
          credentials: "include",
          headers: {
            // "Accept": "application/json",
            "Content-Type": "application/json",
            "Access-Control-allow-Origin": true,
          },
          body: JSON.stringify({ email, password }),
        });
        console.log(response.status);
        const result = await fetch("http://localhost:2000/auth/user", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-allow-Credentials": true,
          },
        });
        const data = await result.json();
        console.log(data);
        if(data.code==200)
        {
            history('/');
        }
    }

    // google login handle
    const google = ()=> {
        window.location.replace("http://localhost:2000/auth/google");
    }

    // main return function
    return (
        <div className="login-box">
        <form className="login-form" onSubmit={loginUser}>
        <h1 className="login-head">Login</h1>
        <div className="login-label">Email:</div>
        <input value={email} 
                onChange={function(e){
                    setEmail(e.target.value)
                }} 
                type="email"
                name="email"
                className="login-input">
        </input>
        <div className="login-label">Password:</div>
        <input value={password}
                onChange={function(e){
                    setPassword(e.target.value)
                }} 
                type="password" 
                name="password"
                className="login-input">
        </input>
        <button className="login-button" type="submit" value="Login">Continue..</button>
        <div className="login-or">OR</div>
        <hr></hr>
        <div className="button-container">
        <button className="google-sign-in-button" onClick={google}>
            Sign in with Google
        </button>
        </div>
        </form>
        </div>
    )
}
export default Login;