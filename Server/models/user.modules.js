import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
    },
    mobile:{
        type:String,
        default:null,
    },
    role:{
        type:String,
        enum:["user","owner","Delivery"],
        default:"user",
    },
    resetOtp:{
        type:String
    },
    isOtpVerified:{
        type:Boolean,
        default:false,
    },
    OtpExpires:{
        type:Date,
        
    }

},{timestamps:true})

const User = mongoose.model("User",userSchema);
export default User;
