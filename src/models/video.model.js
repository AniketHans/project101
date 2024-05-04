import mongoose, { mongo } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; //This is use to write complex aggregation queries in Mongo DB
const videoSchema = new mongoose.Schema(
    {
        videoFile: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

//Mongoose allow us to add our plugins
videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video", videoSchema);
