import React, {useState} from "react";
import "./dashboard.css"
import Cookies from "universal-cookie";
import Card from "../../components/Card/Card"
import Chart from 'chart.js/auto';
import { Bar,getDatasetAtEvent } from "react-chartjs-2";
import axios from "axios"
function Dashboard() {
  const [data,setData]=useState([])
  React.useEffect(()=>{
  let dateObj=new Date();
  let date=dateObj.toISOString().split('T')[0];
  let URL=process.env.REACT_APP_BASE_URL+`dashboard/${date}`;
  const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
  const abouzada=axios.get(URL, config).then(
    function (response) {
      console.log(response.data)
      setData(response.data);
    },
    function (error) {
      if(error.response.status===401){
        window.location.assign("/login");
      }
    }
  )
},[])
let chartElement=React.useRef();
  function todayDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day=date.getDay();
    let dayDate=date.getDate();
    switch (month) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
        default:
            month="month"
    }
    switch(day){
        case 1:
            day = "Monday";
            break;
          case 2:
            day = "Tuesday";
            break;
          case 3:
            day = "Wednesday";
            break;
          case 4:
            day = "Thursday";
            break;
          case 5:
            day = "Friday";
            break;
          case 6:
            day = "Saturday";
            break;
          case 0:
            day = "Sunday";
            break;
            default:
                day="day"
    }
    let string = day + ", "  +" "+ dayDate+ " "+ month +" " + year;
    return string;
  }
  return (<div className="dashboard">
    <h1>{todayDate()}</h1>
    <div className="card-wrapper">
    <Card color="#FFA600" title={data.absent +" are absent"}/>
    <Card color="#579BE4" title={data.late +" are late"}/>
    <Card color="#c4c4c4"title={data.null + " students are waiting"}/>
    </div>
    {data.chart&&<DashChart style={{height:"100px"}} chart={data.chart} filtered={data.filtered}/>}
    </div>
    );
}

export default Dashboard;

function DashChart(props){
  const [data, setdata]=useState({
    chart:props.chart, filtered:props.filtered, index:null
  })
  const [option,setOption]=useState({
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 0,
        to: 1000,
        loop: false
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },})

  let chartRef=React.useRef()
  const onClick = (event) => {
    console.log(getDatasetAtEvent(chartRef.current, event)[0]);

  }
  return(<div style={{height:"40%"}}>
<Bar
  datasetIdKey='id'
  data={data.chart}
  options={option}
  ref={chartRef}
  onClick={onClick}
/>
  </div>)
}