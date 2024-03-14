import React from "react";
import { BsChevronExpand } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";
import './GroupCard.css';

function GroupCard(props) {

    
    console.log(props);
    
    return (
        <div className="grp-card">
            <div className="grp-color" style={{backgroundColor:props.color}}></div>
            <div className="grp-title">{props.title}</div>
            <BsChevronExpand className="grp-close" onClick={props.handleGroupCollapse}/>
            <IoCloseCircleOutline className="grp-close" onClick={props.onCloseGroup}/>
        </div>
    );
}

export default GroupCard;