const express=require("express")
const register = require("../../controller/user")
const uploadFile = require("../../middleware/multer")
const userRouter=express.Router()
userRouter.post("/create",uploadFile.fields(
   [
     {
        name:"avtarImage",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
]
),register)
module.exports=userRouter