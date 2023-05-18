import { Router } from "express";
import { getRanking, getUsers } from "../controllers/users.controllers.js";
import { authValidation } from "../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter.get("/users/me", authValidation, getUsers);
userRouter.get("/ranking", getRanking);

export default userRouter;