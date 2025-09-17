"use client";

import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

export interface RoundTimerProps {
  round?: string;
}

interface TimerApiResponse {
  message: string;
  phase: "countdown" | "active" | "paused" | "completed";
  remainingTime: number;
  countdownValue?: 3 | 2 | 1 | 0;
  totalDuration: number;
  isActive: boolean;
}

export default function RoundTimer({ round = "round 0" }: RoundTimerProps) {
  const [phase, setPhase] = useState<TimerApiResponse["phase"]>("completed");
  const [remaining, setRemaining] = useState<number>(0);
  const [countdownValue, setCountdownValue] = useState<
    3 | 2 | 1 | 0 | undefined
  >(undefined);
  const [showGo, setShowGo] = useState(false);

  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function syncOnce() {
      try {
        const res = await axios.get<TimerApiResponse>("/api/countdown", {
          params: { _ts: Date.now() },
          headers: { "Cache-Control": "no-cache" },
        });
        if (isCancelled) return;
        const data = res.data;
        setPhase(data.phase);
        setRemaining(data.remainingTime);
        setCountdownValue(data.countdownValue);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setPhase("completed");
          setRemaining(0);
          setCountdownValue(undefined);
        }
      }
    }

    syncOnce();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    clearIntervalSafe(pollIntervalRef);
    const startPolling = (intervalMs: number) => {
      pollIntervalRef.current = setInterval(async () => {
        try {
          const res = await axios.get<TimerApiResponse>("/api/countdown", {
            params: { _ts: Date.now() },
            headers: { "Cache-Control": "no-cache" },
          });
          const data = res.data;
          if (phase === "countdown" && data.phase === "active") {
            setShowGo(true);
            setTimeout(() => setShowGo(false), 300);
          }
          setPhase(data.phase);
          setRemaining(data.remainingTime);
          setCountdownValue(data.countdownValue);
          if (data.phase !== phase) clearIntervalSafe(pollIntervalRef);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            setPhase("completed");
            setRemaining(0);
            setCountdownValue(undefined);
          }
        }
      }, intervalMs);
    };

    if (phase === "countdown") startPolling(300);
    else if (phase === "active") startPolling(1000);
    else if (phase === "paused") startPolling(1000);
    else if (phase === "completed") startPolling(2000);
    return () => clearIntervalSafe(pollIntervalRef);
  }, [phase]);

  useEffect(() => {
    clearIntervalSafe(tickIntervalRef);
    if (phase !== "active") return;
    tickIntervalRef.current = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearIntervalSafe(tickIntervalRef);
  }, [phase]);

  const formatted = useMemo(
    () => formatHMS(Math.max(0, Math.ceil(remaining))),
    [remaining]
  );

  return (
    <div className="relative flex items-center h-[45px] border border-[#B7AB98] rounded-lg gap-2 font-bruno-ace w-fit select-none">
      <div className="flex-shrink-0 h-full bg-[#1BA94C] flex items-center justify-center rounded-l-lg px-3">
        <span className="text-[22px] text-black capitalize">{round}</span>
      </div>

      <div className="flex-1 h-full flex items-center justify-center w-fit rounded-r-lg px-3 min-w-[130px]">
        {showGo ? (
          <span className="text-[22px] text-[#1BA94C] tracking-widest text-center">
            GO!
          </span>
        ) : phase === "countdown" && countdownValue !== undefined ? (
          <span className="text-[22px] text-[#1BA94C] tracking-widest text-center">
            {countdownValue}
          </span>
        ) : (
          <span className="text-[20px] text-[#1BA94C] tracking-widest text-center">
            {formatted}
          </span>
        )}
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
