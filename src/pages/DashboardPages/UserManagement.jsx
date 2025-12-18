import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import { NavLink } from "react-router";
import { FiShieldOff } from "react-icons/fi";
import { FaUserPlus, FaUserShield, FaUserSlash } from "react-icons/fa6";
import { toast } from "react-toastify";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleUser = (user, status) => {
    const roleInfo = { role: status };
    axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        toast(`${user.displayName}'s role has been set as ${status}`);
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="text-secondary text-3xl font-semibold p-4">
        Manage Users
      </h1>

      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Actions</th>
              <th>Creator Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleUser(user, "user")}
                      className="btn btn-sm btn-error"
                    >
                      <FiShieldOff size="20px" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUser(user, "admin")}
                      className="btn btn-sm btn-secondary"
                    >
                      <FaUserShield size="20px" />
                    </button>
                  )}
                </td>

                <td>
                  {user.role === "creator" ? (
                    <button
                      onClick={() => handleUser(user, "user")}
                      className="btn btn-sm btn-error"
                    >
                      <FaUserSlash size="20px" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUser(user, "creator")}
                      className="btn btn-sm btn-secondary"
                    >
                      <FaUserPlus size="20px" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users.map((user) => (
          <div key={user._id} className="card bg-base-100 shadow-md border">
            <div className="card-body p-4">
              <div className="flex gap-2 items-center">
                <img className="w-12 h-12 rounded-2xl" src={user.photoURL} alt="" />
                <h2 className="card-title text-lg">{user.displayName}</h2>
              </div>

              <p className="text-sm">
                <span className="font-semibold text-primary">Role:</span>{" "}
                {user.role}
              </p>

              <div className="card-actions justify-end mt-3">
                {user.role === "admin" ? (
                  <button
                    onClick={() => handleUser(user, "user")}
                    className="btn btn-sm btn-error"
                  >
                    <FiShieldOff size="20px" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleUser(user, "admin")}
                    className="btn btn-sm btn-secondary"
                  >
                    <FaUserShield size="20px" />
                  </button>
                )}
                {user.role === "creator" ? (
                  <button
                    onClick={() => handleUser(user, "user")}
                    className="btn btn-sm btn-error"
                  >
                    <FaUserSlash size="20px" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleUser(user, "creator")}
                    className="btn btn-sm btn-secondary"
                  >
                    <FaUserPlus size="20px" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
