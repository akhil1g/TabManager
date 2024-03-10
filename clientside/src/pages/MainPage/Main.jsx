import React,{useEffect} from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

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
            <div className="main-right-sec">
                <h3 className="main-heading2">Welcome!</h3>
                <p className="main-right-sec-para">New here? </p>
                <p className="main-right-sec-para">Get started by creating an account with us.</p>
                <button 
                    className="register-btn"
                    onClick={handleRegister}
                >Register</button>
                <p className="main-right-sec-para">Already an User?</p>
                <p className="main-right-sec-para">Click below to continue.</p>
                <button 
                    className="login-btn"
                    onClick={handleLogin}
                >Login</button>
            </div>
        </div>
        </div>
    );
}
export default Main;