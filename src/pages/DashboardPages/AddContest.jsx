import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
// import "cally";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddContest = () => {
  const { register, handleSubmit } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();
  const handleAddContest = (data) => {
    // console.log(data);
    // console.log(selectedDate);
    const newContest = {
      ...data,
      deadline: selectedDate,
    };
    axiosSecure.post("/contests", newContest).then((res) => {
      console.log("after creating contest", res.data);
    });
  };
  return (
    <div className="my-3">
      <h1 className="text-secondary text-center font-bold text-3xl">
        Add a Contest
      </h1>
      <div className="flex justify-center items-center my-10">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(handleAddContest)} className="card-body">
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
                {...register("image ")}
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
              <label className="label">Deadline</label>
              <DatePicker
                showIcon
                selected={selectedDate}
                onChange={setSelectedDate}
              />
              <button className="btn btn-primary mt-4">Create</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContest;
