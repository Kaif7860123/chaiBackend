const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchema=new mongoose.Schema({
    userName:{type:String,required:true,unique:true,lowercase:true,trim:true,index:true},
    email:{type:String,required:true,unique:true,lowercase:true,trim:true},
    fullName:{type:String},
    avtarImage:{type:String,required:true},//cloudinary url
    coverImage:{type:String},
    watchHistory:{type:mongoose.Schema.Types.ObjectId,ref:"video"},
    password:{type:String,required:[true,'password is required']},
    refreshToken:{type:String}
},{timestamps:true})
userSchema.pre("save",async function(req,res,next){
    if(!this.isModified("password")) return next
this.password= await bcrypt.hash(this.password,10)
next
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken= function(){
    jwt.sign(
        {
            _id:this._id,
            userName:this.userName,
            fullName:this.fullName,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:ACCESS_TOKEN_EXPIRY}
    )
}
userSchema.methods.generateRefreshToken= function(){
    jwt.sign(
        {
            _id:this._id,
             
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:REFRESH_TOKEN_EXPIRY}
    )
}
})
module.exports=mongoose.model("user",userSchema)