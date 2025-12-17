import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const UpdateContest = () => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { data: contest = [] } = useQuery({
    queryKey: ["update-contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      reset(res.data);
      return res.data;
    },
  });

  const handleUpdateContest = (data) => {
    const updateContest = {
      ...data,
      deadline: selectedDate,
    };
    // console.log(updateContest);
    axiosSecure.patch(`/contests/${id}`, updateContest).then((res) => {
      if (res.data.acknowledged) {
        toast("Contest Updated Successfuly!!");
      }
    });
  };

  return (
    <div className="my-3">
      <h1 className="text-secondary text-center font-bold text-3xl">
        Update a Contest
      </h1>
      <div className="flex justify-center items-center my-10">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form
            onSubmit={handleSubmit(handleUpdateContest)}
            className="card-body"
          >
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                {...register("name")}
                placeholder="Name"
              />
              <label className="label">Image</label>
              <input
                type="text"
                className="input"
                {...register("image")}
                placeholder="Image"
              />
              <label className="label">Description</label>
              <input
                type="text"
                className="input"
                {...register("description")}
                placeholder="Description"
              />
              <label className="label">Price</label>
              <input
                type="number"
                className="input"
                {...register("price")}
                placeholder="$ Price"
              />
              <label className="label">Prize Money</label>
              <input
                type="number"
                className="input"
                {...register("prizeMoney")}
                placeholder="Prize Money"
              />
              <label className="label">Task Instruction</label>
              <input
                type="text"
                className="input"
                {...register("taskInstruction")}
                placeholder="Task Instruction"
              />
              <label className="label">Contest Type</label>
              <legend className="fieldset-legend">Contest Type</legend>
              <select {...register("contestType")} className="select">
                <option disabled={true}>Pick a contest type</option>
                <option>Hackathon</option>
                <option>Data Science Competition</option>
                <option>Gaming Tournament</option>
                <option>Quiz Contest</option>
                <option>Design Contest</option>
                <option>Video Making Contest</option>
                <option>AI / ML Challenge</option>
              </select>
              <label className="label">Deadline</label>
              <DatePicker
                defaultValue={contest.deadline}
                showIcon
                selected={selectedDate}
                onChange={setSelectedDate}
              />
              <button className="btn btn-primary mt-4">Update</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateContest;
