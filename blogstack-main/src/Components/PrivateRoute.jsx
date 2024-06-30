import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../Hooks/useAuthStatus";

export default function PrivateRoute() {
 
const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return  <p>Loading</p>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
