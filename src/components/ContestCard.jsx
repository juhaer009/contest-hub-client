import React from "react";
import { Link, useLocation } from "react-router";

const ContestCard = ({ contest }) => {
  //   console.log(contest);
  const location = useLocation();
  // console.log(location)
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={contest.image} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-seconday">{contest.name}</h2>
        <p>{contest.description?.split(" ").slice(0, 5).join(" ") + "...."}</p>

        <div className="card-actions justify-end">
          <div className="badge badge-outline border-primary">
            {contest.contestType}
          </div>
          <div className="badge badge-outline border-primary">Products</div>
        </div>
        <Link
          to={`/contest-details/${contest._id}`}
          className="btn btn-primary text-white"
          state={location.pathname}
        >
          Show Details
        </Link>
      </div>
    </div>
  );
};

export default ContestCard;
