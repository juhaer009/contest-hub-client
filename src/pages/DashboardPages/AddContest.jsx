import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
// import "cally";

const AddContest = () => {
  const { register, handleSubmit } = useForm();
  const handleAddContest = (data) => {
    console.log(data);
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

              {/* <label className="label">Contest Type</label>
              <input
                type="text"
                className="input"
                {...register("contestType")}
                placeholder="Contest Type"
              /> */}
              <label className="label">Contest Type</label>
              <legend className="fieldset-legend">Contest Type</legend>
              <select {...register("contestType")} defaultValue="Pick a contest type" className="select">
                <option disabled={true}>Pick a Contest type</option>
                <option>Design Contest</option>
                <option>Photography Contest</option>
                <option>Hackathon</option>
                <option>Gaming Tournament</option>
                <option>Coding Contest</option>
              </select>

              {/* <label className="label">Deadline</label>
              <button
                popoverTarget="cally-popover1"
                className="input input-border"
                id="cally1"
                // style="anchorName:--cally1"
              >
                Pick a date
              </button>
              <div
                popover
                id="cally-popover1"
                className="dropdown bg-base-100 rounded-box shadow-lg"
                // style="positionAnchor:--cally1"
              >
                <calendar-date
                  class="cally"
                //   onchange={
                //     (document.getElementById("cally1").innerText = this.value)
                //   }
                >
                  <svg
                    aria-label="Previous"
                    className="fill-current size-4"
                    slot="previous"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                  </svg>
                  <svg
                    aria-label="Next"
                    className="fill-current size-4"
                    slot="next"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                  </svg>
                  <calendar-month></calendar-month>
                </calendar-date>
              </div> */}

              <button className="btn btn-primary mt-4">Create</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContest;
