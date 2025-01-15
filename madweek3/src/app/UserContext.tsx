"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context data
type UserContextType = {
  loggedInUserId: string | null;
  loggedInUserName: string | null;
  setLoggedInUserId: (id: string) => void;
  setLoggedInUserName: (name: string) => void;
};

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(
    localStorage.getItem("loggedInUserId") || null
  );

  const [loggedInUserName, setLoggedInUserName] = useState<string | null>(
    localStorage.getItem("loggedInUserName") || null
  );

  const updateUserId = (id: string) => {
    setLoggedInUserId(id);
    localStorage.setItem("loggedInUserId", id); // Persist user ID
  };

  const updateUserName = (name: string) => {
    setLoggedInUserName(name);
    localStorage.setItem("loggedInUserName", name); // Persist user ID
  };

  return (
    <UserContext.Provider
      value={{
        loggedInUserId,
        loggedInUserName,
        setLoggedInUserId: updateUserId,
        setLoggedInUserName: updateUserName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for consuming the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const SERVER_URL =
  "https://8d68-2001-2d8-6485-2cef-2588-95e0-e29a-d740.ngrok-free.app";
