import React from "react";
import Sudoku from "@/components/Sudoku";
import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
import Navbar from "@/components/Navbar";
import Quiz from "../../../components/Quiz";
function page() {
  return (
    <div className="relative">
      <div className="fixed w-full top-0 z-[50]">
        <Header />
      </div>
      <div className="grid lg:grid-cols-4 relative z-[0]">
        <Navbar />
        <div className="col-span-3 pt-[70px] ">
          <BackButton />
          <Quiz />
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default page;
