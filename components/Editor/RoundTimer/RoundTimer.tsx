"use client";

import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import useKitchenStore from "store/zustant";
import timer from "@/services/getTimer";

export interface RoundTimerProps {
  round?: string;
}

interface GetTimeResponse {
  round_end_time: string;
  round_start_time: string;
  server_time: string;
}

export default function RoundTimer() {
  const { round } = useKitchenStore();
  
  const [remaining, setRemaining] = useState<number>(0);

  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to get time data and calculate remaining time
  const getRoundTime = async () => {
    try {
      const data = await timer();
      const serverTime = new Date(data.server_time).getTime();
      const endTime = new Date(data.round_end_time).getTime();
      
      // Calculate remaining time in seconds
      const remainingMs = Math.max(0, endTime - serverTime);
      const remainingSeconds = Math.floor(remainingMs / 1000);
      
      setRemaining(remainingSeconds);
      
      return remainingSeconds;
    } catch (error) {
      console.error("Failed to get round time:", error);
    
      setRemaining(0);
      return 0;
    }
  };

  // Initial sync when component mounts
  useEffect(() => {
    getRoundTime();
  }, []);

  // Set up sync every 120 seconds and tick every second
  useEffect(() => {
    // Sync with server every 120 seconds
    syncIntervalRef.current = setInterval(() => {
      getRoundTime();
    }, 120000); // 120 seconds = 120000ms

    // Start client-side countdown
    tickIntervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 0) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearIntervalSafe(syncIntervalRef);
      clearIntervalSafe(tickIntervalRef);
    };
  }, []);

  const formatted = useMemo(
    () => formatHMS(Math.max(0, Math.ceil(remaining))),
    [remaining]
  );

  return (
    <div className="relative flex items-center h-[45px] border border-[#B7AB98] rounded-lg gap-2 font-bruno-ace w-fit select-none">
      <div className="flex-shrink-0 h-full bg-[#1BA94C] flex items-center justify-center rounded-l-lg px-3">
        <span className="text-[22px] text-black capitalize">{`Round ${round}`}</span>
      </div>

      <div className="flex-1 h-full flex items-center justify-center w-fit rounded-r-lg px-3 min-w-[130px]">
        <span className="text-[20px] text-[#1BA94C] tracking-widest text-center">
          {formatted}
        </span>
      </div>
    </div>
  );
}

function clearIntervalSafe(ref: RefObject<NodeJS.Timeout | null>) {
  if (ref.current) clearInterval(ref.current);
  ref.current = null;
}

function formatHMS(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "00:00:00";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}
