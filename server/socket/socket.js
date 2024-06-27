import express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENTURL,
        methods: ["GET", "POST"],
    }
});

const connectedUser = {};

export const getReciverSocketId = (reciverId) => {
    return connectedUser[reciverId];
}

io.on("connection", (socket) => {
    // console.log("A user is Connected with Id ", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId)
        connectedUser[userId] = socket.id;

    io.emit("connectedUser", Object.keys(connectedUser));
    // console.log(connectedUser);

    socket.on("disconnect", () => {
        // console.log("User is Disconnected and Id is ", socket.id);
        // console.log(userId);
        delete connectedUser[userId];
        io.emit("connectedUser", Object.keys(connectedUser));
    })
});

export { app, server, io };