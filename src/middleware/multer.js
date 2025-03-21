const multer=require("multer")
const path=require("path")
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
 cb(null,'./public/temp')
    },
    filename:(req,file,cb)=>{
  return cb(null , Date.now() + path.extname(file.originalname))
    }
})
const uploadFile=multer({
    storage:storage
})
// console.log(uploadFile)
module.exports=uploadFile
 