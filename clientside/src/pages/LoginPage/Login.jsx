import React,{useEffect, useState} from "react";
import {auth, provider} from "./config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";
import './login.css'
<<<<<<< HEAD
import Navbar from "../Navbar/Navbar";
=======

>>>>>>> 2299f8688cfac3ba94ed0483da3415e6c3aa32c8
const Login=function()
{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    async function loginUser(event)
    {
        event.preventDefault();
        const response=await fetch('http://localhost:2000/api/login',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password}),
        });
        const data=await response.json();
        if(data.user)
        {
            localStorage.setItem('token',data.user);
            navigate("/home");
        }
        else
        {
            alert('Please check your Username and Password carefully');
        }
    }
    const handleClick=()=>{
        signInWithPopup(auth, provider).then((data)=>{
            setValue(data.user.email)
            localStorage.setItem("email", data.user.email)
        })
    }
    const [value, setValue] = useState('');
    useEffect(() =>{ 
        setValue(localStorage.getItem('email'))
    })

    return (
<<<<<<< HEAD
      <div>
        <Navbar/>
        <div className="outer-container">
          <div className="container-login">
            <form onSubmit={loginUser}>
              <h1 className="login-heading">Login</h1>
              <div className="sub">
                <label className="label-login">Email : </label>
                <input
                  value={email}
                  onChange={function (e) {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  placeholder="Email"
                  name="email"
                ></input>
              </div>
              <div className="sub">
                <label className="label-login">Password : </label>
                <input
                  value={password}
                  onChange={function (e) {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  placeholder="*****"
                  name="password"
                ></input>
              </div>
              <div className="button-container">
                <input
                  type="submit"
                  value="Login"
                  className="submit-button"
                ></input>{" "}
              </div>
              <hr></hr>
              <div className="button-container">
                <button className="google-sign-in-button" onClick={handleClick}>
                  Sign in with Google
                </button>
              </div>
            </form>
          </div>
=======
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
        <button className="google-sign-in-button" onClick={handleClick}>
            Sign in with Google
        </button>
>>>>>>> 2299f8688cfac3ba94ed0483da3415e6c3aa32c8
        </div>
        </form>
        </div>
    )
}
export default Login;