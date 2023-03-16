import React from 'react'
import axios from "axios";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
export default function Attendance() {
 //url /attendance/one-date/{date}
 const [data,setData]=React.useState({date:"0000-00-00", attendanceRec:[]})
 React.useEffect(()=>{
  let dateObj=new Date();
  let date=dateObj.toISOString().split('T')[0];
  let URL=process.env.REACT_APP_BASE_URL+`attendance/one-date/2023-03-11`;
  const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
  const abouzada=axios.get(URL, config).then(
    function (response) {
      console.log(response)
      if(response.data.Atendance.length===0){
        toast.success('No attendance for this day, we will create new record', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          })
          createNewRecord()
      }
      else{
        console.log("yay data")
      }
    },
    function (error) {
      window.location.assign("/login");
    }
  )
  
},[])
function createNewRecord(){
  let dateObj=new Date();
  let date=dateObj.toISOString().split('T')[0];
  let URL=process.env.REACT_APP_BASE_URL+`attendance/generate/2023-03-11`;
  const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
  const abouzada=axios.get(URL, config).then(
    function (response) {
      setData({date:date, attendanceRec:response.data.Atendance})
      console.log(response)},
    function (error) {
      ;
    }
  )
  
}
 return (
    <div><ToastContainer/></div>
  )
}
