import './navbar.css'
const handlelogout=function()
{
    localStorage.removeItem('token');
    window.location.href="/";
}

const Check=function()
{
    
    const token=localStorage.getItem('token');
    console.log(token);
    if(token)
    {
        return <div className="logout-button"><button className="logout" onClick={handlelogout}>Logout</button></div>;
    }
    
}
export default Check;