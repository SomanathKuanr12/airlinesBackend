
const authService=require('../services/auth.service')

const signUp=async(req,res)=>{
    const result=await authService.signUp(req.body);
    return res.status(200).json({
                staus:"SUCCESS",
                 message:"User Registered Successfully",
    })
}
const signIn=async(req,res)=>{
    const result=await authService.signIn(req.body);
    return res.status(200).json({
        staus:"SUCCESS",
        message:"User LoggedIn Successfully",
        data:result
    });
}

module.exports={
    signUp,
    signIn
}