import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const SubmittedTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["submitted-tasks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks?email=${user?.email}`);
      return res.data;
    },
  });
  //   console.log(tasks);
  const handleDeclareWinner = (task) => {
    const taskInfo = {
      winnerStatus: "declared",
    };
    axiosSecure.patch(`/tasks/${task.contestId}`, taskInfo).then((res) => {
      if (res.data.acknowledged) {
        refetch();
        toast(
          `${task.participantName} has declared winner for ${task.contestName}`
        );
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="p-4">
      <h1 className="text-3xl text-secondary font-semibold">Submitted Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map((task) => (
          <div key={task._id} className="card bg-base-100 max-w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-seconday">{task.contestName}</h2>
              <div className="card-actions justify-end">
                <div className="badge badge-outline border-primary h-fit">
                  Submitted Task : {task.task}
                </div>
                <div className="badge badge-outline border-primary">
                  Participant Name : {task.participantName}
                </div>
              </div>
            </div>
            <div className="p-3">
              {task.winnerStatus === "declared" ? (
                <div>
                  <span>Winner Declared</span>
                </div>
              ) : (
                <button
                  onClick={() => handleDeclareWinner(task)}
                  className="btn btn-sm btn-secondary"
                >
                  Declare Winner
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmittedTask;
