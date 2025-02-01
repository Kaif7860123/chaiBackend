const userModel = require('../../../models/user.model')
const { fields } = require('../../middleware/multer')
const ApiError = require('../../utills/apiError')
const asyncHandler=require('../../utills/asyncHandler')
const uploadOnCloudinary = require('../../utills/cloudinary')
// const register=asyncHandler( async (req,res)=>{
//     res.status(200).json({message:"ok"})
// })
const register=async(req,res)=>{
    const data=req.body
    // if(data.userName==""||data.email==""||data.fullName==""){
    //     return res.send("please filled all the data")
    // }
    const {userName,email,password,fullName}=req.body
    if(
        [userName,email,password,fullName].some((field)=>(
            field?.trim()==""
        ))
    ){
        throw new ApiError(400,"all field is required")
        // return res.send("please filled all the data")
    }
    if(!(email.includes("@",".com"))){
return res.send("email is invalid")
    }
    const isExisting=await userModel.findOne( 
       {
          $or:[{userName},{email}]
        }
    )
    if(isExisting){
        return res.send({message:"username or email is alredy exist"})
    }
     
    
 const avtarLocalPath=req.files?.avtarImage[0]?.path
 const coverImageLocalPath=req.files?.avtarImage[0]?.path
 if(!avtarLocalPath){
    throw new ApiError(409,"avtar is required")
 }
 const avtar=await uploadOnCloudinary(avtarLocalPath)
 const coverImage=await uploadOnCloudinary(coverImageLocalPath)
 if(!avtar){
    throw new ApiError("avtar is required")
 }
//  const re=new userModel(req.body) 
const userDetail=await userModel.create(
    {
        userName,
    fullName,
    email,
    password,
    avtar:avtar.url,
    coverImage:coverImage?.url||""

}
)
const createdUser=userDetail.findById(user._id).select(
    "-password -refreshToken"
)
if(!createdUser){
    throw new ApiError(500,"something went wrong")
}
return res.status(200).send(
    new ApiResponse(201,createdUser,message="successfully created user")
)
    // await re.save()
    // res.send({message:"create user success",data})
//  console.log(avtarLocalPath);
 
}
module.exports=register