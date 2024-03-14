/* eslint-disable no-unused-vars */
import React,{useEffect, useState} from "react";
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Navbar from "../Navbar/Navbar";
import Card from "./Tab";
import './groups.css'


function Groups() {

    const navigate = useNavigate();
    const [allTabs,setAllTabs] = useState([]);
    const [groupTabs,setGroupTabs]=useState([]);
    const [groupName,setGroupName]=useState(null);
    const [groupColor,setGroupColor] =useState([]);
    const Colors = ["blue","red","yellow","green","purple"]
  



   /*global chrome*/
    async function getAllTabs(){
        const t = await chrome.tabs.query({});
        console.log(t);
        setAllTabs(t);
    }

    async function createGroups(){
        const ids=[];
        ids.push(groupTabs);
        console.log(groupTabs);
        console.log(ids);
        let groupId = await chrome.tabs.group({ tabIds: ids});
        await chrome.tabGroups.update(groupId, {
            collapsed: false,
            title: groupName,
            color: groupColor
        });
    }

    function handleColoronClick(x){
        console.log(x);
        setGroupColor(x);
    }

    useEffect(function(){
        const token = localStorage.getItem('token');
        console.log(token);
        if(token)
        {
            const user=jwt(token);
            console.log(user);
            if(!user)
            {
            navigate.replace('/login');
            }
            else
            {
                getAllTabs();
            }
        }
    },[navigate])

    // useEffect(()=>{
    //   console.log(tabs);
    // },[tabs]);

    async function handleonClick(tabvalue){
        
        console.log(tabvalue);
        const obj={tabvalue}
        setGroupTabs({...obj});
        const result = await new Promise(resolve => setTimeout(() => resolve('resolved'), 2000));
    }

  

    
  return (
    <div>
        <Navbar/>
        <div className="home-box">
        <h1 className="home-name">Hello !</h1>
            <div className="window-list">
                <div className="tab-list">
                {allTabs.map((x) => {
                    return (
                    <Card 
                        id={x.id}
                        title={x.title}
                        url={x.url}
                        icon={x.favIconUrl}
                        fun={handleonClick}
                    />)
                })} 
              
                </div>
            </div>
            <div>
            <input value={groupName}
                    onChange={function(e){
                        setGroupName(e.target.value)
                    }} 
                    type="text" 
                    name="groupName"
                    className="groupname">
            </input>
            {
                Colors.map((x)=>{
                return (<button style={{backgroundColor:x}} onClick={() => {handleColoronClick(x)}}>color</button>);
            })}
            <button type="submit" onClick={createGroups}>Done</button>
        </div>
        </div>
        
    </div>
  );
}

export default Groups;