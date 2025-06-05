import React from "react";
import Link from "next/link";
const explorecontent = [
  "Library",
  "Astrology",
  "History",
  "Yathra",
  "Ayurveda",
];
function page() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sep",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const year = today.getFullYear();
  const monthIndex = today.getMonth();
  const monthName = months[monthIndex];
  const day = String(today.getDate()).padStart(2, "0");
  const date = `${day} ${monthName} ${year}`;
  return (
    <div className="px-10 py-14">
      <h1 className="font-bold text-4xl mb-10">Explore</h1>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10">
        {explorecontent.map((item, index) => (
          <div
            className="border  w-[200px] lg:w-[300px] border-[#808080] rounded-2xl relative overflow-hidden h-72 "
            key={index}
          >
            <div className="object-cover w-full h-[65%] rounded-2xl">
              <img
                src={`/${item}.jpg`}
                alt="explore"
                className=" h-full w-full object-cover rounded-t-2xl"
              />
            </div>

            <div className="h-[35%] px-3 flex flex-col justify-center">
              <div className="flex  justify-between">
                <div className="">
                  <h2 className="font-bold text-2xl pb-3">{item}</h2>
                  <Link
                    href={`/admin/explore/level2?previous=${item.toLowerCase()}&type=explore`}
                    className="text-sm bg-kaavi text-white px-3 py-2 rounded-xl w-fit"
                  >
                    Learn more
                  </Link>
                </div>
                <div className=" border-[#acacac] border py-3 px-3 rounded-lg text-center">
                  <p className="font-bold text-lg">{day}</p>
                  <p className="font-medium text-xs">{monthName}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
