import React from "react";
import { BsChevronExpand } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { LiaObjectUngroupSolid } from "react-icons/lia";
import './Card.css';

function Card(props) {

    console.log(props);
    
    return (
        <div className="grp2-card">
            <div className="grp2-color" style={{backgroundColor:props.color}}></div>
            <div className="grp2-title">{props.title}</div>
            <BsChevronExpand size={20} className="grp2-close" onClick={props.handleGroupCollapse}/>
            <IoCloseSharp size={20} className="grp2-close" onClick={props.onCloseGroup}/>
            <LiaObjectUngroupSolid size={20} className="grp2-close" onClick={props.onUngroup}/>
        </div>
    );
}

export default Card;