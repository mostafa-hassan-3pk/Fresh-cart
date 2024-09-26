import { createContext, useEffect, useState } from "react";

export const Authenticate = createContext();
const AuthenticateProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userName , setUserName] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  return (
    <div>
      <Authenticate.Provider value={{ token, setToken ,userName ,setUserName}}>
        {children}
      </Authenticate.Provider>
    </div>
  );
};

export default AuthenticateProvider;
