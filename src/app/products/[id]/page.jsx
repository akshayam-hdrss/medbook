import {
  getServiceAndProductDocs,
  getServicesAndProductsList,
} from "@/firebase/firestore/servicesProducts";
import React from "react";

import { getServiceAds } from "@/firebase/firestore/advertisements";

import ProductsLevel1 from "@/components/Products/ProductsLevel1";
export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null, "products");
  return list.map((item) => ({
    id: item,
  }));
}

export default async function ProductPages({ params }) {
  const { id } = params;
  const decoded = decodeURIComponent(id);
  return <ProductsLevel1 id={decoded} />;
}
