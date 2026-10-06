import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

const isAuth = async (req,res,next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "token is not found" });
        }
        const decodeToken = jwt.verify(token, process.env.SECRET);
        console.log(decodeToken);
        if (!decodeToken) {
            return res.status(401).json({ message: "Token not verified" });
        }
        req.userId = decodeToken.userId;
        next();
    } catch (error) {
        return res.status(500).json({ message: "isAuth Error" });
    }
}
export default isAuth;