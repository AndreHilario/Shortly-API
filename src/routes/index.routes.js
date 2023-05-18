import { Router } from "express";
import authRouter from "./auth.routes.js";
import urlsRouter from "./urls.routes.js";
import userRouter from "./user.routes.js";


const router = Router();

router.use(authRouter);
router.use(urlsRouter);
router.use(userRouter);

export default router;