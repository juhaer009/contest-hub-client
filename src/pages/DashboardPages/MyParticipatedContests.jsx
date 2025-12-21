import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";

const MyParticipatedContests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["participated-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-participated-contests/payment?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="text-3xl text-secondary font-semibold p-4">
        My Participated Contests
      </h1>

      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment Status</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr key={contest._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{contest.contestName}</td>
                <td>{contest.amount} $</td>
                <td>
                  <span className="badge badge-outline badge-primary">
                    {contest.paymentStatus}
                  </span>
                </td>
                <td>
                  <span className="badge badge-outline badge-primary">
                    {contest.contestDeadline}
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
                <h2 className="card-title text-lg">{contest.contestName}</h2>
              </div>

              <p className="text-sm">
                <span className="font-semibold">Price:</span> ${contest.amount}
              </p>

              <p className="text-sm">
                <span className="font-semibold">Payment Status:</span>{" "}
                <span className="badge badge-outline badge-secondary">
                  {contest.paymentStatus}
                </span>
              </p>

              <div className="card-actions justify-end mt-3">
                <p className="text-sm">
                  <span className="font-semibold">Deadline:</span>{" "}
                  <span className="badge badge-outline badge-secondary">
                    {contest.contestDeadline}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyParticipatedContests;
