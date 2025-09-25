"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import NotificationButton from "../ui/NotificationButton";

export default function Header() {
  const icon = "/icon.avif";
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <header className="relative flex items-center justify-between w-full px-4 py-2 md:px-12 border-b-2 border-b-[#B7AB98] select-none">
      <Image
        src={icon}
        alt="CodechefVIT Logo"
        width={20}
        height={20}
        className="h-4 w-4 md:h-12 md:w-12"
      />

      <h1 className="font-nulshock font-bold text-2xl md:text-4xl lg:text-5xl capitalize text-center text-[#B7AB98]">
        COOK {""}
        <span
          className="inline-block bg-clip-text text-transparent"
          style={{
            background: "linear-gradient(90deg, #32CA67 83%, #0A8A36 93%)",
            WebkitBackgroundClip: "text",
          }}
        >
          OFF 10.0
        </span>
      </h1>

      <div className="relative">
        <NotificationButton />
      </div>
    </header>
  );
}
