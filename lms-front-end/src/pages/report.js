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
const [filters,setFilters]=useState({withClass:false, class:"0", classes:[], sections:[], withSection:false, section:"0", data:[]})
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
    let URL=process.env.REACT_APP_BASE_URL+`attendance/class/1`;
    const cookies = new Cookies();
      const authToken = cookies.get("access_token");
      const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };
    const abouzada=axios.get(URL, config).then(
      function (response) {
        console.log("bb",response.data.Attendance)
        setFilters({...filters, withSection:true, section:event.target.value, data:response.data.Attendance});
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
  setFilters({...filters, withSection:true, section:event.target.value});}
}
  return (
    <div>
      <div className='report-controllers'>
        <label htmlFor='class'>Class</label>
        <select id="class" defaultValue={filters.class} onChange={classFilter}>
          <option value="0">----</option>
        {
          Object.keys(filters.classes).map(e => {return <option value={e} key={e}>{filters.classes[e]}</option>})

        }
        </select>
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
        {!filters.withClass&&<select id="section" disabled><option value="0">----</option></select>}
                
      </div>
  <table>
  <thead>
    <th>
      Student Id
    </th>
    <th>
      Student Name
    </th>
    <th>
      Present
    </th>
    <th>
      Late
    </th><th>
      Absent
    </th><th>
      Unknown
    </th>
  </thead>
  <tbody>
  {filters.data.map(e => {return <tr>
    <td>{e.student_id}</td>
    <td>{e.student_name}</td>
    <td>{e.present} {Number.parseFloat(e.avrP).toFixed(2)}%</td>
    <td>{e.absent}{Number.parseFloat(e.avrA).toFixed(2)}%</td>
    <td>{e.late} {Number.parseFloat(e.avrL).toFixed(2)}%</td>
  </tr>})}
  </tbody>
  </table>
    </div>
  )
}
