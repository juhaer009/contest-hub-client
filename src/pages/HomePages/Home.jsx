import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../hooks/useAxios";
import ContestCard from "../../components/ContestCard";
import { Link } from "react-router";

const Home = () => {
  const axiosInstance = useAxios();
  const { data: contests = [] } = useQuery({
    queryKey: ["popular-contest"],
    queryFn: async () => {
      const res = await axiosInstance.get("/popular-contest");
      return res.data;
    },
  });
  return (
    <div>
      <div>
        <h1 className="text-3xl text-secondary font-semibold text-center">
          Popular Contests
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4 mt-5">
          {contests.map((contest) => (
            <ContestCard key={contest._id} contest={contest}></ContestCard>
          ))}
        </div>
        <Link to="/allcontests" className="flex justify-center my-4">
          <button className="btn btn-primary">Show All</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
