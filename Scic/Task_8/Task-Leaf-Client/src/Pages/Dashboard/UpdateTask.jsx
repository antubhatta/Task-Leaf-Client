// UpdateTask.js

import { useForm, Controller } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import useAuth from '../../Hooks/useAuth';
import { useLoaderData, useParams } from 'react-router-dom';

const UpdateTask = () => {
    const { handleSubmit, control, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const user = useAuth();
    const params = useParams();
    const task = useLoaderData();

    const onSubmit = async (data) => {
        try {
            const taskId = task._id;
            const response = await axiosSecure.patch(`/tasklist/${taskId}`, data);

            if (response.status === 200) {
                Swal.fire('Success', 'Task updated successfully', 'success');
            } else {
                Swal.fire('Error', 'Failed to update task', 'error');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            Swal.fire('Error', 'An error occurred while updating the task', 'error');
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <SectionTitle heading={'Update Task'} subheading={'This is employee site'} />

            <div className="max-w-md mx-auto p-6 bg-white border rounded-md shadow-md">
                <h1 className="text-2xl text-center text-gray-800 font-bold mb-4">Update the task "{task.title}"</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                            Title
                        </label>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue={task.title}
                            render={({ field }) => <input {...field} className="mt-1 p-2 w-full border rounded-md" />}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                            Description
                        </label>
                        <Controller
                            name="description"
                            control={control}
                            defaultValue={task.description}
                            render={({ field }) => <textarea {...field} className="mt-1 p-2 w-full border rounded-md" />}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="deadline" className="block text-sm font-medium text-gray-600">
                            Deadline
                        </label>
                        <Controller
                            name="deadline"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input type="date" {...field} className="mt-1 p-2 w-full border rounded-md" />
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-600">
                            Priority
                        </label>
                        <Controller
                            name="priority"
                            control={control}
                            defaultValue="low"
                            render={({ field }) => (
                                <select {...field} className="mt-1 p-2 w-full border rounded-md">
                                    <option value="low">Low</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="high">High</option>
                                </select>
                            )}
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                        Update Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateTask;
