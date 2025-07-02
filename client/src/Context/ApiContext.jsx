import React, { createContext, useContext } from "react";


const BASE_URL = "https://expense-tracker-website-6w12.onrender.com"; 

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  return (
    <ApiContext.Provider value={{ BASE_URL }}>
      {children}
    </ApiContext.Provider>
  );
};

// 🔁 Use this hook in any component to access base URL
export const useApi = () => useContext(ApiContext);