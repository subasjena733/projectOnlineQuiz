import React, { useEffect, useState } from 'react'
import "./Question.css"
import Options from './Options.jsx';
function Question(props) {
  //---------------------Initialization-----------------
  let[qns_opns1,setQns_opns1]=useState([{}]);
  //-----------------------------------------------------
  //----------Question and Option List--------------------------
  async function fetchQns(){
    // let qns_opns2=await fetch("http://localhost:8000/",{})
    // qns_opns2=await qns_opns2.json();
    //-----update 1------------
    let search=window.location.search.slice(1);
    let result=await fetch(`http://localhost:8000/questionset/?id=${search.split("/")[0]}`);
    result=await result.json();
    let qns_opns2=result[0].qnIds;
    //------------------------
    setQns_opns1(qns_opns2);
  }
  useEffect(()=>{
    // console.log("Qn element mounted");
    fetchQns();
  },[]);
//-----------------Event Handler-----------------------
function nextQn(ansList){
  // console.log(ansList);
  props.nextQn(ansList);
}
//-----------------HTML--------------------------------
  return (
    <div className="qns-opns">
      <div className='qn'>
        <p>{props.qNo}. {qns_opns1[props.qNo-1].Qn}</p>
      </div>
      <Options maxQns={props.maxQns} qNo={props.qNo} opnA={qns_opns1[props.qNo-1].OptionA} opnB={qns_opns1[props.qNo-1].OptionB} opnC={qns_opns1[props.qNo-1].OptionC} onSave={nextQn}/>
    </div>
  )
}


export default Question