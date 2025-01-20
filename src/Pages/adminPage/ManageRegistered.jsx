import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageRegistered = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: registrations = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["participants"],
    queryFn: async () => {
      const res = await axiosSecure.get("/participants");
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  // Handle confirmation status
  const handleConfirmation = async (id) => {
    try {
      const res = await axiosSecure.patch(`/participants/confirm/${id}`);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Registration confirmed successfully!");
      }
    } catch (error) {
      console.error("Error confirming registration:", error);
      toast.error("Failed to confirm registration.");
    }
  };

  // Handle cancellation
  const handleCancel = async (id, paymentStatus, confirmationStatus) => {
    if (paymentStatus === "Paid" && confirmationStatus === "Confirmed") {
      toast.error("Cannot cancel a confirmed and paid registration.");
      return;
    }

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this registration?"
    );
    if (confirmCancel) {
      try {
        const res = await axiosSecure.delete(`/delete-participants/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          toast.success("Registration cancelled successfully!");
        }
      } catch (error) {
        console.error("Error canceling registration:", error);
        toast.error("Failed to cancel registration.");
      }
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5 text-center">
        Manage Registered Participants
      </h2>
      <p className="text-lg mb-5">
        Total Registered Users: {registrations.length}
      </p>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6">Participant Name</th>
              <th className="py-3 px-6">Camp Name</th>
              <th className="py-3 px-6">Camp Fees</th>
              <th className="py-3 px-6">Payment Status</th>
              <th className="py-3 px-6">Confirmation Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {registrations.map((registration) => (
              <tr key={registration._id} className="hover:bg-gray-200">
                <td className="py-3 px-6">{registration.participantName}</td>
                <td className="py-3 px-6">{registration.campName}</td>
                <td className="py-3 px-6">${registration.campFees}</td>
                <td className="py-3 px-6">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      registration.paymentStatus === "Paid"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {registration.paymentStatus}
                  </span>
                </td>
                <td className="py-3 px-6">
                  {registration.confirmationStatus === "Confirmed" ? (
                    <span className="text-green-600 font-semibold">
                      Confirmed
                    </span>
                  ) : (
                    <button
                      onClick={() => handleConfirmation(registration._id)}
                      className="btn btn-sm btn-primary"
                    >
                      Pending
                    </button>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() =>
                      handleCancel(
                        registration._id,
                        registration.paymentStatus,
                        registration.confirmationStatus
                      )
                    }
                    className="btn btn-sm btn-error"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRegistered;
