import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddCamp = () => {
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
      // Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", data.campPhoto[0]); // Get the first file

      const imageRes = await axiosPublic.post(imageHostingAPI, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = imageRes.data.data?.url;
      if (!imageUrl) {
        throw new Error("Image upload failed");
      }

      // Collect all camp data with the uploaded image URL
      const campData = {
        campName: data.campName,
        campPhoto: imageUrl,
        campFees: parseFloat(data.campFees),
        dateTime: data.date,
        location: data.location,
        professionalName: data.professionalName,
        participantCount: parseFloat(data.participant),
        description: data.description,
      };

      // console.log("Camp data to save:", campData);

      // Save camp data to your backend
      const campRes = await axiosSecure.post("/camps", campData);
      // console.log(campRes.data);
      if (campRes.data.insertedId) {
        reset();
        toast.success("Camp added successfully!");
      }
    } catch (error) {
      console.error("Error adding camp:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container flex flex-col mx-auto space-y-12"
        >
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm">Camp Name</label>
              <input
                {...register("campName", { required: true })}
                type="text"
                placeholder="Camp Name"
                className="input input-bordered w-full"
              />
              {errors.campName && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm">Photo Upload</label>
              <input
                {...register("campPhoto", { required: true })}
                type="file"
                className="file-input file-input-bordered w-full"
              />
              {errors.campPhoto && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm">Camp Fees</label>
              <input
                {...register("campFees", { required: true })}
                type="text"
                placeholder="Camp Fee"
                className="input input-bordered w-full"
              />
              {errors.campFees && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm">Date & Time</label>
              <input
                {...register("date", { required: true })}
                type="date"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:border-gray-300"
              />
              {errors.date && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm">Location</label>
              <input
                {...register("location", { required: true })}
                type="text"
                placeholder="Location"
                className="input input-bordered w-full"
              />
              {errors.location && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm">Healthcare Professional Name</label>
              <input
                {...register("professionalName", { required: true })}
                type="text"
                placeholder="Professional Name"
                className="input input-bordered w-full"
              />
              {errors.professionalName && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm">Participant Count</label>
              <input
                {...register("participant", { required: true })}
                type="number"
                defaultValue={0}
                placeholder="Participant"
                className="input input-bordered w-full"
              />
              {errors.participant && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            <div className="col-span-full">
              <label className="text-sm">Description</label>
              <textarea
                {...register("description", { required: true })}
                placeholder="Type here"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:border-gray-300"
              />
              {errors.description && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-outline" type="submit">
              Add Camp
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddCamp;
