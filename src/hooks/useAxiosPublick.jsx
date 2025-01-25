import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://hostelease-a-12.vercel.app",
  withCredentials: true,
});

export default function useAxiosPublic() {
  return axiosPublic;
}
