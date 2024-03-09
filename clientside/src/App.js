import React,{useEffect, useState} from 'react';
import { BrowserRouter,Navigate,Route, Routes} from 'react-router-dom'
import { useNavigate } from "react-router";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './pages/Navbar/Navbar.jsx'
import Main from './pages/MainPage/Main.jsx';
import Home from './pages/LandingPage/Home.jsx'
import Login from './pages/LoginPage/Login.jsx';
import Register from './pages/RegisterPage/Register.jsx'
import jwt from 'jwt-decode'



export default function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/landing" element={<Main />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}