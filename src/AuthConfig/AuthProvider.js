import { createContext, useState } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  const signout = (callback) => {
    setUser(null);
    callback();
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
