import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";
import "./report.css";

export default function ReportGenerator() {
  const [students, setStudents] = useState([{"id":1,"name":"dummy"}]);
  const [sections, setSections] = useState([{"id":1,"name":"dummy"}]);
  const [classes, setClasses] = useState([{"id":1,"first_name":"dummy", "last_name":"dummy"}]);
  const [data, setData] = useState([]);
  let studentName  =useRef()
  let className =useRef();
  let sectionName =useRef()
  let startDate =useRef();
  let endDate =useRef();
  function handleGenerateReport(event){
    event.preventDefault();

    let data={"studentName" : studentName.current.value, "className": className.current.value,"sectionName": sectionName.current.value,"startDate": startDate.current.value,"endDate": endDate.current.value}
    console.log(data)
    axios.post("http://127.0.0.1:8000/api/auth/report", data)
      .then(response => {
        const cookies = new Cookies();
        cookies.set("access_token", response.data.access_token, { path: "/" });
        window.location.assign("/dashboard")
        //console.log("Token saved to cookie:", response.data.access_token);
        // redirect to the dashboard or the next page after successful login
      })
      .catch(error => {
        console.log("Error report:", error);
        // show error message to the user
      });
  }
  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const URL=process.env.REACT_APP_BASE_URL;
    axios.get(`${URL}students`, config)
      .then(response => {
        setStudents(response.data.message.data);
      })
      .catch(error => {
        console.log(error);
      });
      axios.get(`${URL}sections`, config)
      .then(response => {
        setSections(response.data.message.data);
      })
      .catch(error => {
        console.log(error);
      });
      axios.get(`${URL}classes`, config)
      .then(response => {
        setClasses(response.data.message.data);
      })
      .catch(error => {
        console.log(error);
      });
      
  }, []);

  return (
    <div>
      <h1>Report Generator</h1>
      <div className='report-wrapper'> 
     <div className="report-container">
       <div className="form-container" onSubmit={handleGenerateReport}>
       <select defaultValue="">
    {classes.map(classe => (
      <option key={classe.id} value={classe.id}>{classe.name}</option>
    ))}
  </select>
      <select defaultValue="">
        {students.map(student => (
      <option key={student.id} value={student.id}>{student.name}</option>
    ))}
  </select>
  <select defaultValue="">
    {sections.map(section => (
      <option key={section.id} value={section.id}>{section.name}</option>
    ))}
  </select>

             </div>
             </div>
     <div className="Date">    
       <div className="startdate">
       <label >Start Date</label><br/>
      
       <input type="date" id="startdate" name="Date"></input>

      </div>   
      <div className="enddate">
       <label >End Date</label><br/>
      
       <input type="date" id="enddate" name="Date"></input>
    

      </div>
      <div className="submit">
               <button>Generate</button>
             </div>
      </div>
      </div>
      </div>
  );
}


