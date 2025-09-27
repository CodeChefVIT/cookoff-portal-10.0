"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import NotificationButton from "../ui/NotificationButton";
import toast from "react-hot-toast";
import { Home } from "lucide-react";

export default function Header() {
  const icon = "/icon.avif";
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") return null;
  const handleDashboardClick = () => {
    if (pathname === "/dashboard") return;

    const toastId = toast.loading("Entering Dashboard...");

    router.push("/dashboard");

    const checkPath = setInterval(() => {
      if (window.location.pathname === "/dashboard") {
        toast.success("Welcome to Dashboard", { id: toastId });
        clearInterval(checkPath);
      }
    }, 100);
  };
  return (
    <header className="relative flex items-center justify-between w-full px-8 py-4  border-b-2 border-b-[#B7AB98] select-none h-[80px]">
      <a
        href="https://www.codechefvit.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={icon}
          alt="CodechefVIT Logo"
          width={1000}
          height={1000}
          className="h-12 w-12"
        />
      </a>

      <h1 className="absolute left-1/2 -translate-x-1/2 font-nulshock font-bold text-2xl md:text-4xl lg:text-5xl capitalize text-center text-[#B7AB98]">
      <span
      onClick={handleDashboardClick}
      className="cursor-pointer select-none"
      >
        COOK
        <span
          className="inline-block bg-clip-text text-transparent"
          style={{
            background: "linear-gradient(90deg, #32CA67 83%, #0A8A36 93%)",
            WebkitBackgroundClip: "text",
          }}
        >
          OFF 10.0
        </span>
      </span>
      </h1>

      <div className="flex items-center gap-0 ml-auto">
        <NotificationButton />
        {pathname === "/kitchen" && (
          <button
            onClick={handleDashboardClick}
            className="focus:outline-none !bg-transparent transition-colors group"
          >
            <Home />
          </button>
        )}
      </div>
    </header>
  );
}
