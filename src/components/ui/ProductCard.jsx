import React from 'react'
import Link from "next/link";

const ProductCard = ({ name, url, slug }) => {
  return (
    <Link
      href={slug}
      className='p-3 bg-gray-400 rounded-xl border grid gap-5 mx-auto min-w-[165px]'
    >
      <img src={url} alt={name} className='w-[140px] h-[120px] aspect-square' />
      <h1 className='capitalize text-white bg-kaavi py-1 rounded-md text-center'>{name}</h1>
    </Link>
  )
}

export default ProductCard
