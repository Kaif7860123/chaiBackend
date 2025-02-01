const {v2}=require("cloudinary")
const { resource } = require("../app")
const fs=require("fs")
v2.config(
    {
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_CLOUD_API_KEY,
        api_secret:process.env.CLOUDINARY_CLOUD_API_SECRET
    }
)
const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath) return null
        const response=await v2.uploader.upload(localFilePath,{
            resource_type:"auto"
          })
          console.log("file is uploaded on cloudinary",response.url)
          return response
    } catch (error) {
        fs.unlink(localFilePath)//file is removed temperory
        return null
    }
     
}
module.exports=uploadOnCloudinary