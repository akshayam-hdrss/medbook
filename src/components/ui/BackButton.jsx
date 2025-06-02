"use client";
import React from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => router.back()}
        className="flex items-center my-4 ml-3 font-bold"
      >
        <IoIosArrowBack />
        <p>Back</p>
      </button>
    </>
  );
}

export default BackButton;
