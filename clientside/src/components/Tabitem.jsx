/* eslint-disable no-unused-vars */
/*global chrome*/
import React from "react";
import { TiPin } from "react-icons/ti";
import { IoIosCloseCircleOutline } from "react-icons/io";
import './Tabitem.css'

function Card(props) {  
    
    console.log(props,"props");
    return (
        <div className="tab-card">
            <input type="checkbox"></input>
            <img alt=""></img>
            <div className="tab-title">{props.title}</div>
            {/* <TiPin className="tab-pin" size={18}/> */}
            <IoIosCloseCircleOutline onClick={props.onCloseTab} size={18}/>
        </div>
    );
}
export default Card;