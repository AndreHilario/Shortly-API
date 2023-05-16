import { Router } from "express";
import { login, signup } from "../controllers/auth.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signupSchema } from "../schemas/signup.schema.js";


const authRouter = Router();

authRouter.post("/signup", validateSchema(signupSchema), signup);
authRouter.post("/signin", login);

export default authRouter;