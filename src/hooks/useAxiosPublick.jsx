import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://education-services-server-a-10.vercel.app",
  withCredentials: true,
});

export default function useAxiosPublic() {
  return axiosPublic;
}
