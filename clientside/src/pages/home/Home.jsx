import React,{useEffect, useState, useRef} from "react";
import {useNavigate} from 'react-router-dom'
import jwt from 'jwt-decode'
import Navbar from "../../layouts/Navbar/Navbar";
import Card from '../../components/TabItem'
import { CiSearch } from "react-icons/ci";
import './home.css'

/*global chrome*/

function Home() {

    const navigate = useNavigate();
    const [userName,setName] = useState("");
    const [allTabs,setAllTabs] = useState([]);
    const [allWindows,setAllWindows] = useState([]);
    const [windowsWithTabs, setWindowsWithTabs] = useState([]);
    const [windowCount, setWindowCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [duplicateUrls, setDuplicateUrls] = useState([]);
    const [duplicateTabIds, setDuplicateTabIds] = useState([]);
    const [ifDuplicate, setIfDuplicate]=useState(false);
    const [bookmarks,setBookmarks]=useState([]);
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
            console.log("Tab closed successfully");
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


    


    useEffect(function(){
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
            if(data.code != 200){
                navigate.replace('/login');
            }else{

                getAllTabs();
                getAllWindows();
                getTabsOfWindow();
                setName(data.user.name);
            }
        }
        getUser();
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

    

    // Function to find duplicate tabs in allTabs
    const findDuplicateTabs = () => {
        const urlMap = {};
        allTabs.forEach(tab => {
            // Increment count for each URL
            const url = tab.url;
            if (urlMap[url]) {
                urlMap[url].push(tab.id);
            } else {
                urlMap[url] = [tab.id];
            }
        });

        const duplicates = [];
        for (const url in urlMap) {
            if (urlMap[url].length > 1) {
                // If count > 1, it means there are duplicates
                duplicates.push(...urlMap[url]);
            }
        }

        console.log("Duplicates:", duplicates);
        setDuplicateTabIds(duplicates);
    };
    
    function handleHighlightDuplicates(){
        console.log("ewwww");
        console.log("Highlighting duplicates...");
        setIfDuplicate(!ifDuplicate);
        findDuplicateTabs(); 
    }
    
    // const handleBookmark = (tab) => {
    //     // Check if the current tab URL is already bookmarked
    //     chrome.bookmarks.search({ url: tab.url }, (results) => {
    //         if (results.length === 0) {
    //             createBookmark(tab);
    //         } else {
    //             const bookmarkIdToRemove = results[0].id;
    //             removeBookmark(bookmarkIdToRemove);
            
    //       }
    //     });
    // };
    // const createBookmark = (tab) => {
    //     // If the tab URL is not bookmarked, create a new bookmark
    //     chrome.bookmarks.create({
    //         title: tab.title,
    //         url: tab.url,
    //         parentId: "1" // Create the bookmark in the "Other Bookmarks" folder (with ID = 1)
    //     }, (bookmark) => {
    //         // Add the new bookmark to the state
    //         const bookmarkedTabs = [...bookmarks, bookmark];
    //         setBookmarks(bookmarkedTabs);
    
    //         // Store the updated bookmarks array in chrome.storage
    //         chrome.storage.local.set({ bookmarks: bookmarkedTabs }, () => {
    //             console.log("Bookmarks updated in storage.");
    //         });
    //     });
    // }
    // const removeBookmark = (bookmarkIdToRemove) => {
    //     // If the tab URL is already bookmarked, remove the bookmark
        
    //     chrome.bookmarks.remove(bookmarkIdToRemove, (removed) => {
    //         if (removed) {
    //             // Remove the bookmark from the state
    //             const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== bookmarkIdToRemove);
    //             setBookmarks(updatedBookmarks);
    
    //             // Store the updated bookmarks array in chrome.storage
    //             chrome.storage.local.set({ bookmarks: updatedBookmarks }, () => {
    //                 console.log("Bookmarks updated in storage.");
    //             });
    //         }
    //     });
    // }
    // // Function to retrieve bookmarked tab URLs from chrome.storage
    // useEffect(() => {
    //     chrome.storage.sync.get(['bookmarks'], function (result) {
            
    //         const storedBookmarks = result.bookmarks || [];
    //         setBookmarks(storedBookmarks);
    //         console.log("Bookmarks retrieved from chrome storage");
    //     });
    // }, []);
    const handleBookmark = (tabTitle, tabUrl) => {
        // Check if the tab is already bookmarked
        const isBookmarked = bookmarks.some(bookmark => bookmark.url === tabUrl);
    
        if (isBookmarked) {
            // If the tab is already bookmarked, remove the bookmark
            removeBookmark(tabUrl);
        } else {
            // If the tab is not bookmarked, create a bookmark
            bookmarkTab(tabTitle, tabUrl);
        }
    };
    // Function to add a bookmark for the tab
    const bookmarkTab = (tabTitle, tabUrl) => {
        console.log('Tab Title:', tabTitle);
        console.log('Tab URL:', tabUrl);
        // Create a bookmark for the specified tab
        chrome.bookmarks.create({
            title: tabTitle,
            url: tabUrl
        }, (newBookmark) => {
            console.log('Bookmark created:', newBookmark);
            // Update the Chrome storage with the new bookmark
            updateChromeStorage([...bookmarks, newBookmark]);
        });
    };

    // Function to remove the bookmark for the tab
    const removeBookmark = (tabUrl) => {
        // Find the bookmark corresponding to the tab URL
        const bookmarkToRemove = bookmarks.find(bookmark => bookmark.url === tabUrl);
        if (bookmarkToRemove) {
            const bookmarkId = bookmarkToRemove.id;
            // Remove the bookmark from the Chrome storage
            chrome.bookmarks.remove(bookmarkId, () => {
                console.log('Bookmark removed');
                // Update the Chrome storage without the removed bookmark
                updateChromeStorage(bookmarks.filter(bookmark => bookmark.id !== bookmarkId));
            });
        } else {
            console.log('Bookmark not found for the tab URL:', tabUrl);
        }
    };

    // Function to update the Chrome storage with the bookmarks
    const updateChromeStorage = (bookmarks) => {
        chrome.storage.sync.set({ bookmarks }, () => {
            console.log('Chrome storage updated with bookmarks:', bookmarks);
        });
    };



    

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
                            //duplicate
                            isDuplicate={ifDuplicate && duplicateTabIds.includes(x.id)}
                             // Pass the handleBookmark function
                            handleBookmark={() => handleBookmark(x.title, x.url)}
                            isBookmarked={bookmarks.some(bookmark => bookmark.url === x.url)}
                        />)
                    })} 
                    </div>
                </div>)})}
        </div>
        <button onClick={handleHighlightDuplicates}>duplicate</button>
    </div>);
}

export default Home;