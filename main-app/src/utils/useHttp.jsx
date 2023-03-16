import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useHttpRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const sendRequest = useCallback(
    async (url, method = "get", body = null, headers = {}) => {
      const abortController = new AbortController();
      const signal = abortController.signal;

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios({
          method,
          url,
          data: body,
          headers,
          signal,
        });
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("요청이 취소되었습니다.");
        } else {
          setError(err.message || "Something went wrong."); //이거는 백엔드 에러에 따라 바꿔야할 듯
          setIsLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return {
    isLoading,
    data,
    error,
    sendRequest,
  };
};

export default useHttpRequest;
