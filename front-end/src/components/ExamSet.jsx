import React, { useEffect, useState } from 'react'
import "./ExamSet.css"
import { useNavigate } from 'react-router-dom';
import { backendUrl } from './BackendUrl.js';

function ExamSet() {
    let[html_set,setHtmlSet]=useState([]);
    const navigate=useNavigate();
    async function handleExamSetClick(event){
        // console.log(event.target.className);
        if(event.target.className=="examSet-button-green"){
            navigate({pathname:"/result",search:`${event.target.id}`});
        }else{
            let result=await fetch(`${backendUrl}/questionset/?id=${event.target.id}`);
            result=await result.json();
            navigate({pathname:"/examqns",search:`${event.target.id}/${result[0].qnIds.length}`});
        }
    }
    async function fetchSets(){
        let result1=await fetch(`${backendUrl}/getattemptedsets/?email=${localStorage.getItem("email")}`);
        result1=await result1.json();
        // console.log(result1);
        let examsAttempted=result1.examStatus.map((element)=>element.setId)
        // console.log(examsAttempted);
        let result=await fetch(`${backendUrl}/fetchqnsets`);
        result=await result.json();
        // console.log(result);
        let temp=[];
        result.forEach(element => {
            let isAttempted=examsAttempted.includes(element._id)
            // console.log(`${element._id}:${isAttempted}`);
            temp.push(<button id={element._id} key={element._id} className={isAttempted?'examSet-button-green':'examSet-button'} onClick={handleExamSetClick}>{element.qnSetName}</button>);
        });
        setHtmlSet(temp);
    }
    useEffect(()=>{
        fetchSets();
    },[]);
  return (
    <div>
        <h2>Exams Available</h2>
        <div>{html_set}</div>
    </div>
  )
}

export default ExamSet