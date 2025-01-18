import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default function useAxiosPublic() {
  return axiosPublic;
}
