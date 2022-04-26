import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const hrInfo = JSON.parse(localStorage.getItem("HR_info"));
  const [auth, setAuth] = useState({
    name: hrInfo ? hrInfo.name : "",
    role: hrInfo ? hrInfo.role : "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
