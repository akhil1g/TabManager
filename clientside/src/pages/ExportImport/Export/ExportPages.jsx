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
        
        const encodedData=btoa(JSON.stringify(groupTabs));
        const baseUrl = 'http://'; // Change this to your actual export URL
        const exportUrl = `${baseUrl}?data=${encodedData}`;
        console.log(exportUrl);
        setExportUrl(exportUrl);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(exportUrl).then(() => {
            console.log("copied successfully");
        });
    };


    async function handleonClick(tabURL) {
        console.log(tabURL);
        setGroupTabs([...groupTabs, tabURL]);
    }


    useEffect(function () {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            const user = jwt(token);
            console.log(user);
            if(!user){
                navigate.replace('/login');
            }else{
                getAllTabs();
            }
        }
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
                            fun={() => handleonClick(x.url)}
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