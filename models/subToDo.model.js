const mongoose=require("mongoose")

const subToDo=new mongoose.Schema({
    content:{type:String,required:true},
    complete:{type:Boolean,default:false},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
},{timestamps:true})

module.exports=mongoose.model("subtodo",subToDo)
