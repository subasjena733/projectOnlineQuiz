import React, { useEffect, useState } from 'react'
import "./QnSetDashboard.css"
import SetQns from './SetQns.jsx';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from './BackendUrl.js';

function QnSetDashboard() {
  let [qns,setQns]=useState([]);
  let [nameOfSet,setNameOfSet]=useState("");
  const navigate=useNavigate();
  // console.log(window.location.search.slice(1));
  const qnSetId=window.location.search.slice(1);
  let [deleteButtonStatus,setDeleteButtonStatus]=useState(false);
  async function fetchQnSet(){
     let result=await fetch(`${backendUrl}/questionset/?id=${qnSetId}`);
    result=await result.json();
    // console.log(result);
    if(result[0]){
        // console.log("Hello..");
      
      // console.log(result[0].qnIds);
      setDeleteButtonStatus(true);
      setNameOfSet(result[0].qnSetName)
      let qnSetArray=result[0].qnIds;
      // console.log(qnSetArray);
      let temp=[];
      qnSetArray.forEach((element,index) => {
        temp.push(
        <div className='qn-container' key={index}>
          <div className="qn-content">
            <p className='sl-no'>{index+1}</p>
            <p className='question'>{element.Qn}</p>
            <p className='option'>{element.OptionA}</p>
            <p className='option'>{element.OptionB}</p>
            <p className='option'>{element.OptionC}</p>
            <p className='option'>{element.Ans}</p>
          </div>
        </div>);
      });
      // console.log(temp);
      setQns(temp);
    }
  }
  useEffect(()=>{
   fetchQnSet();
  },[]);
  // console.log(qns);
  async function handleDeleteSet() {
    // console.log(`Deleting:${qnSetId}....`)
    let result=await fetch(`${backendUrl}/deleteset`,{
      method:"delete",
      body:JSON.stringify({_id:qnSetId}),
      headers:{
        "Content-type":"application/json"
      }
    });
    result=await result.json();
    // console.log(result);
    alert(result.msg);
    navigate("/setexam");
    
  }
  return (
  <>
    <div>
        <h2>Question Set Dashboard</h2>
        <h2>{nameOfSet}</h2>
        <div className='qn-container'>
          <div className="qn-content">
            <p className='sl-no'>S.N.</p>
            <p className='question'>Question </p>
            <p className='option'>Option a</p>
            <p className='option'>Option b</p>
            <p className='option'>Option c</p>
            <p className='option'>Ans</p>
          </div>
        </div>
    </div>
    {qns}
    {deleteButtonStatus?<div className='delete-button'><button onClick={handleDeleteSet}>Delete Set</button></div>:<></>}
  </>
  )
}

export default QnSetDashboard