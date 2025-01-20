import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useParticipantsCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: registeredCamps = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["registered", user?.email],
    queryFn: async () => {
      if (!user?.email) return []; // Return an empty array if email is undefined
      const res = await axiosSecure.get(`/participants/${user.email}`); // Ensure email is passed correctly
      console.log(res.data);
      return res.data;
    },
    enabled: !!user?.email, // Only run the query if email exists
  });
  return [registeredCamps, loading, refetch];
};

export default useParticipantsCamps;
