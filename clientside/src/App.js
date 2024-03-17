import React from 'react';
import {  Route, Routes, MemoryRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Main from './pages/main/Main.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import Home from './pages/home/Home.jsx';
import Groups from '../src/pages/Groups/Groups.jsx';
import Sessions from './pages/sessions/sessions.jsx';
import Settings from '../src/pages/Settings/Settings.jsx';
import ExportImport from './pages/ExportImport/ExportImport.jsx';

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
          <Route path="/sessions" element = {<Sessions/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/exports" element={<ExportImport/>}/>
        </Routes>
      </MemoryRouter>
    </div>
  )
}