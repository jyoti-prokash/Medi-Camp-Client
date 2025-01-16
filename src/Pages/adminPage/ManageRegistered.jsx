import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageRegistered = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Manage Registered</h2>
      <p>Total Registered Users: {users.length}</p>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Role</th>
              <th>Participant Name</th>
              <th>Camp Name</th>
              <th>Camps Fees</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
              <th>Cancel</th>
            </tr>
          </thead>
        </table>
      </div>

      {users.map((user) => (
        <tbody>
          {/* row 1 */}
          <tr>
            <th>{user.role}</th>
            <th>{user.name}</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
            <td>Blue</td>
            <td>Blue</td>
          </tr>
        </tbody>
      ))}
    </div>
  );
};

export default ManageRegistered;
