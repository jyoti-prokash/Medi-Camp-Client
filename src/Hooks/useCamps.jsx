import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useCamps = () => {
    const axiosPublic = useAxiosPublic();
    const { data: camps = [], isPending: loading, refetch } = useQuery({
      queryKey: ['camp'],
      queryFn: async () => {
        const res = await axiosPublic.get("/availableCamps");
        return res.data;
      },
    });
    return [camps, loading, refetch]
};

export default useCamps;