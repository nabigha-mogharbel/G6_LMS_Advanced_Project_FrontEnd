import "./App.css";
import React, { createContext, useContext } from "react";
import { AuthCheck } from "./auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import LoginPage  from "./pages/login/login";
import Students from "./pages/students/wrapper";
import Classes from "./pages/classes/wrapper";
import Section from "./pages/sections/wrapper"
import Admin from "./pages/Admins/wrapper";
import Container from "./pages/container/index"
import Attendance from "./pages/Attendance"
import Report from "./pages/report"
import Dashboard from "./pages/dashboard/dashboard"

  function App() {
    const TokenContext=createContext("")
const cookies = new Cookies();
const authToken = cookies.get("access_token") || "";
  return (
  <TokenContext.Provider value={authToken}>
    <div className="App">
      <BrowserRouter>
      <Routes>
        
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard/" element={ <Container />}>
        <Route
          path="students"
          element={<Students />}
        />
        <Route path=""
        element={<Dashboard/>}/>
        <Route
          path="classes"
          element={<Classes />}
        />
        <Route
          path="sections"
          element={<Section />}
        />
        <Route
          path="admins"
          element={<Admin />}
        />
        <Route
          path="attendance"
          element={<Attendance />}
        />
        <Route
          path="report"
          element={<Report />}
        />
      </Route>
    </Routes>
      </BrowserRouter>
    </div>
    </TokenContext.Provider>
  );
}

export default App;
