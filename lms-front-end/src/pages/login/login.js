import React, { useState, useRef } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "./login.css";
import image from "../../logggo.png";

export default function LoginPage() {
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  let email=useRef()
  let password=useRef();

  function handleSubmit(event) {
    event.preventDefault();
    let data={"email" : email.current.value, "password": password.current.value}
    console.log(data)
    axios.post("http://127.0.0.1:8000/api/auth/login", data)
      .then(response => {
        const cookies = new Cookies();
        cookies.set("access_token", response.data.access_token, { path: "/" });
        console.log("Token saved to cookie:", response.data.access_token);
        // redirect to the dashboard or the next page after successful login
      })
      .catch(error => {
        console.log("Error logging in:", error);
        // show error message to the user
      });
  }

  return (
    <div className="container">
      <div className="login-content">
        <div className="login-form">
          <div className="login-form-title">
            <h2>Welcome To My School</h2>
            <p>Discover what we can offer to you by logging in.</p>
          </div>
          <form className="login-form-content" onSubmit={handleSubmit}>
            <div className="login-form-email">
              <input type="email" id="email" placeholder="you@example.com"  ref={email} />
            </div>
            <div className="login-form-password">
              <input type="password" id="password" placeholder="Enter 6 Caracters or more" ref={password} />
            </div>
            <div className="login-form-button">
              <button>Login</button>
            </div>
          </form>
        </div>
        <div className="login-image">
          <img src={image} alt="Logo" />
        </div>
      </div>
    </div>
  );
}
