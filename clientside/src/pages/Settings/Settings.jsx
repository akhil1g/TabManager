/*global chrome*/
import React, { useState } from "react"
import { useEffect } from "react";
import Navbar from '../../layouts/Navbar/Navbar'
import './Settings.css';

function Settings(){
    
    const [customInterval, setCustomInterval] = useState(100000000);

    const handleIntervalChange = (e) => {
        setCustomInterval(e.target.value);
    };

    const handleSave = () => {
        chrome.storage.sync.set({ customInterval: customInterval }, function() {
            console.log('Custom interval saved:', customInterval);
        });
    };

    useEffect(() => {
        chrome.storage.sync.get(['customInterval'], function(result) {
            if (result.customInterval) {
                setCustomInterval(result.customInterval);
            }
        });
    }, []);

    return(
        <div>
            <Navbar/>
            <div className="box6">
                <div className="box6-1">
                    <div className="box-title">Close Inactive Tabs</div>
                    <div className="line6"></div>
                    <span>After Every: </span>
                    <input
                        type="number"
                        id="intervalInput"
                        min="1"
                        step="1"
                        value={customInterval}
                        onChange={handleIntervalChange}
                    />
                    <span>Minutes</span>
                    <button onClick={handleSave}>Save</button>
                </div>
                <div className="box6-1">
                    <div className="box-title">Keyboard ShortCuts</div>
                    <div className="line6"></div>
                    <div>
                        <div>Pin Tabs</div>
                        <div>Ctrl + Y</div>
                    </div>
                    <div>
                        <div>Unpin Tabs</div>
                        <div>Ctrl + Q</div>
                    </div>
                    <div>
                        <div>Open Extension</div>
                        <div>Alt + Shift + P</div>
                    </div>
                </div>
                <div className="box6-1">
                    <div className="box-title">Available Features</div>
                    <div className="line6"></div>
                    <div>
                        <span>blah blah blah</span>
                        <span>blah blah blah</span>
                        <span>blah blah blah</span>
                        <span>blah blah blah</span>
                        <span>blah blah blah</span>
                    </div>
                </div>
                <div className="box6-1">
                    <div className="box-title">About Us</div>
                    <div className="line6"></div>
                    <div>
                        <span>Project made for Innodev '24 </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Settings;