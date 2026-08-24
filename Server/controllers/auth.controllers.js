import User from "../models/user.modules.js";
import bcrypt, { hash } from "bcrypt";
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

export const signup = async (req, res) => {
    try {
        const { fullname, email, password, mobile, role } = req.body;
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User Already Exsits" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password Atleast 6 character" })
        }
        if (String(mobile).length !== 10) {
            return res.status(400).json({ message: "Check your mobile number" })
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        user = await User.create({
            fullname,
            email,
            role,
            mobile,
            password: hashedpassword,
        })
        const token = await genToken(user._id);
        res.cookie("token", token, {
            secure: false, //baad me true karna hai
            sameSite: "strict",
            maxAge: 14 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json(`Signup Error ${error}`);
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User Doesn't Exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "incorrect password" });
        }
        const token = await genToken(user._id);
        res.cookie("token", token, {
            secure: false,  //baad me jab host karna hai to true karunga
            sameSite: "strict",
            maxAge: 14 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
        res.status(201).json(user);

    } catch (error) {
        return res.status(500).json(`Signup Error ${error}`);
    }
}

export const signout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Log Out Successfully" });
    } catch (error) {
        return res.status(400).json({ message: `sign Error ${error}` });
    }
}

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User Doesn't Exists" });
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetOtp = otp;
        user.OtpExpires = Date.now() + 5 * 60 * 1000;
        user.isOtpVerified = false;
        await user.save();
        await sendOtpMail(email, otp);
        return res.status(200).json({ message: "Otp send Successfully !" });
    } catch (error) {
        return res.status(500).json(`Send Otp Error ${error}`);
    }
};

export const VerifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.resetOtp != otp || user.OtpExpires < Date.now()) {

            return res.status(400).json({ message: "Invalid/Expire Otp" });

        }
        user.isOtpVerified = true;
        user.resetOtp = undefined;
        user.OtpExpires = undefined;
        await user.save();
        return res.status(200).json({ message: "Verify On otp" });
    } catch (error) {
        return res.status(500).json({ message: `Verify Otp error ${error}` });
    }
}

export const ResetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.isOtpVerified) {
            return res.status(400).json({ message: "otp Verification Required" });
        }
        const hashedpassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedpassword;
        user.isOtpVerified = false;
        await user.save();
        return res.status(200).json({ message: "Password Reset Successfully " })
    } catch (error) {
        return res.status(500).json({ message: `Reset password Error ${error}` });
    }
}

export const googleAuth = async (req, res) => {
    try {
        

        const { fullname, email } = req.body;
        // const { fullname, mobile, email, role } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                fullname,
                email,
            })
        }
        const token = await genToken(user._id);
        res.cookie("token", token, {
            secure: false,  //baad me jab host karna hai to true karunga
            sameSite: "strict",
            maxAge: 14 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
        return res.status(200).json(user)
    } catch (error) {
        console.error("GOOGLE AUTH ERROR:");
        console.error(error);
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);
        return res.status(500).json({ message: "Google Auth Error " })
    }

}