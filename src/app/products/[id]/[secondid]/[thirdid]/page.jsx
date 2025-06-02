import React from "react";
import { getServicesAndProductsList } from "@/firebase/firestore/servicesProducts";

import ProductsLevel3 from "@/components/Products/ProductsLevel3"

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
      const subPaths = await Promise.all(
        list2.map(async (subitem) => {
          const list3 = await getServicesAndProductsList(
            null,
            item,
            subitem,
            "products"
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

async function ProductsLevel3Page({ params }) {
  const { id, secondid, thirdid } = params;
  const decodedfirst = decodeURIComponent(id);
  const decodedsecond = decodeURIComponent(secondid);
  const decodedthird = decodeURIComponent(thirdid);
  return (
    <ProductsLevel3
      id={decodedfirst}
      secondid={decodedsecond}
      thirdid={decodedthird}
    />
  );
}

export default ProductsLevel3Page;
