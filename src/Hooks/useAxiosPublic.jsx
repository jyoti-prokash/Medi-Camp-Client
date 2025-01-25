import axios from 'axios';

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
      baseURL: "https://assignment-12-server-six-azure.vercel.app/",
    });
    return axiosPublic;
};

export default useAxiosPublic;