import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const EditModal = ({ camp }) => {
  const closeModal = () => {
    document.getElementById("my_modal_4").close();
  };
  const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Check if a new image file is uploaded
      let imageUrl = camp?.campPhoto;

      if (data.campPhoto?.length) {
        const formData = new FormData();
        formData.append("image", data.campPhoto[0]);

        const imageRes = await axiosPublic.post(imageHostingAPI, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        imageUrl = imageRes.data.data?.url;
        if (!imageUrl) {
          throw new Error("Image upload failed");
        }
      }

      // Only include updated fields, falling back to default values from `camp`
      const updateData = {
        campName: data.campName || camp.campName,
        campPhoto: imageUrl,
        campFees: data.campFees ? parseFloat(data.campFees) : camp.campFees,
        dateTime: data.date || camp.dateTime,
        location: data.location || camp.location,
        professionalName: data.professionalName || camp.professionalName,
        participantCount: data.participant
          ? parseFloat(data.participant)
          : camp.participantCount,
        description: data.description || camp.description,
      };

      // Update camp data in the backend

      const campRes = await axiosSecure.patch(
        `/update-camp/${camp._id}`,
        updateData
      );
      if (campRes.data.modifiedCount) {
        reset();
        toast.success("Camp updated successfully!");
        refetch(); // Refetch the data
      }
    } catch (error) {
      console.error("Error updating camp:", error);
      toast.error("An error occurred while updating the camp.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container flex flex-col mx-auto space-y-12"
      >
        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Camp Name</label>
            <input
              {...register("campName")}
              type="text"
              defaultValue={camp?.campName}
              className="input input-bordered w-full"
            />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Photo Upload</label>
            <input
              {...register("campPhoto")}
              type="file"
              className="file-input file-input-bordered w-full"
            />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Camp Fees</label>
            <input
              {...register("campFees")}
              type="text"
              defaultValue={camp?.campFees}
              placeholder="Camp Fee"
              className="input input-bordered w-full"
            />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Date & Time</label>
            <input
              {...register("date")}
              type="date"
              defaultValue={camp?.dateTime?.split("T")[0]} // Pre-fill date if available
              className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:border-gray-300"
            />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Location</label>
            <input
              {...register("location")}
              defaultValue={camp?.location}
              type="text"
              placeholder="Location"
              className="input input-bordered w-full"
            />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Healthcare Professional Name</label>
            <input
              {...register("professionalName")}
              type="text"
              defaultValue={camp?.professionalName}
              placeholder="Professional Name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Participant Count</label>
            <input
              {...register("participant")}
              type="number"
              defaultValue={camp?.participantCount}
              placeholder="Participant"
              className="input input-bordered w-full"
            />
          </div>
          <div className="col-span-full">
            <label className="text-sm">Description</label>
            <textarea
              {...register("description")}
              placeholder="Type here"
              defaultValue={camp?.description}
              className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:border-gray-300"
            />
          </div>
        </div>
        <div className="text-center">
          <button onClick={closeModal} className="btn btn-outline" type="submit">
            Update Camp
          </button>
          <button className="btn btn-outline ml-5" onClick={closeModal}>close</button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
