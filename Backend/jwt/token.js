import jwt from "jsonwebtoken"
import User from "../modals/user.modal.js";
export const generateTokenAndSaveInCookies=async(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"20d"
    });
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        path:"/"
    });
   await User.findByIdAndUpdate(userId,{token});
   return token;
}
