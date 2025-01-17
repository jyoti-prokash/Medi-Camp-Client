import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useCamps = () => {
    const axiosSecure = useAxiosPublic();
    const { data: camps = [], isPending: loading, refetch } = useQuery({
      queryKey: [camps],
      queryFn: async () => {
        const res = await axiosSecure.get('/camps');
        console.log(res.data);
        return res.data;
      },
    });
    return [camps, loading, refetch]
};

export default useCamps;