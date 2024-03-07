import React,{useState} from "react";
import './login.css'
const Login=function()
{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
    async function loginUser(event)
    {
        event.preventDefault();
        const response=await fetch('http://localhost:2000/api/login',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password}),
        });
        const data=await response.json();
        if(data.user)
        {
            localStorage.setItem('token',data.user);

            
            alert('Login Successful');
            
            window.location.href='./Home';
        }
        else
        {
            alert('Please check your Username and PassWord carefully');
        }
    }

    return (
        <div>
            <div className="outer-container">
            <div className="container-login">
            <form onSubmit={loginUser}>
            <h1 className="login-heading">Login</h1>
            <div className="sub">
                <label className="label-login">Email : </label>
                    <input value={email} 
                    onChange={function(e){
                        setEmail(e.target.value)
                    }} 
                    type="email"
                    placeholder="Email" 
                    name="email" >
                    </input>
            </div>
            <div className="sub">
                <label className="label-login">Password : </label>
                    <input value={password}
                    onChange={function(e){
                        setPassword(e.target.value)
                    }} 
                    type="password" 
                    placeholder="*****" 
                    name="password"></input>
            </div>
              <div className="button-container">
                 <input type="submit" value="Login" className="submit-button"></input> </div>
            </form>
            </div>
            </div>
            </div>
    )
}
export default Login;