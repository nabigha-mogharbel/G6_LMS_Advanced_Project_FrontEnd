import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";


export default function StudentPage(props) {
  const URL = process.env.REACT_APP_BASE_URL;
  const [data,setData] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const URL = process.env.REACT_APP_BASE_URL;
    const abouzada = axios.get(`${URL}students/${props.index}`, config).then(
      function (response) {
        console.log(response);
        setData({
          data: response.data.message.data,
        });
      },
      function (error) {
        // window.location.assign("/login");
        console.log(error);
      }
    );
  }, []);

  console.log(props.index)

 
// console.log(data);
  return (
    <>
      <div>
        new_students {props.index} <button onClick={props.cancel}>back</button>
      </div>
      <div></div>
    </>
  );
}
