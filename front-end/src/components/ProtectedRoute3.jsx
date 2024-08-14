import React from 'react'
import { Navigate,Outlet } from 'react-router-dom';

function ProtectedRoute3() {
    let isAdmin=localStorage.getItem("admin");
    // let message=(isAdmin=="true")?"Admin Loged In":"User loged In"
    // console.log(message);
  return isAdmin=="true"?<Outlet/>:<Navigate to={"/profile"}/>
}

export default ProtectedRoute3