import React, { useState } from "react";
import { TiPin } from "react-icons/ti";
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
    return (
        <div className="tab-card">
            <input type="checkbox"
                value={props}
                onChange={handleChange}></input>
            <img alt="" src={props.icon} className="tab-img" />
            <div className="tab-title">{props.title}</div>
            <TiPin className="tab-pin" size={22}/>
        </div>
    );
}
export default Card;