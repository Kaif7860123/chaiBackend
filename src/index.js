const connectdb = require("./db")
const cookieParser=require("cookie-parser")
const app = require("./app")
const userRouter = require("./routes/user")

app.get("/user",(req,res)=>{

res.send("get user")
})
 app.use("/api/v1/user",userRouter)
connectdb()
const PORT=4000
app.listen(PORT,()=>{
console.log(`app is listening on ${PORT}`)
})