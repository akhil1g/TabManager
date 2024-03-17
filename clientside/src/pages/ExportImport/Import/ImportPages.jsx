/*global chrome*/
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
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
          if (data.code != 200) {
            navigate.replace("/login");
          } else {
          }
        }
        getUser();
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