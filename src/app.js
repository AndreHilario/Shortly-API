import express from "express";
import cors from "cors";
import router from "./routes/index.routes.js";

const app = express();

const corsOptions = {
    origin: "https://projeto17-shortly-front-eta.vercel.app",
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));