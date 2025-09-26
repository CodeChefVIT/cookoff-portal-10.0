"use client";
import api from "@/services/index";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface TimelineStep {
  label: string;
  progress: number;
}

export default function Timeline() {
  const defaultLabels = ["Start", "Round 0", "Round 1", "Round 2", "Round 3"];

  const [steps, setSteps] = useState<TimelineStep[]>(
    defaultLabels.map((label) => ({ label, progress: 0 }))
  );

  useEffect(() => {
    const updateSteps = async () => {
      let currentRoundProgress = 0;
      try {
        //current round
      const res = await api.get("/dashboard");
      const currentRound = Number(res.data.data.current_round);

        //time info
        try {const { data: timeData } = await api.get("/GetTime");

        const start = new Date(timeData.round_start_time).getTime();
        const end = new Date(timeData.round_end_time).getTime();
        const server = new Date(timeData.server_time).getTime();

        
        if (!isNaN(start) && !isNaN(end) && !isNaN(server) && end > start) {
          const totalTime = end - start;
          const elapsedTime = server - start;
          currentRoundProgress = Math.max(
            0,
            Math.min(100, (elapsedTime / totalTime) * 100)
          );
        }}

        catch(timeErr: any){
          currentRoundProgress=50;
        }

        //update steps
        setSteps(
          defaultLabels.map((label, idx) => {
            if (idx < currentRound) {
              return { label, progress: 100 }; // completed rounds
            } else if (idx === currentRound) {
              return { label, progress: currentRoundProgress }; // current round
            } else {
              return { label, progress: 0 }; // future rounds
            }
          })
        );
      } catch (err) {
        console.error("Failed to fetch details or time:", err);
      }
    };

    // first run
    updateSteps();
    // set interval
    const interval = setInterval(updateSteps, 120 * 1000);

    return () => clearInterval(interval);
  }, []);

  const totalSteps = steps.length;
  const totalGreenPercent = steps
    .slice(0, totalSteps - 1)
    .reduce((acc, step) => acc + step.progress / (totalSteps - 1), 0);

  return (
    <div className="relative w-full mx-auto mt-5">
      {/* Connector Bar */}
      <div className="absolute top-2 left-0 right-0 z-0 mx-[37px] h-[10px]">
        <div className="w-full h-full bg-[#B7AB98] rounded" />
        <div className="flex h-full absolute top-0 left-0 w-full">
          {steps.slice(0, totalSteps - 1).map((step, idx) => (
            <div key={idx} className="relative flex-1 h-full">
              <div
                className="h-full bg-[#1DDB5E] rounded transition-all duration-500"
                style={{ width: `${step.progress}%` }}
              />
            </div>
          ))}
          <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: `${totalGreenPercent}%` }}
          >
            <div className="-top-3 -left-5 relative">
              <Image src="/chef-hat.svg" alt="Chef Hat" width={56} height={56} />
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex justify-between relative z-10">
        {steps.map((step, idx) => {
          const prevStep = steps[idx - 1];
          const showFlag =
            step.progress === 100 &&
            (step.label === "Start" || (prevStep && prevStep.progress === 100));

          return (
            <div key={idx} className="flex flex-col items-center relative">
              <div className="relative z-10">
                <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-400 relative"></div>
                {showFlag && (
                  <div className="absolute -top-7 left-1 w-[46px] h-[46px] z-20">
                    <Image src="/flag.svg" alt="Completed" fill />
                  </div>
                )}
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
