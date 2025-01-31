const express=require("express")
require("dotenv").config()
const app=express()
app.get("/user",(req,res)=>{
res.send("get user")
})
const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
console.log(`app is listening on ${PORT}`)
})