import React, { useRef, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
export default function NewStudent(props) {
  const FirstName = useRef();
  const LastName = useRef();
  const email = useRef();
  const phonenumber = useRef();
// const [profile,setProfile] = useState(false);
//   const handleOpenProfile= ()=>{ setProfile(!profile)}
  const submitStudent = (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    const URL = process.env.REACT_APP_BASE_URL;
    let data = {
      'first_name': FirstName.current.value,
      'last_name': LastName.current.value,
      'email': email.current.value,
      'phone_number': phonenumber.current.value,
    };
    {console.log(data);}
    const submit = axios.post(`${URL}students`, data, config).then(
      function (response) {
        console.log(response);
        toast.success("Student Added!", {
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
    <div className="new-student">
      <ToastContainer />
      <form onSubmit={submitStudent}>
        <div className="dash-container container-col">
          <label>First_name</label>
          <input
            type="text"
            name="name"
            id="studentName"
            placeholder="First_Name"
            ref={FirstName}
          />
        </div>
        <div className="dash-container container-col">
          <label>Last_name</label>
          <input
            type="text"
            name="name"
            id="studentName"
            placeholder="Last_Name"
            ref={LastName}
          />
        </div>
        <div className="dash-container container-col">
          <label>Student email</label>
          <input
            type="email"
            name="name"
            id="studentFloor"
            placeholder="youremail@gmail.com"
            ref={email}
          />
</div>{" "}
        <div className="dash-container container-col">
          <label>Phone Number</label>
          <input
            type="number"
            name="name"
            id="studentFloor"
            placeholder="+961 06 123456"
            ref={phonenumber}
          />
        </div>
        {/* <div className="dash-container container-col">
          <label>Picture</label>
          <input
            type="number"
            name="file"
            id="studentFloor"
            // placeholder="+961 06 123456"
            ref={phonenumber}
          />
        </div> */}
        <div className="dash-container container-row dash-form-btn">
          <button type="submit">Submit</button>{" "}
          <button type="reset">Reset</button>{" "}
          <button onClick={props.cancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}