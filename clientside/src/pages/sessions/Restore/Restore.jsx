import React from "react";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router";
import jwt from 'jwt-decode'
import Card from './Card';
import './Restore.css'
const Restore=function()
{


    /*global chrome*/
    const navigate = useNavigate();
    const [allWindows,setAllWindows] = useState([]);
    const [allTabs,setAllTabs]=useState([]);
    const [sessiondate,setSessionDate]=useState('');



    // async function getAllWindows(windows){
    //     console.log(windows);
    //     const windowsData = await Promise.all(currentwindows.map(async (window) => {
    //         const tabs = await chrome.tabs.query({ windowId: window.id });
    //         return {
    //             windowId: window.id,
    //             tabs: tabs,
    //         };
    //     }));
    //     setWindowsWithTabs(windowsData);
    //     setAllWindows(currentwindows);
    // }



    
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
            setAllWindows(data.windowIds || []);
            setAllTabs(data.tabs || []);
            setSessionDate(data.date);
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

    function handleRestore(){
        console.log("restore");

    }

    return (
        <div>
            <div className="restore-heading">Restore Sessions : </div> 
            <button onClick={handleRestore}>Restore</button>
                <div>
                    <span>{sessiondate}</span>
                    {allWindows.map((y) => (
                        <div>
                            {allTabs.filter(tab => tab.id === y).map((z) => (
                                <Card
                                    id={z.id}
                                    title={z.title}
                                />))}
                        </div>
                    ))}
                </div>
        </div>
    );
}
export default Restore;