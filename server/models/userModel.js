import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;