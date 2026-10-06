import React, { useState, useContext } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { AppContext } from "../Context/appContext";

function Signin() {
    const primaryColor = "#ff4d2d";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";
    const [showpassword, setShowpassword] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(AppContext) || {};

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignin = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signin`, {
                email, password
            }, { withCredentials: true });
            
            if (setUser) {
                setUser(result.data);
            }
            setLoading(false);
            navigate("/");
        } catch (err) {
            setLoading(false);
            const msg = err.response?.data?.message || "Signin failed";
            setError(msg);
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                email: result.user.email,
                fullname: result.user.displayName,
            }, { withCredentials: true });

            if (setUser) {
                setUser(data);
            }
            navigate("/");
        } catch (err) {
            console.error("Google Auth error:", err);
            setError(err.response?.data?.message || "Google signin failed");
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

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
                <p className="text-gray-600 mb-8">Sign In to your account to get delicious Delites to your doorstep!</p>

                {/* Form wrapper */}
                <form onSubmit={handleSignin}>
                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="Email" className="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            id="Email"
                            type="email"
                            required
                            className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                            placeholder="Enter your Email"
                            style={{ borderColor: borderColor, border: "1px solid" }}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showpassword ? "text" : "password"}
                                required
                                className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                                placeholder="Enter your Password"
                                style={{ borderColor: borderColor, border: "1px solid" }}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-[14px] cursor-pointer text-gray-500"
                                onClick={() => setShowpassword(prev => !prev)}
                            >
                                {!showpassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                    </div>

                    {/* Forgot password */}
                    <div
                        className="text-right mb-4 text-[#ff4d2d] cursor-pointer"
                        onClick={() => navigate("/ForgotPassword")}
                    >
                        Forgot password?
                    </div>

                    {/* Error display */}
                    {error && (
                        <p className="text-red-500 text-center mb-3 text-sm">*{error}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full font-semibold rounded-lg py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer flex justify-center items-center gap-2"
                    >
                        {loading ? <ClipLoader size={20} color="#fff" /> : "Sign In"}
                    </button>
                </form>

                {/* Google SignIn */}
                <button
                    type="button"
                    className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-100 cursor-pointer"
                    onClick={handleGoogleAuth}
                >
                    <FcGoogle size={20} />
                    <span>Sign in with Google</span>
                </button>

                <p className="text-center mt-4">
                    No Account?{" "}
                    <span
                        className="text-[#ff4d2d] cursor-pointer font-medium"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signin;