import useParticipantsCamps from "../../Hooks/useParticipantsCamps";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const RegisteredCamps = () => {
  const [registeredCamps, refetch] = useParticipantsCamps();

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
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        // Submit feedback (example implementation)
        toast.success("Thank you for your feedback!");
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Cancel registration logic
          // Example: await axios.delete(`/camps/${campId}`);
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
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Registered Camps ({registeredCamps.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Header */}
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
                  <Link to={`/dashboard/payment/${camp._id}`}>
                    <button className="btn btn-sm bg-green-500">Pay</button>
                  </Link>
                </td>
                <td
                  className={
                    camp.paymentStatus === "Paid"
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {camp.paymentStatus}
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
                  {/* Feedback Button */}
                  <button
                    onClick={() => handleFeedback(camp._id)}
                    className="btn btn-sm btn-info"
                  >
                    Feedback
                  </button>
                  {/* Cancel Button */}
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
