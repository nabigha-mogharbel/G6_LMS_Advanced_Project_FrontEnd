import "./App.css";
import React, { Component } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import Students from "./pages/students/student";
import Classes from "./pages/classes/classes";
import Admin from "./pages/Admins/admin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Container />}>
            <Route path="students" element={<Students />} />
            <Route path="classes" element={<Classes />} />
            <Route path="admin" element={<Admin />} />
          </Route>
          <Container />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
