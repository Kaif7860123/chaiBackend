const express=require("express")
const register = require("../../controller/user")
const login = require("../../controller/user")
const uploadFile = require("../../middleware/multer")
const verifyJWT = require("../../middleware/auth")
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
),register.register)
userRouter.post("/login",login.login)
userRouter.post("/logout",verifyJWT,register.logOutUser)
 
module.exports=userRouter