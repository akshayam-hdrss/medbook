import React from "react";
import { getServicesAndProductsList } from "@/firebase/firestore/servicesProducts";

import ServiceLevel3 from "@/components/Services/ServiceLevel3";

export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null, "services");
  const paths = await Promise.all(
    list.map(async (item) => {
      const list2 = await getServicesAndProductsList(
        null,
        null,
        item,
        "services"
      );
      const subPaths = await Promise.all(
        list2.map(async (subitem) => {
          const list3 = await getServicesAndProductsList(
            null,
            item,
            subitem,
            "services"
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

async function ServiceLevel3Page({ params }) {
  const { id, secondid, thirdid } = params;
  const decodedfirst = decodeURIComponent(id);
  const decodedsecond = decodeURIComponent(secondid);
  const decodedthird = decodeURIComponent(thirdid);
  return (
    <ServiceLevel3
      id={decodedfirst}
      secondid={decodedsecond}
      thirdid={decodedthird}
    />
  );
}

export default ServiceLevel3Page;
