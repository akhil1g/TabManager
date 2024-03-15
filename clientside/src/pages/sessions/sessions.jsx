import React, { useState } from "react";
import './sessions.css'
import { useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";


const Sessions = function()
{
    /*global chrome*/
    const navigate = useNavigate();
    const [allWindows,setAllWindows] = useState([]);
    const [windowsWithTabs, setWindowsWithTabs] = useState([]);
    const [mail,setMail]=useState('');



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

    
   

    async function getMail() {
        const req = await fetch("http://localhost:2000/api/home",{
        headers: {
        'x-access-token': localStorage.getItem('token'),
        },
        })
        const data = await req.json();
        setMail(data.email)
        console.log(data.email);
    }


    async function SaveSession(event)
    {
        event.preventDefault();
        const response=await fetch('http://localhost:2000/api/savesession',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,allWindows}),
        });
        const data=await response.json();
        if(data.status=="ok")
        {

        }
        else
        {
           
        }
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
                getAllWindows();
                getMail();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    return (
        <div>
            <Navbar/>

        </div>
    );
}
export default Sessions