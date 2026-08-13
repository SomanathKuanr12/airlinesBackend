const express=require('express');


const authController=require('../controller/auth.controller')


const authRouter=express.Router();

authRouter.post('/signup',authController.signUp)
authRouter.post('/signin',authController.signIN)
authRouter.post('/validate_email',authController.validateEmail)
authRouter.post('/otp',authController.otpService)
authRouter.post('/forgot_password',authController.forgotPassword)





module.exports=router;