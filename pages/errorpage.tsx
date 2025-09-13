import React from "react";
import ErrorLogo from "../components/ErrorLogo";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-center text-white overflow-hidden">
      {/* Background gradient full height */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#041009] from-[60%] to-[#1b7a3c]" />

      {/* Foreground content */}
      <div className="relative flex flex-col items-center">
        {/* Error Logo (includes Oops message) */}
        <div className="w-[22rem] sm:w-[30rem] md:w-[36rem]">
          <ErrorLogo className="w-full h-auto" />
        </div>

        {/* Home Button directly under logo */}
        <Link href="/">
          <button className="px-6 py-2 rounded-md bg-[#1BA94C] text-white font-semibold hover:bg-[#158a3f] transition-all duration-300">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}
