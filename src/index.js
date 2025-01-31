const express=require("express")
const connectdb = require("./db")
const app=express()
app.get("/user",(req,res)=>{
res.send("get user")
})
connectdb()
const PORT=4000
app.listen(PORT,()=>{
console.log(`app is listening on ${PORT}`)
})