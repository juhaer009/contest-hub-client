import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const TaskCard = ({ task }) => {
  const axiosSecure = useAxiosSecure();
  const handleDeclareWinner = (task) => {
    const taskInfo = {
      winnerStatus: "declared",
    };
    axiosSecure.patch(`/tasks/${task.contestId}`, taskInfo).then((res) => {
      if (res.data.acknowledged) {
        toast(
          `${task.participantName} has declared winner for ${task.contestName}`
        );
      }
    });
  };
  return (
    <div className="card bg-base-100 max-w-96 shadow-sm">
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
        {task.winnerStatus === "declared" || (
          <button
            onClick={() => handleDeclareWinner(task)}
            className="btn btn-sm btn-secondary"
          >
            Declare Winner
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
