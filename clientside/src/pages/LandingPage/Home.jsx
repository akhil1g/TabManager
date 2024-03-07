import React,{useEffect, useState} from "react";
import jwt from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import './home.css'
function Home() {
    const history=useNavigate();
    const [userName,setName]=useState("");
    
    async function getName() {
         const req=await fetch("http://localhost:2000/api/home",{
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
         })
         const data=await req.json();
         setName(data.name)
         console.log(data.name);
      }
  
    useEffect(function()
    {
      const token=localStorage.getItem('token');
      if(token)
      {
        const user=jwt(token);
        console.log(user);
        if(!user)
        {
          localStorage.removeItem('token');
          history.replace('/login');
        }
        else
        {
            getName();
        }
      }
    },[])

  return (
    <div className="home-container">
      <h1 className="home-heading1">Hello, {userName}!</h1>
    </div>
  );
}
export default Home;