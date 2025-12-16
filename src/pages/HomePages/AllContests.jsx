import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading";
import ContestCard from "../../components/ContestCard";

const AllContests = () => {
  const axiosInstance = useAxios();
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["allContests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/allcontests");
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="text-3xl text-secondary font-semibold text-center mt-2">
        All Contest : <span className="text-primary">{contests.length}</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-1 mt-5">
        {
            contests.map(contest => <ContestCard key={contest._id} contest={contest}></ContestCard>)
        }
      </div>
    </div>
  );
};

export default AllContests;
