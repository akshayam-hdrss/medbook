import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
const explorecontent = [
  "Library",
  "Astrology",
  "History",
  "Yathra",
  "Ayurveda",
];
function ExploreCarousel() {
  const router = useRouter();

  const handleNavigation = (item) => {
    router.push(`/explore/${item.toLowerCase()}`);
  };
  return (
    <div>
      <div className="overflow-hidden max-h-screen grid relative">
        <div className="flex gap-5 overflow-x-scroll p-5 nosc ">
          {explorecontent.map((item) => (
            <div key={item} className="px-2 ">
              <Link href={`/explore/${item.toLowerCase()}`}>
                <div className="border min-w-[200px] lg:min-w-[300px] border-[#808080] rounded-2xl relative overflow-hidden h-72 ">
                  <div className="object-cover w-full h-[65%] rounded-2xl">
                    <Image
                      height={100}
                      width={100}
                      src={`/${item}.jpg`}
                      alt="explore"
                      className=" h-full w-full object-cover rounded-t-2xl"
                    />
                  </div>

                  <div className="h-[35%] px-3 flex flex-col justify-center">
                    <div className="flex flex-row gap-x-4 justify-between">
                      <div className="w-fit">
                        <h2 className="font-bold text-2xl pb-3">{item}</h2>
                        <button
                          className="bg-kaavi text-white px-3 py-1 rounded-md"
                          onClick={() => handleNavigation(item)}
                        >
                          Learn more
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreCarousel;
