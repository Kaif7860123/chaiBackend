const asyncHandler=(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))

    }
}

module.exports=asyncHandler



// const asyncHandler=(fn)=>async(err,req,res)=>{
// try {
//     await fn(req,res,next)
// } catch (error) {
//     res.staus(err.code||500).json({
//         success:false,
//         message:err.message
//     })
// }
// }
// module.exports=asyncHandler