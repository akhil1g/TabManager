import React from "react";
import { TiPin } from "react-icons/ti";
import './TabList.css';

function tabitem(props){

    function handlePinToggle(){
        console.log("pin tab");
    }

    function handleTabSelect(){
        console.log("tab selected");
    }

    function handleTabClick(){
        console.log("redirect to tab");
    }

    return (
        <div className="tab-items">
            <input type="checkbox" className="tablist-checkbox" onClick={handleTabSelect}/>
            <img src={props.icon} alt={props.name} className="tab-icon" onClick={handleTabClick}/>
            <span className="tab-name" onClick={handleTabClick}>{props.name}</span>
            <TiPin className="tab-pin" onClick={handlePinToggle} size={22}/>
        </div>
    );
}

export default tabitem;