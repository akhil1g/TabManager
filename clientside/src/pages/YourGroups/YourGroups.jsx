    import React, { useEffect, useState } from "react";
    import { useNavigate } from 'react-router-dom';
    import Navbar from "../Navbar/Navbar";
    import GroupCard from './GroupCard'
    import './YourGroups.css'

    function YourGroups() {

        const navigate = useNavigate();
        const [allgroups, setAllGroups] = useState([]);

        /*global chrome*/
        // eslint-disable-next-line no-unused-vars
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

        return (
            <div>
                <Navbar/>
                <div className="home-box">
                    {/* Preview all Groups */}
                    <div className="tab-list">
                        {allgroups.map((x)=>{
                            return (
                                <GroupCard
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
                        })}
                    </div>
                </div>
            </div>
        );
    }

    export default YourGroups;
