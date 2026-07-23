import express from "express";
import { signin, signout, signup } from "../controllers/auth.controllers.js";
const authRouter = express();

authRouter.post("/signup",signup);
authRouter.post("/signin",signin);
authRouter.post("/signout",signout);

export default authRouter;