"use client";

import { auth } from "../../firebase/config";
import { createContext } from "react";
auth;

export const MyContext = createContext();

const ContextProvider = ({ children }) => {
  return <MyContext.Provider value={auth}>{children}</MyContext.Provider>;
};

export default ContextProvider;
