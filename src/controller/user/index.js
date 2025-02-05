const express=require("express")
const app=express()
app.use(express.json())
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
const userModel = require('../../../models/user.model')
// const app = require('../../app')
const { fields } = require('../../middleware/multer')
const ApiError = require('../../utills/apiError')
const ApiResponse = require('../../utills/apiResponse')
const asyncHandler=require('../../utills/asyncHandler')
const uploadOnCloudinary = require('../../utills/cloudinary')


// const bodyParser=require("body-parser")
// app.use(bodyParser.json())
// const register=asyncHandler( async (req,res)=>{
//     res.status(200).json({message:"ok"})
// })
const register= async(req,res)=>{
    const data=req.body;
    
//     if(data.userName==""||data.email==""||data.fullName==""){
//         return res.send("please filled all the data")
// //     }
    const {userName,email,password,fullName}=req.body
    if(
        [userName,email,password,fullName].some((field)=>(
            field?.trim()==""
        ))
    ){
        throw new ApiError(400,"all field is required")
        // return res.send("please filled all the data")
    }
    if(!(email.includes("@"))){
return res.send("email is invalid")
    }
    const isExisting=await userModel.find({$or:[{userName},{email}]})
    if(!isExisting){
        return res.send({message:"username or email is alredy exist"})
    }
     
//     console.log(req.files)
 const avtarLocalPath=req.files?.avtarImage[0]?.path
 const coverImageLocalPath=req.files?.coverImage[0]?.path
 console.log(avtarLocalPath)
 if(!avtarLocalPath){
    throw new ApiError(409,"avtar is required")
 }
 const avtar=await uploadOnCloudinary(avtarLocalPath)
 console.log(avtar);
 
 const coverImage=await uploadOnCloudinary(coverImageLocalPath)
 if(!avtar){
    throw new ApiError("avtar is required")
 }
// //  const re=new userModel(req.body) 
const user=await userModel.create(
    {
    userName,
    fullName,
    email,
    password,
    avtarImage:avtar?.url,
    coverImage:coverImage?.url||""

}
)
console.log({message:"user",user})
await user.save()
const createdUser= await userModel.findById(user._id).select(
    "-password -refreshToken"
)
console.log(createdUser)
// if(!createdUser){
//     throw new ApiError(500,"something went wrong")
// }
//  res.status(200).json("success")
    // await re.save()
    res.json({message:"create user success",user})
//  console.log(data);
// res.json({message:"success",data})
    // console.log(data)
}
module.exports=register