import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, NavLink } from "react-router";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";

const MyCreatedContests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myContests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDeleteContest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contests/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Contest request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-4">
      <h1 className="text-secondary font-semibold text-2xl md:text-3xl mb-6">
        My Created Contests :
        <span className="text-primary ml-2">{contests.length}</span>
      </h1>

      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Contest Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr key={contest._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{contest.name}</td>
                <td>{contest.contestType}</td>
                <td>
                  <span className="badge badge-outline badge-primary">
                    {contest.status}
                  </span>
                </td>
                <td>
                  {contest.status === "pending" && (
                    <>
                      <NavLink
                        to={`/dashboard/update-contest/${contest._id}`}
                        className="btn btn-sm btn-secondary mr-3"
                      >
                        <MdEdit />
                      </NavLink>
                      <button
                        onClick={() => handleDeleteContest(contest._id)}
                        className="btn btn-sm btn-secondary"
                      >
                        <RiDeleteBin6Line size="20px" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center my-4">
          <Link
            to="/dashboard/submitted-task"
            className="btn btn-secondary text-white"
          >
            View Submissions
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {contests.map((contest) => (
          <div key={contest._id} className="card bg-base-100 shadow-md border">
            <div className="card-body p-4">
              <div className="flex justify-between items-center">
                <h2 className="card-title text-lg">{contest.name}</h2>
              </div>

              <p className="text-sm">
                <span className="font-semibold">Type:</span>{" "}
                {contest.contestType}
              </p>

              <p className="text-sm">
                <span className="font-semibold">Status:</span>{" "}
                <span className="badge badge-outline badge-secondary">
                  {contest.status}
                </span>
              </p>

              <div className="card-actions justify-end mt-3">
                {contest.status === "pending" && (
                  <>
                    <NavLink
                      to={`/dashboard/update-contest/${contest._id}`}
                      className="btn btn-sm btn-secondary mr-3"
                    >
                      <MdEdit />
                    </NavLink>
                    <button
                      onClick={() => handleDeleteContest(contest._id)}
                      className="btn btn-sm btn-secondary"
                    >
                      <RiDeleteBin6Line size="20px" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        <Link
          to="/dashboard/submitted-task"
          className="btn btn-secondary text-white"
        >
          View Submissions
        </Link>
      </div>
    </div>
  );
};

export default MyCreatedContests;
