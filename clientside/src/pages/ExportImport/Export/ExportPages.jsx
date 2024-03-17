/*global chrome*/
import React, { useEffect, useState } from "react";
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Card from "../Tab";
import './ExportPages.css'

function ExportPages(){
    const navigate = useNavigate();
    const [allTabs, setAllTabs] = useState([]);
    const [groupTabs, setGroupTabs] = useState([]);
    const [exportUrl, setExportUrl] = useState('');
    

    async function getAllTabs() {
        const t = await chrome.tabs.query({});
        console.log(t);
        setAllTabs(t);
    }


    async function handleCreateLink() {
        if(groupTabs.length==0)
        {
            setExportUrl('');
        }
        else
        {
            const encodedData=btoa(JSON.stringify(groupTabs));
            const baseUrl = 'http://'; // Change this to your actual export URL
            const exportUrl = `${baseUrl}?data=${encodedData}`;
            console.log(exportUrl);
            setExportUrl(exportUrl);
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(exportUrl).then(() => {
            console.log("copied successfully");
        });
    };

    const handleCheckboxChange = (isChecked, tabURL) => {
        if(isChecked) {
            setGroupTabs(prevGroupTabs => [...prevGroupTabs, tabURL]);
        } else {
            setGroupTabs(prevGroupTabs => prevGroupTabs.filter(url => url !== tabURL));
        }
    };

    async function handleonClick(tabURL) {
        console.log(tabURL);
        setGroupTabs([...groupTabs, tabURL]);
    }
    
    async function remove(tabURL)
    {
        console.log(tabURL);

    }

    useEffect(function () {
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
        if (data.code==200) {
            getAllTabs();
        }
        else 
        {
            navigate.replace("/login");
        }
    }
    getUser();
    }, [navigate])


    return(
        <div className="home2-box">
            <div className="box1">
                <span>Total Tabs: {allTabs.length}</span>
            </div>
            <div className="tab2-list">
                {allTabs.map((x) => {
                    return (
                        <Card
                            id={x.id}
                            title={x.title}
                            url={x.url}
                            icon={x.favIconUrl}
                            handleChange={(isChecked) => handleCheckboxChange(isChecked, x.url)}
                        />
                    )
                })}
            </div>
            <button className="grp-btn" onClick={handleCreateLink}>Create Export Link</button>
            {exportUrl && (
                <div>
                    <input type="text" value={exportUrl} readOnly />
                    <button onClick={copyToClipboard}>Copy Link</button>
                </div>
            )}
            
        </div>
    );
}
export default ExportPages;