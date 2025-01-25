import useParticipantsCamps from "../../Hooks/useParticipantsCamps";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const RegisteredCamps = () => {
  const [registeredCamps, refetch] = useParticipantsCamps();
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth();

  // Handle Feedback
  const handleFeedback = (campId) => {
    Swal.fire({
      title: "Leave Feedback",
      input: "textarea",
      inputPlaceholder: "Write your feedback here...",
      showCancelButton: true,
      confirmButtonText: "Submit",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        try {
          const feedback = {
            message: result.value,
            userName: user?.displayName || "Anonymous", 
            campId: campId,
          };
          // Submit feedback to the server
          await axiosPublic.post(`/feedback`, feedback);
          toast.success("Thank you for your feedback!");
        } catch (error) {
          console.error("Error submitting feedback:", error);
          toast.error("Failed to submit feedback.");
        }
      }
    });
  };

  // Handle Cancel
  const handleCancel = async (campId, paymentStatus, confirmationStatus) => {
    if (paymentStatus === "Paid" && confirmationStatus === "Confirmed") {
      toast.error("Cannot cancel a confirmed and paid registration.");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this cancellation!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/delete-participants/${campId}`);
          refetch(); // Refresh data
          Swal.fire({
            title: "Cancelled!",
            text: "The camp registration has been cancelled.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        } catch (error) {
          toast.error("Failed to cancel the registration.");
        }
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Registered Camps ({registeredCamps.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Participant Name</th>
              <th>Camp Name</th>
              <th>Camp Fees</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registeredCamps.map((camp) => (
              <tr key={camp._id}>
                <td>{camp.participantName}</td>
                <td>{camp.campName}</td>
                <td>${camp.campFees.toFixed(2)}</td>
                <td>
                  {camp.paymentStatus === "Paid" ? (
                    <span className="text-green-600 font-semibold btn-disabled">Paid</span>
                  ) : (
                    <Link to={`/dashboard/payment/${camp._id}`}>
                      <button className="btn btn-sm bg-green-500 text-white">
                        Pay
                      </button>
                    </Link>
                  )}
                </td>
                <td
                  className={
                    camp.confirmationStatus === "Confirmed"
                      ? "text-green-600 font-semibold"
                      : "text-yellow-600 font-semibold"
                  }
                >
                  {camp.confirmationStatus}
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleFeedback(camp._id)}
                    className="btn btn-sm btn-info"
                  >
                    Feedback
                  </button>
                  <button
                    onClick={() =>
                      handleCancel(
                        camp._id,
                        camp.paymentStatus,
                        camp.confirmationStatus
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

export default RegisteredCamps;
