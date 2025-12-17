import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import { NavLink } from "react-router";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

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
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{user.displayName}</td>
                <td>{user.role}</td>
                <td>
                  <NavLink className="btn btn-sm btn-secondary mr-3">
                    View Submissions
                  </NavLink>
                  <NavLink className="btn btn-sm btn-secondary mr-3">
        
                  </NavLink>
                  <button className="btn btn-sm btn-secondary">
                    
                  </button>
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
              <div className="flex justify-between items-center">
                <h2 className="card-title text-lg">{user.displayName}</h2>
              </div>

              <p className="text-sm">
                <span className="font-semibold text-primary">Role:</span>{" "}
                {user.role}
              </p>

              <div className="card-actions justify-end mt-3">
                <NavLink className="btn btn-sm btn-secondary mr-3">
                  View Submissions
                </NavLink>

                <NavLink className="btn btn-sm btn-secondary mr-3">
                  
                </NavLink>
                <button className="btn btn-sm btn-secondary">
                  
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
