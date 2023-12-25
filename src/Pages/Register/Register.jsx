import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Register = () => {
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const { createUser, updateuserprofile } = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      createUser(data.email, data.password).then((result) => {
        const loggeduser = result.user;
        console.log(loggeduser);

        updateuserprofile(data.name, data.photourl, data.image)
          .then(() => {
            console.log('profile info updated');

            const userInfo = {
              name: data.name,
              email: data.email,
              password: data.password,
              image: data.photoURL,
              registred_image: res.data.data.display_url,
              role: data.role,
              bank_acc: data.bank_account_no,
              salary: data.salary,
              designation: data.designation,
              isVerfied: false,
            };

            axiosPublic.post('/users', userInfo).then((res) => {
              if (res.data.insertedId) {
                console.log('added');
                reset();
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Created',
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate('/');
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } catch (error) {
      console.error('Error during registration:', error);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-800 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Register</title>
      </Helmet>

      <div className="max-w-md w-full space-y-8 p-8 bg-white bg-opacity-80 rounded-lg shadow-md">
        <div>
          <h1 className="text-4xl font-extrabold text-center text-[#B0926A]">Register Here</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Form Fields */}
          <div className="flex flex-col gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" {...register('email')} placeholder="Email" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name="name" {...register('name')} placeholder="Name" className="input input-bordered" required />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                {...register('password', {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&-*])(?=.*[0-9])(?=.*[a-z])./,
                })}
                placeholder="Password"
                className="input input-bordered"
              />
              {errors.password?.type === 'required' && <span>This field is required</span>}
              {errors.password?.type === 'minLength' && <span>Must be at least 6 characters</span>}
              {errors.password?.type === 'maxLength' && <span>Must be at most 20 characters</span>}
              {errors.password?.type === 'pattern' && <span>Password must meet requirements</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Bank Account No</span>
              </label>
              <input type="text" name="bank_account_no" {...register('bank_account_no')} placeholder="Bank Account No" className="input input-bordered" required />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Designation</span>
            </label>
            <input type="text" name="designation" {...register('designation')} placeholder="Designation" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input {...register('image', { required: true })} type="file" className="file-input w-full" />
          </div>

          {/* Submit Button and Social Login */}
          <div className="flex items-center justify-between">
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#B0926A] hover:bg-[#8A724E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0926A]"
              >
                Register
              </button>
            </div>
            <div>
              <SocialLogin />
            </div>
          </div>
        </form>

        {/* Login Link */}
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#E1C78F] hover:text-[#B0926A]">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
