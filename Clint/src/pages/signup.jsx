import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";


function Signup() {
    const primaryColor = "#ff4d2d";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";
    const [showpassword, setShowpassword] = useState(false);
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
                        Name
                    </label>
                    <input type="text" className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
                        placeholder="Enter your fullName"
                        style={{ borderColor: borderColor, border: "1px solid" }} />
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
                        style={{ borderColor: borderColor, border: "1px solid" }} />
                </div>

                {/* Mobile */}

                <div className="mb-4">
                    <label htmlFor="Mobile"
                        className='block text-gray-700 font-medium mb-1'
                    >
                        Mobile
                    </label>
                    <input type="num" className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
                        placeholder="Enter your Mobile Number"
                        style={{ borderColor: borderColor, border: "1px solid" }} />

                    {/* Password */}

                    <div className="mb-4">
                        <label htmlFor="password"
                            className='block text-gray-700 font-medium mb-1'
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input type={`${showpassword?"text":"password"}`} className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
                                placeholder="Enter your Password"
                                style={{ borderColor: borderColor, border: "1px solid" }} />
                            <button className="absolute right-3 top-[14px] cursor-pointer text-gray-500 "
                            onClick={()=>setShowpassword(prev =>!prev)}
                            >
                                {!showpassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;