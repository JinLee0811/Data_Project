import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useHttpRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const sendRequest = useCallback(async (url, method = 'get', body = null) => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const serverUrl = process.env.REACT_APP_API_URL;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios({
        method,
        url: serverUrl + url,
        data: body,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        signal,
      });
      console.log(response.data);
      console.log(response.data.message);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('요청이 취소되었습니다.');
      } else {
        setError(err.message || '문제가 발생했습니다.'); //이거는 백엔드 에러에 따라 바꿔야할 듯
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
    error,
    sendRequest,
  };
};

export default useHttpRequest;
