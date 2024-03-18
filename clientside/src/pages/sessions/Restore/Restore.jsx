/*global chrome*/
import React from "react";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router";
import jwt from 'jwt-decode'
import './Restore.css'


const Restore = ({saved, setTotalSessions}) => {
    
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);

    async function restoreSessions(email){
        try{
            const response = await fetch('http://localhost:2000/api/restoresessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            console.log(data);
            const allSessions = Object.values(data).flat();
            console.log(allSessions);
            setSessions(allSessions); 
            setTotalSessions(allSessions.length);
        }catch(err){
            console.error('Error restoring sessions:', err);
        }
    }
    
    useEffect(function(){
         async function getUser() {
           const result = await fetch("http://localhost:2000/auth/user", {
             method: "GET",
             credentials: "include",
             headers: {
               "Content-Type": "application/json",
               "Access-Control-allow-Credentials": true,
             },
           });
           const data = await result.json();
           console.log(data);
           if (data.code == 200) {
             restoreSessions(data.user.email);
           } else {
             navigate.replace("/login");
           }
         }
         getUser();
    },[navigate,saved])

    function handleRestore(wind, tabs){
        console.log("restore");
        console.log(wind);
        console.log(tabs);
        wind.forEach((windowId) => {
            chrome.windows.create({focused: false}, (createdWindow) => {
                tabs.forEach((tab) => {
                    if(tab.id === windowId) {
                        chrome.tabs.create({
                            url: tab.url,
                            active: false,
                            pinned: tab.pinned,
                            windowId: createdWindow.id
                        },(createdTab) => {
                            chrome.tabs.move(createdTab.id, { index: -1 });
                        });
                    }
                });
            });
        });
    }

    async function handleDeleteSession(sessionId) {
        try 
        {
            const response = await fetch('http://localhost:2000/api/deletesession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sessionId })
            });
            const data = await response.json();
            console.log(data);
            setSessions(prevSessions => prevSessions.filter(session => session.id !== sessionId));
        }
         catch (err) 
        {
            console.error('Error deleting session:', err);
        }
    }

    const arr = sessions.slice().reverse();

    return (
        <div className="box4">
            {arr.map((session) => {
                return(
                    <div className="ses-box">
                        <div className="ses-dets">
                            <span>{session.date}</span>
                            <button onClick={()=>handleDeleteSession(session._id)} className="delete-btn">Delete</button>
                            <button onClick={() => handleRestore(session.windowIds, session.tabs)}>Restore</button>
                        </div>
                        {session.windowIds.map((y,index) => {
                            return (
                            <div className="win-div">
                                <span>Window: {index+1}</span>
                                <div className="line3"></div>
                                {session.tabs.filter(tab => tab.id === y).map((tab, idx) => {
                                    return (
                                        <div className="ses-tab-title">{idx+1}.  {tab.title}</div>
                                    )
                                })}
                            </div>)
                        })}
                    </div>)
            })}
        </div>
    );
}
export default Restore;