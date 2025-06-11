"use client";
import React from "react";
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <footer
      className="text-white py-10 px-6 lg:px-20"
      style={{ background: "#f6470e" }} // your requested flat orange background
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div className="flex flex-col items-start">
          <Image
            src="/Medbook_Logo.png"
            alt="Medbook Logo"
            width={120}
            height={120}
          />
          <p className="mt-4 text-gray-100 text-sm">
            We are committed to providing top-tier healthcare solutions with personalized attention and expert care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-100">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/services">Our Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p className="text-sm text-gray-100">2nd floor,Sunrise crystal Complex,Kalappanaicken Palayam,Thadagam Rd, Coimbatore-641108, India</p>
          <p className="text-sm text-gray-100 mt-2">Phone: ‪+91 78711 17474‬</p>
          <p className="text-sm text-gray-100 mt-1">Email: medbook.magazine@gmail.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl text-gray-100">
            <a href="#" className="hover:text-white"><FaFacebook /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaYoutube /></a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-orange-200 mt-10 pt-4 text-center text-sm text-orange-100">
        © {new Date().getFullYear()} MediCare. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
