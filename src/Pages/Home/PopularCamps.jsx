import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import CampCard from "../../Shared/CampCard/CampCard";

const PopularCamps = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: camps = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["camp"],
    queryFn: async () => {
      const res = await axiosPublic.get("/popularCamps");
      return res.data;
    },
  });
  return (
    <div>
      <h2>Popular Camps {camps.length}</h2>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {camps.map((camp) => (
          <CampCard key={camp._id} camp={camp}></CampCard>
        ))}
      </div>
    </div>
  );
};

export default PopularCamps;
