import React from "react";
import { useCurrentUser } from "../context/CurrentUserContext";

export const CurrentUser = () => {
  const { currentUser } = useCurrentUser();

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex items-center justify-center gap-3">
        <div className="avatar">
          <div className=" w-16 rounded-full">
            <img src={currentUser.profilePic} />
          </div>
        </div>
        <div>{currentUser.fullName}</div>
      </div>
      <div className="flex flex-col w-full">
        <div className="divider"></div>
      </div>
    </div>
  );
};
