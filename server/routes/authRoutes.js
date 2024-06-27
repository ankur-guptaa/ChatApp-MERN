import express from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        const user = await User.findOne({ userName });
        if (user) {
            throw new Error("User already exist.");
        }
        if (password != confirmPassword) {
            throw new Error("Confirm Password doesn't matches.");
        }
        if (password.length < 5) {
            throw new Error("Password length should not be less the 5.");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        let profilePic = "";

        if (!profilePic) {
            if (gender === "Male") {
                profilePic = `https://avatar.iran.liara.run/public/boy?username=${[userName]}`;
            }
            else {
                profilePic = `https://avatar.iran.liara.run/public/girl?username=${[userName]}`;
            }
        }

        const newUser = new User({ fullName, userName, password: hashedPassword, gender, profilePic });
        newUser.save();
        const token = jwt.sign({ userName }, process.env.KEY, { expiresIn: "1h" });
        res.status(200).send({ token, userId: newUser._id });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

router.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (user) {
            const hashedPassword = await bcrypt.compare(password, user.password)
            if (hashedPassword) {
                const token = jwt.sign({ userName }, process.env.KEY, { expiresIn: "1h" });
                res.status(200).send({ token, userId: user._id });
            }
            else {
                throw new Error("Invalid username or password!");
            }
        }
        else {
            throw new Error("Invalid username or password!");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

router.get("/me", protectedRoute, (req, res) => {
    res.status(200).send({ userId: req.user._id });
})

export default router;