import React from 'react';
import axios from "axios";

export default function AdminPage(props) {
  return (
    <div>new_Admin {props.index} <button onClick={props.cancel} >back</button></div>
  )
}
