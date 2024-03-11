import React,{useEffect, useState, Component} from "react";
import jwt from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import './home.css'
import Navbar from "../Navbar/Navbar";

/*global chrome*/
function Home() {
    const navigate=useNavigate();
    const [userName,setName]=useState("");
    const [currTab,setCurrTab] = useState(null);
    const [allTabs,setAllTabs] = useState([]);
    const [currWindow,setCurrWindow] =useState(null);
    const [allWindows,setAllWindows] = useState([]);

async function GetCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let tab = await chrome.tabs.query(queryOptions);
  console.log("CurrentTab");
  setCurrTab(tab);
}

  async function getCurrentWindow()
  {
    const current = await chrome.windows.getCurrent();
    console.log("currentWindow");
    console.log(current);
    setCurrWindow(current);
  }
  async function getAllWindows()
  {
    const current=await chrome.windows.getAll();
    console.log(current);
    setWindows(current);
    current.forEach((c)=>{
      getTabsOfWindow(c.id);
    })
    console.log("hehe");
  }
  async function getAllTabs()
  {
        const t = await chrome.tabs.query({});
        console.log(t);
        setAllTabs(t);
  }
  async function getTabsOfWindow(id)
  {
    let queryOptions={windowId:id}
    const tabs=await chrome.tabs.query(queryOptions);
    console.log("hello");
    console.log(id);
    console.log(tabs);
  }
async function setWindowsss()
{
  const current=await chrome.windows.getAll();
  setWindows(current);
  windows.forEach((id)=>{
    getTabsOfWindow(id);
  })
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
            // chrome.runtime.sendMessage({"type": "allTabs"},function(response){
            //   console.log(response);
            //   setTabss(response);
            //   console.log(tabss);
            // })
             getAllTabs();
            //  getCurrentWindow();
            //  getAllWindows();
             getName();
        }
      }
    },[])

    // useEffect(()=>{
    //   console.log(tabs);
    // },[tabs]);


  
    

    function Card(props) {
        console.log(props,"props");
          return (
            <div className="tab-card">
                <input type="checkbox"></input>
                <img alt=""></img>
                <div className="tab-title">{props.title}</div>
            </div>
          );
    }
  return (
    <div>
      <Navbar/>
    <div className="home-box">
    <h1 className="home-name">Hello, {userName}!</h1>
    <div className="tab-list">
        {tabss.map((x) => {
            return (<Card 
                key={x.id}
                title={x.title}
                url={x.url}
                icon={x.favIconUrl}
            />)
        })} 
    </div>
    </div>
    </div>
  );
}

export default Home;