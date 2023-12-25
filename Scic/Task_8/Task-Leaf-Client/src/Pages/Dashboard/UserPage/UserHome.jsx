
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const UserHome = () => {
  const axiosPublic = useAxiosPublic();
  const user = useAuth();

  const { data: tasklist = [], refetch } = useQuery({
    queryKey: ['tasklist'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasklist?email=${user.user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/tasklist/${id}`)
          .then((res) => {
            if (res.data && res.data.modifiedCount > 0) {
              Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
            } else {
              Swal.fire('Success', 'Task deleted successfully.', 'success');
            }
            refetch();
          })
          .catch((error) => {
            console.error('Error deleting task:', error);
            Swal.fire('Error', 'An error occurred while deleting the task.', 'error');
          });
      }
    });
  };

  const priorityColorClass = (priority) => {
    switch (priority) {
      case 'low':
        return 'text-green-500';
      case 'moderate':
        return 'text-yellow-500';
      case 'high':
        return 'text-red-500';
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto my-8 bg-gray-900 text-white p-8 rounded-lg shadow-lg">
      <SectionTitle heading={'Employee Site'} subheading={'This is your employee portal'} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="bg-green-600 p-4 rounded-md shadow-md">
          <div className="text-3xl font-bold">Your Tasks</div>
          <div className="text-xl font-semibold">{tasklist.length}</div>
          <div className="text-sm">21% more than last month</div>
        </div>

        <div className="bg-blue-600 p-4 rounded-md shadow-md">
          <div className="text-3xl font-bold">Page Views</div>
          <div className="text-xl font-semibold">2.6M</div>
          <div className="text-sm">21% more than last month</div>
        </div>

        <div className="bg-purple-600 p-4 rounded-md shadow-md">
          <div className="text-3xl font-bold">Tasks Done</div>
          <div className="text-xl font-semibold">86%</div>
          <div className="text-sm">31 tasks remaining</div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Tasks You Added</h2>

        <table className="min-w-full bg-gray-800 border border-gray-600 shadow-lg rounded-lg">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Details</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Update</th>
              <th className="py-3 px-4">Delete</th>
            </tr>
          </thead>
          <tbody className="text-gray-400">
            {tasklist.map((task) => (
              <tr key={task.id}>
                <td className="py-3 px-4">{task.title}</td>
                <td className="py-3 px-4">{task.description}</td>
                <td className="py-3 px-4">{task.deadline}</td>
                <td className={`py-3 px-4 ${priorityColorClass(task.priority)}`}>{task.priority}</td>
                <td className="py-3 px-4">
                  <Link to={`/dashboard/updatetask/${task._id}`}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md">Update</button>
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() => handleDelete(task._id)}
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

export default UserHome;
