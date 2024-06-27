import { Router } from "express";
import protectedRoute from "../middleware/protectedRoute.js";
import User from "../models/userModel.js";

const router = Router();

router.get("/", protectedRoute, async (req, res) => {
    try {
        const user = req.user;
        const otherUsers = await User.find({ _id: { $ne: user._id } }).select("-password");
        if (!otherUsers) {
            throw new Error("Users not Found!");
        }
        res.status(200).send(otherUsers);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

export default router;