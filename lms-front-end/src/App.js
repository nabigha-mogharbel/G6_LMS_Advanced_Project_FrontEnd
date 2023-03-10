import "./App.css";
import React, { Component } from "react";
import { AuthCheck } from "./auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage  from "./pages/login/login";
import Students from "./pages/students/student";
import Classes from "./pages/classes/classes";
import Section from "./pages/sections/section"
import Admin from "./pages/Admins/admin";
import Container from "./pages/container/index"
import Attendance from "./pages/Attendance"
import Report from "./pages/repport"
import Dashboard from "./pages/dashboard"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<AuthCheck><Dashboard/></AuthCheck>} />
      <Route path="/dashboard/" element={ <AuthCheck><Container /></AuthCheck>}>
        <Route
          path="students"
          element={<Students />}
        />
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
  );
}

export default App;
