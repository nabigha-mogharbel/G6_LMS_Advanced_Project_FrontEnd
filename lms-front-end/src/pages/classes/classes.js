import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import "./classes.css";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "../../components/Delete/deleteAlert";
import Trash from "../../components/Trash/Trash";
import Pen from "../../components/Pen/Pen";
export default function Classes(props) {
  let Response = [];
  const [classes, setData] = useState({
    data: [],
    pages: 0,
    current_page: 0,
    fpl: "",
    lpl: "",
    npl: "",
    ppl: "",
  });
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
    const abouzada = axios.get(`${URL}classes`, config).then(
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
  }, []);
  function searchClassByName() {}
  const showAlert = (bool, index) => {
    setAlert([bool, index]);
    props.dimHandler();
    console.log("alerterrrr");
  };
  function sortClasses(e, param) {
    let b = document.getElementsByClassName("Classes-th");
    for (let i = 0; i < b.length; i++) {
      b[i].className = "batata";
    }
    // e.current.className="Classes-th filtered"
  }
  function filterClass(param) {}
  const getClasses = (url) => {
    const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const abouzada = axios.get(url, config).then(
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
      <button onClick={props.add}>Add</button>
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
              <option value="floor">Floor</option>
            </select>
          </div>
        </div>
        <div className="dash-container-scroll">
          <table className="table">
            <thead>
              <tr className="Classes-tr">
                <th
                  className="Classes-th"
                  ref={idSort}
                  onClick={(e) => sortClasses(idSort, "id")}
                >
                  #
                </th>
                <th
                  className="Classes-th"
                  ref={nameSort}
                  onClick={(e) => sortClasses(nameSort, "name")}
                >
                  Class
                </th>
                <th
                  className="Classes-th"
                  ref={floorSort}
                  onClick={(e) => sortClasses(floorSort, "floor")}
                >
                  Floor
                </th>
                <th className="Classes-th"></th>
              </tr>
            </thead>
            <tbody>
              {classes.data.map((e) => {
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
                    <td className="Classes-td">{e.floor}</td>
                    <td
                      className="Classes-td dash-container container-row"
                      style={{ cursor: "pointer" }}
                    >
                      <div onClick={(e) => props.edit(index)}>
                        <Pen />
                      </div>
                      <div onClick={(e) => showAlert(true, e.id)}>
                        <Trash />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {classes.current_page === 1 && classes.pages>1&&(
            <div className="table-paginator">
              <div className="active">1</div>{" "}
              {classes.current_page != classes.pages && (
                <div onClick={(e) => getClasses(classes.npl)}>&gt;</div>
              )}
              <div onClick={(e) => getClasses(classes.lpl)}>
                {classes.pages}
              </div>
            </div>
          )}
          {classes.current_page === classes.pages &&classes.pages>1&& (
            <div className="table-paginator">
              <div onClick={(e) => getClasses(classes.fpl)}>1</div>{" "}
              {classes.current_page != 1 && (
                <div onClick={(e) => getClasses(classes.ppl)}>&lt;</div>
              )}{" "}
              <div className="active">{classes.pages}</div>
            </div>
          )}
          {classes.current_page != classes.pages &&
            classes.current_page != 1 &&  classes.pages>1&&(
              <div className="table-paginator">
                <div onClick={(e) => getClasses(classes.fpl)}>1</div>{" "}
                {classes.current_page != 1 && (
                  <div onClick={(e) => getClasses(classes.ppl)}>&lt;</div>
                )}{" "}
                {classes.current_page != 1 && <div className="active">{classes.current_page}</div>}{" "}
                {classes.current_page != classes.pages && (
                  <div onClick={(e) => getClasses(classes.npl)}>&gt;</div>
                )}
                <div onClick={(e) => getClasses(classes.lpl)}>
                  {classes.pages}
                </div>
              </div>
            )}
        </div>
        {alert[0] && (
          <Alert
            dimHandler={props.dimHandler}
            item="class"
            index={alert[1]}
            removeAlert={(e) => showAlert(false, -1)}
          />
        )}
      </div>
    </>
  );
}
