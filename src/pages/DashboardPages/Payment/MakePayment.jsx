import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const MakePayment = () => {
  const { contestId } = useParams();
  const axiosSecure = useAxiosSecure();
  //   console.log(contestId);
  const { data: contest = [], isLoading } = useQuery({
    queryKey: ["make-payment", contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${contestId}`);
      return res.data;
    },
  });
  const handlePayment = async () => {
    const paymentInfo = {
      price: contest.price,
      contestName: contest.name,
      contestId: contest._id,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="text-3xl text-secondary font-semibold">
        Please pay {contest.price} for {contest.name}
      </h1>
      <button onClick={handlePayment} className="btn btn-primary text-white">
        Pay
      </button>
    </div>
  );
};

export default MakePayment;
