import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { AuthContext } from "../../../Provider/AuthProvider";

const MakePayment = () => {
  const { contestId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
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
      customer_email: user.email,
      contestId: contest._id,
      contestDeadline: contest.deadline,
    };
    // console.log(paymentInfo);
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
