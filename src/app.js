import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
// app.use() is used while using a middleware or while doing configuration settings.

//Configuriung the cors for our site
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

//Configuring size of json to be excepted from client
app.use(express.json({ limit: "16kb" }));

//Configuring so that we can encode the url as well.
app.use(
    express.urlencoded({
        extended: true,
    })
);

//This will saving and accessing the static data like pictures, pdfs etc in public folder
app.use(express.static("public"));

//This is used to perform CRUD operations on the cookies of the user.
app.use(cookieParser());

//routes import
//routes are imported like below as we have to do segregation of different routes
import userRouter from "./routes/user.routes.js";

//routes declarartion
app.use("/api/v1/users", userRouter);
export default app;
