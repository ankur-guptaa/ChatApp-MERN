import React from "react";
import { useCurrentUser } from "../context/CurrentUserContext";

export const Messages = (props) => {
  const { currentUser } = useCurrentUser();

  return (
    <div
      className={`chat ${
        props.message.reciverId == currentUser._id ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-bubble">{props.message.message}</div>
      <div className="chat-footer opacity-50">{props.message.createdAt}</div>
    </div>
  );
};
