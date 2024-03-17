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
                    <div className="interval">
                        <span className="int1">After Every: </span>
                        <input
                            type="number"
                            id="intervalInput"
                            min="1"
                            step="1"
                            value={customInterval}
                            onChange={handleIntervalChange}
                            className="int2"
                        />
                        <span className="int3">Minutes</span>
                    </div>
                    <button className="interval-btn" onClick={handleSave}>Save</button>
                </div>
                <div className="box6-1">
                    <div className="box-title">Keyboard ShortCuts</div>
                    <div className="line6"></div>
                    <div className="sub">
                        <div className="sub1">Pin Tabs:</div>
                        <div className="sub2">Ctrl + Y</div>
                    </div>
                    <div className="sub">
                        <div className="sub1">Unpin Tabs:</div>
                        <div className="sub2">Ctrl + Q</div>
                    </div>
                    <div className="sub">
                        <div className="sub1">Open Extension:</div>
                        <div className="sub2">Alt + Shift + P</div>
                    </div>
                </div>
                <div className="box6-1">
                    <div className="box-title">Available Features</div>
                    <div className="line6"></div>
                    <span className="dets">blah blah blah</span>
                    <span className="dets">blah blah blah</span>
                    <span className="dets">blah blah blah</span>
                    <span className="dets">blah blah blah</span>
                    <span className="dets">blah blah blah</span>
                    <span className="dets">blah blah blah</span>
                    <span className="dets">blah blah blah</span>
                    <span className="dets">blah blah blah</span>
                    <span className="dets">blah blah blah</span>
                    <span className="dets">blah blah blah</span>
                </div>
                <div className="box6-1">
                    <div className="box-title">About Us</div>
                    <div className="line6"></div>
                    <div>
                        <span>Project made for Innodev '24 under Electromania @ MNNIT, Allahabad</span>
                        <span>Contributers:</span>
                        <a href="/">Akhil Gupta</a>
                        <a href="/">Aarya Khandare</a>
                        <a href="/">Isha Vishwakarma</a>
                        <a href="/">Aditya Singh Yadav</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Settings;