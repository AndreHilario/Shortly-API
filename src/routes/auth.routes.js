import { Router } from "express";
import { login, signup } from "../controllers/auth.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signupSchema } from "../schemas/signup.schema.js";
import { validateLogin, validateSignup } from "../middlewares/auth.middleware.js";
import { loginSchema } from "../schemas/login.schema.js";


const authRouter = Router();

authRouter.post("/signup", validateSchema(signupSchema), validateSignup, signup);
authRouter.post("/signin", validateSchema(loginSchema), validateLogin, login);

export default authRouter;