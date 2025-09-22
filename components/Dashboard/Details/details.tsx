"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/services/index";
import { useRouter } from "next/navigation";
import RoundTimer from "@/components/Editor/RoundTimer/RoundTimer";

interface DetailsCardProps {
  currentRound: string;
}



const DetailsCard: React.FC = () => {
  const [details, setDetails] = useState<DetailsCardProps | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get("/dashboard");
        const data = res.data.data;

        const mapped: DetailsCardProps = {
          currentRound: data.current_round,
        };

        setDetails(mapped);
      } catch (err) {
        console.error("Failed to fetch details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return (
      <div className="w-75 rounded-lg bg-neutral-900 text-gray-200 shadow-md p-6 text-center">
        Loading...
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
          <p className="text-lg font-inter font-normal text-white">Current Round</p>
          <p className="text-2xl font-normal font-brunoace text-green-500">{details.currentRound}</p>
        </div>

        {/* Time Remaining */}
        <div>
          <p className="text-lg font-inter font-normal text-white">Time Remaining</p>
          <div className="px-4 py-2 mt-2">
            <p className="text-xl font-brunoace font-normal text-green-500"><RoundTimer round={details.currentRound}></RoundTimer></p>
          </div>
        </div>

        {/* Tip Box */}
        <div className="mt-3 bg-neutral-800 rounded-lg py-4 px-6 text-sm text-gray-300 italic max-w-xs">
          <p className="font-bold not-italic text-white font-inter mb-1">Tip:</p>
          <p className="font-extralight font-inter text-center justify-start text-white text-base pb-4">Remember: partial scores are awarded for partial solutions</p>
        </div>
        {/* Enter Kitchen Button */}
        <div className="mt-7 mb-4">
        <button
          onClick={() => router.push("/kitchen")}
          className="!border-2 !border-green-500 !text-[#c5bba7] font-nulshock !bg-neutral-900 !px-2 !py-2 text-sm rounded-md !hover:bg-green-500 hover:text-white transition flex items-center">
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
