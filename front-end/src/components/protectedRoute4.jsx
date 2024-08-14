import React from 'react'
import { Navigate,Outlet } from 'react-router-dom';

function ProtectedRoute4() {
    let isAdmin=localStorage.getItem("admin");
    // let message=(isAdmin=="true")?"Admin Loged In":"User loged In"
    // console.log(message);
  return isAdmin=="false"?<Outlet/>:<Navigate to={"/profile"}/>
}

export default ProtectedRoute4