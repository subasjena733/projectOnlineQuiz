import React from 'react'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  let user=localStorage.getItem("email");
  // console.log(`User:${user}`);
  const navigate=useNavigate();
  function logout(){
    localStorage.clear();
    navigate("/logout");
  }
  return (
    <div className='navbar'>
        <ul className='navbar-links'>
          <li>Logo</li>
           {!user?
            <> 
              <li><Link to={"/"}>AboutUs</Link></li>
              <li><Link to={"/userlogin"}>User Login</Link></li>
              <li><Link to={"/adminlogin"}>Admin Login</Link></li>
              <li><Link to={"/signup"}>SignUp</Link></li>
            </> :
            <>
              <li><Link to={"/profile"}>Profile</Link></li>
              <li><Link  to={"/logout "} onClick={logout}>Logout</Link></li>
            </>
            }
        </ul>
    </div>
  )
}

export default Navbar