import React, { useState } from "react";
import "./register.css";

const Register = function () {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // register user event
  async function registerUser(event) {
      event.preventDefault();
    const response = await fetch("http://localhost:2000/auth/api/register", {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({name, email, password}),
      headers: {
        "Content-Type": "application/json",
      },
    });
   const data = await response.json();
   if (data.status === "ok") window.location.href = "./login";
  }

  // return function
  return (
    <div className="reg-box">
      <form className="reg-form" onSubmit={registerUser}>
        <h1 className="reg-head">Register Now!</h1>
        <div className="reg-label">Name:</div>
        <input
          value={name}
          onChange={function (e) {
            setName(e.target.value);
          }}
          type="text"
          name="name"
          className="reg-input"
        ></input>
        <div className="reg-label">Email:</div>
        <input
          value={email}
          onChange={function (e) {
            setEmail(e.target.value);
          }}
          type="email"
          name="email"
          className="reg-input"
        ></input>
        <div className="reg-label">Password:</div>
        <input
          value={password}
          onChange={function (e) {
            setPassword(e.target.value);
          }}
          type="password"
          name="password"
          className="reg-input"
        ></input>
        <button className="reg-button" type="submit" value="Register">
          Continue..
        </button>
        <div className="reg-or">OR</div>
        <hr></hr>
      </form>
    </div>
  );
};
export default Register;
