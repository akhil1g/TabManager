import React from "react";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router";
import jwt from 'jwt-decode'
import './Restore.css'


const Restore=function(){

    /*global chrome*/
    const navigate = useNavigate();
    const [sessions,setSessions]=useState([]);


    async function restoreSessions(email) {
        try {
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
        } catch (err) {
            console.error('Error restoring sessions:', err);
        }
    }
    

    
    useEffect(function(){
        const token = localStorage.getItem('token');
        console.log(token);
        if(token){
            const user=jwt(token);
            console.log(user);
            const email=user.email;
            if(!user)
            {
                navigate.replace('/login');
            }
            else
            {
                restoreSessions(email);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[navigate])

    function handleRestore(wind, tabs) {
        console.log("restore");
        console.log(wind);
        console.log(tabs);
        wind.forEach(windowId => {
            chrome.windows.create({ focused: false }, (createdWindow) => {
                tabs.forEach(tab => {
                    if (tab.id === windowId) {
                        chrome.tabs.create({
                            url: tab.url,
                            active: false,
                            pinned: tab.pinned,
                            windowId: createdWindow.id
                        }, (createdTab) => {
                            chrome.tabs.move(createdTab.id, { index: -1 });
                        });
                    }
                });
            });
        });
    }
    

    return (
        <div className="box4">
            {sessions.map((session) => {
                return(
                    <div className="ses-box">
                        <div className="ses-dets">
                            <span>Session: {session.date}</span>
                            <button className="restore-btn" 
                                    onClick={() => handleRestore(session.windowIds, session.tabs)}>Restore</button>
                        </div>
                        {session.windowIds.map((y,index) => {
                            return (
                            <div className="win-div">
                                <span>Window: {index+1}</span>
                                <div className="line3"></div>
                                {session.tabs.filter(tab => tab.id === y).map((tab) => {
                                    return (
                                        <div className="ses-tab-title"># {tab.title}</div>
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