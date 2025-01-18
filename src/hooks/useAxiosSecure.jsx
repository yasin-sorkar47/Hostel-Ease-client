import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default function useAxiosSecure() {
  const { singOutUser, setLoader } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        singOutUser()
          .then(() => {
            console.log("axios3");
            navigate("/login");
            setLoader(false);
          })
          .catch((error) => {
            setLoader(false);
            console.log(error);
          });
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
}
