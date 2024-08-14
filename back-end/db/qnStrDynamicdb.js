const mongoose=require("mongoose");
const qnStructure=new mongoose.Schema(
    {
        Qn:{
            type:String,
            required:true
        },
        OptionA:{
            type:String,
            required:true
        },
        OptionB:{
            type:String,
            required:true
        },
        OptionC:{
            type:String,
            required:true
        },
        Ans:{
            type:String,
            required:true
        }
    }
);
module.exports=qnStructure;