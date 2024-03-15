/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from "react";
import { TiPin } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import './Tabitem.css'

function Card(props) {
    
    const [selectedTabs,setSelectedTabs] = useState([]);
    console.log(props,"props");
    const handleChange = e => {
        const {value,checked} = e.target;
        if (checked) {
          setSelectedTabs(prev => [...prev, value]);
          props.childtoparent(value);
        } else {
        }
      }

    const [isPinned, setIsPinned] = useState(false);
    //Update the pin state
    useEffect(() => {setIsPinned(props.isPinned);}, [props.isPinned])

    return (
        <div className="tab-card">
            <input type="checkbox"
                value={props}
                onChange={handleChange}
                className="tab-check"></input>
            <img alt="" src={props.icon} className="tab-img"/>
            <div className="tab-title">{props.title}</div>
            <TiPin 
                className={`${isPinned ? 'tab-pin' : 'tab-unpin'}`}
                onClick={props.handlePinToggle} size={20}/>
            <IoCloseSharp onClick={props.onCloseTab} className="tab-close" size={20}/>
        </div>
    );
}
export default Card;