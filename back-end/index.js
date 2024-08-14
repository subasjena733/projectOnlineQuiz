require("dotenv").config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
const { type } = require("os");
// console.log(`Env File Data:${process.env.PORT}`);
const PORT=process.env.PORT;
//-------------Middlewares--------------
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
//-------------DB-----------------------
    //Import connection file
require("./db/config.js")
    //Schema & Model
const User=require("./db/user.js"); 
const Question=require("./db/question.js");
const CandidateAnsRecord=require("./db/ansRecord.js");
const QnSet=require("./db/qnSet.js");
    //---Dynamic DB Schema--
const qnStr=require("./db/qnStrDynamicdb.js")
//----------Routes---------------------
app.get("/",async (req,resp)=>{
    const result=await Question.find();
    // console.log(result);
    resp.send(result);
});
app.post("/signup",async (req,resp)=>{
        // console.log(req.body);
        try{
            const result= await User.create(req.body);
            // console.log(result);
            resp.send(result);
        }catch(err){
            // console.log(err);
            resp.send({Error:err.errmsg});
        }
});
app.post("/login",async (req,resp)=>{
    let result=await User.findOne(req.body);
    // console.log(result);
    resp.send({status:result});
});
app.post("/addquestion",async (req,resp)=>{
    // console.log(req.body);
    const question=new Question(req.body)
    try{
    const result=await Question.create(req.body);
    resp.send({status:"Question Added"});
    }catch(err){
        // console.log(`Error:${err}`);
        resp.send({error:err})
    }
});
app.put("/saveanswer",async (req,resp)=>{
    // console.log(req.body);
    // const result=await CandidateAnsRecord.updateOne(
    //     {RollNo:20},
    //     {$set:req.body}
    // );
    //----------update-1-----------
    const result=await User.updateOne(
        {email:req.body.email},
        {$set:{currentSetAns:req.body.MarkedOptions}}
    );
    resp.end("saving Data");
});
//-----------------------------Work on Progress---------------
app.put("/score",async (req,resp)=>{
    let mark=0;
    // console.log(req.body);
    const result1=await User.findOne({email:req.body.email});
    const currentSetAns=result1.currentSetAns;
    // console.log(currentSetAns);
    // console.log(`StudentAns:${currentSetAns}`);
    const result3=await QnSet.findOne({_id:req.body.setId})
    let actualSetAns=result3.qnIds.map((element)=>{
        return element.Ans;
    })
    // console.log(actualSetAns);
    // console.log(`ActAns:${actualSetAns}`);
    actualSetAns.forEach((element,index) => {
        if(element==currentSetAns[index]){
            mark++;
        }
    });
    let examStatus=result1.examStatus;
    examStatus.push({setId:req.body.setId,status:"completed",recordedAns:currentSetAns,marks:mark});
    // console.log(examStatus)
    const result2=await User.updateOne(
        {email:req.body.email},
        {$set:{examStatus:examStatus}}
    );
    
    // console.log(currentSetAns);
    // const result=await User.updateOne(
    //     {email:req.body.email},
    //     {$set:{:req.body.MarkedOptions}}
    // );
    
    resp.send({Mark:mark})
});
app.put("/initialtempansrecord",async (req,resp)=>{
    // console.log(req.body);
    let tempAnsRecord=Array(parseInt(req.body.noOfQns)).fill("0");
    const result2=await User.updateOne(
        {email:req.body.email},
        {$set:{currentSetAns:tempAnsRecord}}
    );
});
app.post("/createset",async (req,resp)=>{
    // console.log(req.body);
    let qnArray=[];
    req.body.qnIds.forEach(async (element) => {
       let result=await Question.findOne({_id:element});
        let qnData={Qn:result.Qn,OptionA:result.OptionA,OptionB:result.OptionB,OptionC:result.OptionC,Ans:result.Ans};
        qnArray.push(qnData)
        if(req.body.qnIds.length==qnArray.length){
            createQnSet(qnArray,req.body.qnSetName);
        }
    }); 
    async function createQnSet(qnArray,name) {
        try{
            let result= await QnSet.create({qnSetName:name,qnIds:qnArray});
            // console.log(result);
            resp.send(result);
        }catch(err){
            // console.log(`ERROR::::${err}`);
            resp.send({Error:err})
        }      
    }
    
});
app.get("/fetchqnsets",async (req,resp)=>{
    let result=await QnSet.find();
    // console.log(result);
    resp.send(result);
});
app.get("/getattemptedsets",async (req,resp)=>{
    let result=await User.findOne({email:req.query.email});
    resp.send(result);
});
app.get("/questionset",async (req,resp)=>{
    let result=await QnSet.find({_id: req.query.id});
    resp.send(result);
});
app.delete("/deleteset",async (req,resp)=>{
    let result=await QnSet.deleteOne(req.body);
    // console.log(result);
    resp.send({msg:"Set Deleted"});
});
//----------Starting the Server-----------
app.listen(PORT,()=>{
    console.log("Server Started....");
});