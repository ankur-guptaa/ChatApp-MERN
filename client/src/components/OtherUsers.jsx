import React from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import { useSocketContext } from "../context/SocketContext";
import { useMessageContext } from "../context/MessageContext";

export const OtherUsers = (props) => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { setMessages } = useMessageContext();
  const { onlineUsers } = useSocketContext();

  return (
    <div className="flex flex-col cursor-pointer">
      <div
        className={`flex items-center py-3 gap-3 ${
          currentUser == props.user ? "bg-blue-900" : ""
        }`}
        onClick={() => {
          if (props.user !== currentUser) {
            setCurrentUser(props.user);
            setMessages([]);
          }
        }}
      >
        <div
          className={`avatar ${
            onlineUsers && onlineUsers.includes(props.user._id) ? "online" : ""
          }`}
        >
          <div className=" w-12 rounded-full">
            <img src={props.user.profilePic} />
          </div>
        </div>
        <div>{props.user.fullName}</div>
      </div>
      <div className="divider h-1 m-0 p-0"></div>
    </div>
  );
};
