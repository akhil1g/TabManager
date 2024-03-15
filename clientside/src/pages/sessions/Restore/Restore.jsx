import React from "react";
import './Restore.css'
const Restore=function()
{


    /*global chrome*/
    const navigate = useNavigate();
    const [allWindows,setAllWindows] = useState([]);
    const [windowsWithTabs, setWindowsWithTabs] = useState([]);
    const [date,setDate]=useState('');



    async function getAllWindows(windows){
        console.log(windows);
        const windowsData = await Promise.all(currentwindows.map(async (window) => {
            const tabs = await chrome.tabs.query({ windowId: window.id });
            return {
                windowId: window.id,
                tabs: tabs,
            };
        }));
        setWindowsWithTabs(windowsData);
        setAllWindows(currentwindows);
        currentwindows.forEach((c) => {
            getTabsOfWindow(c.id);
        })
        console.log("hehe");
    }



    async function restoreSessions(email)
    {
        const windows=await fetch('http://localhost:2000/api/restoresessions',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email}),
        });
        console.log(windows);
        setAllWindows(windows);

    }
    
    useEffect(function(){
        const token = localStorage.getItem('token');
        console.log(token);
        if(token){
            const user=jwt(token);
            console.log(user);
            const email=user.email;
            if(!user)
            {
                navigate.replace('/login');
            }
            else
            {
                restoreSessions(email);
                // let dt = new Date().toLocaleDateString();
                // console.log(dt);
                // setDate(dt);
                // setMail(user.email);
                // getAllWindows();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return (
        <div>
            <div className="restore-heading">
            Restore Sessions : 
            </div> 


        </div>
    );
}