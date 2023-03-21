import Cookies from "universal-cookie";
import {useState, useRef, useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export default function EditClass(props){
    console.log("idex wlaaaa", props.index)
    const [data,setData]=useState({});
    const className=useRef();
    const floorNumber=useRef();
    const classColor=useRef();
    let inputColor="#"+data.color
    useEffect(() => {
        const cookies = new Cookies();
      const authToken = cookies.get("access_token");
        const config={
          headers:{Authorization: `Bearer ${authToken}`}
        }
        const URL=process.env.REACT_APP_BASE_URL;
        const abouzada =axios.get(`${URL}classes/${props.index}`,
         config,
        )
          .then(function (response) {
            console.log(response.data.message)
            setData(response.data.message[0])
           
          }, function(error){});
      },
      []);
      const submitClass=(e)=>{
        e.preventDefault()
      const cookies = new Cookies();
      const authToken = cookies.get("access_token");
        const config={
          headers:{Authorization: `Bearer ${authToken}`}
        }
        const URL=process.env.REACT_APP_BASE_URL;
        let newData={"_method":"patch"};
        if(className.current.value!=data.name){newData.name=className.current.value}
        if(classColor.current.value!=inputColor){newData.color=classColor.current.value}
        if(floorNumber.current.value!=data.floor){newData.floor=floorNumber.current.value}
        console.log(newData)
        const submit =axios.post(`${URL}classes/${props.index}`, newData,
         config
        )
          .then(function (response) {
           console.log(response);
            toast.success('Class Updated!', {
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
    <form onSubmit={submitClass}>
    <div className="dash-container container-col"><label>Class Name</label><input defaultValue={data.name} type="text" name="name" id="className"  placeholder="Class Name" ref={className}/></div>
    <div className="dash-container container-col"><label>Class Floor</label><input defaultValue={data.floor} type="number" name="name" id="classFloor" placeholder="Class Floor" ref={floorNumber}/></div>
    <div className="dash-container container-col"><label>Class Color</label><input defaultValue={inputColor} type="color" name="name" id="className" placeholder="Class Name" ref={classColor} /></div>
    <div className="dash-container container-row dash-form-btn"><button type="submit">Submit</button> <button type="reset">Reset</button>       <button className="cancel" onClick={props.cancel}>Cancel</button>
    </div>
    </form>
  </div></div>)
}