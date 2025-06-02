import React from "react";
import { getServicesAndProductsList } from "@/firebase/firestore/servicesProducts";
import ExploreLevel3 from "@/components/Explore/ExploreLevel3";

export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null, "explore");
  const paths = await Promise.all(
    list.map(async (item) => {
      const list2 = await getServicesAndProductsList(
        null,
        null,
        item,
        "explore"
      );
      const subPaths = await Promise.all(
        list2.map(async (subitem) => {
          const list3 = await getServicesAndProductsList(
            null,
            item,
            subitem,
            "explore"
          );
          return list3.map((subitem2) => ({
            id: item,
            secondid: subitem,
            thirdid: subitem2,
          }));
        })
      );
      return subPaths.flat();
    })
  );
  return paths.flat();
}
function explorethirdpage({ params }) {
  const { id, secondid, thirdid } = params;
  return <ExploreLevel3 id={id} secondid={secondid} thirdid={thirdid} />;
}

export default explorethirdpage;
