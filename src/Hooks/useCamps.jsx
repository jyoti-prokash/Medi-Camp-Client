import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useCamps = () => {
    const axiosPublic = useAxiosPublic();
    const { data: camp = [], isPending: loading, refetch } = useQuery({
      queryKey: ['camp'],
      queryFn: async () => {
        const res = await axiosPublic.get("/availableCamps");
        console.log(res.data);
        return res.data;
      },
    });
    return [camp, loading, refetch]
};

export default useCamps;