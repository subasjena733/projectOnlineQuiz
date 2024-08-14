import React from 'react'
import "./Profile.css"
import { Navigate, useNavigate } from 'react-router-dom';

function Profile() {
  const admin=localStorage.getItem("admin");
  const email=localStorage.getItem("email");
  const navigate=useNavigate();
  //---------Event Handler------------------
  function addQns(){
    navigate("/addqns")
  }
  function takeExam(){
    navigate("/takeExam");
  }
  function setExam(){
    navigate("/setexam")
  }
  //---------HTML---------------------------
  return (
    <div className='profile-container'>
      <h2 className='username-email'>{email}</h2>
      {admin=="false"?
        <>
          <h2 className='user-type'>User Dashboard</h2>
          <button onClick={takeExam}>Take Exam</button>
          <button>Exam Results</button>
        </>
        :
        <>
          <h2 className='user-type'>Admin dashboard</h2>
          <button onClick={addQns}>Add Questions</button>
          <button onClick={setExam}>Set Exam</button>
        </>
      }
    </div>
  )
}

export default Profile