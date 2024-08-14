import React, { useState } from 'react'
import "./Login.css"
import { backendUrl } from './BackendUrl.js';

function Signup() {
  // console.log(backendUrl);
  //--------------Initialization-------------
  let [name,setName]=useState("");
  let [email,setEmail]=useState("");
  let [password,setPassword]=useState("");
  let [adminLogin,setAdminLogin]=useState(false);
  //-------------Event Handler--------------
  function noteName(event){
    setName(event.target.value);
  }
  function noteEmail(event){
    setEmail(event.target.value);
  }
  function notePassword(event){
    setPassword(event.target.value);
  }
  function adminSignupStatus(event){
    // console.log(event.target.checked);
    setAdminLogin(event.target.checked);
  }
  async function userSignup(){
    let data={name,email,password,adminLogin}
    // console.log(data);
    let result=await fetch(`${backendUrl}/signup`,
      {
        method:"post",
        body:JSON.stringify(data),
          headers:{
          "Content-type":"application/json"
        }
      }
    );
    result=await result.json();
    // console.log(result);
    if(!result.Error){
      alert("User Created..!!");
      setName("");
      setEmail("");
      setPassword("");
      setAdminLogin(false);
    }else{
      alert(`Error:${result.Error}`)
    }
  }
  return (
    <div className='login-container'>
    <div className='login-box'>
        <h2>Sign Up</h2>
        <input type="text" className="name" placeholder='Name' onChange={noteName} value={name} />
        <input type="text" placeholder='User Id/E-mail' className='username' onChange={noteEmail} value={email}/>
        <input type="text" placeholder='Password' className='password' onChange={notePassword} value={password}/>
        <div><input type="checkbox" onChange={adminSignupStatus} checked={adminLogin}/>Admin SignUp</div>
        <button className='login-button' onClick={userSignup}>Register</button>
    </div>
</div>
  )
}

export default Signup