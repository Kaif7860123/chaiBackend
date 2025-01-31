const express=require("express")
const app=express()
app.get("/user",(req,res)=>{
res.send("get user")
})
const PORT=4000
app.listen(PORT,()=>{
console.log(`app is listening on ${PORT}`)
})