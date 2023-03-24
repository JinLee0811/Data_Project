import { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useHttpRequest from './useHttp';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { sendRequest } = useHttpRequest();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await sendRequest('/account', 'get');
        if (response) {
          setIsLoggedIn(true);
          setIsAdmin(response.isAdmin);
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

      if (location.state?.redirectUrl) {
        navigate(location.state.redirectUrl);
      } else {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  const kakaologin = async (kakaocode) => {
    try {
      const response = await sendRequest(`/login/${kakaocode}`, 'post', {});
      setIsLoggedIn(true);
      if (location.state?.redirectUrl) {
        navigate(location.state.redirectUrl);
      } else {
        navigate('/');
      }
    } catch (err) {
      console.log('kakaoerror', err);
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
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isAdmin, setIsLoggedIn, logout, login, kakaologin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
