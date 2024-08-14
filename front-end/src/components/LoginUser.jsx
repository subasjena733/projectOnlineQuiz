import React, { useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { backendUrl } from './BackendUrl.js';

function LoginUser() {
    // console.log("LoginUser Called");
    //--------------Initialization-------------
    let [userName,setUserName]=useState("");
    let [password,setPassword]=useState("");
    let userNameElement,passwordElement;
    const navigate=useNavigate();
    //-------------Event Handler--------------
    function noteUserName(event){
        setUserName(event.target.value);
    }
    function notePassword(event){
        setPassword(event.target.value);
    }
    async function userLogin(){
        let data={email:userName,password:password,adminLogin:false}
        let result=await fetch(`${backendUrl}/login`,
            {
                method:"post",
                body:JSON.stringify(data),
                headers:{
                    "Content-type":"application/json"
                }
            }
        );
        result=await result.json();
        // console.log(result.status);
        if(result.status){
            localStorage.setItem("email",result.status.email);
            localStorage.setItem("admin",result.status.adminLogin);
            setUserName("");
            setPassword("");
            navigate("/profile");
        }else{
            alert("Enter correct user name/password..");
        }
    }
    //-------------HTML-----------------------
  return (
    <div className='login-container'>
        <div className='login-box'>
            <h2>User LogIn</h2>
            <input type="text" placeholder='User Id/E-mail' className='username' onChange={noteUserName} value={userName}/>
            <input type="text" placeholder='Password' className='password' onChange={notePassword} value={password}/>
            <button className='login-button' onClick={userLogin}>Login</button>
            <Link to={"/signup"}>SignUp</Link>
        </div>
    </div>
  )
}

export default LoginUser