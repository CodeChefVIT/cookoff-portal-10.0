import React from "react";
import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";

const App = () => {
  return <UtensilsCrossed />;
};

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 border border-white/20 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 border border-white/20 rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Main Loading Content */}
      <div className="flex flex-col items-center space-y-8 z-10">
        {/* Chef Hat Icon with Animation */}
        <div className="relative">
          <div className="w-24 h-24 relative animate-bounce">
            <Image
              src="/chef-hat.svg"
              alt="Chef Hat"
              fill
              className="object-contain filter brightness-0 invert"
            />
          </div>
          {/* Cooking Steam Animation */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <div className="w-1 h-8 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-1 h-6 bg-white/40 rounded-full animate-pulse delay-300"></div>
              <div className="w-1 h-8 bg-white/60 rounded-full animate-pulse delay-600"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-['Bruno_Ace']">
            Cook<span style={{ color: "#32ca67" }}>Off</span>
          </h1>
          <p className="text-white/80 text-lg animate-pulse">
            Preparing your kitchen...
          </p>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full animate-loading-bar"
            style={{
              background: `linear-gradient(to right, #32ca67, #28a555)`,
            }}
          ></div>
        </div>

        {/* Cooking Utensils Animation */}
        <div className="flex space-x-6 mt-8">
          <div className="w-8 h-8 opacity-60 animate-bounce delay-100">
            <UtensilsCrossed className="w-full h-full text-white" />
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/20"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/20"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/20"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/20"></div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
