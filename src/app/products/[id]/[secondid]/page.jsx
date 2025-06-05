import React from "react";
import { getServicesAndProductsList } from "@/firebase/firestore/servicesProducts";
import ProductsLevel2 from "@/components/Products/ProductsLevel2";

export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null, "products");
  const paths = await Promise.all(
    list.map(async (item) => {
      const list2 = await getServicesAndProductsList(
        null,
        null,
        item,
        "products"
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

function ProductLevel2Page({ params }) {
  const { id, secondid } = params;
    return <ProductsLevel2 id={id} secondid={secondid} />;
}

export default ProductLevel2Page;
