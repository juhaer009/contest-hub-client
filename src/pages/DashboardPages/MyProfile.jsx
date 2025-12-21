import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const handleUpdateProfile = (data) => {
    axiosSecure.patch(`/users/profile/${user.email}`, data).then((res) => {
    //   console.log("after update", res.data);
    if(res.data.acknowledged){
        toast("profile updated successfully!!")
    }
    });
  };
  return (
    <div>
      <h1 className="text-3xl text-secondary font-semibold text-center my-5">
        Update Profile
      </h1>
      <div className="flex justify-center items-center my-3">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="card-body"
          >
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                defaultValue={user.displayName}
                {...register("displayName")}
                placeholder="Name"
              />
              <label className="label">PhotoURL</label>
              <input
                type="text"
                className="input"
                defaultValue={user.photoURL}
                {...register("photoURL")}
                placeholder="PhotoURL"
              />
              <label className="label">Address</label>
              <input
                type="text"
                className="input"
                {...register("address")}
                placeholder="Address"
              />
              <button className="btn btn-primary mt-4">Update Profile</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
