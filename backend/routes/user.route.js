import express from "express"
import { checkAuth } from "../middlewares/auth.middleware.js";
import { getUserData, updateFitnessProfile } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get('/user-data',checkAuth,getUserData);
userRouter.put('/update-fitness-profile',checkAuth,updateFitnessProfile);

export default userRouter;