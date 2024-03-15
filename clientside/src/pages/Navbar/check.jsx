import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './navbar.css'


const Check = function()
{
    const navigate=useNavigate();
    const [token, setToken] = useState(null);
    useEffect(() => {
        const t = localStorage.getItem('token');
        setToken(t);
    }, []);
    const handlelogout = function () {
        localStorage.removeItem('token');
        navigate('/');
    }

    if(token) {
        return <button className="logout" onClick={handlelogout}>Logout</button>;
    }

}
export default Check;