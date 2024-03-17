import React, { useState, useEffect, useRef} from "react";
import { TiPin } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineStarOutline } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import '../components/TabItem.css';

/*global chrome*/

function Card(props) {
    
    const [selectedTabs,setSelectedTabs] = useState([]);
    const [isPinned, setIsPinned] = useState(false);
    const cardRef = useRef(null);
    const [isBookmarked, setIsBookmarked] =useState(false);

    console.log(props,"props");
    const handleChange = e => {
        const {value,checked} = e.target;
        if (checked) {
        setSelectedTabs(prev => [...prev, value]);
        props.childtoparent(value);
        } else {
        }
    }

    
    //Update the pin state
    useEffect(() => {
        setIsPinned(props.isPinned);
    }, [props.isPinned])   


    // Scroll to this card when it's highlighted
    useEffect(() => {
        if(props.highlight) {
            cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
    }, [props.highlight]);

    // // Function to handle bookmark
    // const handleBookmark = () => {
    //     props.handleBookmark();
    //     setIsBookmarked(!isBookmarked); // Toggle bookmark state

    //     // Save or remove bookmarked tab URL from chrome.storage
    //     chrome.storage.sync.get(['bookmarks'], function(result) {
    //         let bookmarks = result.bookmarks || [];
    //         if (!isBookmarked) {
    //             bookmarks.push(props.url);
    //         } else {
    //             bookmarks = bookmarks.filter(url => url !== props.url);
    //         }
    //         chrome.storage.sync.set({bookmarks: bookmarks});
    //         console.log("saving bookmark to chrome storage")
    //     });
    // };

    // // Initialize isBookmarked state from chrome.storage on component mount
    // useEffect(() => {
    //     chrome.storage.sync.get(['bookmarks'], function(result) {
    //         const bookmarks = result.bookmarks || [];
    //         setIsBookmarked(bookmarks.includes(props.url));
    //         console.log("initialized bookmakr state on mounting")
    //     });
    // }, []);


    const handleBookmark = () => {
        // Toggle bookmark state
        setIsBookmarked(prev => !prev);
    
        // Retrieve current bookmarks from Chrome storage
        chrome.storage.sync.get(['bookmarks'], function(result) {
            let bookmarks = result.bookmarks || [];
            const tabUrl = props.url;
    
            if (!isBookmarked) {
                // If the tab is not bookmarked, add it to bookmarks
                bookmarks.push(tabUrl);
            } else {
                // If the tab is already bookmarked, remove it from bookmarks
                bookmarks = bookmarks.filter(url => url !== tabUrl);
            }
    
            // Update bookmarks in Chrome storage
            chrome.storage.sync.set({ bookmarks }, function() {
                console.log("Bookmarks updated in Chrome storage:", bookmarks);
            });
        });
    };


    return (
        <div ref={cardRef} 
            className={`tab-card ${props.highlight ? 'highlight' : ''}${props.isDuplicate ? 'duplicate' : ''}`}>
            {/* <input type="checkbox"
                value={props}
                onChange={handleChange}
                className="tab-check"></input> */}
            <img alt="" src={props.icon} className="tab-img"/>
            <div className="tab-title">{props.title}</div>
            {isBookmarked ? (<MdOutlineStarPurple500 
                                size={20} 
                                className="tab-close" 
                                onClick={handleBookmark}/>)
                            : (<MdOutlineStarOutline 
                                size={20} 
                                className="tab-close"
                                onClick={handleBookmark}/>)
            }
            <TiPin 
                className={`${isPinned ? 'tab-pin' : 'tab-unpin'}`}
                onClick={props.handlePinToggle} size={20}/>
            <IoCloseSharp size={20} className="tab-close" onClick={() => props.onCloseTab(props.id)}/>
        </div>
    );
}
export default Card;
