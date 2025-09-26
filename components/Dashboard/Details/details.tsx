"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/services/index";
import { useRouter, usePathname } from "next/navigation";
import RoundTimer from "@/components/Editor/RoundTimer/RoundTimer";
import useKitchenStore from "store/zustant";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";

interface DetailsCardProps {
  currentRound: string;
}

const DetailsCard: React.FC = () => {
  const [details, setDetails] = useState<DetailsCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  const setRound = useKitchenStore((state) => state.setRound);

  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get("/dashboard");
        const data = res.data.data;

        const mapped: DetailsCardProps = {
          currentRound: data.current_round,
        };

        setRound(Number(mapped.currentRound));
        setDetails(mapped);
      } catch (err) {
        console.error("Failed to fetch details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [setRound]);

  if (loading) {
    return (
      <div className="w-75 rounded-lg bg-neutral-900 text-gray-200 shadow-md overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="bg-neutral-800 text-center py-2">
          <h2 className="text-3xl font-bold font-nulshock tracking-wide text-[#c5bba7]">
            DETAILS
          </h2>
        </div>

        {/* Body */}
        <div className="mt-3 p-6 flex flex-col items-center text-center space-y-6">
          {/* Current Round */}
          <div>
            <Skeleton className="h-5 w-32 mx-auto mb-2 rounded-md bg-neutral-700" />
            <Skeleton className="h-7 w-28 mx-auto rounded-md bg-neutral-700" />
          </div>

          {/* Time Remaining */}
          <div>
            <Skeleton className="h-5 w-36 mx-auto mb-2 rounded-md bg-neutral-700" />
            <div className="px-4 py-2 mt-2">
              <Skeleton className="h-8 w-32 mx-auto rounded-md bg-neutral-700" />
            </div>
          </div>

          {/* Tip Box */}
          <div className="mt-3 bg-neutral-800 rounded-lg py-4 px-6 text-sm max-w-xs w-full">
            <Skeleton className="h-5 w-12 mb-3 rounded-md bg-neutral-700" />
            <Skeleton className="h-5 w-full rounded-md bg-neutral-700" />
            <Skeleton className="h-5 w-3/4 mt-2 rounded-md bg-neutral-700" />
          </div>

          {/* Enter Kitchen Button */}
          <div className="mt-7 mb-4 flex justify-center">
            <Skeleton className="h-10 w-52 rounded-md bg-neutral-700" />
          </div>
        </div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="w-75 rounded-lg bg-neutral-900 text-gray-200 shadow-md p-6 text-center">
        Failed to load details
      </div>
    );
  }

  return (
    <div className="w-75 rounded-lg bg-neutral-900 text-gray-200 shadow-md overflow-hidden border border-gray-700">
      {/* Header */}
      <div className="bg-neutral-800 text-center py-2">
        <h2 className="text-3xl font-bold font-nulshock tracking-wide text-[#c5bba7]">
          DETAILS
        </h2>
      </div>

      {/* Body */}
      <div className="mt-3 p-6 flex flex-col items-center text-center space-y-6">
        {/* Current Round */}
        <div>
          <p className="text-lg font-inter font-normal text-white">
            Current Round
          </p>
          <p className="text-2xl font-normal font-brunoace text-green-500">
            {details.currentRound}
          </p>
        </div>

        {/* Time Remaining */}
        <div>
          <p className="text-lg font-inter font-normal text-white">
            Time Remaining
          </p>
          <div className="px-4 py-2 mt-2">
            <div className="text-xl font-brunoace font-normal text-green-500">
              <RoundTimer />
            </div>
          </div>
        </div>

        {/* Tip Box */}
        <div className="mt-3 bg-neutral-800 rounded-lg py-4 px-6 text-sm text-gray-300 italic max-w-xs">
          <p className="font-bold not-italic text-white font-inter mb-1">
            Tip:
          </p>
          <p className="font-extralight font-inter text-center justify-start text-white text-base pb-4">
            Remember: partial scores are awarded for partial solutions
          </p>
        </div>
        {/* Enter Kitchen Button */}
        <div className="mt-7 mb-4">
          <button
            onClick={() => {
              if (pathname === "/kitchen") return; // already in kitchen

              const toastId = toast.loading("Entering Kitchen...");

              router.push("/kitchen");

              // Poll until we are actually on /kitchen
              const checkPath = setInterval(() => {
                if (window.location.pathname === "/kitchen") {
                  toast.success("Welcome to Kitchen", { id: toastId });
                  clearInterval(checkPath);
                }
              }, 100);
            }}
            className="!border-2 !border-green-500 !text-[#c5bba7] font-nulshock !bg-neutral-900 !px-2 !py-2 text-sm rounded-md !hover:bg-green-500 hover:text-white transition flex items-center"
          >
            ENTER KITCHEN
            <Image
              src="/enter.svg"
              alt="close"
              width={30}
              height={30}
              draggable={false}
              unselectable="on"
              priority
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
