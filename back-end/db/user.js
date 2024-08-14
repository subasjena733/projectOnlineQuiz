const mongoose=require("mongoose");
const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        currentSetAns:{
            type:Array
        },
        examStatus:{
            type:Array
        },
        adminLogin:{
            type:Boolean
        }

    }
);
module.exports=mongoose.model("users",userSchema);