import React from "react";
import './navbar.css';
import Check from "./check";

export default function Navbar()
{
    const handleonClick=function()
    {
        const token=localStorage.getItem('token');
        if(token)
        {
            window.location.href="/home";
        }
        else 
        {
            window.location.href="/";
        }
    }
   
    return (
        <div className="nav-box">
            <img src="./browser (1).ico" alt=" " />
            <div className="nav-heading" onClick={handleonClick}>Tab Manager</div>
            <Check />
        </div>
    );
}