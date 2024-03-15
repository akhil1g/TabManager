/* eslint-disable no-unused-vars */
import React, {  useState, useEffect } from "react";
import './sessions.css'
import { useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import jwt from 'jwt-decode'


const Sessions = function()
{
    /*global chrome*/
    const navigate = useNavigate();
    const [allWindows,setAllWindows] = useState([]);
    const [windowsWithTabs, setWindowsWithTabs] = useState([]);
    const [mail,setMail]=useState('');
    const [saved,setSaved]=useState(false);
    const [date,setDate]=useState('');


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
    }

    

    async function SaveSession()
    {
        const response=await fetch('http://localhost:2000/api/savesession',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({mail,allWindows}),
        });
        const data=await response.json();
        if(data.status=="ok")
        {
            setSaved(true);
            console.log("mst");
        }
        else{
            console.log("glt");
        }
    }

    useEffect(function(){
        const token = localStorage.getItem('token');
        console.log(token);
        if(token){
            const user=jwt(token);
            console.log(user);
            if(!user)
            {
                navigate.replace('/login');
            }
            else
            {   
                let dt=new Date().toLocaleDateString();
                console.log(dt);
                setDate(dt);
                setMail(user.email);
                getAllWindows();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const handleSave=function()
    {
        SaveSession();
    }

    return (
        <div>
            <Navbar/>
            <div className="home-box">
                <button className="save-session-btn" onClick={handleSave}>
                    Save Session
                </button>
            </div>
        </div>
    );
}
export default Sessions