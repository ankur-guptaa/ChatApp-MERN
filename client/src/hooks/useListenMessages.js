import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useMessageContext } from "../context/MessageContext";

export const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useMessageContext();

    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (newMessage) => {
                setMessages([...messages, newMessage]);
            })
        }
    }, [messages]);
}