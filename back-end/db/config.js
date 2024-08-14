const mongoose=require("mongoose")
require("dotenv").config();
const MONGO_URL=process.env.MONGO_URL;
// console.log(process.env.MONGO_URL)
mongoose.connect(MONGO_URL).then(()=>{
    console.log("DB Connected");
}).catch((err)=>{
    console.log(`Error:${err}`);
});