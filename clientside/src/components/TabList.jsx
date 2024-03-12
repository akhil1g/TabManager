import React from "react";
import './TabList.css';
import Tabitem from "./Tabitems";
import dummydata from './dummydata';

function TabList(){
    return (
        <div className="tab-list">
           {dummydata.map( (tab) => (
            <Tabitem 
                id={tab.id}
                icon={tab.icon}
                name={tab.name}
                url={tab.url}
            />
           ))}
        </div>
    );
}

export default TabList;