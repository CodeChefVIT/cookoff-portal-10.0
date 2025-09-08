"use client";

import Image from "next/image";
import { IoPersonCircleOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

export default function Header() {
  const icon = "/icon.avif";
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <header className="relative flex items-center justify-between w-full h-20 px-4 py-10 md:px-12 border-b-2 border-b-[#B7AB98] select-none">
      <Image
        src={icon}
        alt="CodechefVIT Logo"
        width={32}
        height={32}
        className="h-6 w-6 md:h-8 md:w-8"
      />

      <h1 className="font-nulshock font-bold text-2xl md:text-4xl lg:text-6xl capitalize text-center text-[#B7AB98]">
        COOK OFF{" "}
        <span
          className="inline-block bg-clip-text text-transparent"
          style={{
            background: "linear-gradient(90deg, #32CA67 83%, #0A8A36 93%)",
            WebkitBackgroundClip: "text",
          }}
        >
          10.0
        </span>
      </h1>

      <IoPersonCircleOutline
        size={32}
        className="text-[#B7AB98] flex-shrink-0"
      />
    </header>
  );
}
