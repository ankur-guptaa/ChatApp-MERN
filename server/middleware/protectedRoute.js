import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            throw new Error("Unauthorized Access!");
        }
        const decode = jwt.verify(token, process.env.KEY);
        if (!decode) {
            throw new Error("Unauthorized Access!");
        }
        const user = await User.findOne({ userName: decode.userName });
        if (user) {
            req.user = user;
            next();
        }
        else {
            throw new Error("User not Found!");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

export default protectedRoute;