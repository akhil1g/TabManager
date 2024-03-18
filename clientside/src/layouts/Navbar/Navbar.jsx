import React from "react";
import Check from "./check";
import {Link, useNavigate} from 'react-router-dom';
import { IoSettingsOutline } from "react-icons/io5";
import './navbar.css';

export default function Navbar(){

    const navigate = useNavigate();

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
           if (data.code === 200) {
             navigate("/home");
           }
           else{
            navigate("/");
           }
         }
    }
   
    return (
        <div className="nav-box">
            <img src='./browser(1).png' className="nav-icon" alt=" " />
            <div className="nav-heading" onClick={handleonClick}>TabHub</div>
            <Link to="/home" className="nav-ele">Home</Link>
            <Link to="/groups" className="nav-ele">Groups</Link>
            <Link to="/sessions" className="nav-ele">Sessions</Link>
            <Link to="/exports" className="nav-ele">Exp/Imp</Link>
            <Link to="/settings" className="nav-ele"><IoSettingsOutline size={20}/></Link>
            <Check />
        </div>
    );
}