import React, { useEffect, useRef } from "react";
import axios from "axios";
import { CurrentUser } from "./CurrentUser";
import { Messages } from "./Messages";
import { SendMessage } from "./SendMessage";
import { useCurrentUser } from "../context/CurrentUserContext";
import { useAuthContext } from "../context/AuthContext";
import { useMessageContext } from "../context/MessageContext";
import { useListenMessages } from "../hooks/useListenMessages";

export const MessageComponent = () => {
  const { currentUser } = useCurrentUser();
  const { authUser } = useAuthContext();
  const { messages, setMessages } = useMessageContext();
  useListenMessages();

  const lastMessage = useRef();
  useEffect(() => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView();
    }
  }, [messages]);

  const getMessages = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/messages`,
        {
          headers: {
            token: authUser,
            _id: currentUser._id,
          },
        }
      );
      if (!res.data) {
        throw new Error("Cannot get the Messages");
      }
      setMessages(res.data);
    } catch (error) {
      // setMessages([]);
      // console.log(error.message);
    }
  };

  useEffect(() => {
    getMessages();
  }, [currentUser]);

  if (currentUser) {
    return (
      <div className="flex flex-col w-screen pr-5">
        <CurrentUser />
        <div className="flex flex-col overflow-auto h-full">
          {messages.length ? (
            messages.map((message) => {
              return (
                <div>
                  <Messages message={message} />
                  <div ref={lastMessage} />
                </div>
              );
            })
          ) : (
            <div className="flex h-full items-center justify-center">
              <h1 className="text-xl">Start sending the messages.</h1>
            </div>
          )}
        </div>
        <SendMessage />
      </div>
    );
  }
  return (
    <div className="flex flex-col w-screen pr-5 items-center justify-center">
      <h1 className="text-xl">Hi there, select any user to send messages.</h1>
    </div>
  );
};
