import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
/**
 * Steps followed for user registration
 *  1. Get user details from frontend
 *  2. Validation check if non empty are sent empty
 *  3. Check if user already exists: using username, email
 *  4. Check for images, check for avatar
 *  5. upload them to cloudinary
 *  6. Create user object in db
 *  7. remove password and refresh token field from response
 *  8. return response
 */
const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body;

    if (
        [fullname, email, username, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
        throw new ApiError(409, "User with email or username already existed");
    }

    //multer gives access to files
    // console.log(req.files);
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImagePath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImagePath);
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email: email,
        fullName: fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password: password,
    });

    //Here we are checking in the db is the above user is successfully created in db or not
    // Here, we are also deselecting the fields that we dont want to be retrieved from the db call using '-' followed by fieldname
    const createdUser = await User.findById(user?._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user"
        );
    }

    return res
        .status(201)
        .json(
            new ApiResponse(200, createdUser, "User Registered Successfully")
        );
});
export { registerUser };
