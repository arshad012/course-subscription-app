import { Router } from "express";
import { LoginUser, SignupUser } from "../constrollers/index.js";

export const authRouter = Router();

authRouter.post("/signup", SignupUser);
authRouter.post("/login", LoginUser)