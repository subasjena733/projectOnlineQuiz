import React, { useEffect, useState } from 'react'
import "./SubmitButton.css"
import { useNavigate } from 'react-router-dom';
import { backendUrl } from './BackendUrl.js';

function SubmitButton() {
  let [mark,setMark]=useState(0);
  const navigate=useNavigate();
  async function getScore(){
    let score=await fetch(`${backendUrl}/score/`,
      {
      method:"put",
        body:JSON.stringify({setId:window.location.search.slice(1).split("/")[0],email:localStorage.getItem("email")}),
        headers:{
          "Content-type":"application/json"
        }
      }
    );
    score=await score.json();
    // console.log(score)
    setMark(score.Mark);
  }
  useEffect(()=>{
    getScore();
  },[])
  function getAns(){
    // console.log(window.location.search.slice(1).split("/")[0]);
    navigate({pathname:"/result",search:window.location.search.slice(1).split("/")[0]})
  }
  return (
    <div>
      <h2>You have successfully completed the test.</h2>
      <h2>Thank You...!!</h2>
      <h2>Marks Obtained:{mark}</h2>
      <button className='getAns' onClick={getAns}>Get Answer</button>
    </div>
  )
}

export default SubmitButton