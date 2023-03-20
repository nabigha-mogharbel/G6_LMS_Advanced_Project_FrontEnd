import React, { useRef, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/loader";

export default function New_admin(props) {
  const adminName = useRef();
  const email = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false); // added loading state
  const submitAdmins = (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const URL = process.env.REACT_APP_BASE_URL;
    let data = {
      name: adminName.current.value,
      email: email.current.value,
      password: password.current.value,
      admin_id: 1,
    };
    const submit = axios.post(`${URL}register`, data, config).then(
      function (response) {
        console.log(response);
        setLoading(false); // set loading to false after API call is complete
        toast.success("Admin Added!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      },
      function (error) {
        console.log(error);
        setLoading(false); // set loading to false if API call fails
        toast.error("Error Occured. Please Try again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    );
  };
  return (
    <div className="new-class">
      <ToastContainer />
      {loading && <Loader />} {/* conditionally render Loader */}
      <form onSubmit={submitAdmins}>
        <div className="dash-container container-col">
          <label>admin Name</label>
          <input
            type="text"
            name="name"
            id="className"
            placeholder="admin Name"
            ref={adminName}
          />
        </div>
        <div className="dash-container container-col">
          <label>admin email</label>
          <input
            type="email"
            name="name"
            id="classFloor"
            placeholder="Email"
            ref={email}
          />
        </div>
        <div className="dash-container container-col">
          <label>admin password</label>
          <input
            type="password"
            name="name"
            id="className"
            placeholder="password"
            ref={password}
          />
        </div>
        <div className="dash-container container-row dash-form-btn">
          <button type="submit">Submit</button>{" "}
          <button type="reset">Reset</button>
          <button onClick={props.cancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
