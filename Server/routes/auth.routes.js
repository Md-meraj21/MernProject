import express from "express";
import { ResetPassword, sendOtp, signin, signout, signup, VerifyOtp } from "../controllers/auth.controllers.js";
const authRouter = express.Router();

authRouter.post("/signup",signup);
authRouter.post("/signin",signin);
authRouter.post("/signout",signout);

authRouter.post("/send-otp",sendOtp);
authRouter.post("/verify-otp ",VerifyOtp);
authRouter.post("/reset-otp",ResetPassword);

export default authRouter;