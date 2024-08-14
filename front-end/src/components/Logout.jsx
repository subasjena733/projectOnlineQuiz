import React from 'react'
import { Link } from 'react-router-dom'
import "./Logout.css"

function Logout() {
    localStorage.clear();
  return (
    <div className='logout'>
        <h2>Log in to proceed....</h2>
        <Link to={"/userlogin"}>User Login</Link>
        <Link to={"/adminlogin"}>Admin Login</Link>
    </div>
  )
}

export default Logout