import { Router } from "express";
import { postShortUrl } from "../controllers/urls.controllers.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";


const urlsRouter = Router();

urlsRouter.use(authValidation);
urlsRouter.post("/urls/shorten", validateSchema(urlSchema), postShortUrl);


export default urlsRouter;