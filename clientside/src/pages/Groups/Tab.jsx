import React from "react";
import './Tab.css';

function Card(props) {
    const handleChange = e => {
        const checked = e.target.checked;
        if (checked) {
            props.fun(props.id); // Pass the id of the tab to props.fun
        }
    };

    return (
        <div className="tab-card">
            <input 
                type="checkbox"
                value={props.id} // Pass the id of the tab as the value
                onChange={handleChange}
            />
            <img alt="" src={props.icon} className="tab-img"/>
            <div className="tab-title">{props.title}</div>
        </div>
    );
}

export default Card;
