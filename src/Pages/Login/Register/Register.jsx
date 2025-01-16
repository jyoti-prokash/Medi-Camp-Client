import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SocialLogin from "../../../Components/Social Login/SocialLogin";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            console.log('user created database');
            if (res.data.insertedId) {
              reset();
              toast.success("User Create Successfully");
              navigate("/");
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800 mx-auto">
      <h1 className="text-2xl font-bold text-center">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="username"
            {...register("name", { required: true })}
            id="username"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
          />
          {errors.name && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">
            PhotoURL
          </label>
          <input
            type="text"
            name="photo"
            {...register("photo", { required: true })}
            id="username"
            placeholder="photo url"
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
          />
          {errors.photo && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block dark:text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            {...register("email", { required: true })}
            id="email"
            placeholder="email"
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
          />
          {errors.email && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            {...register("password", {
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
              minLength: 6,
              maxLength: 10,
            })}
            id="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
          />
          {errors.password?.type === "required" && (
            <p role="alert">Password is required</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-600" role="alert">
              {" "}
              Uppercase, lowercase and number is required
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600" role="alert">
              {" "}
              Minimum length 6 is required
            </p>
          )}
          {errors.password?.type === "maxLength" && (
            <p className="text-red-600" role="alert">
              {" "}
              Maximum length 10 is required
            </p>
          )}
          <div className="flex justify-end text-xs dark:text-gray-600">
            <a rel="noopener noreferrer" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
        <button className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600">
          Sign in
        </button>
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        <p className="px-3 text-sm dark:text-gray-600">
          Login with social accounts
        </p>
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
      </div>
      <SocialLogin></SocialLogin>
      <p className="text-sm text-center sm:px-6 dark:text-gray-600">
        Have an account?
        <Link
          to="/login"
          rel="noopener noreferrer"
          href="#"
          className="underline dark:text-gray-800 ml-2"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
