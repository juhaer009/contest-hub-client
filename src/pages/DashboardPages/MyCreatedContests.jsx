import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";

const MyCreatedContests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: contests = [] } = useQuery({
    queryKey: ['myContests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h1>My Created Contests : {contests.length}</h1>
    </div>
  );
};

export default MyCreatedContests;
