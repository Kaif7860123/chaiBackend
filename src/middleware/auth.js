const userModel = require("../../models/user.model")
const ApiError = require("../utills/apiError")
const jwt=require("jsonwebtoken")
const verifyJWT=async(req, _ ,next)=>{
try {
    // const token=req.cookies?.accessToken||req.headers?.("authorization").replace("Bearer ","")
    // const token=req.cookies?.accessToken||req.headers?.("Authorization").replace("Bearer ","")
    const token=req.headers?.authorization?.split(" ")[1]
console.log(token);

    if(!token){
        throw new ApiError(400,"unauthorised access")
    }
    const user=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    //  console.log(decodedToken);
     
        // const user= await userModel.findById(decodedToken?._id).select("-password -refreshToken")
        // console.log(user);
        
        if(!user){
            throw new ApiError(402,"invalid user")
        }
        req.userId=user.userId
        next()
} catch (error) {
    throw new ApiError(error?.message||"invalid token")
}
}
module.exports=verifyJWT