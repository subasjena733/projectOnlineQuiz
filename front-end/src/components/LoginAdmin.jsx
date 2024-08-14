import React from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

function LoginAdmin() {
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
    async function login(){
        let data={email:userName,password:password,adminLogin:true}
        let result=await fetch("http://localhost:8000/login",
        {
            method:"post",
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json"
            }
        });
        result=await result.json();
        // console.log(result );
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
            <h2>Admin LogIn</h2>
            <input type="text" placeholder='User Id/E-mail' className='username' onChange={noteUserName} value={userName}/>
            <input type="text" placeholder='Password' className='password' onChange={notePassword} value={password}/>
            <button className='login-button' onClick={login}>Login</button>
            <Link to={"/signup"}>SignUp</Link>
        </div>
    </div>
  )
}

export default LoginAdmin