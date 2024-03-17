import React from "react";
import Check from "./check";
import {Link} from 'react-router-dom';
import './navbar.css';

export default function Navbar(){
    const handleonClick = function(){
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
             window.location.href = "/home";
           }
           else{
             window.location.href = "/";
           }
         }
    }
   
    return (
        <div className="nav-box">
            <img src="../../../public/images/browser.ico" className="nav-icon" alt=" " />
            <img src="./browser(1).ico" className="nav-icon" alt=" " />
            <div className="nav-heading" onClick={handleonClick}>TabHub</div>
            <Link to="/home" className="nav-ele">Home</Link>
            <Link to="/groups" className="nav-ele">Groups</Link>
            <Link to="/sessions" className="nav-ele">Sessions</Link>
            <Link to="/settings" className="nav-ele">Settings</Link>
            <Link to="/exports" className="nav-ele">Exp/Imp</Link>
            <Check />
        </div>
    );
}