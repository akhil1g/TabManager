import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import YourGroups from '../YourGroups/YourGroups'
import CreateGroups from '../CreateGroups/CreateGroups'
import './Groups.css';

function Groups() {


    const [showYourGroups, setShowYourGroups] = useState(true);
    
    
    function handleShowYourGroups(){
        setShowYourGroups(true);
    }
    function handleShowCreateGroups(){
        setShowYourGroups(false);
    }


    return (
        <div>
            <Navbar />
            <div className="home-grp-box">
                <div className="box-options">
                    <span onClick={handleShowYourGroups}>Your Groups</span>
                    <span>|</span>
                    <span onClick={handleShowCreateGroups}>Create Groups</span>
                </div>
                <div className="line"></div>
                {showYourGroups ? <YourGroups/> : <CreateGroups/>}
            </div>
        </div>
    );
}

export default Groups;
