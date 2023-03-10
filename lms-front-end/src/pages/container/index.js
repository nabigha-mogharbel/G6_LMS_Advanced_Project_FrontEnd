import { Outlet } from "react-router-dom";
import React, {useState} from "react";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import "./index.css"
export default function Container() {
  const [dimmed, setDimmed]=useState(false)
  const shaddowHandler=() => {
    setDimmed(!dimmed)
  }
  return (
    <div className="dashboard-wrapper">
      <Sidebar dimHandler={shaddowHandler}/>
      {dimmed&&<div style={{position:"absolute", zIndex:"9", width:"100vw", height:"100vh", backgroundColor:"rgba(0,0,0,0.25)"}}> </div>}
      <Outlet/>
    </div>
  );
}
