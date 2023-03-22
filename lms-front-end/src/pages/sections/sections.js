import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import "./sections.css";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "../../components/Delete/deleteAlert";
import Trash from "../../components/Trash/Trash";
import Pen from "../../components/Pen/Pen";
import Loader from "../../components/loader";
export default function Sections(props) {
  let Response = [];
  const [classes, setData] = useState({
    data: [],
    pages: 0,
    current_page: 0,
    fpl: "",
    lpl: "",
    npl: "",
    ppl: "",
    loading: true,
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
    const abouzada = axios.get(`${URL}sections`, config).then(
      function (response) {
        setData({
          data: response.data.message.data,
          pages: response.data.message.last_page,
          current_page: response.data.message.current_page,
          fpl: response.data.message.first_page_url,
          lpl: response.data.message.last_page_url,
          npl: response.data.message.next_page_url,
          ppl: response.data.message.prev_page_url,
          loading: false,
          search:""
        });
      },
      function (error) {
        window.location.assign("/login");
      }
    );
  }, []);
  function searchClassByName(e) {
    setData({...classes, search:e.target.value})
  }
  const showAlert = (bool, index) => {
    setAlert([bool, index]);
    props.dimHandler();
  };
  function sortClasses(e, param) {
    const cookies = new Cookies();
    const authToken = cookies.get("access_token");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const URL = process.env.REACT_APP_BASE_URL+"sections"+param;
    const abouzada = axios.get(URL, config).then(
      function (response) {
        setData({
          data: response.data.message.data,
          pages: response.data.message.last_page,
          current_page: response.data.message.current_page,
          fpl: response.data.message.first_page_url,
          lpl: response.data.message.last_page_url,
          npl: response.data.message.next_page_url,
          ppl: response.data.message.prev_page_url,
          loading: false,
          search:""
        });
      },
      function (error) {
        window.location.assign("/login");
      }
    )
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
        setData({
          data: response.data.message.data,
          pages: response.data.message.last_page,
          current_page: response.data.message.current_page,
          fpl: response.data.message.first_page_url,
          lpl: response.data.message.last_page_url,
          npl: response.data.message.next_page_url,
          ppl: response.data.message.prev_page_url,
          search:""
        });
      },
      function (error) {
        window.location.assign("/login");
      }
    );
  };
  return (
    <>
    
      {classes.loading && <Loader />}{" "}
      <h1>Sections</h1>
      <hr className="title-hr"/>
      {/* show the Loader component if loading is true */}
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
          <div className="button-add-container"> <button className="add_button" onClick={props.add}>Add</button></div>
        </div>
        <div className="dash-container-scroll">
          <table className="table">
            <thead>
              <tr className="Classes-tr">
                <th
                  className="Classes-th"
                  ref={idSort}
                  onClick={(e) => sortClasses(idSort, "")}
                >
                  #
                </th>
                <th
                  className="Classes-th"
                  ref={nameSort}
                  onClick={(e) => sortClasses(nameSort, "/sort/name")}
                >
                  Name
                </th>
                <th
                  className="Classes-th"
                  ref={floorSort}
                  onClick={(e) => sortClasses(floorSort, "/sort/capacity")}
                >
                  Capacity
                </th>
                <th
                  className="Classes-th"
                  ref={floorSort}
                  onClick={(e) => sortClasses(floorSort, "/sort/class")}
                >
                  Class
                </th>
                <th className="Classes-th"></th>
              </tr>
            </thead>
            <tbody>
              {classes.data.filter(b => b.name.includes(classes.search)).map((e) => {
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
                    <td className="Classes-td">{e.capacity}</td>
                    <td className="Classes-td">{e.class.name}</td>
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
          {classes.current_page === 1 && classes.pages > 1 && (
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
          {classes.current_page === classes.pages && classes.pages > 1 && (
            <div className="table-paginator">
              <div onClick={(e) => getClasses(classes.fpl)}>1</div>{" "}
              {classes.current_page != 1 && (
                <div onClick={(e) => getClasses(classes.ppl)}>&lt;</div>
              )}{" "}
              <div className="active">{classes.pages}</div>
            </div>
          )}
          {classes.current_page != classes.pages &&
            classes.current_page != 1 &&
            classes.pages > 1 && (
              <div className="table-paginator">
                <div onClick={(e) => getClasses(classes.fpl)}>1</div>{" "}
                {classes.current_page != 1 && (
                  <div onClick={(e) => getClasses(classes.ppl)}>&lt;</div>
                )}{" "}
                {classes.current_page != 1 && (
                  <div className="active">{classes.current_page}</div>
                )}{" "}
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
            url="sections/"
          />
        )}
      </div>
    </>
  );
}
