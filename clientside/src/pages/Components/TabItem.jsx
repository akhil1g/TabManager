    /* eslint-disable no-unused-vars */
    import React, { useState, useEffect,useRef} from "react";
    import { TiPin } from "react-icons/ti";
    import { IoCloseSharp } from "react-icons/io5";
    import { MdOutlineStarOutline } from "react-icons/md";

    import './Tabitem.css'

    function Card(props) {
        
        const [selectedTabs,setSelectedTabs] = useState([]);
        const [isPinned, setIsPinned] = useState(false);
        const { highlight } = props;
        const { isDuplicate } = props;
        const cardRef = useRef(null);
        const [isBookmarked, setIsBookmarked] =useState(false);

        console.log(props,"props");
        const handleChange = e => {
            const {value,checked} = e.target;
            if (checked) {
            setSelectedTabs(prev => [...prev, value]);
            props.childtoparent(value);
            } else {
            }
        }

        
        //Update the pin state
        useEffect(() => {
            setIsPinned(props.isPinned);
        }, [props.isPinned])   


        // Scroll to this card when it's highlighted
        useEffect(() => {
            if (highlight) {
                cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            }
        }, [highlight]);



        return (
            <div ref={cardRef} 
                className={`tab-card ${highlight ? 'highlight' : ''}${isDuplicate ? 'duplicate' : ''}`}>
                {/* <input type="checkbox"
                    value={props}
                    onChange={handleChange}
                    className="tab-check"></input> */}
                <img alt="" src={props.icon} className="tab-img"/>
                <div className="tab-title">{props.title}</div>
                <MdOutlineStarOutline size={20} className="tab-close" onClick={props.handleBookmark}/>
                <TiPin 
                    className={`${isPinned ? 'tab-pin' : 'tab-unpin'}`}
                    onClick={props.handlePinToggle} size={20}/>
                <IoCloseSharp size={20} className="tab-close" onClick={props.onCloseTab}/>
            </div>
        );
    }
    export default Card;
