// app/pages/loginpage.tsx
import React from "react";
import CookoffLogo from "../components/cookofflogo";
import MusclemindLogo from "../components/musclemind";
import GreenGradient from "../components/GreenGradient";

export default function LoginPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#041009]">
      {/* Background gradient SVG (full-screen) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GreenGradient className="w-full h-full opacity-70" />
      </div>

      {/* Top centered title */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 text-center">
        <h2 className="font-nullshock text-white text-lg font-bold tracking-widest">
          CODECHEF PRESENTS
        </h2>
      </div>

      {/* ===== LEFT: Cookoff logo (anchored left) ===== */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30">
        <div className="w-[28rem] sm:w-[34rem] md:w-[40rem]">
          <CookoffLogo className="w-full h-auto" />
        </div>
      </div>

      {/* ===== RIGHT: Login box (anchored right) ===== */}
      {/* Login box */}
      <div
        className="absolute z-30"
        style={{
          left: "62vw",          // was ~73–75vw, moved left
          top: "18vh",           // same vertical
          width: "28vw",         // wider than before
          height: "auto",        // let content define height
        }}
      >
        <div className="bg-[#19231E]/90 rounded-xl shadow-lg p-10 flex flex-col justify-start w-full">
          <h2 className="text-2xl font-nullshock tracking-wider mb-8 text-center">
            START COOKING
          </h2>

          <form className="flex flex-col gap-6">
            <input
              type="email"
              placeholder="Enter Email"
              suppressHydrationWarning
              className="px-4 py-3 rounded-md bg-[#9B9286] text-black placeholder-black focus:outline-none w-full"
            />
            <input
              type="password"
              placeholder="Enter Password"
              suppressHydrationWarning
              className="px-4 py-3 rounded-md bg-[#9B9286] text-black placeholder-black focus:outline-none w-full"
            />
            <button
              type="submit"
              suppressHydrationWarning
              className="mt-6 px-6 py-3 rounded-md bg-[#1BA94C] text-white font-semibold hover:bg-[#158a3f] transition-all duration-300 w-full"
            >
              Log In
            </button>
          </form>
        </div>
      </div>


      {/* Footer: musclemind bottom-left */}
      <div className="absolute left-6 bottom-6 z-40 flex items-center gap-3 text-sm">
        <MusclemindLogo className="h-4" />
      </div>

      {/* Footer center tagline */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40">
        <div className="text-lg font-nullshock font-bold tracking-widest text-white">
          10 YEARS. ONE LEGACY.
        </div>
      </div>
    </div>
  );
}
