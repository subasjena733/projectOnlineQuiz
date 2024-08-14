import React, { useEffect, useState } from 'react'
import "./Options.css"

function Options(props) {
  // console.log(props);
  let tempAns=[];

  let [ansList,setAnsList]=useState(Array(props.maxQns).fill("0"));
  // console.log(ansList);
  let ans=ansList[props.qNo-1];
  //------Update-1----
  //------------------
    function setOptions(){
      if(ans=="a"){
        document.getElementById("option-a").checked=true;
      }else if(ans=="b"){
        document.getElementById("option-b").checked=true;
      }else if(ans=="c"){
        document.getElementById("option-c").checked=true;
      }else{
        document.getElementById("option-a").checked=false;
        document.getElementById("option-b").checked=false;
        document.getElementById("option-c").checked=false;
      }
    }
    //Checks wheather the element is mounted in document i.e on web page or   not oterwise we may get an error while seting its checked propery.(Altt available in ProjectOnlineQuize_Test2)
    if(document.getElementById("option-a")){
      setOptions();
    }
  //----------------Event Handler---------------------
  function noteOption(event){
    // console.log(event);
    if(event.target.id=="option-a"){
      if(event.target.checked){
        ans="a";
        // event.target.checked=true;
      }else{
        ans="0";
      }
    }
    if(event.target.id=="option-b"){
      if(event.target.checked){
        ans="b";
        event.target.checked=true;
      }else{
        ans="0";
      }
    }
    if(event.target.id=="option-c"){
      if(event.target.checked){
        ans="c";
        event.target.checked=true;
      }else{
        ans="0";
      }
    }
  }
  function saveAns(){
    ansList[props.qNo-1]=ans;
    setAnsList(ansList);
    // console.log(ansList);
    props.onSave(ansList);
  }
  function clearAns(){
    ans="0";
    ansList[props.qNo-1]=ans;
    setAnsList(ansList);
    setOptions();
    document.getElementById(`Qn${props.qNo}`).style.backgroundColor="white";
  }
  //----------------HTML------------------------------
  return (
    <div className='opn'>
      <div className='opn-a'>
        <input type="radio" name='option' id='option-a'  onClick={noteOption}/>
        <label htmlFor="" className='opn-a-content'>{props.opnA}</label>
      </div>
      <div className="opn-b">
        <input type="radio" name='option' id='option-b'  onClick={noteOption}/>
        <label htmlFor="">{props.opnB}</label>
      </div>
      <div className="opn-c">
        <input type="radio" name='option' id='option-c'  onClick={noteOption}/>
        <label htmlFor="">{props.opnC}</label>
      </div>
      <div className="save-clear-button">
        <button className='save-button' onClick={saveAns} >Save</button>
        <button className='clear-button' onClick={clearAns}>Clear</button>
      </div>
    </div>
  )
}
export default Options