import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import { app, server } from "./socket/socket.js";

app.use(express.json());
app.use(cors({ origin: process.env.CLIENTURL }));

mongoose.connect(process.env.CONNECTMONGODB);

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/messages", messagesRoutes);

server.listen(process.env.PORT, () => { console.log("Server is running at port 3000") });