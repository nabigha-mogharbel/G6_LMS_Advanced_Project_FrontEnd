import React, {useRef} from "react";
import axios from "axios";
import Cookies from "universal-cookie"
import { ToastContainer, toast } from 'react-toastify';
export default function NewClass(props) {
  const className=useRef();
  const floorNumber=useRef();
  const classColor=useRef()
  const submitClass=(e)=>{
    e.preventDefault()
  const cookies = new Cookies();
  const authToken = cookies.get("access_token");
    const config={
      headers:{Authorization: `Bearer ${authToken}`}
    }
    const URL=process.env.REACT_APP_BASE_URL;
    let data={"name": className.current.value,
    "floor":floorNumber.current.value,
    "color":classColor.current.value
  }
    const submit =axios.post(`${URL}classes`, data,
     config
    )
      .then(function (response) {
        toast.success('Class Added!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          });
       
      }, function(error){
        toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });});}
  return (
    <div className="new-class">
      <ToastContainer/>
      <form onSubmit={submitClass}>
      <div className="dash-container container-col"><label>Class Name</label><input type="text" name="name" id="className" placeholder="Class Name" ref={className}/></div>
      <div className="dash-container container-col"><label>Class Floor</label><input type="number" name="name" id="classFloor" placeholder="Class Floor" ref={floorNumber}/></div>
      <div className="dash-container container-col"><label>Class Color</label><input type="color" name="name" id="className" placeholder="Class Name" ref={classColor} /></div>
      <div className="dash-container container-row dash-form-btn"><button type="submit" className="add_button">Submit</button> <button type="reset">Reset</button>       <button className="cancel" onClick={props.cancel}>Cancel</button>
      </div>
      </form>
    </div>
  );
}
