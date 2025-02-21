import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_Server_Url}`
  });

const useAxiosPublic = () => {
  return axiosInstance
}

export default useAxiosPublic