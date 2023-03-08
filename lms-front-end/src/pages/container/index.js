import { Outlet } from "react-router-dom";
import React from "react";
import Sidebar from "../../components/Sidebar.js";

export default function Container() {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}
