import React, { useEffect, useState } from 'react'
import "./QuestionDashboard.css"
import { useNavigate } from 'react-router-dom';

function QuestionDashboard() {
    const navigate=useNavigate();
    let result;
    let [qnIds,setqnIds]=useState([]);
    let qnSet=[];
    // console.log();
    let [qnArray,setQnArray]=useState([]);
    let [count,setCount]=useState(0);
    let [qnSetName,setQnSetName]=useState("");
    async function createSet(){
        // console.log(qnSetName);
        // console.log(qnIds);
        let data={qnSetName,qnIds}
        let result=await fetch("http://localhost:8000/createset",
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
        if(result.qnSetName){
            alert(`${result.qnSetName} added successfully..!!`);
            navigate("/setexam");
        }
        if(result.Error){
            alert(`Error: ${result.Error.errorResponse.errmsg}`);
        }
    }
    async function getQns(){
        let qns=[];
        result=await fetch("http://localhost:8000/",{});
        result=await result.json();
        // console.log(result);
        function qnSelect(event){
            // console.log(event.target.id);
            // console.log(`Before selection: ${qnSet}`);
            if(event.target.checked){
                qnSet=qnIds;
                qnSet.push(event.target.id);
                setqnIds(qnSet);
                // console.log(`after selection: ${qnSet}`);
                setqnIds(qnSet);
                setCount(qnIds.length);
            }else{
                qnSet.splice(qnSet.indexOf(event.target.id),1)
                // console.log(`after deselecting: ${qnSet}`);
                setCount(qnSet.length);
            }
        }
        result.forEach((element,index) => {
            qns.push(<div className="qn-content" key={index}>
                <p className='sl-no'><input type="checkbox" id={element._id} onChange={qnSelect}/></p>
                <p className='question'>{element.Qn}</p>
                <p className='option'>{element.OptionA}</p>
                <p className='option'>{element.OptionB}</p>
                <p className='option'>{element.OptionC}</p>
                <p className='option'>{element.Ans}</p>
            </div>);
        });
        // console.log(qns);
        setQnArray(qns);
    }
    useEffect(()=>{
        getQns();
        // console.log("Dashboard mounted");
    },[]);
    // console.log("pre Return");
  return (
    <div>
        <h2 className='qdb-title'>Question Dashboard</h2>
        <h3>No Of Qns Selected : {count}</h3>
        <input type="text" placeholder='Set Name' onChange={(event)=>{
            setQnSetName(event.target.value);
            // console.log(qnSet);
        }} />
        <button className='create-set' onClick={createSet}>Create Set</button>
        <div className='qn-container'>
            <div className="qn-content">
                <p className='sl-no'></p>
                <p className='question'>Question </p>
                <p className='option'>Option a</p>
                <p className='option'>Option b</p>
                <p className='option'>Option c</p>
                <p className='option'>Ans</p>
            </div>
            {qnArray}
        </div>
    </div>
  )
}

export default QuestionDashboard