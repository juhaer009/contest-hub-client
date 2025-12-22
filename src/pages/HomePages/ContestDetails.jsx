import React, { useContext, useRef } from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ContestDetails = () => {
  const { id } = useParams();
  // console.log("id",id);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const modalRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const { data: contest = [], isLoading } = useQuery({
    queryKey: ["Contest-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  // const { data: payment = [] } = useQuery({
  //   queryKey: ["Contest-payments", id],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/payment/${id}`);
  //     return res.data;
  //   },
  // });
  // console.log(payment);

  const handleModal = () => {
    modalRef.current?.showModal();
  };

  const handleTaskSubmit = (data) => {
    const taskInfo = {
      ...data,
      participantName: user.displayName,
      participantEmail: user.email,
      contestId: id,
      contestName: contest.name,
      creatorMail: contest.creatorMail,
    };
    axiosSecure.post("/task-submission", taskInfo).then((res) => {
      if (res.data.acknowledged) {
        toast("Your task has been submitted!!");
      }
    });
  };
  // console.log("contest", contest);
  // console.log("payment", payment);

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
            Contest Name: <span className="text-black">{contest.name}</span>
          </h2>
          <h2 className="text-2xl text-secondary font-semibold ">
            Total Participants:{" "}
            <span className="text-black">{contest.paymentCount}</span>
          </h2>
          <h2 className="text-2xl text-secondary font-semibold mt-4 ">
            Description
          </h2>
          <p className="">{contest.description}</p>
          <h2 className="text-2xl text-secondary font-semibold mt-4">
            Task Details
          </h2>
          <p className="">{contest.taskInstruction}</p>
        </div>
      </div>
      <div className="mt-4">
      
          <button
            onClick={handleModal}
            className="btn btn-secondary text-white"
          >
            Submit
          </button>
  
          <Link to={`/dashboard/make-payment/${contest._id}`}>
            <button className="btn btn-primary text-white">Make Payment</button>
          </Link>
        
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        {/* <button
          className="btn"
          onClick={() => document.getElementById("my_modal_4").showModal()}
        >
          open modal
        </button> */}
        <dialog ref={modalRef} className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <form onSubmit={handleSubmit(handleTaskSubmit)}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Submit Your Task Here
                </legend>
                <textarea
                  {...register("task")}
                  className="textarea h-24"
                  placeholder="Your Task"
                ></textarea>
              </fieldset>
              <button className="btn btn-secondary text-white">
                Submit Task
              </button>
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ContestDetails;
