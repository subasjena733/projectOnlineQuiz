const mongoose=require("mongoose");
const ansRecordStructure=new mongoose.Schema(
    {
        RollNo:{
            type:String
        },
        MarkedOptions:{
            type:Array
        }
    }
);
module.exports=mongoose.model("candidates_ans_record",ansRecordStructure);