import React, {useState} from "react";
import "./dashboard.css"
import Card from "../../components/Card/Card"
function Dashboard() {
  function todayDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day=date.getDay()
    console.log(day);
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
          case 7:
            day = "Sunday";
            break;
            default:
                day="day"
    }
    let string = day + ", "  +" "+ month +" " + year;
    return string;
  }
  return (<div className="dashboard">
    <h1>{todayDate()}</h1>
    <div className="card-wrapper">
    <Card color="#8A70D6" title="3 students are late"/>
    <Card color="#579BE4" title="3 students are late"/>
    <Card color="#FFA600"title="2 students are absent"/>
    </div>
    
    </div>
    );
}

export default Dashboard;
