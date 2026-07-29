import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [step, setStep] = useState(3);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [otp,setOtp] = useState("");
    const [newPassword , setNewpassword] = useState("");
    const [conformPassword , setConformPassword] = useState("");
    return (
        <div className="flex w-full items-center justify-center min-h-screen p-4  bg-[#fff9f6]" >
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
                <div className="flex items-center gap-4 mb-4">
                    <IoIosArrowRoundBack size={30} className="text-[#ff4d2d] cursor-pointer"
                     onClick={()=>navigate("/signin")}  />
                    <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
                        Forgot Password !
                    </h1>
                </div>
                {/* Edit Email */}
                {step == 1
                    &&
                    <div>
                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="Email"
                                className='block text-gray-700 font-medium mb-1'
                            >
                                Email
                            </label>
                            <input type="email" className="w-full rounded-lg px-3 py-2
                             focus:outline-none focus:border-orange-500 border-[1px] border-gray-200 "
                                placeholder="Enter your Email"
                                 onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>
                        {/* button */}
                <button type="button" className="w-full font-semibold rounded-lg 
                        py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer" 
                        
                >
                    Send Otp
                </button>
                    </div>
                }
                 {/* Enter Otp or verify*/}
                {step == 2
                    &&
                    <div>
                        {/* OTP Entery */}
                        <div className="mb-4">
                            <label htmlFor="OTP"
                                className='block text-gray-700 font-medium mb-1'
                            >
                                OTP
                            </label>
                            <input type="phone" className="w-full rounded-lg px-3 py-2
                             focus:outline-none focus:border-orange-500 border-[1px] border-gray-200 "
                                placeholder="Enter Otp"
                                 onChange={(e) => setOtp(e.target.value)} value={otp} />
                        </div>
                        {/* button */}
                <button type="button" className="w-full font-semibold rounded-lg 
                        py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer" 
                        
                >
                    Verify
                </button>
                    </div>
                }
                 {/* Reset your password*/}
            {step == 3
                    &&
                    <div>
                        {/* Enter your new password */}
                        <div className="mb-4">
                            <label htmlFor="NewPassword"
                                className='block text-gray-700 font-medium mb-1'
                            >
                               New Password
                            </label>
                            <input type="phone" className="w-full rounded-lg px-3 py-2
                             focus:outline-none focus:border-orange-500 border-[1px] border-gray-200 "
                                placeholder="Enter your new password"
                                 onChange={(e) => setNewpassword(e.target.value)} value={newPassword} />
                        </div>
                        {/* COnformation  password */}
                        <div className="mb-4">
                            <label htmlFor="ConformPassword"
                                className='block text-gray-700 font-medium mb-1'
                            >
                               Conform Password
                            </label>
                            <input type="phone" className="w-full rounded-lg px-3 py-2
                             focus:outline-none focus:border-orange-500 border-[1px] border-gray-200 "
                                placeholder="Conform password"
                                 onChange={(e) => setConformPassword(e.target.value)} value={conformPassword } />
                        </div>
                        {/* button */}
                <button type="button" className="w-full font-semibold rounded-lg 
                        py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer" 
                        
                >
                    Done
                </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default ForgotPassword;