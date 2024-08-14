import React, { useState } from 'react'

function SetQns(props) {
    let itemList=props.qns
    let listArray=[];
    let [htmlArray,setHTMLarray]=useState([]);
    console.log(itemList);
    itemList.forEach((element,index) => {
        listArray.push(
        <div className='qn-container'>
            <div className="qn-content">
                <p className='sl-no'>{index+1}</p>
                <p className='question'>{element.Qn}</p>
                <p className='option'>{element.OptionA}</p>
                <p className='option'>{element.OptionB}</p>
                <p className='option'>{element.OptionC}</p>
                <p className='option'>{element.Ans}</p>
            </div>
        </div>);
        setHTMLarray(listArray);
    });
    console.log(listArray);
  return (
    <>
     {htmlArray}
    </>
  )
}

export default SetQns