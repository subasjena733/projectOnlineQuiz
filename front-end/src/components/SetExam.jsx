import React, { useEffect, useState } from 'react'
import './SetExam.css'
import { useNavigate } from 'react-router-dom'
import { backendUrl } from './BackendUrl.js';

function SetExam() {
  const navigate=useNavigate();
  let htmlElements=[];
  let [setCounter, setSetCounter]=useState(0);
  let [qnSets,setQnSets]=useState([]);
  function handleQnSetButton(event){
    // console.log(event.target.id);
    navigate({pathname:"/questionsetdashboard",search:event.target.id});
  }
  async function getSets(){
    let result=await fetch(`${backendUrl}/fetchqnsets`,{});
    result=await result.json();
    // console.log(result);
    result.forEach(element => {
      let temp=qnSets;
      temp.push(
          <button key={element._id} id={element._id} className='setButton' onClick={handleQnSetButton}>{element.qnSetName}</button>
        );
      setQnSets(temp);
      // console.log(temp);
    });
    setSetCounter(result.length);
    // console.log(qnSets);
    setSetCounter(result.length);
  }
  function createSet(){
    navigate('/questiondashboard')
  }
  function viewSet(){
    navigate("/questionsetdashboard");
  }
  // console.log(qnSets);
  useEffect(()=>{
    getSets();
  },[])
return (
    <div className='set-exam'>
      <button onClick={createSet} className='createSet-Button'>Create Set</button>
      {/* <button onClick={getSets}>View Qn Sets</button> */}
      <h2>Sets available</h2>
      <div>{qnSets}</div>
      
    </div>
  )
}

export default SetExam