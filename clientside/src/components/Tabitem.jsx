/* eslint-disable no-unused-vars */
/*global chrome*/
import React, { useState, useEffect } from "react";
import { TiPin } from "react-icons/ti";
import { IoIosCloseCircleOutline } from "react-icons/io";
import './Tabitem.css'

function Card(props) {  

    const [isPinned, setIsPinned] = useState(false);

    //Update the pin state
    useEffect(() => {setIsPinned(props.isPinned);}, [props.isPinned]);


    console.log(props,"props");
    return (
        <div className="tab-card">
            <input type="checkbox"></input>
            <img alt=""></img>
            <div className="tab-title">{props.title}</div>
            <TiPin 
                className={`${isPinned ? 'tab-pin' : 'tab-unpin'}`}
                onClick={props.handlePinToggle} size={18}/>
            <IoIosCloseCircleOutline onClick={props.onCloseTab} size={18}/>
        </div>
    );
}
export default Card;