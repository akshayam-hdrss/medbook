import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <aside className="sticky hidden lg:block top-16 left-0 h-screen">
        <div className="p-5 pt-24">
          <div className="flex justify-center">
            <div className="">
              {/* <div className="flex justify-center py-2">
                <div className="w-[100px] h-[100px] bg-grey rounded-full"></div>
              </div>
              <h1 className="font-semibold text-2xl text-center">User Name</h1>
              <h5 className="text-center">user@gmail.com</h5> */}
              <div className="pt-5">
                <Link
                  href="/"
                  className="flex mb-4 items-center justify-between"
                >
                  <p className="font-medium">Home</p>
                  <IoIosArrowForward />
                </Link>
                <Link
                  href="/about"
                  className="flex mb-4 items-center justify-between"
                >
                  <p className="font-medium">About us</p>
                  <IoIosArrowForward />
                </Link>
                <Link
                  href="/services"
                  className="flex mb-4 items-center justify-between"
                >
                  <p className="font-medium">Explore Services</p>
                  <IoIosArrowForward />
                </Link>
                <Link
                  href="/hdrss"
                  className="flex mb-4 items-center justify-between"
                >
                  <p className="font-medium">HDRSS</p>
                  <IoIosArrowForward />
                </Link>
                
                
               
           

                <div className="flex mb-4 items-center justify-between">
                  <Link href="/contact">
                    <p className="font-medium">Contact Us</p>
                  </Link>
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
