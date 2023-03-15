import React from 'react';
import axios from "axios";

export default function section_page(props) {
  return (
    <div>new_section {props.index} <button onClick={props.cancel} >back</button></div>
    )
  
}
