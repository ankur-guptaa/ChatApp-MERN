import React, { useState } from "react";
import axios from "axios";
import { useCurrentUser } from "../context/CurrentUserContext";
import { useAuthContext } from "../context/AuthContext";
import { useMessageContext } from "../context/MessageContext";

export const SendMessage = () => {
  const { currentUser } = useCurrentUser();
  const { authUser } = useAuthContext();
  const [message, setMessage] = useState("");
  const { messages, setMessages } = useMessageContext();

  return (
    <div className="py-5 mt-auto">
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="New Message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <svg
          className="cursor-pointer"
          fill="currentColor"
          width="24px"
          height="24px"
          viewBox="0 0 0.72 0.72"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          onClick={async () => {
            try {
              const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/messages`,
                {
                  reciverId: currentUser._id,
                  message,
                },
                {
                  headers: {
                    token: authUser,
                  },
                }
              );
              setMessages([...messages, res.data]);
              setMessage("");
            } catch (error) {
              console.log(error.message);
            }
          }}
        >
          <path d="m0.461 0.574 -0.098 -0.196 0.221 -0.221zM0.146 0.259l0.417 -0.123 -0.221 0.221zm-0.045 -0.018a0.015 0.015 0 0 0 -0.002 0.028l0.236 0.118 0.118 0.236a0.015 0.015 0 0 0 0.028 -0.002l0.15 -0.51a0.015 0.015 0 0 0 -0.019 -0.019z"></path>
        </svg>
      </label>
    </div>
  );
};
