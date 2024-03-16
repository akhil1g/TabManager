import React, {  useState, useEffect } from "react";
import './sessions.css'
import { useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import jwt from 'jwt-decode'
import Restore from './Restore/Restore'


const Sessions = function()
{
    /*global chrome*/
    const navigate = useNavigate();
    const [email,setMail]=useState('');
    const [saved,setSaved]=useState(false);
    const [date,setDate]=useState('');
    const [allTabs,setAllTabs] = useState([]);
    const [allWindows,setAllWindows] = useState([]);

    async function getAllWindows(){
        const currentwindows = await chrome.windows.getAll();
        console.log(currentwindows);
        const windows= currentwindows.map(window=>window.id);
        console.log(windows);
        setAllWindows(windows);
    }

    async function getAllTabs(){
        const t = await chrome.tabs.query({});
        const tabInfo = t.map(tab =>({ title : tab.title,id: tab.windowId , url: tab.url, pinned : tab.pinned}));
        console.log(tabInfo);
        setAllTabs(tabInfo);
    }


    

    async function SaveSession()
    {
        const response=await fetch('http://localhost:2000/api/savesession',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({ email,allWindows,allTabs,date}),
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
                let dt = new Date().toLocaleDateString();
                console.log(dt);
                setDate(dt);
                setMail(user.email);
                getAllTabs();
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
                <Restore/>
            </div>
        </div>
    );
}
export default Sessions