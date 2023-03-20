import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const serverUrl = process.env.REACT_APP_API_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(serverUrl + "/account", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        console.log(response.data);
        if (response?.data) {
          setIsLoggedIn(true);
          setIsAdmin(response.data.isAdmin);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, [isLoggedIn]);

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
      setIsLoggedIn(true);
    } catch (err) {
      //backend error handling 추가해야함.
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await axios.delete(serverUrl + "/logout", { withCredentials: true });
      setIsLoggedIn(false);
      setIsAdmin(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isAdmin, setIsLoggedIn, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
