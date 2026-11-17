
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const isLoggedIn =
    localStorage.getItem("travelgoLoggedIn") === "true";

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
