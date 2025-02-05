const mongoose=require("mongoose");
const { DB_NAME } = require("../constant");
require("dotenv").config()
const connectdb=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        // console.log(connectionInstance.connection.host);
        
        console.log(`connection succesfully done`);
        
    } catch (error) {
        console.log({message:"failed",error})
        
    }
//    const connectionInstance=await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`).then(()=>{
//         console.log(`connection done successfully ${connectionInstance}`);
        
//     }).catch((err)=>{
//         console.log({message:"failed",err})
//     })
}
module.exports=connectdb