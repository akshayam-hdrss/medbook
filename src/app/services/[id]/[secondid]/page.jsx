import React from "react";
import {
  getServicesAndProductsList,
  getServiceAndProductDocs,
  getName,
} from "@/firebase/firestore/servicesProducts";
import ServiceLevel2 from "@/components/Services/ServiceLevel2";
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
  const data = await getServiceAndProductDocs(
    null,
    decodedfirst,
    decodedsecond,
    null,
    "services"
  );

  return <ServiceLevel2 id={decodedfirst} secondid={decodedsecond} />;
}

export default ServiceLevel2Page;
