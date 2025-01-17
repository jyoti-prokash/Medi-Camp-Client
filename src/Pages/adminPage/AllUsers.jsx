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
        headers:{
            Authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
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
//   user delete
const handleDelete = (id) => {
    axiosSecure.delete(`/users/${id}`)
    .then(res=>{
        if(res.data.deletedCount > 0){
            refetch();
            toast.success('deleted successfully')
        }
    })
};
const handleAdmin = (id) => {
    axiosSecure.patch(`/users/admin/${id}`)
    .then(res=>{
        if(res.data.modifiedCount > 0){
            refetch();
            toast.success('admin successfully')
        }
    })
};

  return (
    <div>
      <h2>Total Users {users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full bg-gray-500">
          {/* head */}
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Confirmation Status</th>
              <th>Delete</th>
            </tr>
          </thead>
        </table>
      </div>

      {users.map((user) => (
        <tbody className="w-full">
          {/* row 1 */}
          <tr>
            <th>{user.name}</th>
            <th>{user.email}</th>
            <td>
              {user.role === "admin" ? (
                "Admin"
              ) : (
                <button onClick={() => handleAdmin(user._id)} className="btn">
                  Make Admin
                </button>
              )}
            </td>
            <td>Quality Control Specialist</td>
            <td>
              <button onClick={() => handleDelete(user._id)} className="btn">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </div>
  );
};

export default AllUsers;
