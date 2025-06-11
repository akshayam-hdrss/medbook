"use client";
import React, { useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5"; // Hamburger menu icon
import { IoIosArrowForward } from "react-icons/io"; // Arrow icon for menu items
import Drawer from "@mui/material/Drawer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IoClose } from "react-icons/io5"; // Close icon for the drawer
import auth from "@/firebase/config.js";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { getUser } from "@/firebase/firestore/user";
import { useRouter } from "next/navigation";
import { RiArrowDropDownLine } from "react-icons/ri"; // Import for dropdown icon
import { MdLocationOn } from "react-icons/md"; // Import for location icon
import Image from "next/image"; // <--- ADDED THIS LINE

// Custom Material-UI theme for the Drawer component
const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "80%", // Set a fixed width for the drawer (80% of viewport width)
          maxWidth: "350px", // Optional: set a maximum width for larger screens
          padding: "20px 25px", // Adjust padding for a cleaner look
          boxShadow: "none", // Remove default drawer shadow if desired
        },
      },
    },
  },
});

function Header({ exec = null }) {
  const [open, setOpen] = useState(false); // State to control drawer open/close
  const [user, setUser] = useState(null); // User state
  const [userDoc, setUserDoc] = useState(null); // User document state
  const router = useRouter(); // Next.js router for navigation

  // Function to toggle the drawer state
  const toggleDrawer = () => setOpen(!open);

  // Effect hook to listen for Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const data = await getUser(currentUser.uid);
        setUserDoc(data);
      } else {
        setUserDoc(null);
      }
    });
    return unsubscribe;
  }, []);

  // Define navigation links based on the 'exec' prop
  const navLinks = exec
    ? [
        { href: "/exec", label: "Dashboard" },
        { href: "/exec/clients", label: "Clients Details" },
        { href: "/exec/add", label: "Add New Client" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/location", label: "Select Location" },
        { href: "/services", label: "Explore Services" },
        { href: "/hdrss", label: "HDRss" },
        { href: "/contact", label: "Contact Us" },
      ];

  return (
    <div className="font-sans">
      {/* Main Header Bar */}
      <div
        className="w-full px-4 py-3 flex justify-between items-center relative z-10"
        style={{
          background: "linear-gradient(to right, #FF5912 0%, #D30000 100%)",
        }}
      >
        {/* Left Section: Logo/Title */}
        <div className="flex items-center justify-center space-x-4">
          {/* Logo/Title with Dummy Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            {" "}
            {/* Added flex items-center for alignment */}
           
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  text-white tracking-wide flex items-center"
              style={{
                fontFamily: 'Impact',
              }}
            >
              Medbook
            </h1>
          </Link>
        </div>

        {/* Right Section: Location Selectors and Hamburger Menu */}
        <div className="flex items-center space-x-4">
          {/* Location Selectors - hidden on mobile (xs) and visible on sm and above */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/district"
              className="flex items-center bg-white/70 backdrop-blur-lg px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-white border-opacity-30 text-sm"
            >
              <MdLocationOn className="text-orange-600 text-lg mr-1" />
              <span className="font-semibold text-gray-800">
                {userDoc?.district || "Select District"}
              </span>
              <RiArrowDropDownLine className="text-gray-600 text-xl ml-1" />
            </Link>

            <Link
              href="/location"
              className="flex items-center bg-white/70 backdrop-blur-lg px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-white border-opacity-30 text-sm"
            >
              <MdLocationOn className="text-orange-600 text-lg mr-1" />
              <span className="font-semibold text-gray-800">
                {userDoc?.location || "Select Location"}
              </span>
              <RiArrowDropDownLine className="text-gray-600 text-xl ml-1" />
            </Link>
          </div>

          {/* Hamburger Menu Icon */}
          <button
            onClick={toggleDrawer}
            className="bg-transparent border-none p-0 focus:outline-none flex-shrink-0"
            aria-label="Open menu"
          >
            <IoMenu fontSize={40} className="text-white hover:text-gray-200 transition-colors" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Menu) */}
      <ThemeProvider theme={theme}>
        <Drawer anchor="right" open={open} onClose={toggleDrawer}>
          <div className="p-5 flex flex-col h-full">
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <IoClose
                fontSize={32}
                onClick={toggleDrawer}
                className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Close menu"
              />
            </div>

            {/* "Menu" Title */}
            <h1 className="text-center font-bold text-3xl text-gray-800 border-b border-gray-200 pb-4 mb-8">
              Menu
            </h1>

            {/* Navigation Links (dynamically rendered) */}
            <nav className="flex-1 overflow-y-auto">
              <ul className="space-y-3">
                <li className="md:hidden mb-4">
                  {" "}
                  {/* Visible only on medium and smaller screens */}
                  <Link
                    href="/district"
                    className="flex items-center justify-between py-3 px-3 text-gray-700 text-lg font-medium hover:bg-gray-100 rounded-lg transition-colors group"
                    onClick={toggleDrawer}
                  >
                    <span className="flex items-center">
                      <MdLocationOn className="text-orange-600 text-xl mr-2" />
                      {userDoc?.district || "Select District"}
                    </span>
                    <IoIosArrowForward className="text-xl text-gray-500 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </li>
                <li className="md:hidden mb-4">
                  {" "}
                  {/* Visible only on medium and smaller screens */}
                  <Link
                    href="/location"
                    className="flex items-center justify-between py-3 px-3 text-gray-700 text-lg font-medium hover:bg-gray-100 rounded-lg transition-colors group"
                    onClick={toggleDrawer}
                  >
                    <span className="flex items-center">
                      <MdLocationOn className="text-orange-600 text-xl mr-2" />
                      {userDoc?.location || "Select Location"}
                    </span>
                    <IoIosArrowForward className="text-xl text-gray-500 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </li>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between py-3 px-3 text-gray-700 text-lg font-medium hover:bg-gray-100 rounded-lg transition-colors group"
                      onClick={toggleDrawer}
                    >
                      <span>{link.label}</span>
                      <IoIosArrowForward className="text-xl text-gray-500 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Drawer>
      </ThemeProvider>
    </div>
  );
}

export default Header;
