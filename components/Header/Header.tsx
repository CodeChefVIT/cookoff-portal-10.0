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
    <header className="relative flex items-center justify-between w-full px-4 py-1/2 md:px-12 border-b-2 border-b-[#B7AB98] select-none">
      <a
        href="https://www.codechefvit.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={icon}
          alt="CodechefVIT Logo"
          width={20}
          height={20}
          className="h-4 w-4 md:h-12 md:w-12"
        />
      </a>

      <h1 className="absolute left-1/2 -translate-x-1/2 font-nulshock font-bold text-2xl md:text-4xl lg:text-5xl capitalize text-center text-[#B7AB98]">
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

      <div className="flex items-center gap-0 ml-auto">
        <NotificationButton />
        {pathname === "/kitchen" && (
          <button
            onClick={handleDashboardClick}
            className="focus:outline-none !bg-transparent transition-colors group"
          >
            <Home className="h-6 w-6 md:h-8 md:w-8 text-[#B7AB98] group-hover:text-[#32CA67] transition-colors"/>
          </button>
        )}
      </div>
    </header>
  );
}
