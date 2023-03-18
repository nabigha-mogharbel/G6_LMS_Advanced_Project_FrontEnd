import React from 'react'
import axios from "axios";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
export default function Attendance() {
 //url /attendance/one-date/{date}
 const [bool,setBool]=React.useState(false);
 const [data,setData]=React.useState({date:"0000-00-00", attendanceRec:[], sections:[], classes:[], classFilter:"", sectionFilter:""})
 const attenStatus=React.useRef();
 React.useEffect(()=>{
  let dateObj=new Date();
  let date=dateObj.toISOString().split('T')[0];
  let URLAt=process.env.REACT_APP_BASE_URL+`attendance/one-date/${date}`;
  const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
  const abouzada=axios.get(URLAt, config).then(
    function (response) {
      if(response.data.Attendance.length===0){
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
        setData({...data, date:date,attendanceRec:response.data.Attendance, sections:response.data.section_filters, classes:response.data.class_filters})
      }
    },
    function (error) {
      if(error.response.status===401){
        window.location.assign("/login");
      }
    }
  )
},[bool])
function createNewRecord(){
  let dateObj=new Date();
  let date=dateObj.toISOString().split('T')[0];
  let URL=process.env.REACT_APP_BASE_URL+`attendance/generate/${date}`;
  const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
  const abouzada=axios.get(URL, config).then(
    function (response) {
      setBool(!bool);
},
    function (error) {
      ;
    }
  )
  
}
function editRecord(id, status){
  let URL=process.env.REACT_APP_BASE_URL+`attendance/update/${id}`;
  const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    let req={"status":status.target.value,"_method":"patch"}
    const abouzada=axios.post(URL, req, config).then(
      function(response){
      }
    )
}
function filterByClass(e){
  if(e.target.value==="null"){setBool(!bool)}
  else{
  let dateObj=new Date();
  let date=dateObj.toISOString().split('T')[0];
  let URL=process.env.REACT_APP_BASE_URL+`attendance/class/${e.target.value}/start-date/${date}/end-date/${date}`;
  const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const filtered=axios.get(URL,config).then(
      function(response){
        setData({...data, attendanceRec:response.data.Attendance, classFilter:e.target.value})
      }
    )}
}
function filterBySection(e){
  if(e.target.value==="null"){setBool(!bool)}
  else{
  let dateObj=new Date();
  let date=dateObj.toISOString().split('T')[0];
  let URL=process.env.REACT_APP_BASE_URL+`attendance/section/${e.target.value}/start-date/${date}/end-date/${date}`;
  const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const filtered=axios.get(URL,config).then(
      function(response){
        setData({...data, attendanceRec:response.data.Attendance, classFilter:"null", sectionFilter:e.target.value})
      }
    )}
}
 return (
    <div><ToastContainer/>
        <div className="table-wrapper">
        <div className="table-controllers dash-container container-row-to-col">
          <div className="dash-container container-col">
            <label htmlFor="class">Search</label>
            <input
              type="text"
              placeholder="Class Name"
              name="class"
              id="search"
            />
          </div>
          <div className="dash-container container-col">
            <label htmlFor="class-filter">Class</label>
            <select  id="class-filter" defaultValue={data.classFilter} onChange={event => filterByClass(event)}>
              <option value="null">---</option>
              {data.classes.map(e => {return <option  key={e.id}value={e.id}>{e.name}</option>})}
            </select>
            <label htmlFor="section-filter">Section</label>
            <select  id="section-filter" defaultValue={data.sectionFilter} onChange={event => filterBySection(event)}>
              <option value="null">---</option>
              {data.sections.map(e => {return <option key={e.id}value={e.id}> {e.class.name} - {e.name}</option>})}
            </select>
          </div>
        </div>
        <div className="dash-container-scroll">
          <table className="table">
            <thead>
              <tr className="Classes-tr">
                <th
                  className="Classes-th"
                >
                  Student
                </th>
                <th
                  className="Classes-th"
                >
                  Section
                </th>
                <th
                  className="Classes-th"
                >
                  Status
                </th>
                <th className="Classes-th"></th>
              </tr>
            </thead>
            <tbody>
              {data.attendanceRec.map((e) => {
                let index = e.id;
                return (
                  <tr className="Classes-tr gray" key={e.id}>
                    <td className="Classes-td">{e.student.first_name} {e.student.last_name}</td>
                    <td
                      className="Classes-td"
                    >
                      <a>{e.section.name}</a>
                    </td>
                    <td className="Classes-td"> <select defaultValue={e.status} ref={attenStatus}  onChange={event => editRecord(e.id, event)}> 
                    <option value="null"></option> 
                    <option value="present">present</option>
                    <option value="late">late</option>
                    <option value="absent">absent</option>
                    </select></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
          </div>
    </div>
  )
}