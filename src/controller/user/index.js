const express=require("express")
const app=express()
app.use(express.json())
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
const userModel = require('../../../models/user.model')
const { fields } = require('../../middleware/multer')
const ApiError = require('../../utills/apiError')
const ApiResponse = require('../../utills/apiResponse')
const asyncHandler=require('../../utills/asyncHandler')
const uploadOnCloudinary = require('../../utills/cloudinary')
const jwt=require("jsonwebtoken")

// const generateAccessAndRefereshToken=async(userId)=>{
//     try {
//         // console.log(userId);
        
//         const user=await userModel.findById(userId)
//         // const accessToken=user.generateAccessToken()
//         // const refreshToken=user.generateRefreshToken()
//         // user.accessToken=accessToken
//         // user.refreshToken=refreshToken
//         // console.log( user.accessToken)
//         // await user.save({validateBeforeSave:false})
//         // return {accessToken,refreshToken}
        
//     }
//      catch (error) {
//         throw new ApiError(400,"token is invalid")
//     }


// }
const register= async(req,res)=>{
    const data=req.body;
 
    const {userName,email,password,fullName}=req.body
    if(
        [userName,email,password,fullName].some((field)=>(
            field?.trim()==""
        ))
    ){
        throw new ApiError(400,"all field is required")
    }
    if(!(email.includes("@"))){
return res.send("email is invalid")
    }
    const isExisting=await userModel.find({$or:[{userName},{email}]})
    if(!isExisting){
        return res.send({message:"username or email is alredy exist"})
    }
     
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
const createdUser= await userModel.findById(user._id).select(
    "-password -refreshToken"
)
console.log(createdUser)
if(!createdUser){
    throw new ApiError(500,"something went wrong")
}
    await user.save()
    res.json({message:"create user success",user})
 
}

const login=async(req,res)=>{
const {email,userName,password}=req.body
 const user=await userModel.findOne({
    $or:[{userName},{email}]
 })
 if(!user){
    throw new ApiError(400,"user does not exist")
 }
//  const isValidPassword=await user.isPasswordCorrect(password)
//  console.log(isValidPassword)
const isValidPassword=user.password===password
console.log(isValidPassword)
 if(!isValidPassword){
    throw new ApiError(401,"Invalid Credential")
 }
//  const {accessToken,refreshToken}=
//  await generateAccessAndRefereshToken(user._id)
 const loggedInUser=await userModel.findById(user._id).select("-password -refreshToken")
 const options={
    httpOnly:true,
    secure:true
}
const accessToken=jwt.sign({userId:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"})
const refreshToken=jwt.sign({userId:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"1h"})
 return res
 .status(200)
 .cookie("accessToken",accessToken,options)
 .cookie("refreshToken",refreshToken,options)
 .json({message:"loggedIn successfully",user:loggedInUser,accessToken,refreshToken})
 
//  res.send({message:"token",user})
}
const logOutUser=async(req,res)=>{
        await userModel.findByIdAndUpdate(
            req.userId._id,
            {
                $set:{refreshToken:undefined}
            }
           
         )
         const options={
            httpOnly:true,
            secure:true
         }
         return res
         .status(200)
         .clearCookie("accessToken",options)
         .clearCookie("refreshToken",options)
         .json({message:"user logged out successfully"})
}
module.exports={register,login,logOutUser}
   
