import { Router } from "express";
import { getUrlById, postShortUrl } from "../controllers/urls.controllers.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";


const urlsRouter = Router();

urlsRouter.post("/urls/shorten", authValidation, validateSchema(urlSchema), postShortUrl);
urlsRouter.get("/urls/:id", getUrlById);


export default urlsRouter;