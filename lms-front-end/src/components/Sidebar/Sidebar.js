import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import logo from "../../logo2.svg"
import menu from "../../Expand_right_double.svg"
import close from "../../close.svg"
import menu2 from "../../menu2.svg"
import "./Sidebar.css";
import image from "../../classes.png";
import image2 from "../../student2.svg";
import image1 from "../../section2.svg";
import admin from "../../admin.png";
function Sidebar(props) {
    const isSuper=true;
    let sidebar=useRef();
    let tab1=useRef();
    let tab2=useRef();let tab3=useRef();let tab4=useRef();
    const [isVisible, setVisible]=useState(false)
    function hoverHandler(element, swicther){
        if(swicther==="on"){
            element.current.className="tab tab_active";
            element.current.children[0].className="link link_active"
        }else if(swicther==="off"){
            element.current.className="tab";
            element.current.children[0].className="link"
        }
    }
    function sidebarToggler(){
        if(sidebar.current.className==="sidebar"){sidebar.current.className="sidebar sidebar_full"; props.dimHandler()}
        else if(sidebar.current.className==="sidebar sidebar_full"){
            sidebar.current.className="sidebar"}
            setVisible(!isVisible);
            props.dimHandler()
    }
    return ( <div className="sidebar" ref={sidebar}> 
    <div><img src={logo} id="logo" width="150px"/> {!isVisible&& <img className='toggler' onClick={sidebarToggler} src={menu2} width="20px"/>}{isVisible&& <img className='toggler' onClick={sidebarToggler} src={close} width="20px"/>}</div>
    <div>
        <div className="tab" ref={tab1} onMouseEnter={e => hoverHandler(tab1,"on")} onMouseLeave={e => hoverHandler(tab1,"off")}><Link to="/dashboard/classes" className="link"> 
        <div className="tab-image">
      <img src={image} alt="Classes" />
    </div>Classes</Link></div>
        <div className="tab" ref={tab2} onMouseEnter={e => hoverHandler(tab2,"on")} onMouseLeave={e => hoverHandler(tab2,"off")}> <Link to="/dashboard/sections" className="link"> 
        <div className="tab-image">
      <img src={image1} alt="Classes" />
    </div>Sections</Link></div>
        <div className="tab" ref={tab3} onMouseEnter={e => hoverHandler(tab3,"on")} onMouseLeave={e => hoverHandler(tab3,"off")}><Link to="/dashboard/students" className="link"> 
        <div className="tab-image">
      <img src={image2} alt="Classes" />
    </div>Students</Link></div>
    </div>
    {isSuper&& <> <hr/>
    <div className="tab" ref={tab4} onMouseEnter={e => hoverHandler(tab4,"on")} onMouseLeave={e=>hoverHandler(tab4,"off")}><Link to="/dashboard/admins" className="link"> 
    <div className="tab-image">
      <img src={admin} alt="Classes" />
    </div> Admins</Link></div>
    </>
}
    </div> );
}

export default Sidebar;