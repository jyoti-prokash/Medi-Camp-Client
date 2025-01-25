import React from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const CampForm = ({ camp, refetch }) => {
  const { user } = useAuth();
  const { _id, campFees, campName, location, professionalName } = camp;
  const axiosPublic = useAxiosPublic(); // Use axios instance
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 const onSubmit = async (data) => {
   try {
     const participantData = {
       ...data,
       campName, 
       campFees: parseFloat(campFees), 
       location, 
       campId: _id,
       professionalName, 
       participantName: user?.displayName, 
       participantEmail: user?.email,
       confirmationStatus: "Pending",
       paymentStatus: "Unpaid",
     };

     // Save participant data to the backend
     const response = await axiosPublic.post("/participants", participantData);

     // Check if the participant was successfully inserted
     if (response?.data?.insertedId) {
       reset(); 
       toast.success("Participant data submitted successfully!");
       refetch(); // Refetch data if necessary
     }
   } catch (error) {
     // Handle error and display a user-friendly message
     console.error("Error submitting participant data:", error); // Log for debugging
     toast.error(
       error?.response?.data || "An error occurred. Please try again."
     );
   }
 };

  //   close modal
  const modal = document.getElementById("my_modal_4");
  if (modal) {
    modal.close();
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xl font-bold">{campName}</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container flex flex-col mx-auto space-y-12"
      >
        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          {/* Camp Details */}
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Camp Name</label>
            <input
              {...register("campName")}
              type="text"
              defaultValue={campName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Camp Fees</label>
            <input
              {...register("campFees")}
              type="text"
              defaultValue={campFees}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Location</label>
            <input
              {...register("location")}
              type="text"
              defaultValue={location}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Healthcare Professional Name</label>
            <input
              {...register("professionalName")}
              type="text"
              defaultValue={professionalName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Participant Details */}
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Participant Name</label>
            <input
              {...register("participantName", { required: true })}
              type="text"
              defaultValue={user?.displayName}
              readOnly
              className="input input-bordered w-full"
            />
            {errors.participantName && (
              <p className="text-red-500 text-sm">
                Participant name is required
              </p>
            )}
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Participant Email</label>
            <input
              {...register("participantEmail", { required: true })}
              type="email"
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full"
            />
            {errors.participantEmail && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Age</label>
            <input
              {...register("age", { required: true, min: 1 })}
              type="number"
              placeholder="Age"
              className="input input-bordered w-full"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">Valid age is required</p>
            )}
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Phone Number</label>
            <input
              {...register("phoneNumber", {
                required: true,
                pattern: /^[0-9]+$/,
              })}
              type="number"
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                Valid phone number is required
              </p>
            )}
          </div>
          <div className="col-span-full sm:col-span-3 p-3 rounded-xl input-bordered input">
            <label className="text-sm mr-5">Gender</label>
            <select {...register("gender", { required: true })}>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">
                Gender selection is required
              </p>
            )}
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Emergency Contact</label>
            <input
              {...register("emergencyContact", { required: true })}
              type="number"
              placeholder="Emergency Number"
              className="input input-bordered w-full"
            />
            {errors.emergencyContact && (
              <p className="text-red-500 text-sm">
                Emergency contact is required
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div>
          <button
            type="button"
            className="btn mr-10"
            onClick={() => document.getElementById("my_modal_4").close()}
          >
            Close
          </button>
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampForm;
