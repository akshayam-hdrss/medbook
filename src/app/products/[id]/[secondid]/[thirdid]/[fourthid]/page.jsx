import React from "react";
import { getServicesAndProductsList } from "@/firebase/firestore/servicesProducts";
import ProductsLevel4 from "@/components/Products/ProductsLevel4";

export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null, "products");
  const paths = await Promise.all(
    list?.map(async (item) => {
      const list2 = await getServicesAndProductsList(
        null,
        null,
        item,
        "products"
      );
      const subPaths = await Promise.all(
        list2?.map(async (subitem) => {
          const list3 = await getServicesAndProductsList(
            null,
            item,
            subitem,
            "products"
          );
          console.log("list3:", list3);
          const subsubPaths = await Promise.all(
            list3?.map(async (subitem2) => {
              const list4 = await getServicesAndProductsList(
                item,
                subitem,
                subitem2,
                "products"
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

export default async function ServiceLevel4Page({ params }) {
  const { id, secondid, thirdid, fourthid } = params;
  const decodedfirst = decodeURIComponent(id);
  const decodedsecond = decodeURIComponent(secondid);
  const decodedthird = decodeURIComponent(thirdid);

  return (
    <ProductsLevel4
      id={decodedfirst}
      secondid={decodedsecond}
      thirdid={decodedthird}
      fourthid={fourthid}
    />
  );
}
