import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import { NavLink } from "react-router";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiTickOutline } from "react-icons/ti";
import { TfiClose } from "react-icons/tfi";
import { toast } from "react-toastify";

const ContestManagement = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-contest"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  const handleContest = (contest, status) => {
    const statusInfo = { status };
    axiosSecure
      .patch(`/contests/${contest._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast(`${contest.name} has been ${status}`);
        }
      });
  };

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
    <div>
      <h1 className="text-secondary text-3xl font-semibold p-4">
        Manage Contests :{" "}
        <span className="text-primary">({contests.length})</span>
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
                  <span className="flex gap-2">
                    {contest.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleContest(contest, "confirmed")}
                          className="btn btn-sm btn-secondary"
                        >
                          <TiTickOutline size="20px" />
                        </button>

                        <button
                          onClick={() => handleContest(contest, "rejected")}
                          className="btn btn-sm btn-error"
                        >
                          <TfiClose size="20px" />
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleDeleteContest(contest._id)}
                      className="btn btn-sm btn-error"
                    >
                      <RiDeleteBin6Line size="20px" />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                <button
                  onClick={() => handleDeleteContest(contest._id)}
                  className="btn btn-sm btn-error"
                >
                  <RiDeleteBin6Line size="20px" />
                </button>
                {contest.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleContest(contest, "confirmed")}
                      className="btn btn-sm btn-secondary"
                    >
                      <TiTickOutline size="20px" />
                    </button>

                    <button
                      onClick={() => handleContest(contest, "rejected")}
                      className="btn btn-sm btn-error"
                    >
                      <TfiClose size="20px" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContestManagement;
