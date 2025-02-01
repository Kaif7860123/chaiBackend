const connectdb = require("./db")
const cookieParser=require("cookie-parser")
const app = require("./app")

app.get("/user",(req,res)=>{

res.send("get user")
})
connectdb()
const PORT=4000
app.listen(PORT,()=>{
console.log(`app is listening on ${PORT}`)
})