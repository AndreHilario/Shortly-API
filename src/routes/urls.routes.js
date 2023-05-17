import { Router } from "express";
import { deleteUrls, getAndOpenUrls, getUrlById, postShortUrl } from "../controllers/urls.controllers.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";
import { validateShortUrl } from "../middlewares/url.middleware.js";


const urlsRouter = Router();

urlsRouter.post("/urls/shorten", authValidation, validateSchema(urlSchema), postShortUrl);
urlsRouter.get("/urls/:id", validateShortUrl, getUrlById);
urlsRouter.get("/urls/open/:shortUrl", validateShortUrl, getAndOpenUrls);
urlsRouter.delete("/urls/:id", authValidation, validateShortUrl, deleteUrls)


export default urlsRouter;