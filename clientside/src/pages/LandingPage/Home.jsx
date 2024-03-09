import React,{useEffect, useState} from "react";
import jwt from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import './home.css'

function Home() {
    const history=useNavigate();
    // const [tabs, setTabs] = useState([]);

    // function Card(props) {
    //     console.log(props,"props");
    //       return (
    //         <div className="tab-card">
    //             <input type="checkbox"></input>
    //             <img alt=""></img>
    //             <div className="tab-title">{props.title}</div>
    //         </div>
    //       );
    // }
    // useEffect(() => {
    //     const listener = (message) => {
    //       if (message.tabs) {
    //         setTabs(message.tabs);
    //       }
    //     };
    //     chrome.runtime.onMessage.addListener(listener);
    
    //     return () => chrome.runtime.onMessage.removeListener(listener);
    //   }, []);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {
      async function getUser(){
         const result = await fetch("http://localhost:2000/auth/user", {
           method: "GET",
           credentials: "include",
           headers: {
             "Content-Type": "application/json",
             "Access-Control-allow-Credentials": true,
           },
         });
         const data = await result.json();
         console.log(data);
         if (data.code != 200) {
           history("/landing");
         }
      };
      getUser();
    }, []);
    async function handlelogout(){
      const result = await fetch("http://localhost:2000/auth/logout", {
           method: "POST",
           credentials: "include",
           headers: {
             "Content-Type": "application/json",
             "Access-Control-allow-Credentials": true,
           },
         });
         console.log(result);
    }
  return (
    <div className="home-box">
    <h1 className="home-name">Hello!</h1>
    <button onClick={handlelogout}>logout</button>
    {/* <div className="tab-list">
        {tabs.map( (x) => (
            <Card 
                key={x.tab.id}
                title={x.tab.title}
                url={x.tab.url}
                icon={x.tab.favIconUrl}
            /> */}
        {/* ))} */}
    </div>
    // </div>
  );
}

export default Home;