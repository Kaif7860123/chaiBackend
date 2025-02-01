class ApiError extends Error{
    constructor(
        statusCode,
        message="something went wrong",
        stack="",
        error=[]
    )
    {
super(message)
    this.message=message,
    this.success=false,
    this.statusCode=statusCode,
    this.data=null,
this.error=error
if(stack){
    this.stack=stack
}
else{
    Error.captureStackTrace(this,this.constructor)
}
    }
}
module.exports=ApiError