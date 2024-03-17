/*global chrome*/
import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import Card from "./Tab";
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
        if(groupTabs.length===0){
            setExportUrl('');
        }
        else{
            const encodedData = btoa(JSON.stringify(groupTabs));
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

    useEffect(function () {
        const token = localStorage.getItem('token');
        console.log(token);
        if(token){
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
        <div className="home7-box">
            <div className="box7">
                <span>Total Tabs: {allTabs.length}</span>
                <button onClick={handleCreateLink}>Export Link</button>
            </div>
            <div className="tab7-list">
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
            {exportUrl && (
                <div className='link-popup'>
                    <input type="text" value={exportUrl} readOnly />
                    <button onClick={copyToClipboard}>Copy Link</button>
                </div>
            )}
            
        </div>
    );
}
export default ExportPages;