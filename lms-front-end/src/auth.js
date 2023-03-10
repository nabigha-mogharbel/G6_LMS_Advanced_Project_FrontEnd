import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

export function AuthCheck(props) {
  const cookies = new Cookies();
  const authToken = cookies.get("access_token");
  
  if (!authToken) {
    return <Navigate to="/login" />;
  }

  return <>{props.children}</>;
}