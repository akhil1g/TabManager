/*global chrome*/
import React, { useState } from "react"
import { useEffect } from "react";
import Navbar from '../Navbar/Navbar'
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
        <div className="box6">
            <Navbar/>
            <div>
                <span>Interval</span>
                <input
                    type="number"
                    id="intervalInput"
                    min="1"
                    step="1"
                    value={customInterval}
                    onChange={handleIntervalChange}
                />
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
}
export default Settings;