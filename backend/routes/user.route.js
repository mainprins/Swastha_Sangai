import express from "express"
import { checkAuth } from "../middlewares/auth.middleware.js";
import {  getAllUsers, getUserData, updateFitnessProfile } from "../controllers/user.controller.js";
import upload from "../middlewares/upload.js";

const userRouter = express.Router();

userRouter.get('/user-data',checkAuth,getUserData);
userRouter.put('/update-fitness-profile',checkAuth,upload.single('profileImage'),updateFitnessProfile);
userRouter.get('/getAllUsers',checkAuth,getAllUsers);

export default userRouter;