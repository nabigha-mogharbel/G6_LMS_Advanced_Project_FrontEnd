import Cookies from "universal-cookie";
import {useState, useRef, useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export default function EditClass(props){
    console.log("idex wlaaaa", props.index)
    const [data,setData]=useState({});
    const adminName=useRef();
    const email=useRef();
    const password=useRef();
  
    useEffect(() => {
        const cookies = new Cookies();
      const authToken = cookies.get("access_token");
        const config={
          headers:{Authorization: `Bearer ${authToken}`}
        }
        const URL=process.env.REACT_APP_BASE_URL;
        const abouzada =axios.get(`${URL}admins/${props.index}`,
         config,
        )
          .then(function (response) {
            console.log(response.data.message)
            setData(response.data.message[0])
           
          }, function(error){});
      },
      []);
      const submitAdmins=(e)=>{
        e.preventDefault()
      const cookies = new Cookies();
      const authToken = cookies.get("access_token");
        const config={
          headers:{Authorization: `Bearer ${authToken}`}
        }
        const URL=process.env.REACT_APP_BASE_URL;
        let newData={"_method":"patch"};
        if(adminName.current.value!=data.name){newData.name=adminName.current.value}
        if(email.current.value!=data.email){newData.email=email.current.value}
        if(password.current.value!=""){newData.password=password.current.value}
        
        console.log(newData)
        const submit =axios.post(`${URL}admins/${props.index}`, newData,
         config
        )
          .then(function (response) {
           console.log(response);
            toast.success('Admin Updated!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
              });
              window.location.reload();
           
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
    return(<div className="edit-class"><div className="new-class">
    <ToastContainer/>
    <form onSubmit={submitAdmins}>
    <div className="dash-container container-col"><label>admin Name</label><input defaultValue={data.name} type="text" name="name" id="className"  placeholder="admin Name" ref={adminName}/></div>
    <div className="dash-container container-col"><label>admin email</label><input defaultValue={data.email} type="email" name="name" id="classFloor" placeholder="email" ref={email}/></div>
    <div className="dash-container container-col"><label>admin password</label><input defaultValue={data.password} type="password" name="name" id="className" placeholder="password" ref={password} /></div>
    <div className="dash-container container-row dash-form-btn"><button type="submit">Submit</button> <button type="reset">Reset</button>       <button className="cancel" onClick={props.cancel}> Cancel</button>
    </div>
    </form>
  </div>
  {/* <button onClick={props.cancel}> Cancel</button> */}
  </div>
  )
}