import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import Navbar from "@/components/Navbar";
export default function Page() {
  return (
    <>
      <div className="">
        <div className="fixed w-full top-0 z-[50]">
          <Header />
        </div>
        <div className=" grid lg:grid-cols-4 relative z-[0]">
          <Navbar />
          <div className="col-span-3 pt-[70px]">
            <BackButton />

            <h1 className="font-koulen text-4xl text-grey mt-14 ml-4">
              Quiz and Games
            </h1>
            <div className="p-5">
              <div className="max-w-[500px] flex mx-auto w-fit my-10 items-start justify-evenly bg-[#f8eae3] px-6 py-6 rounded-md cursor-pointer hover:scale-110 hover:drop-shadow-2xl transition-all ">
                <img
                  src="/sudoku.png"
                  alt="sudoku"
                  className="md:w-[150px] w-[100px] my-auto"
                />
                <div>
                  <h1 className="md:text-3xl text-xl font-bold mt-6 mb-1">
                    Sudoku
                  </h1>
                  <h2 className="md:text-lg mb-6">
                    Challenge your mind, Master the Grid
                  </h2>
                  <Link
                    href="/games/sudoku"
                    className="bg-kaavi text-white px-4 py-2 rounded-md "
                  >
                    Play now
                  </Link>
                </div>
              </div>
              <div className="max-w-[500px] flex gap-6 mx-auto w-fit my-10 items-start justify-evenly bg-[#f8eae3] px-6 py-6 rounded-md cursor-pointer hover:scale-110 hover:drop-shadow-2xl transition-all ">
                <img
                  src="/quiz.jpg"
                  alt="quiz"
                  className="md:w-[150px] w-[100px] my-auto"
                />
                <div>
                  <h1 className="md:text-3xl text-xl font-bold mt-6 mb-1">
                    Quiz
                  </h1>
                  <h2 className="md:text-lg mb-6">
                    Test your knowledge, Get Ready for a Challenge
                  </h2>
                  <Link
                    href={"/games/quiz"}
                    className="bg-kaavi text-white px-4 py-2 rounded-md "
                  >
                    Play now
                  </Link>
                </div>
              </div>
              <div className="max-w-[500px] flex gap-6 mx-auto w-fit my-10 items-start justify-evenly bg-[#f8eae3] px-6 py-6 rounded-md cursor-pointer hover:scale-110 hover:drop-shadow-2xl transition-all ">
                <img
                  src="/chess.png"
                  alt="chess"
                  className="md:w-[150px] w-[100px] my-auto"
                />
                <div>
                  <h1 className="md:text-3xl text-xl font-bold mt-6 mb-1">
                    Chess
                  </h1>
                  <h2 className="md:text-lg mb-6">
                    Test your Tactics, Be Vital and Make your Strategy
                  </h2>
                  <Link
                    href={"https://www.chess.com/"}
                    target="_blank"
                    className="bg-kaavi text-white px-4 py-2 rounded-md "
                  >
                    Play now
                  </Link>
                </div>
              </div>
              <div className="max-w-[500px] flex gap-6 mx-auto w-fit my-10 items-start justify-evenly bg-[#f8eae3] px-6 py-6 rounded-md cursor-pointer hover:scale-110 hover:drop-shadow-2xl transition-all ">
                <img
                  src="/mario.jpeg"
                  alt="mario"
                  className="md:w-[150px] w-[100px] my-auto"
                />
                <div>
                  <h1 className="md:text-3xl text-xl font-bold mt-6 mb-1">
                    Super Mario
                  </h1>
                  <h2 className="md:text-lg mb-6">
                    Play the retro classic game Super Mario
                  </h2>
                  <Link
                    href={"https://supermarioplay.com/"}
                    target="_blank"
                    className="bg-kaavi text-white px-4 py-2 rounded-md "
                  >
                    Play now
                  </Link>
                </div>
              </div>
              <div className="max-w-[500px] flex gap-6 mx-auto w-fit my-10 items-start justify-evenly bg-[#f8eae3] px-6 py-6 rounded-md cursor-pointer hover:scale-110 hover:drop-shadow-2xl transition-all ">
                <img
                  src="/words.png"
                  alt="quiz"
                  className="md:w-[150px] w-[100px] my-auto"
                />
                <div>
                  <h1 className="md:text-3xl text-xl font-bold mt-6 mb-1">
                    Quiz
                  </h1>
                  <h2 className="md:text-lg mb-6">
                    Test your knowledge with Vocabulary
                  </h2>
                  <Link
                    href={"https://word.tips/"}
                    target="_blank"
                    className="bg-kaavi text-white px-4 py-2 rounded-md "
                  >
                    Play now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
