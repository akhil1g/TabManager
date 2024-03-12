import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./Main.css";

function Main() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
          console.log("balle balle")
          navigate("/home");
        }
    })
    function handleRegister(){
        navigate('./register');
    }
    function handleLogin(){
        navigate('./login');
    }
    return (
        <div>
            <Navbar/>
        <div className="main-container">
            <span className="main-head">Welcome!</span>
            <span className="main-right-sec-para">New here? Get started by creating <br/> an account with us.</span>
            <button 
                className="register-btn"
                onClick={handleRegister}
            >Register</button>
            <span className="main-right-sec-para">Already an User? <br/> Click below to continue.</span>
            <button 
                className="login-btn"
                onClick={handleLogin}
            >Login</button>
        </div>
        </div>
    );
}
export default Main;