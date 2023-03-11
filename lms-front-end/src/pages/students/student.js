import React, { useRef } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export default function Students() {
  let first_Name = useRef();
  let last_Name = useRef();
  let email = useRef();
  let password = useRef();
  let picture = useRef();

  function handleRequest(e) {
    e.preventDefault();
    let data = {
      first_Name: first_Name.current.value,
      last_Name: last_Name.current.value,
      email: email.current.value,
      password: password.current.value,
      // picture: last_Name.current.value,
    };
    console.log(data.first_Name);
    axios
      .post("http://127.0.0.1:8000/api/students", data)
      .then((response) => {
        const cookies = new Cookies();
        cookies.set("access_token", response.data.access_token, { path: "/" });
        console.log("Token saved to cookie:", response.data.access_token);
        // redirect to the dashboard or the next page after successful login
      })
      .catch((error) => {
        console.log("Error logging in:", error);
        // show error message to the user
      });
  }

  return (
    <div className="container">
      <div className="student-content">
        <div className="student-form">
          <div className="student-form-title">
            <h2>Welcome to the student page</h2>
          </div>
          <form className="student-form-content" onSubmit={handleRequest}>
            <div className="student-form-first-name">
              <input
                type="first-name"
                id="first-name"
                placeholder="first-Name"
                ref={first_Name}
              />
              <input
                type="last_Name"
                id="last_Name"
                placeholder="last_Name"
                ref={last_Name}
              />
              <input type="email" id="email" placeholder="email" ref={email} />
              <input
                type="password"
                id="password"
                placeholder="password"
                ref={password}
              />
              {/* <label for="photo">Upload your photo:</label>
                <input type="file" id="photo" name="photo"> */}
              <div className="login-form-button">
                <button>Login</button>
              </div>
            </div>
          </form>

          {/* <div className="login-image">
                  <img src={image} alt="Logo" />
                </div> */}
        </div>
      </div>
    </div>
  );
}
