/*global chrome*/
import React, { useEffect, useState } from "react";
import Card from './Card'
import './YourGroups.css'

function YourGroups() {
    
    const [allgroups, setAllGroups] = useState([]);

    
    async function getAllgroups(){
        const g = await chrome.tabGroups.query({});
        console.log(g);
        setAllGroups(g);
    }


    useEffect(function () {
        getAllgroups();
    },[])


    async function handleCollapse(groupId, collapsed) {
        try {
            console.log(collapsed);
            console.log(groupId);
            await chrome.tabGroups.update(groupId, { collapsed });
            setAllGroups(prevGroups => prevGroups.map(group => {
                if (group.id === groupId) {
                    return { ...group, collapsed };
                }
                return group;
            }));
        } catch (err) {
            console.log( err);
        }
    }


    async function handleGroupClose(groupid){
        console.log(groupid);
        const tabs=await chrome.tabs.query({groupId: groupid});
        tabs.forEach((tab)=>{
            console.log(tab.id);
            chrome.tabs.remove(tab.id);
        })
        setAllGroups(prevGroups => prevGroups.filter(group => group.id !== groupid));
    }

    let len = allgroups.length;
    return (
        <div className="tab3-list">
            <span>Total Groups: {len}</span>
            {len===0 ? (<div className="no-grp">No groups found :( </div>) 
            : (allgroups.map((x)=>{
                return (
                    <Card
                        id={x.id}
                        title={x.title}
                        color={x.color}
                        collapsed={x.collapsed}
                        handleGroupCollapse={()=>
                            x.collapsed===true ? handleCollapse(x.id,false)
                            : handleCollapse(x.id,true)}
                        onCloseGroup={() => handleGroupClose(x.id)}
                    />
                );
            }))}
        </div>
    );
}

export default YourGroups;
