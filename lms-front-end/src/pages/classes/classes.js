import React, { useEffect , useState} from 'react';
import axios from "axios";
import './classes.css';
export default function Classes() {
  let Response= [];
  const [data,setData]=useState([])
  useEffect(() => {
    const config={
      headers:{Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2Nzg1NjM1NDMsImV4cCI6MTY3ODU2NzE0MywibmJmIjoxNjc4NTYzNTQzLCJqdGkiOiJkazFpbkhYcVhURHFxRllVIiwic3ViIjoiMyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.bJAvDocaLb0pNyGGN5KO2_17tvqCVMkJkov6hnkwl2E'}
    }
    const abouzada =axios.get('http://localhost:8000/api/auth/classes',
     config,
    )
      .then(function (response) {
        setData(response.data.message.data)
       
      }); 
  },
  []);


 
  
  return (
    <div className='wrapp'>
      <section className='hero'> 
      <table className='classses-tabel'>
        <thead>
        <tr className='Classes-tr'>
          <th className='Classes-th'>#</th>
          <th className='Classes-th'>Class Title</th>
          <th className='Classes-th'>Floor number</th>
          
        </tr>
        </thead>
      <tbody>
        {console.log(data)}
        {data.map(e=>{
       
       
          return (
          <tr className='Classes-tr gray' key={e.id} >
          <td className='Classes-td'>{e.id}</td>
          <td className='Classes-td'>{e.name}</td>
          <td className='Classes-td'>{e.floor}</td>
        </tr>  
        )})}
      </tbody>
       
      </table>
      </section>
    </div>
  )
  }

