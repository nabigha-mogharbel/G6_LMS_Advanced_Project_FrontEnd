import "./Card.css";
import { useState } from "react";
import User from "../user";
export default function Card(props) {
  const [logoColor, setLogoColor] = useState("#E9E3FE");
  function focus() {
    logoColor === "#E9E3FE" ? setLogoColor("#FFF") : setLogoColor("#E9E3FE");
  }
  return (
    <div
      className="card"
      style={{ backgroundColor: props.color }}
      onMouseEnter={focus}
      onMouseLeave={focus}
    >
      <User color={logoColor} className="card-pic" /> <p>{props.title}</p>
    </div>
  );
}
