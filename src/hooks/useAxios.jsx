import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://first-shift-server.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;