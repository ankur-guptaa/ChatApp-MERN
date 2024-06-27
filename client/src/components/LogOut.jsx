import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { useMessageContext } from "../context/MessageContext";
import { useCurrentUser } from "../context/CurrentUserContext";
import { useSocketContext } from "../context/SocketContext";

export const LogOut = () => {
  const { setAuthUser, setUserId } = useAuthContext();
  const { setMessages } = useMessageContext();
  const { setCurrentUser } = useCurrentUser();
  const { setSocket, setOnlineUser } = useSocketContext();

  return (
    <div className="py-5 mt-auto">
      <svg
        className="cursor-pointer"
        width="24px"
        height="24px"
        viewBox="0 0 0.3 0.3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        transform="matrix(-1,0,0,1,0,0)"
        onClick={() => {
          setMessages([]);
          setCurrentUser(null);
          setUserId(null);
          setSocket(null);
          setOnlineUser(null);

          localStorage.removeItem("token");
          setAuthUser(null);
        }}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.02 0.02h0.14v0.02H0.04v0.22h0.12v0.02H0.02zm0.197 0.063 0.067 0.067 -0.067 0.072 -0.015 -0.014L0.247 0.16H0.08V0.14h0.166l-0.043 -0.043z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
};
