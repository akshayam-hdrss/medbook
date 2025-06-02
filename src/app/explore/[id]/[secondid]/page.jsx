import React from "react";
import { getServicesAndProductsList } from "@/firebase/firestore/servicesProducts";
import ExploreLevel2 from "@/components/Explore/ExploreLevel2";

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
      return list2.map((subitem) => ({
        id: item,
        secondid: subitem,
      }));
    })
  );
  // Flatten the array of arrays into a single array of objects
  return paths.flat();
}

async function ServiceLevel2Page({ params }) {
  const { id, secondid } = params;
  const decodedfirst = decodeURIComponent(id);
  const decodedsecond = decodeURIComponent(secondid);

  return <ExploreLevel2 id={decodedfirst} secondid={decodedsecond} />;
}

export default ServiceLevel2Page;
