// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// function ServiceCard({ name, url, slug }) {
//   console.log(name, "Namef")
//   console.log(url, "url")
//   console.log(slug, "slug")
//   console.log(slug.split("/"));
//   let productName = slug.split("/")[1];
//   console.log(productName.toLowerCase(), "line 10");
//   return (
//     <Link
//       href={slug}
//       className="bg-gradient-to-b m-auto from-[#FCEDED] to-[#F6F6F6] text-center flex flex-col justify-center items-center w-[100px] h-[100px] bg-white border-2 border-solid border-[#909090] rounded-2xl cursor-pointer z-30"
//     >
//       <img src={url} alt={name} width={40} height={40} />
//       <p
//         className="font-medium text-md capitalize mt-1"
//         style={{ wordBreak: "break-word" }}
//       >
//         {name}
//       </p>
//     </Link>
//   );
// }

// export default ServiceCard;

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";

function ServiceCard({ name, url, slug }) {
  let serviceName = slug.split("/")[2];
  let productName = slug.split("/")[1];

  const [data, setData] = useState();

  useEffect(() => {
    const unsubscribe = subscribeToServicesAndProducts(
      setData,
      serviceName,
      null,
      "services"
    );
    return () => {
      unsubscribe();
    };
  }, []);

  console.log(data, "Line 34");

  return (
    <>
      {productName === "products" ? (
        <>
          <Link
            href={slug}
            className="bg-gradient-to-b m-auto from-[#FCEDED] to-[#F6F6F6] text-center flex flex-col justify-center items-center w-[100px] h-[100px] bg-white border-2 border-solid border-[#909090] rounded-2xl cursor-pointer z-30"
          >
            <img src={url} alt={name} width={40} height={40} />
            <p
              className="font-medium text-md capitalize mt-1"
              style={{ wordBreak: "break-word" }}
            >
              {name}
            </p>
          </Link>
        </>
      ) : (
        data &&
        data?.length !== 0 && (
          <Link
            href={`${slug}/${data[0]?.id}`}
            className="bg-gradient-to-b m-auto from-[#FCEDED] to-[#F6F6F6] text-center flex flex-col justify-center items-center w-[100px] h-[100px] bg-white border-2 border-solid border-[#909090] rounded-2xl cursor-pointer z-30"
          >
            <img src={url} alt={name} width={40} height={40} />
            <p
              className="font-medium text-md capitalize mt-1"
              style={{ wordBreak: "break-word" }}
            >
              {name}
            </p>
          </Link>
        )
      )}
    </>
  );
}

export default ServiceCard;
