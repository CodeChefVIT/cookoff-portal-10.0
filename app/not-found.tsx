"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-green-900 text-white">
      <div className="flex flex-col items-center text-center">
        {/* 404 Section */}
        <div className="flex flex-col items-center mb-6">
          <Image
                  src="/404.svg"
                  alt="close"
                  width={550}
                  height={550}
                  draggable={false}
                  unselectable="on"
                  priority
                />
        </div>

        {/* Home Button using your shared Button component */}
        <Button
          className="mt-12 w-32 bg-gradient-to-r from-green-500 to-green-600 text-xl px-8 py-6 font-[Ballega]"
          onClick={() => router.push("/")}
          variant="default"
          size="lg"
        >
          Home
        </Button>
      </div>
    </div>
  );
}
