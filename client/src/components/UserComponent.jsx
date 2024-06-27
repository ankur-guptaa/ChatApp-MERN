import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext.jsx";
import { SearchBar } from "./SearchBar";
import { OtherUsers } from "./OtherUsers";
import { LogOut } from "./LogOut";

export const UserComponent = () => {
  const { authUser } = useAuthContext();
  const [users, setUsers] = useState([{}]);

  const getUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/users`,
        {
          headers: {
            token: authUser,
          },
        }
      );
      if (!res) {
        throw new Error("Cannot get the other users details");
      }
      setUsers(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-1/2 flex flex-col pl-5 min-w-72">
      <SearchBar></SearchBar>

      <div className="overflow-auto">
        {users.map((user) => {
          if (user.userName) {
            return <OtherUsers user={user} />;
          }
        })}
      </div>

      <LogOut></LogOut>
    </div>
  );
};
