/*global chrome*/
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import './ImportPages.css'

function ImportPages(){
    const navigate = useNavigate();
    const [importUrl, setImportUrl] = useState('');
    
    const importTabs = () => {
        try {
            const encodedData = importUrl.split('?data=')[1];
            const decodedData = atob(encodedData);
            const tabData = JSON.parse(decodedData);
            for (const tab of tabData) {
                chrome.tabs.create({ url: tab });
            }
        }
        catch (error) {
            console.error('Error importing tabs:', error);
        }
    };

    useEffect(function () {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            const user = jwt(token);
            console.log(user);
            if(!user){
                navigate.replace('/login');
            }else{
                console.log("err")
            }
        }
    }, [navigate])

    return(
        <div className="home7-box">
            <div className="box7">
                <input
                    type="text"
                    placeholder="Paste import link here"
                    value={importUrl}
                    onChange={(e) => setImportUrl(e.target.value)}
                />
                <button onClick={importTabs}>Import Tabs</button>
            </div>
        </div>
    );
}
export default ImportPages;