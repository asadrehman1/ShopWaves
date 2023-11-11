import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(user)
  if(!isAuthenticated){
    navigate("/login");
  }
  if(isAdmin === true && user?.role !=="admin"){
    navigate("/login")
  }
  return children;
};

export default ProtectedRoute;