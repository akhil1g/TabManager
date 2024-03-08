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
            alert('Please check your Username and Password carefully');
        }
    }

    return (
        <div className="login-box">
        <form className="login-form" onSubmit={loginUser}>
        <h1 className="login-head">Login</h1>
        <div className="login-label">Email:</div>
        <input value={email} 
                onChange={function(e){
                    setEmail(e.target.value)
                }} 
                type="email"
                name="email"
                className="login-input">
        </input>
        <div className="login-label">Password:</div>
        <input value={password}
                onChange={function(e){
                    setPassword(e.target.value)
                }} 
                type="password" 
                name="password"
                className="login-input">
        </input>
        <button className="login-button" type="submit" value="Login">Continue..</button>
        <div className="login-or">OR</div>
        </form>
        
        </div>
    )
}
export default Login;