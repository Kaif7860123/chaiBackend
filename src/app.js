 const express=require("express")
const cors=require("cors")
 const app=express()
 app.use(cors())
//  app.use(cors({
//     origin:process.env.CORS_ORIGIN,
//     credentials:true
// }))
// app.use(express.json({limit:"16kb"}))
// app.use(express.urlencoded({extended:true}))
 module.exports=app