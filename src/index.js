import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import { logError, logInfo } from "./utils/logging.js";
import app from "./app.js";
dotenv.config();
connectDB(app)
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            logInfo(`Server started at Port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        logError(err, "Mongo Db connection failed");
    });
