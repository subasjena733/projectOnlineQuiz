import React, { useState } from 'react'
import "./AddQns.css"

function AddQns() {
    //------------------Initialization---------------------
    let [qn,setQn]=useState("");
    let [opnA,setOpnA]=useState("");
    let [opnB,setOpnB]=useState("");
    let [opnC,setOpnC]=useState("");
    let [ans,setAns]=useState("");
    let qnElement,opnAElement,opnBElement,opnCElement,ansElement;
    //------------------Event Handler----------------------
    function readFieldQn(event){
        // console.log(event.target.value);
        setQn(event.target.value);
    }
    function readFieldOpnA(event){
        setOpnA(event.target.value);
        
    }
    function readFieldOpnB(event){
        setOpnB(event.target.value);
        
    }
    function readFieldOpnC(event){
        setOpnC(event.target.value);
        
    }
    function readFieldAns(event){
        setAns(event.target.value);
    
    }
    async function saveData(){
        const data={Qn:qn,OptionA:opnA,OptionB:opnB,OptionC:opnC,Ans:ans}
        // console.log(data);
        //-------clear Qn & Opns field------
        if(qn && opnA && opnB && opnC && ans){
            setQn("");    
            setOpnA("");
            setOpnB("");
            setOpnC("");
            setAns("");
        }
        let result= await fetch("http://localhost:8000/addquestion",
        {
            method:"post",
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json"
            }
        });
        result=await result.json();
        // console.log(result);
        if(result.status){
            alert("Question Added");
        }
        if(result.error){
            alert(`Error occured`);
        }
    }
    //------------------HTML-------------------------------
  return (
    <div className='QnBox'>
        <h2 className='addQn-title'>Add Qns</h2>
        <div className='inputBox qnContainer'><p>Qestion : </p><textarea  className='qn-area' onChange={readFieldQn} value={qn}/></div>
        <div className='inputBox'>Option-a <input type="text" className='opA' onChange={readFieldOpnA} value={opnA}/></div>
        <div className='inputBox'>Option-b <input type="text" className='opB' onChange={readFieldOpnB} value={opnB}/></div>
        <div className='inputBox'>Option-c <input type="text" className='opC' onChange={readFieldOpnC} value={opnC}/></div>
        <div className='inputBox'>Answer : <input type="text" placeholder='a/b/c' className='ans' onChange={readFieldAns} value={ans}/></div>
        <button className='add-button' onClick={saveData}>Add</button>
    </div>
  )
}
export default AddQns