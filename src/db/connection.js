import mongoose from "mongoose";
import { logInfo, logError } from "../utils/logging.js";
import { DB_NAME } from "../constants.js";
/* 
 Always use Error Handling and Async await while connecting with the database 
*/

async function connectDB(app) {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        logInfo(
            `MongoDB connected !! DB HOST:${connectionInstance.connection.host}`
        );

        //If the db is connecte but espress app is not able to communicate to db
        app.on("error", (error) => {
            throw "Application not able to talk to DB";
        });
    } catch (err) {
        logError(err, "MongoDB connection failed!!");
        process.exit(1);
    }
}

export default connectDB;
