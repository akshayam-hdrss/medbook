"use client";
import React from "react";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ui/ProductCard";

function Products() {
  const [products, setProducts] = useState();

  console.log(products,"products");

  useEffect(() => {
    const unsubscribe = subscribeToServicesAndProducts(
      setProducts,
      null,
      null,
      "products"
    );
    return () => unsubscribe();
  }, []);
  return (
    <div className="flex md:block justify-center relative">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
        {products &&
          products
            .slice(0, 6)
            .map((item) => (
              <ProductCard
                name={item.name}
                url={item.iconUrl}
                slug={`/products/${item.id}`}
              />
            ))}
      </div>
      {/* <Image
        src="/om.svg"
        alt="om"
        width={300}
        height={300}
        className="rotate-45 opacity-[0.04] absolute right-16 -top-28 -z-0 "
      ></Image> */}
      {/* check branch rename */}
    </div>
  );
}

export default Products;
