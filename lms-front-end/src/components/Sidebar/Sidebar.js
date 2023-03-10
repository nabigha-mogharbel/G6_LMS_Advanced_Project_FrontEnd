import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import logo from "../../logo2.svg"
import menu from "../../Expand_right_double.svg"
import close from "../../close.svg"
import menu2 from "../../menu2.svg"
import "./Sidebar.css";
function Sidebar(props) {
    const isSuper=true;
    let sidebar=useRef();
    const [isVisible, setVisible]=useState(false)
    function hoverHandler(event, swicther){
       // console.log(event.target.classList)
        /*if(event.target.className==="tab tab_active"){
            event.target.className="tab";
            console.log(event.target.children)
            event.target.children[0].className="link"
        }
        else if(event.target.className==="tab"){
            event.target.className="tab tab_active";
            event.target.children[0].className="link link_active"
        }*/
        if(swicther==="on"){
            event.target.className="tab tab_active";
            event.target.children[0].className="link link_active"
        }else if(swicther==="off"){
            event.target.className="tab";
            //console.log(event.target.children)
            event.target.children[0].className="link"
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
    <div><img src={logo} id="logo" width="100px"/> {!isVisible&& <img className='toggler' onClick={sidebarToggler} src={menu2} width="20px"/>}{isVisible&& <img className='toggler' onClick={sidebarToggler} src={close} width="20px"/>}</div>
    <div>
        <div className="tab" onMouseEnter={e => hoverHandler(e,"on")} onMouseLeave={e => hoverHandler(e,"off")}><Link to="/dashboard/classes" className="link"> Classes</Link></div>
        <div className="tab" onMouseEnter={e => hoverHandler(e,"on")} onMouseLeave={e => hoverHandler(e,"off")}> <Link to="/dashboard/sections" className="link"> Sections</Link></div>
        <div className="tab" onMouseEnter={e => hoverHandler(e,"on")} onMouseLeave={e => hoverHandler(e,"off")}><Link to="/dashboard/students" className="link"> Students</Link></div>
    </div>
    {isSuper&& <> <hr/>
    <div className="tab" onMouseEnter={e => hoverHandler(e,"on")} onMouseLeave={e=>hoverHandler(e,"off")}><Link to="/dashboard/admins" className="link"> Admins</Link></div>
    </>
}
    </div> );
}

export default Sidebar;