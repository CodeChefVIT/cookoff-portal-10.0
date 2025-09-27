"use client";
import { useEffect, useState } from "react";

export default function ScreenGuard({ children }: { children: React.ReactNode }) {
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    const checkSize = () => {
      setIsAllowed(window.innerWidth >= 1024);
    };

    checkSize();
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  if (!isAllowed) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#006E08] text-[#E0CCAB] font-[nulshock] text-2xl z-[9999]">
        Desktop mode only allowed
      </div>
    );
  }

  return <>{children}</>;
}
