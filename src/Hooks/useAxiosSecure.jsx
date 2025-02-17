import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
const axiosSecure = axios.create({
  baseURL: "https://assignment-12-server-six-azure.vercel.app/",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      // console.log(`request stoped by interceptor`, token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // do something request error
      return Promise.reject(error);
    }
  );
  // interceptor 401 and 403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    (error) => {
      const status = error.response.status;
      // console.log('status error in the interceptors', status);
      if (status === 401 || status === 403) {
        logOut();
        navigate("login");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
