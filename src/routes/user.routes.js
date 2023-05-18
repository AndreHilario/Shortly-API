import { Router } from "express";
import { getUsers } from "../controllers/users.controllers.js";
import { authValidation } from "../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter.get("/users/me", authValidation, getUsers);

export default userRouter;