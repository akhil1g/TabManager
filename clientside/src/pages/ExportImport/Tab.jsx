import React, {useState, useEffect } from "react";
import './Tab.css';

function Card(props) {

        const handleCheck = e => {
            const checked = e.target.checked;
            props.handleChange(checked, props.url);
        };

    return (
        <div className="tab2-card">
            <input 
                type="checkbox"
                value={props.url} // Pass the id of the tab as the value
                onChange={handleCheck}
                className="tab2-check"
            />
            <img alt="" src={props.icon} className="tab2-img"/>
            <div className="tab2-title">{props.title}</div>
        </div>
    );
}

export default Card;
