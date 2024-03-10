import React,{useState} from "react";
import './register.css'
import { useNavigate } from "react-router";


const Register=function()
{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
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
        // console.log(data);
        if(data.status==='ok')
        {
          navigate("/login");
        }
    }
    return (
      <div>
        <div className="outer-container-register">
          <div className="container-register">
            <form onSubmit={registerUser}>
              <h1 className="reg-heading">Register</h1>
              <div className="sub-register">
                <label className="label-register">Name : </label>
                <input
                  value={name}
                  onChange={function (e) {
                    setName(e.target.value);
                  }}
                  type="text"
                  placeholder="Name"
                  name="name"
                ></input>
              </div>
              <div className="sub">
                <label className="label-register">Email : </label>
                <input
                  value={email}
                  onChange={function (e) {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  placeholder="Email"
                  name="email"
                ></input>
              </div>
              <div className="sub">
                <label className="label-register">Password : </label>
                <input
                  value={password}
                  onChange={function (e) {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  placeholder="*****"
                  name="password"
                ></input>
              </div>
              <div className="button-conatiner">
                <input
                  type="submit"
                  value="Register"
                  className="button"
                ></input>
              </div>
              <hr></hr>
              <div className="button-container">
                <button className="google-sign-up-button">
                  Sign up with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}
export default Register;