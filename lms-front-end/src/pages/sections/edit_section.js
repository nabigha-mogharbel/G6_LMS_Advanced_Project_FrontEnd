import Cookies from "universal-cookie";
import {useState, useRef, useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export default function EditSection(props){
    console.log("idex wlaaaa", props.index)
    const [data,setData]=useState({});
    const sectionName=useRef();
    const capacity=useRef();
    const class_id=useRef();
   
    useEffect(() => {
        const cookies = new Cookies();
      const authToken = cookies.get("access_token");
        const config={
          headers:{Authorization: `Bearer ${authToken}`}
        }
        const URL=process.env.REACT_APP_BASE_URL;
        const abouzada =axios.get(`${URL}sections/${props.index}`,
         config,
        )
          .then(function (response) {
            console.log(response.data.message)
            setData(response.data.message[0])
          }, function(error){});
      },
      []);
      const submitSection=(e)=>{
        e.preventDefault()
      const cookies = new Cookies();
      const authToken = cookies.get("access_token");
        const config={
          headers:{Authorization: `Bearer ${authToken}`}
        }
        const URL=process.env.REACT_APP_BASE_URL;
        let newData={"_method":"patch"};
        if(sectionName.current.value!=data.name){newData.name=sectionName.current.value}
        if(capacity.current.value!=data.capacity){newData.capacity=capacity.current.value}
        if(class_id.current.value!=data.class_id){newData.classid=class_id.current.value}
        console.log(newData)
        const submit =axios.post(`${URL}sections/${props.index}`, newData,
         config
        )
          .then(function (response) {
           console.log(response);
            toast.success('Section Updated!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
              });
              //window.location.reload();
           
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
            });});
        }
    return(<div className="edit-section"><div className="new-section">
    <ToastContainer/>
    <form onSubmit={submitSection}>
    <div className="dash-container container-col"><label>Section Name</label><input defaultValue={data.name} type="text" name="name" id="className"  placeholder="Section Name" ref={sectionName}/></div>
    <div className="dash-container container-col"><label>Capacity </label><input defaultValue={data.capacity} type="number" name="name" id="classFloor" placeholder="Capacity" ref={capacity}/></div>
    <div className="dash-container container-col"><label>Class_id </label><input defaultValue={data.class_id} type="number" name="name" id="classFloor" placeholder="Class_id" ref={class_id}/></div>
   
    <div className="dash-container container-row dash-form-btn"><button type="submit">Submit</button> <button type="reset">Reset</button>       <button onClick={props.cancel}>Cancel</button>
    </div>
    </form>
  </div><button onClick={props.cancel}> Cancel</button></div>)
}