/*global chrome*/
import React, { useEffect, useState } from "react";
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Card from "./Tab";
import './CreateGroups.css'

function CreateGroups(){
    const navigate = useNavigate();
    const [allTabs, setAllTabs] = useState([]);
    const [groupTabs, setGroupTabs] = useState([]);
    const [groupName, setGroupName] = useState();
    const [groupColor, setGroupColor] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const Colors = ["blue", "red", "yellow", "green", "purple"];
    

    async function getAllTabs() {
        const t = await chrome.tabs.query({});
        console.log(t);
        setAllTabs(t);
    }

    //To Close A Tab
    const handleTabClose = (tabId) => {
        chrome.tabs.remove(tabId, () => {
            console.log(`Tab ${tabId} closed successfully`);
        });
    };
    
    //To Pin A Tab
    const pinTab = (tabId) => {
        chrome.tabs.get(tabId, (tab) => {
            chrome.tabs.create({ 
                url: tab.url, 
                pinned: true,
                windowId: tab.windowId },
                () => console.log("new same tab created"));
            chrome.tabs.remove(tabId, () => {
                console.log("tab closed successfully");
            });
        })
    }

    //To Unpin A Tab
    const unPinTab = (tabId) => {
        chrome.tabs.get(tabId, (tab) => {
            chrome.tabs.remove(tabId, () => {
                console.log("tab closed successfully");
            });
            chrome.tabs.create({ 
                url: tab.url, 
                pinned: false,
                windowId: tab.windowId },
                () => {
                    console.log("new same tab created");
            });
        })
    }


    async function createGroups() {
        let groupId = await chrome.tabs.group({ tabIds: groupTabs });
        await chrome.tabGroups.update(groupId, {
            collapsed: false,
            title: groupName,
            color: groupColor,
        });
        setShowPopup(false);
    }


    function handleColoronClick(x) {
        console.log(x);
        setGroupColor(x);
    }


    async function handleonClick(tabId) {
        console.log(tabId);
        setGroupTabs([...groupTabs, tabId]);
        // const result = await new Promise(resolve => setTimeout(() => resolve('resolved'), 2000));
    }


    function handleGroupPopup(){
        setShowPopup(!showPopup);
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
        if(groupTabs.length > 0){
            createGroups();
        }
    }, [groupTabs]);


    return(
        <div className="home2-box">
            <div className="box1">
                <span>Total Tabs: {allTabs.length}</span>
                <button className="grp-btn" onClick={handleGroupPopup}>Create Group</button>
            </div>
            {showPopup && 
            <div className="grp-popup">
                <input
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    type="text"
                    name="groupName"
                    placeholder="Group Name"
                />
                <div className="grp-color">
                    {Colors.map((x, index) => {
                        return (
                            <button 
                                key={index} 
                                className="color-btn"
                                style={{ backgroundColor: x }} 
                                onClick={() => handleColoronClick(x)}>
                            </button>
                        );
                    })}
                </div>
                <button type="submit" className="done-btn" onClick={createGroups}>Done</button>
            </div>}
            <div className="tab2-list">
                {allTabs.map((x) => {
                    return (
                        <Card
                            id={x.id}
                            title={x.title}
                            url={x.url}
                            icon={x.favIconUrl}
                            fun={() => handleonClick(x.id)}
                            onCloseTab={() => handleTabClose(x.id)}
                            handlePinToggle={() => 
                                x.pinned ? unPinTab(x.id) : pinTab(x.id)}
                            isPinned={x.pinned}
                        />
                    )
                })}
            </div>
        </div>
    );
}
export default CreateGroups;