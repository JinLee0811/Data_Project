import { createContext } from "react";
import axios from "axios";

import { useUserInfo } from '../../hooks/user.hook'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const serverUrl = process.env.REACT_APP_API_URL;
  const {isAdmin, isLoggedIn, setUserInfo} = useUserInfo()


  const login = async (email, password) => {
    try {
      const response = await axios.post(
        serverUrl + "/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      setUserInfo(response.data)
    } catch (err) {
      //backend error handling 추가해야함.
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await axios.delete(serverUrl + "/logout", { withCredentials: true });

      window.location.href = '/'
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isAdmin, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
