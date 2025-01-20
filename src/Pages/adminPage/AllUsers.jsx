import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  // Handle delete user
  const handleDelete = (id) => {
    axiosSecure.delete(`/users/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        toast.success("User deleted successfully");
      }
    });
  };

  // Handle make admin
  const handleAdmin = (id) => {
    axiosSecure.patch(`/users/admin/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("User promoted to admin");
      }
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5 text-center">
        Total Users: {users.length}
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full table-auto bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">User Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Role</th>
              <th className="py-3 px-6 text-center">Action</th>
              <th className="py-3 px-6 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}
              >
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6 text-center">
                  {user.role === "admin" ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleAdmin(user._id)}
                      className="btn btn-sm btn-primary"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <button className="btn btn-sm btn-outline btn-success">
                    Confirm
                  </button>
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    Delete
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

export default AllUsers;
