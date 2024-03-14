import React from 'react';
import {  Route, Routes, MemoryRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Main from './pages/MainPage/Main.jsx';
import Login from './pages/LoginPage/Login.jsx';
import Register from './pages/RegisterPage/Register.jsx';
import Home from './pages/LandingPage/Home.jsx';
import Groups from './pages/Groups/Groups.jsx';
import YourGroups from './pages/YourGroups/YourGroups.jsx';




export default function App() {

  return (
    <div>
      <MemoryRouter>
        <Routes>
          <Route path="" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/yourgroups" element={<YourGroups/>}/>
        </Routes>
      </MemoryRouter>
    </div>
  )
}