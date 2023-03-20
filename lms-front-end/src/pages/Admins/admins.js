import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import "./admin.css";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "../../components/Delete/deleteAlert";
import Trash from "../../components/Trash/Trash";
import Pen from "../../components/Pen/Pen";
export default function Admins(props) {
  let Response = [];
  const [admins, setData] = useState([]);
  const [sort, setSort] = useState({});
  const [alert, setAlert] = useState([false, -1]);
  const search = useRef();
  const filter = useRef();
  const floorSort = useRef();
  const idSort = useRef();
  const nameSort = useRef();
  //const token = useContext(TokenContext)
  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const URL = process.env.REACT_APP_BASE_URL;
    const abouzada = axios.get(`${URL}admins`, config).then(
      function (response) {
        console.log("then", response.data.message);
        setData(response.data.message);
      },
      function (error) {
        window.location.assign("/login");
      }
    );
  }, []);
  function searchClassByName() {}
  const showAlert = (bool, index) => {
    setAlert([bool, index]);
    props.dimHandler();
    console.log("alerterrrr");
  };
  function sortadmins(e, param) {
    let b = document.getElementsByClassName("admins-th");
    for (let i = 0; i < b.length; i++) {
      b[i].className = "batata";
    }
    // e.current.className="admins-th filtered"
  }
  function filterClass(param) {}
  const getadmins = (url) => {
    const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const abouzada = axios.get(`${URL}admins`, config).then(
      function (response) {
        console.log(response.data.message);
        setData({
          data: response.data.message.data,
          pages: response.data.message.last_page,
          current_page: response.data.message.current_page,
          fpl: response.data.message.first_page_url,
          lpl: response.data.message.last_page_url,
          npl: response.data.message.next_page_url,
          ppl: response.data.message.prev_page_url,
        });
      },
      function (error) {
        window.location.assign("/login");
      }
    );
  };

    
  return (
    <>
     
      <div className="table-wrapper">
        <div className="table-controllers dash-container container-row-to-col">
          <div className="dash-container container-col">
            <label htmlFor="class">Search</label>
            <input
              onChange={searchClassByName}
              type="text"
              placeholder="Class Name"
              name="class"
              id="search"
              ref={search}
            />
          </div>
          <div className="dash-container container-col">
            <label htmlFor="filter">Filter</label>
            <select onChange={filterClass} id="filter" ref={filter}>
              <option value="none">-----</option>
              <option value="name">name</option>
            </select>
           
          </div>
          <div className="button-add-container"> <button className="add_button" onClick={props.add}>Add</button></div>
        </div>
        <div className="dash-container-scroll">
          <table className="table">
            <thead>
              <tr className="Classes-tr">
                <th
                  className="Classes-th"
                  ref={idSort}
                  onClick={(e) => sortadmins(idSort, "id")}
                >
                  #
                </th>
                <th
                  className="Classes-th"
                  ref={nameSort}
                  onClick={(e) => sortadmins(nameSort, "name")}
                >
                  Class
                </th>
                <th
                  className="Classes-th"
                  ref={floorSort}
                  onClick={(e) => sortadmins(floorSort, "email")}
                >
                  Email
                </th>

             

                <th className="Classes-th"></th>
              </tr>
            </thead>
            <tbody>
              {console.log(admins)}
              {admins.map((e) => {
                let index = e.id;
                return (
                  <tr className="Classes-tr gray" key={e.id}>
                    <td className="Classes-td">{e.id}</td>
                    <td
                      className="Classes-td"
                      onClick={(e) => props.more(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <a>{e.name}</a>
                    </td>
                    <td className="Classes-td">{e.email}</td>
                   
                    <td
                      className="Classes-td dash-container container-row"
                      style={{ cursor: "pointer" }}
                    >
                      <div onClick={(e) => props.edit(index)}>
                        <Pen />
                      </div>
                      <div onClick={(e) => showAlert(true, index)}>
                        <Trash />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* {admins.current_page === 1 && admins.pages>1&&(
            <div className="table-paginator">
              <div className="active">1</div>{" "}
              {admins.current_page != admins.pages && (
                <div onClick={(e) => getadmins(admins.npl)}>&gt;</div>
              )}
              <div onClick={(e) => getadmins(admins.lpl)}>
                {admins.pages}
              </div>
            </div>
          )}
          {admins.current_page === admins.pages &&admins.pages>1&& (
            <div className="table-paginator">
              <div onClick={(e) => getadmins(admins.fpl)}>1</div>{" "}
              {admins.current_page != 1 && (
                <div onClick={(e) => getadmins(admins.ppl)}>&lt;</div>
              )}{" "}
              <div className="active">{admins.pages}</div>
            </div>
          )}
          {admins.current_page != admins.pages &&
            admins.current_page != 1 &&  admins.pages>1&&(
              <div className="table-paginator">
                <div onClick={(e) => getadmins(admins.fpl)}>1</div>{" "}
                {admins.current_page !=1 && (
                  <div onClick={(e) => getadmins(admins.ppl)}>&lt;</div>
                )}{" "}
                {admins.current_page != 1 && <div className="active">{admins.current_page}</div>}{" "}
                {admins.current_page != admins.pages && (
                  <div onClick={(e) => getadmins(admins.npl)}>&gt;</div>
                )}
                <div onClick={(e) => getadmins(admins.lpl)}>
                  {admins.pages}
                </div>
              </div>
            )} */}
        </div>
        {alert[0] && (
          <Alert
            dimHandler={props.dimHandler}
            item="class"
            index={alert[1]}
            removeAlert={(e) => showAlert(false, -1)}
            url='admins/'
          />
        )}
      </div>
    </>
  )}
