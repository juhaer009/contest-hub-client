import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

const ContestDetails = () => {
  const { id } = useParams();
  //   console.log(id);
  const axiosSecure = useAxiosSecure();
  const { data: contest = [], isLoading } = useQuery({
    queryKey: ["Contest-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="text-3xl text-secondary font-bold text-center my-4">
        Contest Details
      </h1>
      <div>
        <img className="w-full h-70 rounded-2xl" src={contest.image} alt="" />
        <div className="mt-4">
          <h2 className="text-2xl text-secondary font-semibold ">
            Description
          </h2>
          <p className="mt-2">{contest.description}</p>
          <h2 className="text-2xl text-secondary font-semibold mt-4">Task Details</h2>
          <p className="mt-2">{contest.taskInstruction}</p>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
