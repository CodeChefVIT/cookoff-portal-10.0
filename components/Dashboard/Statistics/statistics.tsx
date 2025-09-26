"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getRounds } from "@/services/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardResponse } from "@/schemas/api/index";
export interface RoundStats {
  round: number;
  status: "Closed" | "In Progress" | "Completed";
  progress: number;
  completed: number;
  incomplete: number;
  score: number;
  locked?: boolean;
}

const statusColors: Record<string, string> = {
  Closed: "bg-red-500",
  "In Progress": "bg-yellow-400",
  Completed: "bg-green-500",
};

const ProgressCircle: React.FC<{ progress: number }> = ({ progress }) => {
  const size = 55.37;
  const stroke = 6.86;
  const radius = size / 2;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={size} width={size}>
      {/* background circle */}
      <circle
        stroke="#B7AB98"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* progress circle */}
      <circle
        stroke="#259B4E"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        className="transition-[stroke-dashoffset] duration-300"
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      {/* percentage text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="fill-[#B7AB98] text-[10.18px] font-Nunito"
      >
        {progress}%
      </text>
    </svg>
  );
};

const RoundCard: React.FC<{ stats: RoundStats }> = ({ stats }) => {
  const { round, status, progress, completed, incomplete, score, locked } =
    stats;
  const isLocked = status === "Closed";

  return (
    <div className="relative bg-[#111] text-[#B7AB98] rounded-xl p-5 mb-5 shadow-[-9.63px_8.67px_0_#1BA94C] w-[307.17px] min-h-[233.33px] font-[Nulshock,monospace]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-[29.54px] tracking-[2px]">ROUND {round}</p>
        <div className="flex items-center gap-1.5">
          <span
            className={`rounded-full w-[9.45px] h-[9.45px] ${statusColors[status]}`}
          />
          <p className="text-[9.45px] font-inter select-none text-white">
            {status}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex items-center gap-6 ml-[27.37px]">
        <ProgressCircle progress={locked ? 0 : progress} />
        <div className="text-[15.75px] font-inter font-normal text-white">
          <p className="mb-1 flex items-center gap-2">
            <Image
              src="/statistics/tick.svg"
              alt="Completed"
              width={21}
              height={21}
            />
            Completed: {isLocked ? 0 : completed}
          </p>
          <p className="flex items-center gap-2">
            <Image
              src="/statistics/cross.svg"
              alt="Incomplete"
              width={21}
              height={21}
            />
            Incomplete: {isLocked ? 0 : incomplete}
          </p>
        </div>
      </div>

      {/* Score aligned under */}
      <p className="text-[18.89px] mt-[45.62px] font-brunoace text-white">
        Score: {isLocked ? 0 : score}
      </p>

      {/* Blur Overlay for locked rounds */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl">
          <Image
            src="/statistics/lock.svg"
            alt="Locked"
            width={36}
            height={36}
            className="opacity-80 mb-2"
          />
          <p className="font-inter font-bold text-[16.2px] leading-[100%] text-center text-[#B7AB98] mt-[7.21px]">
            This Round is Locked
          </p>
        </div>
      )}
    </div>
  );
};

const Statistics = ({
  data,
  loading,
}: {
  data: DashboardResponse | undefined;
  loading: boolean;
}) => {
  const [rounds, setRounds] = useState<RoundStats[]>([]);
  useEffect(() => {
    if (data) {
      const roundDetails = getRounds({ data });
      setRounds(roundDetails);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="w-full h-full text-[#ccc] font-[Nulshock,monospace]">
        <div className="relative w-[673px] h-[612px] mx-auto">
          {/* Text on top of rectangle */}
          <p className="relative z-10 text-center font-bold text-3xl text-[#beb7a6] tracking-[3px] select-none leading-14 bg-[#1F2622] rounded-t-[10px]">
            STATISTICS
          </p>

          {/* Grid Skeleton */}
          <div className="mt-10 grid gap-y-6 gap-x-[49.2px] max-w-[960px] mx-auto grid-cols-1 sm:grid-cols-2 pb-[34px] ml-[10px]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="relative bg-[#111] rounded-xl p-5 mb-5 shadow-[-9.63px_8.67px_0_#1BA94C] w-[307.17px] min-h-[233.33px]"
              >
                {/* Card Header */}
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-8 w-32 rounded-md bg-neutral-700" />
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="w-[9.45px] h-[9.45px] rounded-full bg-neutral-700" />
                    <Skeleton className="h-3 w-12 rounded-md bg-neutral-700" />
                  </div>
                </div>

                {/* Body */}
                <div className="flex items-center gap-6 ml-[27.37px]">
                  {/* Progress Circle */}
                  <Skeleton className="h-[55px] w-[55px] rounded-full bg-neutral-700" />

                  <div className="text-white">
                    <div className="mb-1 flex items-center gap-2">
                      <Skeleton className="h-[21px] w-[21px] rounded-md bg-neutral-700" />
                      <Skeleton className="h-4 w-28 rounded-md bg-neutral-700" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-[21px] w-[21px] rounded-md bg-neutral-700" />
                      <Skeleton className="h-4 w-32 rounded-md bg-neutral-700" />
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="mt-[45.62px]">
                  <Skeleton className="h-5 w-28 rounded-md bg-neutral-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full text-[#ccc] font-[Nulshock,monospace]">
      <div className="relative w-[673px] h-[612px] mx-auto">
        <p className="relative z-10 text-center font-bold text-3xl bg-[#1F2622] rounded-t-[10px] text-[#beb7a6] tracking-[3px] select-none leading-14">
          STATISTICS
        </p>

        {/* Grid below */}
        <div className="mt-10 grid gap-y-6 gap-x-[49.2px] max-w-[960px] mx-auto grid-cols-1 sm:grid-cols-2 pb-[34px] ml-[10px]">
          {rounds.map((r) => (
            <RoundCard key={r.round} stats={r} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
