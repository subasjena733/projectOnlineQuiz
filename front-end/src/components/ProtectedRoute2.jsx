import React from 'react'
import { Navigate,Outlet } from 'react-router-dom';

function ProtectedRoute2() {
    let user=localStorage.getItem("email");
    // let message=user?"User Loged In":"User not loged In"
    // console.log(message);
  return user?<Navigate to={"/profile"}/>:<Outlet/>
}

export default ProtectedRoute2