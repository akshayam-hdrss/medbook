import React from "react";
import { getServicesAndProductsList } from "@/firebase/firestore/servicesProducts";
import ExploreLevel4 from "@/components/Explore/ExploreLevel4";

export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null, "explore");
  const paths = await Promise.all(
    list?.map(async (item) => {
      const list2 = await getServicesAndProductsList(
        null,
        null,
        item,
        "explore"
      );
      const subPaths = await Promise.all(
        list2?.map(async (subitem) => {
          const list3 = await getServicesAndProductsList(
            null,
            item,
            subitem,
            "explore"
          );
          console.log("list3:", list3);
          const subsubPaths = await Promise.all(
            list3?.map(async (subitem2) => {
              const list4 = await getServicesAndProductsList(
                item,
                subitem,
                subitem2,
                "explore"
              );
              return list4?.map((subitem3) => ({
                id: item,
                secondid: subitem,
                thirdid: subitem2,
                fourthid: subitem3,
              }));
            })
          );
          return subsubPaths?.flat();
        })
      );
      return subPaths?.flat();
    })
  );
  return paths?.flat();
}

function explorefourthpage({ params }) {
  const { id, secondid, thirdid, fourthid } = params;
  return (
    <ExploreLevel4
      id={id}
      secondid={secondid}
      thirdid={thirdid}
      fourthid={fourthid}
    />
  );
}

export default explorefourthpage;
