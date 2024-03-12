import React from "react";
import Check from "./check";
import {Link} from 'react-router-dom';
import './navbar.css';

export default function Navbar(){
    const handleonClick = function(){
        const token=localStorage.getItem('token');
        if(token){
            window.location.href="/home";
        }
        else{
            window.location.href="/";
        }
    }
   
    return (
        <div className="nav-box">
            <img src="./browser (1).ico" alt=" " />
            <div className="nav-heading" onClick={handleonClick}>TabHub</div>
            <Link to="/home" ><div className="nav-ele">Home</div></Link>
            <Link to="/group" ><div className="nav-ele">Groups</div></Link>
            <Link to="/" ><div className="nav-ele">Sessions</div></Link>
            <Check />
        </div>
    );
}