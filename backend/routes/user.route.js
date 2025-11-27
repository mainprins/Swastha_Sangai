import express from "express"
import { checkAuth } from "../middlewares/auth.middleware.js";
import { getUserData } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get('/user-data',checkAuth,getUserData);

export default userRouter;