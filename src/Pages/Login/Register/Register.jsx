import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";

const Register = () => {
  const {createUser} = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
    .then(result => {
      const loggedUser = result.user;
      console.log(loggedUser);
    })
    reset();
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
      <div>
        <button
          aria-label="Login with Google"
          type="button"
          className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-5 h-5 fill-current"
          >
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
          <p>Login with Google</p>
        </button>
      </div>
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
