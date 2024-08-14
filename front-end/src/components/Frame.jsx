import React, { useEffect, useState } from 'react'
import "./Frame.css"
import Question from "./Question.jsx"
import { useLocation, useNavigate } from 'react-router-dom';

function Frame(props) {

//---------------Initializatin and declaratin----------------------
    let search=window.location.search.slice(1);
    let id=search.split("/")[0]
    let [maxNoOfQns,setMaxNoOfQns]=useState(parseInt(search.split("/")[1]));
    const location=useLocation();
    // console.log(maxNoOfQns);
    const setTempAnsRecord= async ()=>{
        //Sets currentSetAns array in DB to array of all 0 s
        // let tempAnsRecord=Array(parseInt(window.location.search.slice(1).split("/")[1])).fill("0");
        // console.log(tempAnsRecord);
        let result= await fetch("http://localhost:8000/initialtempansrecord",
            {
                method:"put",
                body:JSON.stringify({noOfQns:window.location.search.slice(1).split("/")[1],email:localStorage.getItem("email")}),
                headers:{
                    "Content-type":"application/json"
                }
            }
        );

    }
    useEffect(()=>{
        setTempAnsRecord();
    },[]);
    const [qnNo,setQnNo]=useState(1);
    const [colour,setColour]=useState("white");
    const navigate=useNavigate();
    let ansStatus=[];
    for(let i=1;i<=maxNoOfQns;i++){
        ansStatus.push(<button className="qn-no" id={`Qn${i}`} onClick={qnButtonClickHandler} key={`q${i}`} >{i}</button>);
    };
    async function nextQn(ansList){
        // console.log(ansList);
        let result= await fetch("http://localhost:8000/saveanswer",
            {
                method:"put",
                body:JSON.stringify({MarkedOptions:ansList,email:localStorage.getItem("email")}),
                headers:{
                    "Content-type":"application/json"
                }
            }
        );
        //-----Marking answered questions--------
        ansList.forEach((element,index) => {
            if(element!="0"){ 
                document.getElementById(`Qn${index+1}`).style.backgroundColor="green";
            }else{
                document.getElementById(`Qn${index+1}`).style.backgroundColor="white";
            }
        });
        //---------------------------------------
        if(qnNo==maxNoOfQns)
        {
            setQnNo(1);
        }
        if(qnNo<maxNoOfQns){
            // console.log(parseInt(qnNo)+1);
            setQnNo(qnNo+1);
        }
        // resetOptions();
    }
//-------------------Event Handler--------------------------------
    function qnButtonClickHandler(event){
        // console.log(event.target.innerText);
        setQnNo(parseInt(event.target.innerText))
    }
    function prevButtonClickHandler(){
        if(qnNo>1)
        {
            setQnNo(qnNo-1);
        }
        if(qnNo==1){
            setQnNo(maxNoOfQns);
        }
        // resetOptions();
    }
    function nextButtonClickHandler(){
        if(qnNo==maxNoOfQns)
        {
            setQnNo(1);
        }
        if(qnNo<maxNoOfQns){
            // console.log(parseInt(qnNo)+1);
            setQnNo(qnNo+1);
        }
        // resetOptions();
    }
    function Submit(){
        navigate({pathname:"/submit",search:window.location.search});
    }
//--------------------HTML-------------------------------------
  return (
    <div className='frame'>
        <div className='qnStatus-area'>{ansStatus}</div>
        <Question qNo={qnNo} maxQns={maxNoOfQns} nextQn={nextQn}/>
        <div className="prev-next-button-container">   
            <div className='prev-next-button'>
                <button className='prev-button' onClick={prevButtonClickHandler}>Prev</button>
                <button className='next-button' onClick={nextButtonClickHandler}>Next</button>
            </div>
        </div>
        <div className='submit-button-container'>
            <button className='submit-button' onClick={Submit}>Finish and Submit</button>
        </div>    
    </div>
  )
}
export default Frame