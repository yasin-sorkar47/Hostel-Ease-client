import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://hostelease-1773a.web.app",
  withCredentials: true,
});

export default function useAxiosPublic() {
  return axiosPublic;
}
