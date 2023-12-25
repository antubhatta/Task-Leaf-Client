import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Swal from 'sweetalert2';

const ContactUsPage = () => {
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Assuming there's an API endpoint for storing contact form data
      await axiosSecure.post('/contact-us', data);

      // Handle success
      Swal.fire({
        icon: 'success',
        title: 'Form submitted successfully!',
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset the form after successful submission
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);

      // Handle error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-800 to-indigo-600 min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto text-white">
        <SectionTitle
          heading={'Get in Touch'}
          subheading={'We would love to hear from you!'}
        />

        <div className='bg-white bg-opacity-30 p-10 rounded-lg max-w-md mx-auto'>
          {/* Contact form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white">Your Name:</label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full border p-2 mt-1 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white">Your Email:</label>
              <input
                {...register('email', { required: 'Email is required', pattern: /\S+@\S+\.\S+/ })}
                className="w-full border p-2 mt-1 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white">Your Message:</label>
              <textarea
                {...register('message', { required: 'Message is required' })}
                className="w-full border p-2 mt-1 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.message && <span className="text-red-600 text-sm">{errors.message.message}</span>}
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
