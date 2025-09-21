import { getTimerStatus } from "@/lib/controllers/timer.controller";
import React from "react";
import Image from "next/image";

interface TimerStep {
  label: string;
  totalDuration: number;
  elapsedTime: number;
}

interface TimelineStep {
  label: string;
  progress: number;
}

const defaultLabels = ["Start", "Round 0", "Round 1", "Round 2", "Round 3"];

export default async function Timeline() {
  const result = await getTimerStatus();

  // Initialize steps with 0 progress
  let steps: TimelineStep[] = defaultLabels.map((label) => ({
    label,
    progress: 0,
  }));

  if (result.success && result.data) {
    const dataArray: TimerStep[] = Array.isArray(result.data)
      ? result.data.map((t) => ({
          label: t.phase,
          totalDuration: t.totalDuration,
          elapsedTime: t.totalDuration - t.remainingTime,
        }))
      : [
          {
            label: result.data.phase,
            totalDuration: result.data.totalDuration,
            elapsedTime: result.data.totalDuration - result.data.remainingTime,
          },
        ];

    // Only overwrite matching steps with actual progress
    dataArray.forEach((t, idx) => {
      if (steps[idx]) {
        steps[idx].progress =
          t.totalDuration > 0
            ? Math.max(
                0,
                Math.min(
                  100,
                  ((t.totalDuration - t.elapsedTime) / t.totalDuration) * 100
                )
              )
            : 0;
      }
    });
  }

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
            <div className="-top-5 -left-2 relative">
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
