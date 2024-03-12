/* eslint-disable no-unused-vars */
/*global chrome*/
import React,{useEffect, useState} from "react";
import jwt from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import Navbar from "../Navbar/Navbar";
import Card from "../../components/Tabitem";
import './home.css'


function Home() {

    const navigate = useNavigate();
    const [userName,setName] = useState("");
    const [currTab,setCurrTab] = useState(null);
    const [allTabs,setAllTabs] = useState([]);
    const [currWindow,setCurrWindow] = useState(null);
    const [allWindows,setAllWindows] = useState([]);
    const [windowsWithTabs, setWindowsWithTabs] = useState([]);


    async function GetCurrentTab() {
        let queryOptions = { active: true, lastFocusedWindow: true };
        let tab = await chrome.tabs.query(queryOptions);
        console.log("CurrentTab");
        setCurrTab(tab);
    }


    async function getCurrentWindow(){
        const current = await chrome.windows.getCurrent();
        console.log("currentWindow");
        console.log(current);
        setCurrWindow(current);
    }

    
    //Get all Windows with respective Tabs    
    async function getAllWindows(){
        const currentwindows = await chrome.windows.getAll();
        console.log(currentwindows);
        const windowsData = await Promise.all(currentwindows.map(async (window) => {
            const tabs = await chrome.tabs.query({ windowId: window.id });
            return {
                windowId: window.id,
                tabs: tabs,
            };
        }));
        setWindowsWithTabs(windowsData);
        setAllWindows(currentwindows);
        currentwindows.forEach((c) => {
            getTabsOfWindow(c.id);
        })
        console.log("hehe");
    }

    async function getAllTabs(){
        const t = await chrome.tabs.query({});
        console.log(t);
        setAllTabs(t);
    }

    async function getTabsOfWindow(id){
        let queryOptions = {windowId:id}
        const tabs = await chrome.tabs.query(queryOptions);
        console.log("hello");
        console.log(id);
        console.log(tabs);
    }

    //To Create New Tab
    async function createNewTab(windowid){
        chrome.tabs.create(
            {active: true,
            windowId: windowid},
            () => console.log("new tab created with id:")
        );
    }


    //To Close A Tab
    const handleTabClose = (tabId) => {
        chrome.tabs.remove(tabId, () => {
            console.log(`Tab ${tabId} closed successfully`);
        });
    };


    async function getName() {
        const req = await fetch("http://localhost:2000/api/home",{
        headers: {
        'x-access-token': localStorage.getItem('token'),
        },
        })
        const data = await req.json();
        setName(data.name)
        console.log(data.name);
    }

    useEffect(function(){
        const token = localStorage.getItem('token');
        console.log(token);
        if(token){
            const user=jwt(token);
            console.log(user);
            if(!user){
                navigate.replace('/login');
            }else{
                GetCurrentTab();
                // chrome.runtime.sendMessage({"type": "allTabs"},function(response){
                //   console.log(response);
                //   setTabss(response);
                //   console.log(tabss);
                // })
                getAllTabs();
                getCurrentWindow();
                getAllWindows();
                getTabsOfWindow();
                // setWindowsss();
                getName();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // useEffect(()=>{
    //   console.log(tabs);
    // },[tabs]);



    
    return (
    <div>
        <Navbar/>
        <div className="home-box">
            <h1 className="home-name">Hello, {userName}!</h1>
            {windowsWithTabs.map((y)=>{
                return (
                <div className="window-list">
                    <span style={{fontWeight:'600',marginBottom:'5px'}}>Window ID: {y.windowId}</span>
                    <button className="new-tab" onClick={() => createNewTab(y.windowId)}>New Tab</button>
                    <div className="tab-list">
                    {y.tabs.map((x) => {
                        return (<Card 
                            key={x.id}
                            title={x.title}
                            url={x.url}
                            icon={x.favIconUrl}
                            onCloseTab={() => handleTabClose(x.id)}
                        />)
                    })} 
                    </div>
                </div>)})}
        </div>
    </div>);
}
export default Home;