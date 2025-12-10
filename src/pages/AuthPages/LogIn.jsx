import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { logIn, googleLogIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogIn = (data) => {
    // console.log(data);
    logIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        navigate(`${location.state ? location.state : "/"}`);
        toast("Logged In Successfully!!");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((result) => {
        const user = result.user;
        // console.log(user);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleLogIn)} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is Required</p>}
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).+$/,
            })}
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is Required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 or more characters long
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must have atleast one lowercase, one uppercase and a
              special character
            </p>
          )}

          <button className="btn btn-primary mt-4">Login</button>
        </fieldset>
      </form>
      <span className="ml-22">---------- or -----------</span>
      {/* Google */}
      <div className="ml-20">
        <button
          onClick={handleGoogleLogIn}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
      <span className="ml-10 mt-2">
        Don't Have an account?{" "}
        <Link state={location?.state} to="/auth/register" className="text-secondary">
          Register
        </Link>
      </span>
    </div>
  );
};

export default LogIn;
