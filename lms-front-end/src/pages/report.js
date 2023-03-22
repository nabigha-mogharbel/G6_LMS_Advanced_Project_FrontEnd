import React, {useState}from 'react'
import Chart from "chart.js";
import axios from "axios"
import Cookies from "universal-cookie";
export default function Repport() {
  const [data,setData]=React.useState({
    "classes": {
        "1": "Grade 9",
        "2": "Grade 8",
        "3": "Grade 7"
    },
    "sections": {
        "1#1": {
            "name": "C",
            "class_id": 1
        },
        "2#1": {
            "name": "A",
            "class_id": 1
        },
        "3#1": {
            "name": "B",
            "class_id": 1
        }
    }
})
const [filters,setFilters]=useState({withClass:false, class:"0", classes:[], sections:[], withSection:false, section:"0", stuData:[], stats:[]})
  React.useEffect(()=>{
    let URL=process.env.REACT_APP_BASE_URL+`reportlists`;
  const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
  const abouzada=axios.get(URL, config).then(
    function (response) {
      console.log("bb",response)
      setFilters({...filters, classes:response.data.classes, sections:response.data.sections});
    },
    function (error) {
      if(error.response.status===401){
        window.location.assign("/login");
      }
    }
  )
  },[])
  const classFilter=(event)=>{
    if(event.target.value==0){    
      console.log("batata")
      setFilters({...filters, withClass:false, class:"0"});
  }
  else{
    let URL=process.env.REACT_APP_BASE_URL+`attendance/report/class/${event.target.value}`;
    const cookies = new Cookies();
      const authToken = cookies.get("access_token");
      const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };
    const abouzada=axios.get(URL, config).then(
      function (response) {
        console.log("bb",response.data.total)
        setFilters({...filters, withSection:true, section:event.target.value, class:event.target.value,stuData:response.data.Attendance, stats:response.data.total});
      },
      function (error) {
        if(error.response.status===401){
          window.location.assign("/login");
        }
      }
    )
  }
 }
 const sectionFilter=(event)=>{
  if(event.target.value==0){    
    console.log("batata")
    setFilters({...filters, withSection:false, section:"0"});
}
else{
  //setFilters({...filters, withSection:true, section:event.target.value});}
}}
  return (
    <div className="dashboard">
            <h1>Reports</h1>
      <hr className="title-hr"/>
      <div className="table-wrapper">
      <div className='table-controllers dash-container container-row-to-col'>
      <div className="dash-container container-col">
        <label htmlFor='class'>Class</label>
        <select id="class" defaultValue={filters.class} onChange={classFilter}>
          <option value="0">----</option>
        {
          Object.keys(filters.classes).map(e => {return <option value={e} key={e}>{filters.classes[e]}</option>})

        }
        </select>
        </div>
        <div className="dash-container container-col">
        <label htmlFor='section'>Section</label>
       {filters.withClass &&<select id="section" defaultValue={filters.section} onChange={sectionFilter}>
        <option value="0">----</option>
        {          Object.keys(filters.sections).map(e => {
                      console.log(filters.sections[e].class_id)
          if(filters.sections[e].class_id==filters.class){
            let index=e.split("#")[0]
          return <option value={index} key={e} >{filters.sections[e].name}</option>}})
}
        </select>}
        {!filters.withClass&&<select id="section" disabled><option value="0">----</option></select>}</div>
                
      </div>
      <div className='dash-container-scroll'>
  <table className='table'>
  <thead>
    <tr className="Classes-tr">
    <th className="Classes-th">
      Student Id
    </th>
    <th className="Classes-th">
      Student Name
    </th>
    <th className="Classes-th">
      Present
    </th>
    <th className="Classes-th">
      Late
    </th><th className="Classes-th">
      Absent
    </th><th className="Classes-th">
      Unknown
    </th>
    </tr>
  </thead>
  <tbody>
  {filters.stuData.map(e => {return <tr className="Classes-tr" key={e.student_id}>
    <td className="Classes-td">{e.student_id}</td>
    <td className="Classes-td">{e.student_name}</td>
    <td className="Classes-td">{e.present}{`   (${Number.parseFloat(e.avrP*100).toFixed(1)} %)`}</td>
    <td className="Classes-td">{e.absent}{`  (${Number.parseFloat(e.avrA*100).toFixed(1)} %)`}</td>
    <td className="Classes-td">{e.late}  {`  (${Number.parseFloat(e.avrL*100).toFixed(1)} %)`}</td>
    <td className="Classes-td">{e.null} {`  (${Number.parseFloat(e.avrN*100).toFixed(1)} %)`}</td>
  </tr>})}
  {filters.stats.map(e => {return <tr key={e.section_id}>
    <td>{}</td>
    <td>{filters.sections[`${e.section_id}`].name}</td>
    <td>{Number.parseFloat(e.null).toFixed(1)}</td>
    <td>{Number.parseFloat(e.absent).toFixed(1)}</td>
    <td>{Number.parseFloat(e.late).toFixed(1)}</td>
    <td>{Number.parseFloat(e.null).toFixed(1)}</td>
  </tr>})}
  </tbody>
  </table>
  </div>
  </div>
    </div>
  )
}
