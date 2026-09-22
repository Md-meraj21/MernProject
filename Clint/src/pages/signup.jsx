import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";


function Signup() {
    const primaryColor = "#ff4d2d";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";
    const [showpassword, setShowpassword] = useState(false);
    const [role, setRole] = useState("user")
    const navigate = useNavigate();
    const [fullname, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUp = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullname, email, password, mobile, role
            }, { withCredentials: true })
            console.log(result)
        } catch (error) {
            console.log(error);
        }
    }

    const handleGoogleAuth = async () => {
        
            if (!mobile) {
                return alert("Enter your Number ")
            }
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            try {
            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullName: result.user.displayName,
                email: result.user.email,
                mobile,
                role,
            }, { withCredentials: true });
            console.log(data);
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
                <p className="text-gray-600 mb-8">Create your account to get delicious Delites to your own destiny !</p>
                {/* Full Name */}

                <div className="mb-4">
                    <label htmlFor="FullName"
                        className='block text-gray-700 font-medium mb-1'
                    >
                        fullName
                    </label>
                    <input type="text" className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
                        placeholder="Enter your fullName"
                        style={{ borderColor: borderColor, border: "1px solid" }} onChange={(e) => setFullName(e.target.value)} value={fullname} />
                </div>
                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="Email"
                        className='block text-gray-700 font-medium mb-1'
                    >
                        Email
                    </label>
                    <input type="email" className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
                        placeholder="Enter your Email"
                        style={{ borderColor: borderColor, border: "1px solid" }} onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>

                {/* Mobile */}

                <div className="mb-4">
                    <label htmlFor="Mobile"
                        className='block text-gray-700 font-medium mb-1'
                    >
                        Mobile
                    </label>
                    <input type="tel" className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
                        placeholder="Enter your Mobile Number"
                        style={{ borderColor: borderColor, border: "1px solid" }} onChange={(e) => setMobile(e.target.value)} value={mobile} />
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
                            style={{ borderColor: borderColor, border: "1px solid" }} onChange={(e) => setPassword(e.target.value)} value={password} />
                        <button className="absolute right-3 top-[14px] cursor-pointer text-gray-500 "
                            onClick={() => setShowpassword(prev => !prev)}
                        >
                            {!showpassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                </div>

                {/* Role */}

                <div className="mb-4">
                    <label htmlFor="Role"
                        className='block text-gray-700 font-medium mb-1'
                    >
                        Role
                    </label>
                    <div className="flex gap-2">
                        {["user", "owner", "Delivery"].map((r) => {
                            return (
                                <button key={r} className="flex-1 border rounded-lg px-3 py-2 text-center 
                            font-medium transition-colors cursor-pointer"
                                    onClick={() => { setRole(r) }}
                                    style={
                                        role == r ?
                                            { backgroundColor: primaryColor, color: "white" }
                                            : { border: primaryColor, color: "#333" }

                                    }
                                >{r}</button>
                            )
                        })}
                    </div>
                </div>
                <button type="button" className="w-full font-semibold rounded-lg 
                        py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
                    onClick={handleSignUp}
                >
                    sign up
                </button>
                <button className="w-full mt-4 flex item-center justify-center
                 gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-100 cursor-pointer"
                    onClick={handleGoogleAuth}
                >
                    <FcGoogle size={20} />
                    <span>Sign up with Google !</span>
                </button>
                <p className="text-center mt-2">Already have account ? <span className="text-[#ff4d2d] cursor-pointer " onClick={() => {
                    navigate("/signin")
                }}>Sign In</span></p>
            </div>
        </div>
    );
}

export default Signup;