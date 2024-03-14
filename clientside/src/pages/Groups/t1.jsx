import React, { useState } from "react";
import './Tab.css'

function Card(props) {
    console.log(props,"props");
    const handleChange = e => {
        const {value,checked} = e.target;
        if (checked==true) {
            const object={
                title: props.title,
                url:props.url,
                id:props.id
            }
            console.log(object);
            props.fun(props.id);
        } 
      }
    return (
        <div className="tab-card">
            <input type="checkbox"
                value={props}
                onChange={handleChange}></input>
            <img alt="" src={props.icon}></img>
            <div className="tab-title">{props.title}</div>
        </div>
    );
}
export default Card;