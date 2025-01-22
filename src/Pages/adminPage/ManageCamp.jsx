import { useState } from "react";
import useCamps from "../../Hooks/useCamps";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { TbPhotoEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditModal from "./ManageCampEdit/EditModal";
import toast from "react-hot-toast";

const ManageCamp = () => {
  const [camps, loading, refetch] = useCamps();
  const [selectedCamp, setSelectedCamp] = useState();
  const axiosSecure = useAxiosSecure();

  const deleteCamp = (id) => {
    axiosSecure.delete(`/delete-camps/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        toast.success("Deleted successfully!");
      }
    });
  };
  return (
    <div>
      <h2>Manage Camp</h2>
      <div className="overflow-x-auto container mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Camp</th>
              <th>Name</th>
              <th>Date and Time</th>
              <th>Location</th>
              <th>Healthcare Professional</th>
              <th>Update Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp, index) => (
              <tr key={camp._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-[150px] h-[100px]">
                      <img src={camp.campPhoto} alt="" />
                    </div>
                  </div>
                </td>
                <td>{camp.campName}</td>
                <td>{camp.dateTime}</td>
                <td>{camp.location}</td>
                <td>{camp.professionalName}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedCamp(camp);
                      document.getElementById("my_modal_4").showModal();
                    }}
                    className="btn btn-outline"
                  >
                    <TbPhotoEdit />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteCamp(camp._id)}
                    className="btn btn-error"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg text-center">
              Update Your Camp Details
            </h3>
            <div className="modal-action">
              <EditModal
                camp={selectedCamp}
                refetch={refetch}
              />
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ManageCamp;
