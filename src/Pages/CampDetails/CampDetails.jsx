import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import calender from '../../assets/icons/calendar.png'
import locationIcon from '../../assets/icons/location.png'
import CampForm from "./CampForm";

const CampDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const {
    data: camp = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["camp", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/camps/${id}`);
      return data;
    },
  });
  if (isLoading) {
    return (
      <div className="text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  const {
    campPhoto,
    campName,
    dateTime,
    location,
    professionalName,
    participantCount,
    description,
  } = camp;

  return (
    <div className="md:flex gap-10 p-20">
      <div>
        <img className="object-cover" src={campPhoto} alt="" srcset="" />
      </div>
      <div className="space-y-3 w-5/6">
        <h2 className="text-3xl font-bold">{campName}</h2>
        <h3 className="font-bold text-xl">{professionalName}</h3>
        <p className="font-medium text-lg text-gray-600">{description}</p>
        <p>Participant: {participantCount}</p>
        <div className="flex items-center gap-3">
          <img className="w-10" src={calender} alt="" />
          <p className="text-lg font-semibold">{dateTime}</p>
        </div>
        <div className="flex items-center gap-3">
          <img className="w-10" src={locationIcon} alt="" />
          <p className="text-lg font-semibold">{location}</p>
        </div>
        <button
          className="btn bg-[#148980] px-6 py-3 font-bold hover:bg-[#F3C677] hover:text-black rounded-3xl my-5"
          onClick={() => document.getElementById("my_modal_4").showModal()}
        >
          Join Camp
        </button>

        {/* Modal */}
        <dialog id="my_modal_4" className="modal w-full max-w-6xl">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg text-center">Booking Details</h3>
            <div>
              <div>
                <CampForm camp={camp}></CampForm>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default CampDetails;
