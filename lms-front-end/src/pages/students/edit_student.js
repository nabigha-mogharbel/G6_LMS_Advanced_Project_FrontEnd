import Cookies from "universal-cookie";
import {useState, useRef, useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export default function EditStudent(props){
    console.log("idex wlaaaa", props.index)
    const [data,setData]=useState({});
    const FirstName=useRef();
    const LastName=useRef();
    const email=useRef();
    const phonenumber=useRef();
   
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
        if(FirstName.current.value!=data.name){newData.name=FirstName.current.value}
        if(LastName.current.value!=data.name){newData.name=LastName.current.value}
        if(email.current.value!=data.email){newData.email=email.current.value}
        if(phonenumber.current.value!=data.phonenumber){newData.classid=phonenumber.current.value}
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
    <div className="dash-container container-col"><label>FirstName</label><input defaultValue={data.name} type="text" name="name" id="className"  placeholder="FirstName" ref={FirstName}/></div>
    <div className="dash-container container-col"><label>LastName</label><input defaultValue={data.name} type="text" name="name" id="className"  placeholder="LastName" ref={LastName}/></div>
    <div className="dash-container container-col"><label>email </label><input defaultValue={data.email} type="email" name="name" id="classFloor" placeholder="youremail@gmail.com" ref={email}/></div>
    <div className="dash-container container-col"><label>phonenumber </label><input defaultValue={data.phonenumber} type="number" name="name" id="classFloor" placeholder="+961 03 123 456" ref={phonenumber}/></div>
   
    <div className="dash-container container-row dash-form-btn"><button type="submit">Submit</button> <button type="reset">Reset</button>       <button onClick={props.cancel}>Cancel</button>
    </div>
    </form>
  </div><button onClick={props.cancel}> Cancel</button></div>)
}