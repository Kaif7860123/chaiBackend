const mongoose=require("mongoose")
const mongooseAggregratePaginate=require("mongoose-aggregate-paginate-v2")
const videoSchema=new mongoose.Schema(
 {
   videoFile:{type:String,required:true} ,//cloudinary url
   thumbnail:{type:String,required:true} ,
   title:{type:String,required:true} ,
   description:{type:String},
   duration:{type:Number,required:true},
   views:{type:Number,default:0},
   owner:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
   isPublished:{type:Boolean,default:false}
}
,{timestamps:true})
videoSchema.plugin(mongooseAggregratePaginate)
module.exports=mongoose.model("video",videoSchema)