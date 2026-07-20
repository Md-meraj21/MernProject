import User from "../models/user.modules.js";
import bcrypt from "bcrypt.js";
import genToken from "../utils/token.js";

export const signup = async (req,res) => {
    try {
        const {fullname , email , password , mobile , role} = req.body;
        const user = await User.findOne({email})
        if(user) {
            return res.status(400).json({message:"User Already Exsits"})
        }
        if(password.length<6) {
            return res.status(400).json({message:"password Atleast 6 character"})
        }
        if(mobile.length<10) {
            return res.status(400).json({message:"Check your mobile number"})
        }
        const hashedpassword = await bcrypt.hash(password,10);
        user = await User.create({
            fullname,
            email,
            role,
            mobile,
            password:hashedpassword,
        })
        const token = await genToken(user._id);
        res.cookie("token",token,{
            secure:false, //baad me true karna hai
            sameSite:"strict",
            maxAge:14*24*60*60*1000,
            httpOnly:true,
        })
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json(`Signup Error ${error}`);
    }
}