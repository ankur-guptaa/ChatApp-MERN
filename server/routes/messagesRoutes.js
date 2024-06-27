import { Router } from "express";
import protectedRoute from "../middleware/protectedRoute.js";
import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";
import { getReciverSocketId, io } from "../socket/socket.js";

const router = Router();

router.get("/", protectedRoute, async (req, res) => {
    try {
        const senderId = req.user._id;
        const reciverId = req.headers._id;

        const conversation = await Conversation.findOne({ members: { $all: [senderId, reciverId] } });
        if (!conversation)
            throw new Error("Conversation doesnot exist!");

        const messages = await conversation.populate("messages").then(conversations => { return (conversations.messages) });

        if (!messages)
            throw new Error("Conversation exist but no message was send");

        res.status(200).send(messages);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

router.post("/", protectedRoute, async (req, res) => {
    try {
        const senderId = req.user._id;
        const { reciverId, message } = req.body;

        const newMessage = new Message({ senderId, reciverId, message });
        let newConversation = await Conversation.findOne({ members: { $all: [senderId, reciverId] } });
        if (!newConversation) {
            newConversation = new Conversation({ members: [senderId, reciverId] });
        }
        if (newMessage) {
            newConversation.messages.push(newMessage._id);
        }
        await Promise.all([newMessage.save(), newConversation.save()])

        const reciverSocketId = getReciverSocketId(reciverId);
        if (reciverSocketId) {
            io.to(reciverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).send(newMessage);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

export default router;