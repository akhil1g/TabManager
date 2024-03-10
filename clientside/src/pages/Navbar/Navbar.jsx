import React from "react";
import './navbar.css';
import Check from "./check";
// import { useNavigate } from "react-router";
export default function Navbar()
{
    // const navigate=useNavigate();
    const handleonClick=function()
    {
        const token=localStorage.getItem('token');
        if(token)
        {
            // navigate('/home');
            window.location.href="/home";
        }
        else 
        {
            // navigate('/');
            window.location.href="/";
        }
    }
   
    return (
        <div className="nav-box">
            <div className="nav-heading" onClick={handleonClick}>Tab Manager</div>
            <Check />
        </div>
    );
}