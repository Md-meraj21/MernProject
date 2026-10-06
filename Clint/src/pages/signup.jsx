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

function Signup() {
    const primaryColor = "#ff4d2d";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";
    const [showpassword, setShowpassword] = useState(false);
    const [role, setRole] = useState("user");
    const navigate = useNavigate();
    const { setUser } = useContext(AppContext) || {};

    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (mobile.length !== 10) {
            setError("Mobile number must be exactly 10 digits");
            setTimeout(() => setError(""), 3000);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            setTimeout(() => setError(""), 3000);
            return;
        }

        setLoading(true);
        setError("");
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullname,
                email,
                password,
                mobile,
                role
            }, { withCredentials: true });

            if (setUser) {
                setUser(result.data);
            }
            setLoading(false);
            navigate("/");
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || "Signup failed");
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    const handleGoogleAuth = async () => {
        if (!mobile) {
            setError("Please enter your mobile number first");
            setTimeout(() => setError(""), 3000);
            return;
        }

        if (mobile.length !== 10) {
            setError("Mobile number must be exactly 10 digits");
            setTimeout(() => setError(""), 3000);
            return;
        }

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullname: result.user.displayName, // Matches backend 'fullname'
                email: result.user.email,
                mobile,
                role,
            }, { withCredentials: true });

            if (setUser) {
                setUser(data);
            }
            navigate("/");
        } catch (err) {
            console.error("Google Auth error:", err);
            setError(err.response?.data?.message || "Google signup failed");
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
                <p className="text-gray-600 mb-8">Create your account to get delicious delights delivered to your doorstep!</p>

                <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
                    {/* Full Name */}
                    <div className="mb-4">
                        <label htmlFor="FullName" className="block text-gray-700 font-medium mb-1">
                            Full Name
                        </label>
                        <input
                            id="FullName"
                            type="text"
                            required
                            className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                            placeholder="Enter your full name"
                            style={{ borderColor: borderColor, border: "1px solid" }}
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullname}
                        />
                    </div>

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
                            placeholder="Enter your email"
                            style={{ borderColor: borderColor, border: "1px solid" }}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    {/* Mobile */}
                    <div className="mb-4">
                        <label htmlFor="Mobile" className="block text-gray-700 font-medium mb-1">
                            Mobile
                        </label>
                        <input
                            id="Mobile"
                            type="tel"
                            maxLength={10}
                            required
                            className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                            placeholder="Enter your 10-digit mobile number"
                            style={{ borderColor: borderColor, border: "1px solid" }}
                            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                            value={mobile}
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
                                minLength={6}
                                className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                                placeholder="Enter password (min 6 characters)"
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

                    {/* Role */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Role
                        </label>
                        <div className="flex gap-2">
                            {[
                                { key: "user", label: "User" },
                                { key: "owner", label: "Owner" },
                                { key: "Delivery", label: "Delivery" }
                            ].map((r) => {
                                return (
                                    <button
                                        key={r.key}
                                        type="button"
                                        className="flex-1 rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer border"
                                        onClick={() => setRole(r.key)}
                                        style={
                                            role === r.key
                                                ? { backgroundColor: primaryColor, color: "white", borderColor: primaryColor }
                                                : { borderColor: "#ddd", color: "#333", backgroundColor: "white" }
                                        }
                                    >
                                        {r.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <p className="text-red-500 text-center mb-3 text-sm">*{error}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full font-semibold rounded-lg py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer flex justify-center items-center gap-2"
                        disabled={loading}
                    >
                        {loading ? <ClipLoader size={20} color="#fff" /> : "Sign Up"}
                    </button>
                </form>

                {/* Google SignUp Button */}
                <button
                    type="button"
                    className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-100 cursor-pointer"
                    onClick={handleGoogleAuth}
                >
                    <FcGoogle size={20} />
                    <span>Sign up with Google</span>
                </button>

                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <span
                        className="text-[#ff4d2d] cursor-pointer font-medium"
                        onClick={() => navigate("/signin")}
                    >
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup;