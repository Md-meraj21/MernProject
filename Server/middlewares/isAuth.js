import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

const isAuth = async (req,res,next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            res.status(400).json({message:"token is not found"});
        }
        const decodeToken = jwt.verify(token,process.env.SECRET);
        if (!decodeToken) {
            res.status(400).json({message:"Token not verify"})
        }
        // console.log(decodeToken);
        req.userId = decodeToken.userId;
        next();
    } catch (error) {
         res.status(500).json({message:"isAuth Error"});
    }
}
export default isAuth;