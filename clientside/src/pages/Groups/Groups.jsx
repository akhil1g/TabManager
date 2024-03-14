import React, { useEffect, useState } from "react";
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import Card from "./Tab";
import './Groups.css';

function Groups() {
    const navigate = useNavigate();
    const [allTabs, setAllTabs] = useState([]);
    const [groupTabs, setGroupTabs] = useState([]);
    const [groupName, setGroupName] = useState();
    const [groupColor, setGroupColor] = useState([]);
    const Colors = ["blue", "red", "yellow", "green", "purple"];

    /*global chrome*/
    async function getAllTabs() {
        const t = await chrome.tabs.query({});
        console.log(t);
        setAllTabs(t);
    }

    // eslint-disable-next-line no-unused-vars
    async function createGroups() {
        let groupId = await chrome.tabs.group({ tabIds: groupTabs });
        await chrome.tabGroups.update(groupId, {
            collapsed: false,
            title: groupName,
            color: groupColor,
        });
    }

    function handleColoronClick(x) {
        console.log(x);
        setGroupColor(x);
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

    useEffect(() => {
        if(groupTabs.length > 0) {
            createGroups();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupTabs]);

    async function handleonClick(tabId) {
        console.log(tabId);
        setGroupTabs([...groupTabs, tabId]);
        // const result = await new Promise(resolve => setTimeout(() => resolve('resolved'), 2000));
    }

    return (
        <div>
            <Navbar />
            <div className="home-box">
                {/* Create Groups */}
                <div className="window-list">
                    <div className="tab-list">
                        {allTabs.map((x) => {
                            return (
                                <Card
                                    id={x.id}
                                    title={x.title}
                                    url={x.url}
                                    icon={x.favIconUrl}
                                    fun={() => handleonClick(x.id)}
                                />)
                        })}
                    </div>
                    <div>
                        <input
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            type="text"
                            name="groupName"
                            className="groupname"
                        />
                        {Colors.map((x, index) => {
                            return (
                                <button 
                                    key={index} 
                                    style={{ backgroundColor: x }} 
                                    onClick={() => handleColoronClick(x)}>
                                </button>
                            );
                        })}
                        <button type="submit" onClick={createGroups}>Done</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Groups;
