import { useState, useEffect } from 'react'

import { fetchUserInfo } from '../networks/user'

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState("");

  const getUserInfo = async () => {
    try {
      const response = await fetchUserInfo()
      setUserInfo(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);


  return {
    userInfo,
    setUserInfo,
    isLoggedIn: !!userInfo,
    isAdmin: userInfo.isAdmin,
  }
}