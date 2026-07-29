import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function Signin() {
    const primaryColor = "#ff4d2d";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";
    const [showpassword, setShowpassword] = useState(false);
    const [role, setRole] = useState("user")
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignin = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signin`,{
                email, password
            },{withCredentials:true})
            console.log(result)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div
            className="min-h-screen flex w-full items-center justify-center p-4"
            style={{ backgroundColor: bgColor }}
        >
            <div
                className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border"
                style={{ borderColor: borderColor, border: "1px solid" }}
            >
                <h1
                    className="text-3xl font-bold mb-2"
                    style={{ color: primaryColor }}
                >
                    Food Fly
                </h1>
                <p className="text-gray-600 mb-8">Sign In your account to get delicious Delites to your own destiny !</p>
                
                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="Email"
                        className='block text-gray-700 font-medium mb-1'
                    >
                        Email
                    </label>
                    <input type="email" className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
                        placeholder="Enter your Email"
                        style={{ borderColor: borderColor, border: "1px solid" }} onChange={(e)=>setEmail(e.target.value)} value={email}/>
                </div>

                
                {/* Password */}

                <div className="mb-4">
                    <label htmlFor="password"
                        className='block text-gray-700 font-medium mb-1'
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input type={`${showpassword ? "text" : "password"}`} className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
                            placeholder="Enter your Password"
                            style={{ borderColor: borderColor, border: "1px solid" }} onChange={(e)=>setPassword(e.target.value)} value={password}/>
                        <button className="absolute right-3 top-[14px] cursor-pointer text-gray-500 "
                            onClick={() => setShowpassword(prev => !prev)}
                        >
                            {!showpassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                </div>
                {/* Forgot password */}
                <div className="text-right mb-1 text-[#ff4d2d] cursor-pointer" onClick={()=>navigate("/ForgotPassword")}>
                    forgot password
                </div>
                
                {/* button */}
                <button type="button" className="w-full font-semibold rounded-lg 
                        py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer" 
                        onClick={handleSignin}
                >
                    sign up
                </button>
                {/* Google SignIn */}
                <button className="w-full mt-4 flex item-center justify-center
                 gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-100 cursor-pointer">
                    <FcGoogle size={20} />
                    <span>Sign in with Google !</span>
                </button>
                <p className="text-center mt-2">No Account ? <span className="text-[#ff4d2d] cursor-pointer " onClick={()=> {
                    navigate("/signup")
                }}>Sign In</span></p>
            </div>
        </div>
    );
}

export default Signin;