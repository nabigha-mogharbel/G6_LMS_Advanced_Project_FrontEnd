import React, {useState} from 'react';
import axios from "axios";
import List from "./admins";
import Add from "./new_admin";
import Single from "./admin_page"
import Edit from "./edit_admin"
import Popup from "../../components/popup/Popup"
export default function ClassWrapper(props) {
  /*const [list, setList]=useState(true);
  const [single,setSingle]=useState(false);*/
  const [add, setAdd]=useState(false);
  const [edit, setEdit]=useState(false);
  const [dimmed, setDimmed]=useState(false);
  const [classIndex, setClassIndex]=useState(-1);
  const [isListPage, toggleListPage]=useState(true);
  //const [page, setPage]=useState({list:true, single:false, edit:false, add:false})
  const shaddowHandler=() => {
   // console.log("dimmer", dimmed)
    setDimmed(!dimmed)
  }
  const toggleList=()=>{
   // setPage({list:true, single:false, edit:false, add:false})

    toggleListPage(true)
  }
  const toggleAdd=()=>{
    //setPage({...page,list:false, single:false})  
    setAdd(!add)
    shaddowHandler()
    
  }
 /* const toggleEdit=(i)=>{
    console.log(i)
    setPage({list:false, single:false, edit:true, add:false});
    setEditIndex(i)
  }*/
  function toggleEdit(i){
    console.log(i)
    //setPage({...page, edit:true});
    setEdit(!edit)
    shaddowHandler()
    setClassIndex(i)
  }
  const toggleSingle=(i)=>{
   // setPage({list:false, single:true, edit:false, add:false});
    toggleListPage(false)
    setClassIndex(i)
  }
  return (<div className='dashboard'>
    {isListPage && <List dimHandler={shaddowHandler} edit={toggleEdit} add={toggleAdd} more={toggleSingle}/>}
    {!isListPage && <Single index={classIndex} dimHandler={shaddowHandler} edit={toggleEdit} cancel={toggleList}/>}
    {add && <Popup><Add cancel={toggleAdd}/></Popup>}
    {edit && <Popup><Edit cancel={toggleEdit} index={classIndex} /></Popup>}
    {dimmed&&<div style={{position:"absolute", zIndex:"11", top:"0", left:"0", width:"100vw", height:"100vh", backgroundColor:"rgba(0,0,0,0.7)"}}> </div>}
    </div>
  )
}
