import React from "react";
// No need to import IoIosArrowForward or Link if not used
// import { IoIosArrowForward } from "react-icons/io";
// import Link from "next/link";

const Navbar = () => {
  // If you want to completely remove the navbar, just return null or an empty div.
  // This will prevent it from rendering anything on the screen.
  return (
    // You can keep an empty div if you still need the component in the JSX structure,
    // but its content will be empty, so it won't take up space.
    <div>
      {/* The aside element and its content are removed. */}
      {/* This ensures nothing is rendered on the left side where the Navbar used to be. */}
    </div>
  );
};

export default Navbar;