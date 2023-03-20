import React, {useRef} from "react";
import axios from "axios";
import Cookies from "universal-cookie"
import { ToastContainer, toast } from 'react-toastify';
export default function NewSection(props) {
  const sectionNAme=useRef();
  const Capacity=useRef();
  const class_id=useRef()
  const submitClass=(e)=>{
    e.preventDefault()
  const cookies = new Cookies();
  const authToken = cookies.get("access_token");
    const config={
      headers:{Authorization: `Bearer ${authToken}`}
    }
    const URL=process.env.REACT_APP_BASE_URL;
    let data={"name": sectionNAme.current.value,
    "capacity":Capacity.current.value,
    "class_id":class_id.current.value,
  }
    const submit =axios.post(`${URL}sections`,data,
     config
    )
      .then(function (response) {
       console.log(response);
        toast.success('Section Added!', {
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
        console.log(error);
        toast.error('Error Occured. Please Try again', {
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
      <div className="dash-container container-col"><label>SectionName</label><input type="text" name="name" id="className" placeholder="sectionName" ref={sectionNAme}/></div>
      <div className="dash-container container-col"><label>Capacity</label><input type="number" name="name" id="classFloor" placeholder="Capacity" ref={Capacity}/></div>
      <div className="dash-container container-col"><label>Class_id</label><input type="number" name="name" id="classFloor" placeholder="class_id" ref={class_id}/></div>
      <div className="dash-container container-row dash-form-btn"><button type="submit">Submit</button> <button type="reset">Reset</button>       <button className="cancel" onClick={props.cancel}>Cancel</button>
      </div>
      </form>
    </div>
  );
}
