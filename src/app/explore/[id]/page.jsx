import { getServicesAndProductsList } from "@/firebase/firestore/servicesProducts";
import React from "react";
import ExploreLevel1 from "@/components/Explore/ExploreLevel1";

export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null, "explore");
  return list.map((item) => ({
    id: item,
  }));
}

export default function ServicePages({ params }) {
  const { id } = params;
  const decoded = decodeURIComponent(id);

  return <ExploreLevel1 id={decoded} />;
}
