const mongoose=require("mongoose")

const toDoSchema=new mongoose.Schema({
    content:{type:String,required:true},
    complete:{type:Boolean,default:false},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    subToDo:[{type:mongoose.Schema.Types.ObjectId,ref:"subtodo"}]
},{timestamps:true})

module.exports=mongoose.model("todo",toDoSchema)