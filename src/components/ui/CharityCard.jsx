import Link from "next/link";
import React from "react";

const CharityCard = ({ image, name, description, id }) => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="">
        <img src={image} alt="" className="m-auto min-w-[150px]" />
      </div>
      <div className="grid">
        <h1 className="font-semibold text-xl">{name}</h1>
        <h3 className="h-[50px] overflow-hidden">{description}</h3>
        <div className="w-full grid">
          <Link
            href={`/charities/${id}`}
            className={`text-center text-white bg-kaavi py-1 h-fit rounded-md w-full `}
          >
            View
          </Link>
        </div>{" "}
      </div>
    </div>
  );
};

export default CharityCard;
