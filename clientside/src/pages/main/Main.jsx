import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";  
import "./Main.css";

function Main() {
    const navigate = useNavigate();
    useEffect(() => {
        async function getUser() {
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
          if (data.code == 200) {
            navigate("/home");
          }
        }
        getUser();
    },[])
    function handleRegister(){
        navigate('./register');

    }
    function handleLogin(){
        navigate('./login');
    }
    return (
        <div>
            <div className="main-container">
                <span className="main-head">Welcome to TabHub!</span>
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