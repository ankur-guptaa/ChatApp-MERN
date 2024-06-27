import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserProvider } from "./context/CurrentUserContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { MessageContextProvider } from "./context/MessageContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CurrentUserProvider>
          <MessageContextProvider>
            <SocketContextProvider>
              <App />
            </SocketContextProvider>
          </MessageContextProvider>
        </CurrentUserProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
