import React, { useState, useEffect} from "react";
import { TiPin } from "react-icons/ti";
import { IoIosCloseCircleOutline } from "react-icons/io";
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
                onChange={handleChange}></input>
            <img alt="" src={props.icon} className="tab-img" />
            <div className="tab-title">{props.title}</div>
            <TiPin 
                className={`${isPinned ? 'tab-pin' : 'tab-unpin'}`}
                onClick={props.handlePinToggle} size={22}/>
            <IoIosCloseCircleOutline onClick={props.onCloseTab} size={22}/>
        </div>
    );
}
export default Card;