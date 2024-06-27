import React, { useEffect } from "react";
import { Header } from "../components/Header.jsx";
import { UserComponent } from "../components/UserComponent.jsx";
import { MessageComponent } from "../components/MessageComponent.jsx";

export const Home = () => {

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex gap-20 h-full overflow-auto">
        <UserComponent />
        <MessageComponent />
      </div>
    </div>
  );
};
