import React,{useEffect, useState, Component} from "react";
import jwt from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import './home.css'
import Navbar from "../Navbar/Navbar";
function Home() {
    const navigate=useNavigate();
    const [userName,setName]=useState("");
    const[tabid,setTab]=useState(null);


   /*global chrome*/
async function GetCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log(tab);
}
   ///addddd
   async function toggleMuteState(tabId) {
    const tab = await chrome.tabs.get(tabId);
    const muted = !tab.mutedInfo.muted;
    await chrome.tabs.update(tabId, {muted});
    console.log(`Tab ${tab.id} is ${muted ? "muted" : "unmuted"}`);
  }
  async function getCurrentWindow()
  {
    const current = await chrome.windows.getCurrent();
    console.log(current);
  }

  async function getAllWindows()
  {
    const current=await chrome.windows.getAll();
    console.log(current);
  }

  async function getAllTabs()
  {
        var tabs = await chrome.tabs.query({});
        console.log(tabs);
  }



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

      console.log(token);
      if(token)
      {
        const user=jwt(token);
        console.log(user);
        if(!user)
        {
          navigate.replace('/login');
        }
        else
        {
            GetCurrentTab();
             getAllTabs();
             getCurrentWindow();
             getAllWindows();
            getName();
        }
      }
    },[])

  return (
    <div>
      <Navbar/>
    <div className="home-container">
      <h1 className="home-heading1">Hello, {userName}!</h1>
    </div>
    </div>
  );
}
export default Home;