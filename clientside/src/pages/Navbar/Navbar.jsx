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
            <img src="./browser (1).ico" className="nav-icon" alt=" " />
            <div className="nav-heading" onClick={handleonClick}>TabHub</div>
            <Link to="/home" className="nav-ele">Home</Link>
            <Link to="/groups" className="nav-ele">Groups</Link>
            <Link to="/sessions" className="nav-ele">Sessions</Link>
            <Check />
        </div>
    );
}