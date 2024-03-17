import React, {useState, useEffect } from "react";
import { TiPin } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import './Tab.css';

function Card(props) {

    const [isPinned, setIsPinned] = useState(false);
    
    const handleCheck = e => {
        const checked = e.target.checked;
        if (checked) {
            props.fun(props.id); // Pass the id of the tab to props.fun
        }
    };

    //Update the pin state
    useEffect(() => {setIsPinned(props.isPinned);}, [props.isPinned]) 

    return (
        <div className="tab2-card">
            <input 
                type="checkbox"
                value={props.id} // Pass the id of the tab as the value
                onChange={handleCheck}
                className="tab2-check"
            />
            <img alt="" src={props.icon} className="tab2-img"/>
            <div className="tab2-title">{props.title}</div>
            <TiPin 
                className={`${isPinned ? 'tab-pin' : 'tab-unpin'}`}
                onClick={props.handlePinToggle} size={20}/>
            <IoCloseSharp size={20} className="tab-close" onClick={props.onCloseTab}/>
        </div>
    );
}

export default Card;
