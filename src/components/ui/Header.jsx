"use client";
import React, { useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import Drawer from "@mui/material/Drawer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import auth from "@/firebase/config.js";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { getUser } from "@/firebase/firestore/user";
import { useRouter } from "next/navigation";
const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "80%",
          padding: "20px 40px", // Set fixed width for the drawer
        },
      },
    },
  },
});

function Header({ exec = null }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const [userDoc, setUserDoc] = useState();
  const router = useRouter();
  const toggleDrawer = () => setOpen(!open);
  const handleLogout = () => {
    auth.signOut();
    router.push("/login");
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const data = await getUser(currentUser.uid);
        setUserDoc(data);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="">
      <div
        className="w-full px-4 py-0 flex justify-between items-center"
        style={{
          background: "linear-gradient(to right, #FF5912 0%, #D30000 100%)",
        }}
      >
        <div className="flex items-start justify-evenly gap-5"></div>
        <Link href="/" className="text-center">
          {/* <img
            src="/partner.png"
            alt="logo"
            width={235}
            height={65}
            className="mt-2 ml-2 py-2"
          /> */}
          <h1 className="p-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">MEDBOOK</h1>
        </Link>
        <div className="mt-2">
          <button
            onClick={toggleDrawer}
            className="bg-inherit m-0 p-0 shadow-none lg:hidden"
          >
            <IoMenu fontSize={40} className="text-white" />
          </button>

          <Link
            href={"/"}
            className="bg-gradient-to-br text-black font-semibold from-white to-kaavi/80 py-1 px-5 rounded-md hidden lg:flex"
          >
            Contact
          </Link>
        </div>
      </div>
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Drawer
            anchor="left"
            open={open}
            onClose={toggleDrawer}
            sx={{
              width: "45%",
            }}
          >
            <IoClose className="ml-auto" fontSize={30} onClick={toggleDrawer} />
<div className="">
  <h1 className="text-center font-semibold py-5 text-2xl">Menu</h1>
</div>
            {/* {user ? (
              <div className="flex flex-col mb-14 mt-2 justify-evenly items-center">
                <p className="mt-10 text-2xl my-1 font-bold">Welcome,</p>
                <p className="my-1 mb-4 text-lg font-bold border-b-2 border-b-kaavi">
                  {userDoc && userDoc.name}
                </p>
                <button
                  onClick={handleLogout}
                  className="bg-kaavi text-white p-3 rounded-xl"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex flex-row mb-14 mt-8 font-medium justify-evenly items-center">
                <Link
                  href={"/login"}
                  className="p-3 border border-black rounded-xl"
                >
                  Login
                </Link>
                <Link
                  href={"/signup"}
                  className="p-3 bg-kaavi text-white rounded-xl"
                >
                  Sign Up
                </Link>
              </div>
            )} */}
            {exec != null ? (
              <div>
                <Link
                  href="/exec"
                  className="flex mb-4 items-center justify-between"
                >
                  <p className="font-medium">Home</p>
                  <IoIosArrowForward />
                </Link>
                <Link
                  href="/exec/clients"
                  className="flex mb-4 items-center justify-between"
                >
                  <p className="font-medium">Clients Details</p>
                  <IoIosArrowForward />
                </Link>
                <Link
                  href="/exec/add"
                  className="flex mb-4 items-center justify-between"
                >
                  <p className="font-medium">Add new client</p>
                  <IoIosArrowForward />
                </Link>
              </div>
            ) : (
              <div>
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
                  href="/location"
                  className="flex mb-4 items-center justify-between"
                >
                  <p className="font-medium">Select Location</p>
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
                {/* <Link
                  href="/ramdass"
                  className="flex mb-4 items-center justify-between"
                >
                  <p className="font-medium">About Leader</p>
                  <IoIosArrowForward />
                </Link> */}

                <Link
                  href="/contact"
                  className="flex mb-4 items-center justify-between"
                >
                  <p className="font-medium">Contact Us</p>
                  <IoIosArrowForward />
                </Link>
              </div>
            )}
          </Drawer>
        </ThemeProvider>
      </React.Fragment>
    </div>
  );
}

export default Header;
