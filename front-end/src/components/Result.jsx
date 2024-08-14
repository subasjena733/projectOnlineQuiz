import React, { useEffect, useState } from 'react'
import "./Result.css"
import { backendUrl } from './BackendUrl.js';

function Result() {
    let [resultPage,setResultPage]=useState([]);
    let [marks,setMarks]=useState({});

    async function getData(){
        let qns=await fetch(`${backendUrl}/questionset/?id=${window.location.search.slice(1)}`);
        qns=await qns.json();
        // console.log(qns[0].qnIds);
        let user=await fetch(`${backendUrl}/getattemptedsets/?email=${localStorage.getItem("email")}`);
        user=await user.json();
        // console.log(user.examStatus);
        let ansRecord=[];
        user.examStatus.forEach((element) => {
          if(element.setId==window.location.search.slice(1)){
            ansRecord=element.recordedAns;
            setMarks({marksObtained:element.marks,maxMarks:qns[0].qnIds.length});
          }
        });
        let htmlArray=qns[0].qnIds.map((element,index)=>{
            let ansStatusMsg="";
            let class_Name="";
            if(ansRecord[index]!="0"){
                if(ansRecord[index]==element.Ans){
                    ansStatusMsg=`Correct => Marked Option: ${ansRecord[index]}, Correct Option: ${element.Ans}`
                    class_Name="ansStatus-correct";
                }else{
                    ansStatusMsg=`Wrong..!! => Marked Option: ${ansRecord[index]}, Correct Option: ${element.Ans}`
                    class_Name="ansStatus-wrong";
                }
            }
            else{
                ansStatusMsg=`Not Answered => Correct Option: ${element.Ans}`
                class_Name="ansStatus-notAnswered";
            }
            return (
                <div key={index} className='rSetQns'>
                    <p className='rQn'>{index+1}. {element.Qn}</p>
                    <div className='rOpns'>
                    <p>a.{element.OptionA}</p>
                    <p>b.{element.OptionB}</p>
                    <p>c.{element.OptionC}</p>
                    </div>
                    <h4 className={class_Name}>{ansStatusMsg}</h4>
                    
                </div>
            );
        });
        setResultPage(htmlArray);
        // console.log(ansRecord);
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <div>
        <h3 className='rMarks'>Max Marks: {marks.maxMarks} <br /> Marks Obtained:{marks.marksObtained}</h3>
        <div>{resultPage}</div>
    </div>
  )
}

export default Result