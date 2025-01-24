import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const Feedback = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: feedbacks = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedback");
      return res.data;
    },
  });
  return (
    <div className="container mx-auto my-10">
      <SectionTitle
        header={"Feedback"}
        subtitle={"Participants talk"}
      ></SectionTitle>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {feedbacks.map((feedback, index) => (
          <SwiperSlide
            key={index}
            className="rounded-lg shadow-md p-6 text-center"
          >
            <p className="text-lg font-medium text-gray-700">
              {feedback.message || "No feedback provided."}
            </p>
            <p className="text-lg font-bold m-5">{feedback.userName}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Feedback;
