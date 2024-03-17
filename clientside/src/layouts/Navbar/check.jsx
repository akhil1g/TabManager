import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './navbar.css'


const Check = function()
{
    const navigate=useNavigate();
    const [user, setUser] = useState('');
    useEffect(() => {
         async function getUser() {
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
           if (data.code == 200) {
                setUser(data.user.name);
           } else {
             window.location.href = "/";
           }
         }
         getUser();
    }, []);
    const handlelogout = async function  () {
        const result = await fetch("http://localhost:2000/auth/logout", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-allow-Credentials": true,
          },
        });
        console.log(result);
        navigate('/');
    }

    if(user!=null) {
        return <button className="logout" onClick={handlelogout}>Logout</button>;
    }

}
export default Check;