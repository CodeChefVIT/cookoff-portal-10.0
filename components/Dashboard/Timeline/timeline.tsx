"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import getTimer from "@/services/getTimer";

interface TimelineStep {
  label: string;
  progress: number;
}

const DEFAULT_LABELS = ["Start", "Round 1", "Round 2", "Round 3"];

export default function Timeline({
  current_round,
}: {
  current_round: number | undefined;
}) {
  const [steps, setSteps] = useState<TimelineStep[]>(
    DEFAULT_LABELS.map((label) => ({ label, progress: 0 }))
  );

  useEffect(() => {
    const updateSteps = async () => {
      let currentRoundProgress = 0;

      try {
        const timerData = await getTimer();
        const start = new Date(timerData.round_start_time).getTime();
        const end = new Date(timerData.round_end_time).getTime();
        const server = new Date(timerData.server_time).getTime();

        if (!isNaN(start) && !isNaN(end) && !isNaN(server) && end > start) {
          const totalTime = end - start;
          const elapsedTime = server - start;
          currentRoundProgress = Math.max(
            0,
            Math.min(100, (elapsedTime / totalTime) * 100)
          );
        }
      } catch {
        currentRoundProgress = 0;
      }

      setSteps(
        DEFAULT_LABELS.map((label, idx) => {
          if (current_round && idx < current_round)
            return { label, progress: 100 };
          if (idx === current_round)
            return { label, progress: currentRoundProgress };
          return { label, progress: 0 };
        })
      );
    };

    updateSteps();
    const interval = setInterval(updateSteps, 120_000);
    return () => clearInterval(interval);
  }, [current_round]);

  const totalSteps = steps.length;
  const totalGreenPercent = steps
    .slice(0, totalSteps - 1)
    .reduce((acc, step) => acc + step.progress / (totalSteps - 1), 0);

  return (
    <div className="relative w-full mx-auto mt-5">
      {/* Connector Bar */}
      <div className="absolute top-2 left-0 right-0 z-0 mx-[37px] h-[10px]">
        <div className="w-full h-full bg-[#B7AB98] rounded" />

        <div className="absolute top-0 left-0 h-full w-full">
          <div
            className="h-full bg-[#1DDB5E] rounded transition-all duration-500"
            style={{ width: `${totalGreenPercent}%` }}
          />
        </div>

        {/* Chef hat */}
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: `${totalGreenPercent}%` }}
        >
          <div className="-top-3 -left-6 relative">
            <Image src="/chef-hat.svg" alt="Chef Hat" width={56} height={56} />
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex justify-between relative z-10">
        {steps.map((step, idx) => {
          return (
            <div key={idx} className="flex flex-col items-center relative">
              <div className="relative z-10">
                <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-400 relative"></div>
              </div>
              <span className="text-white font-[16px] font-brunoace mt-[9px]">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
