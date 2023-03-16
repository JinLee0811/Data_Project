import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const serverUrl = process.env.REACT_APP_API_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //   // js-cookie 사용하여 쿠키에 token이 있는지 체크
    //   console.log(Cookies);   //httpOnly라서 못가져 오는 듯..? 그럼 refresh 하면 로그인 어케 유지함?
    //   const token = Cookies.get("token");
    //   console.log(token);
    //   if (token) {
    //     setIsLoggedIn(true);
    //   }
  }, []);

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
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
