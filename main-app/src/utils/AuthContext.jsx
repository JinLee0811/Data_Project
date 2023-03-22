import { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useHttpRequest from './useHttp';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, sendRequest } = useHttpRequest();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await sendRequest('/account', 'get');
        console.log(response);
        if (response && response.isAdmin) {
          setIsLoggedIn(true);
          setIsAdmin(true);
        }
      } catch (err) {
        console.log(err?.response.data);
      }
    };
    fetchUserData();
  }, [isLoggedIn, isAdmin, sendRequest]);

  const login = async (email, password) => {
    try {
      await sendRequest('/login', 'post', { email, password });
      setIsLoggedIn(true);
      console.log(location);
      if (location.state?.redirectUrl) {
        navigate(location.state.redirectUrl);
      } else {
        navigate('/');
      }
    } catch (err) {
      console.log(err.message); //업데이트 필요
      alert(err);
    }
  };

  const logout = async () => {
    try {
      await sendRequest('/logout', 'delete', {});
      setIsLoggedIn(false);
      setIsAdmin(false);
      navigate('/');
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isAdmin, setIsLoggedIn, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};
