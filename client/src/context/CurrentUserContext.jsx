import { createContext, useContext, useState } from "react";

export const CurrentUserContext = createContext();

export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
