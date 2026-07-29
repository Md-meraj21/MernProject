import User from "../models/user.modules.js";
import bcrypt from "bcrypt";
import genToken from "../utils/token.js";

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