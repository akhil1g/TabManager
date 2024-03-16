/* eslint-disable no-unused-vars */
/*global chrome*/
import React,{useEffect, useState, useRef} from "react";
import {useNavigate} from 'react-router-dom'
import jwt from 'jwt-decode'
import Navbar from "../Navbar/Navbar";
import Card from '../Components/TabItem'
import { CiSearch } from "react-icons/ci";
import './home.css'


function Home() {

    const navigate = useNavigate();
    const [userName,setName] = useState("");
    const [allTabs,setAllTabs] = useState([]);
    const [allWindows,setAllWindows] = useState([]);
    const [windowsWithTabs, setWindowsWithTabs] = useState([]);
    const [windowCount, setWindowCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [duplicateUrls, setDuplicateUrls] = useState([]);
    const highlightedTabRef = useRef(null);


    //To Get All Tabs
    async function getAllTabs(){
        const t = await chrome.tabs.query({});
        console.log(t);
        setAllTabs(t);
    }


    //Get all Windows with respective Tabs    
    async function getAllWindows(){
        const currentwindows = await chrome.windows.getAll();
        console.log(currentwindows);
        const windowsData = await Promise.all(currentwindows.map(async (window) => {
            const tabs = await chrome.tabs.query({ windowId: window.id });
            return {
                windowId: window.id,
                tabs: tabs,
            };
        }));
        setWindowsWithTabs(windowsData);
        setAllWindows(currentwindows);
        currentwindows.forEach((c) => {
            getTabsOfWindow(c.id);
        })
        //Update window count
        setWindowCount(currentwindows.length)
        console.log("hehe");
    }


    async function getTabsOfWindow(id){
        let queryOptions = {windowId:id}
        const tabs = await chrome.tabs.query(queryOptions);
        console.log("hello");
        console.log(id);
        console.log(tabs);
    }

    //To Create New Tab
    async function createNewTab(windowid){
        chrome.tabs.create(
            {active: true,
            windowId: windowid},
            () => console.log("new tab created with id:")
        );
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


    

   

    async function getName() {
        const req = await fetch("http://localhost:2000/api/home",{
        headers: {
        'x-access-token': localStorage.getItem('token'),
        },
        })
        const data = await req.json();
        setName(data.name)
        console.log(data.name);
    }



    useEffect(() => {
        async function getAllTabsAndHighlightDuplicates() {
            const tabURLs = allTabs.map(tab => tab.url);
            const duplicateURLs = tabURLs.filter((url, index) => tabURLs.indexOf(url) !== index);
            setDuplicateUrls(duplicateURLs);
        }
        getAllTabsAndHighlightDuplicates();
    }, []);


    useEffect(function(){
        const token = localStorage.getItem('token');
        console.log(token);
        if(token){
            const user=jwt(token);
            console.log(user);
            if(!user){
                navigate.replace('/login');
            }else{

                getAllTabs();
                getAllWindows();
                getTabsOfWindow();
                getName();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        // If the search query is cleared, reset the highlighted tab ref
        if (!e.target.value) {
            highlightedTabRef.current = null;
        }
    }


    let filteredTabs = [];
    if (searchQuery) {
        filteredTabs = allTabs.filter(tab => {
            return tab.title.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }

    useEffect(() => {
        // Scroll to the highlighted tab card when it changes
        if (highlightedTabRef.current) {
            highlightedTabRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [highlightedTabRef]);


    

    return (
    <div>
        <Navbar/>
        <div className="home-box">
            <h1 className="home-name">Hello, {userName}!</h1>
            <div className="search-box">
                <CiSearch size={17}/>
                <input type="text" placeholder="Search Tabs..." onChange={handleSearch} autoFocus/>
            </div>
            {windowsWithTabs.map((y, index)=>{
                return (
                <div className="window-list">
                    <div className="window-dets">
                        <span>Window: {index + 1}</span>
                        <button className="new-tab-btn" 
                                onClick={() => createNewTab(y.windowId)}>New Tab
                        </button>
                    </div>
                    <div className="tab-list">
                    {y.tabs.map((x) => {
                        // Determine if the tab should be highlighted
                        const highlight = filteredTabs.some(filteredTab => filteredTab.id === x.id);
                        // Set ref to the highlighted tab card
                        const ref = highlight ? highlightedTabRef : null;
                        return (
                        <Card 
                            id={x.id}
                            title={x.title}
                            url={x.url}
                            icon={x.favIconUrl}
                            onCloseTab={() => handleTabClose(x.id)}
                            handlePinToggle={() => 
                                x.pinned ? unPinTab(x.id) : pinTab(x.id)}
                            isPinned={x.pinned}
                            //Highlight the tab if it matches the search query
                            highlight={highlight}
                            //Pass ref to the highlighted tab card
                            ref={ref}
                            // Highlight the tab if it's a duplicate
                            isDuplicate={x.isDuplicate}
                        />)
                    })} 
                    </div>
                </div>)})}
        </div>
    </div>);
}

export default Home;
