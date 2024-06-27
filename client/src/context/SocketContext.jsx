import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext.jsx";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUser] = useState([]);
  const { authUser, userId } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const tempSocket = io(import.meta.env.VITE_SERVER_URL, {
        query: {
          userId: userId,
        },
      });
      setSocket(tempSocket);

      tempSocket.on("connectedUser", (connectedUser) => {
        // console.log(connectedUser)
        setOnlineUser(connectedUser);
      });

      return () => tempSocket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser, userId]);

  return (
    <SocketContext.Provider
      value={{ socket, setSocket, onlineUsers, setOnlineUser }}
    >
      {children}
    </SocketContext.Provider>
  );
};
