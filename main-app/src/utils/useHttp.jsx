import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useHttpRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const sendRequest = useCallback(async (url, method = 'get', body = null) => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const serverUrl = process.env.REACT_APP_API_URL;

    setIsLoading(true);

    try {
      const response = await axios({
        method,
        url: serverUrl + url,
        data: body,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        signal
      });
      setIsLoading(false);
      return response.data;
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('요청이 취소되었습니다.');
      } else {
        setIsLoading(false);
        throw err;
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return {
    isLoading,
    sendRequest,
  };
};

export default useHttpRequest;
