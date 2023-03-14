import React from 'react';
import axios from "axios";

export default function ClassPage(props) {
  return (
    <div>new_classes {props.index} <button onClick={props.cancel} >back</button></div>
  )
}
