import React,{useEffect, useState} from "react";
import jwt from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import './home.css'

function Home() {
    const history=useNavigate();
    const [userName,setName]=useState("");
    
    
    async function getName() {
         const req=await fetch("http://localhost:2000/api/home",{
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
         })
         const data=await req.json();
         setName(data.name)
         console.log(data.name);
      }
  
    useEffect(function()
    {
      const token=localStorage.getItem('token');
      if(token)
      {
        const user=jwt(token);
        console.log(user);
        if(!user)
        {
          localStorage.removeItem('token');
          history.replace('/login');
        }
        else
        {
            getName();
        }
      }
    },[])


  
    const [tabs, setTabs] = useState([]);

    function Card(props) {
        console.log(props,"props");
          return (
            <div className="tab-card">
                <input type="checkbox"></input>
                <img alt=""></img>
                <div className="tab-title">{props.title}</div>
            </div>
          );
    }
    // useEffect(() => {
    //     const listener = (message) => {
    //       if (message.tabs) {
    //         setTabs(message.tabs);
    //       }
    //     };
    //     chrome.runtime.onMessage.addListener(listener);
    
    //     return () => chrome.runtime.onMessage.removeListener(listener);
    //   }, []);

  return (
    <div className="home-box">
    <h1 className="home-name">Hello, {userName}!</h1>
    <div className="tab-list">
        {tabs.map( (x) => (
            <Card 
                key={x.tab.id}
                title={x.tab.title}
                url={x.tab.url}
                icon={x.tab.favIconUrl}
            />
        ))}
    </div>
    </div>
  );
}

export default Home;