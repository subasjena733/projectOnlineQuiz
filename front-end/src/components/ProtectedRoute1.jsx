import React from 'react'
import { Navigate,Outlet } from 'react-router-dom';
import Logout from './Logout';

function ProtectedRoute1() {
    let user=localStorage.getItem("email");
    // let message=user?"User Loged In":"User not loged In"
    // console.log(message);
  return user?<Outlet/>:<Logout/>
}

export default ProtectedRoute1