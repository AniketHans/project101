import { v2 as cloudinary } from "cloudinary";
import ApiError from "./ApiError.js";
import fs from "fs";
import { error } from "console";
import { response } from "express";

async function uploadOnCloudinary(localFilePath) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_API_KEY, // Click 'View Credentials' below to copy your API secret
    });
    try {
        if (!localFilePath) {
            throw new ApiError(500, "File Path does not exist", [error], error);
        }
        //Uploading the file on Clodinary
        const cloudinaryResponse = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "auto",
            }
        );

        console.log("File is upoloaded on cloudinary", cloudinaryResponse.url);
        return cloudinaryResponse;
    } catch (error) {
        fs.unlinkSync(localFilePath); //Remove the locally saved temporary file as the upload operation is failed
        return null;
    }
}

export { uploadOnCloudinary };
