import express from "express"
import { isAuthenticated, login, logout, resetPassword, sendResetOtp, sendVerifyOtp, signup, verifyEmail } from "../controllers/auth.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post('/login',login);
authRouter.post('/signup',signup);
authRouter.post('/logout',logout);
authRouter.post('/send-verify-otp',checkAuth,sendVerifyOtp);
authRouter.post('/verify-email',checkAuth,verifyEmail);
authRouter.post('/is-auth',checkAuth,isAuthenticated);
authRouter.post('/send-reset-otp',checkAuth,sendResetOtp);
authRouter.post('/reset-password',checkAuth,resetPassword);

export default authRouter;