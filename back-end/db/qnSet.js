const mongoose=require("mongoose");
const qnSetStr=mongoose.Schema(
    {
        qnSetName:{
            type:String,
            unique:true,
            required:true
        },
        qnIds:{
            type:Array
        }
    }
);
module.exports=new mongoose.model("allqnsets",qnSetStr);