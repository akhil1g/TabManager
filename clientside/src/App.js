import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, MemoryRouter } from 'react-router-dom'
import { useNavigate } from "react-router";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './pages/Navbar/Navbar.jsx'
import Main from './pages/MainPage/Main.jsx';
import Home from './pages/LandingPage/Home.jsx'
import Login from './pages/LoginPage/Login.jsx';
import Register from './pages/RegisterPage/Register.jsx'
import jwt from 'jwt-decode'



export default function App() {
<<<<<<< HEAD
=======
 
  const [loggedin, setLoggedin]=useState(false);
  const isAuthenticated =  function() {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      try {
        const decoded=jwt(token, 'secretkey');
        console.log(decoded);
        if(decoded)
        {
          console.log(decoded);
          return true;
        }
        else{
          return false;
        }
      } 
      catch (err) {
        console.error(err);
      }
    }
    else
      return false;
  };
  
  const ProtectedRoute = (props) => {

       const val=isAuthenticated();
      const navigate = useNavigate();
     
      useEffect(()=>{
        if(!val)
        {
          navigate("/login");
        }
      },[]);
      return  <div>{props.children}</div>
    };

>>>>>>> 2299f8688cfac3ba94ed0483da3415e6c3aa32c8

  return (
    <div>
      <MemoryRouter>
        <Routes>
          <Route path="" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </MemoryRouter>
    </div>
  )
}