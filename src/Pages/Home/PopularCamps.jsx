import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import CampCard from "../../Shared/CampCard/CampCard";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

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
      <SectionTitle
        header={"Popular Camp"}
        subtitle={"Most People Join"}
      ></SectionTitle>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {camps.map((camp) => (
          <CampCard key={camp._id} camp={camp}></CampCard>
        ))}
      </div>
      <div className="text-center">
        <Link to="/availableCamp">
          <button className="bg-[#148980] px-6 py-3 font-bold hover:bg-[#F3C677] hover:text-black rounded-3xl my-5 text-white">
            See All Camps
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularCamps;
