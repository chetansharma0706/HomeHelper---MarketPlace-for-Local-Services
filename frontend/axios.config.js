import axios from "axios";
import { useContext } from "react";

const setupAxiosInterceptors = (setIsLoading) => {
  // Request Interceptor
  axios.interceptors.request.use(
    (config) => {
      setIsLoading(true); // Start loading
      return config;
    },
    (error) => {
      setIsLoading(false); // Stop loading on error
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axios.interceptors.response.use(
    (response) => {
      setIsLoading(false); // Stop loading on success
      return response;
    },
    (error) => {
      setIsLoading(false); // Stop loading on error
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
