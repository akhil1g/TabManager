import React,{useState} from "react";
import './register.css'
import { useNavigate } from "react-router";

const Register=function()
{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    async function registerUser(event)
    {
        event.preventDefault();
        const response=await fetch('http://localhost:2000/api/register',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name,email,password}),
        });
        const data=await response.json();
        // if(data.status==='ok')
        // window.location.href="./login";

        // console.log(data);
        if(data.status==='ok')
        {
            navigate("/login");
        }
    }
    return (
        <div className="reg-box">
            <form className="reg-form" onSubmit={registerUser}>
            <span className="reg-head">Register Now!</span>
            <div className="reg-label">Name:</div>
            <input value={name} 
                    onChange={function(e){
                        setName(e.target.value)
                    }} 
                    type="text"
                    name="name"
                    className="reg-input">
            </input>
            <div className="reg-label">Email:</div>
            <input value={email} 
                    onChange={function(e){
                        setEmail(e.target.value)
                    }} 
                    type="email"
                    name="email"
                    className="reg-input">
            </input>
            <div className="reg-label">Password:</div>
            <input value={password}
                    onChange={function(e){
                        setPassword(e.target.value)
                    }} 
                    type="password" 
                    name="password"
                    className="reg-input">
            </input>
            <button className="reg-button" type="submit" value="Register">Continue..</button>
            <div className="reg-or">OR</div>
            <hr></hr>
            <div className="button-container">
            <button className="google-sign-up-button">
                Sign up with Google
            </button>
            </div>
            </form>
        </div>
    )
}
export default Register;