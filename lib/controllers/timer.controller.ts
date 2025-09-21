import {
  TimerState,
  TimerResponse,
  CreateTimerRequest,
  ExtendTimerRequest,
  StartCountdownRequest,
  TimerExtension,
  COUNTDOWN_DURATION,
} from "@/lib/types/timer";
import { getMongoClient } from "@/lib/db";
import type { Filter, UpdateFilter } from "mongodb";

const TIMER_COLLECTION = "timer";
const SECRET_KEY = process.env.SECRET_KEY || "supersecretkey";

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

async function getCollection() {
  const client = await getMongoClient();
  const dbName = process.env.MONGODB_DB || "app";
  return client.db(dbName).collection<TimerState>(TIMER_COLLECTION);
}

async function getTimer(): Promise<TimerState | null> {
  const col = await getCollection();
  const filter: Filter<TimerState> = { _id: 1 };
  return col.findOne(filter);
}

async function upsertTimer(timer: TimerState): Promise<void> {
  const col = await getCollection();
  const filter: Filter<TimerState> = { _id: 1 };
  const update: UpdateFilter<TimerState> = { $set: timer };
  await col.updateOne(filter, update, { upsert: true });
}

async function deleteTimer(): Promise<void> {
  const col = await getCollection();
  const filter: Filter<TimerState> = { _id: 1 };
  await col.deleteOne(filter);
}

function getCurrentCountdownValue(
  countdownStartTime: number
): 3 | 2 | 1 | 0 | null {
  if (!countdownStartTime) return null;
  const secondsElapsed = Math.floor((Date.now() - countdownStartTime) / 1000);
  const countdownMap = [3, 2, 1, 0] as const;
  return countdownMap[Math.min(secondsElapsed, 3)];
}

function getRemainingTime(timer: TimerState): number {
  if (timer.phase === "completed") return 0;
  if (timer.phase === "countdown") {
    return timer.totalDuration;
  }
  if (timer.phase === "paused") {
    const timeWhenPaused = timer.pausedAt! - timer.mainStartTime!;
    return Math.max(0, timer.totalDuration - timeWhenPaused / 1000);
  }
  if (timer.phase === "active" && timer.mainStartTime) {
    const elapsed = (Date.now() - timer.mainStartTime) / 1000;
    return Math.max(0, timer.totalDuration - elapsed);
  }
  return timer.totalDuration;
}

function getPhaseMessage(
  phase: string,
  countdownValue?: 3 | 2 | 1 | 0
): string {
  switch (phase) {
    case "countdown":
      if (countdownValue) return `Get ready... ${countdownValue}`;
      return "Starting countdown...";
    case "active":
      return "Timer is running";
    case "paused":
      return "Timer is paused";
    case "completed":
      return "Timer completed";
    default:
      return "Timer ready";
  }
}

function buildTimerResponse(timer: TimerState): TimerResponse {
  const remainingTime = getRemainingTime(timer);
  const countdownValue =
    timer.phase === "countdown" && timer.countdownStartTime
      ? getCurrentCountdownValue(timer.countdownStartTime) ?? undefined
      : undefined;

  return {
    message: getPhaseMessage(timer.phase, countdownValue),
    phase: timer.phase,
    remainingTime: Math.ceil(remainingTime),
    countdownValue,
    totalDuration: timer.totalDuration,
    extensions: timer.extensions,
    isActive: timer.phase === "active" || timer.phase === "countdown",
  };
}

function applyTransitions(timer: TimerState): boolean {
  let mutated = false;
  if (timer.phase === "countdown" && timer.countdownStartTime) {
    const since = Date.now() - timer.countdownStartTime;
    if (since >= COUNTDOWN_DURATION) {
      const preciseStart = timer.countdownStartTime + COUNTDOWN_DURATION;
      timer.phase = "active";
      timer.mainStartTime = preciseStart;
      timer.startedAt = preciseStart;
      mutated = true;
    }
  }
  if (!mutated && timer.phase === "active" && timer.mainStartTime) {
    const elapsed = (Date.now() - timer.mainStartTime) / 1000;
    const remaining = Math.max(0, timer.totalDuration - elapsed);
    if (remaining <= 0) {
      timer.phase = "completed";
      timer.completedAt = Date.now();
      mutated = true;
    }
  }
  return mutated;
}

export async function createTimer(request: CreateTimerRequest): Promise<{
  success: boolean;
  data?: TimerResponse;
  error?: string;
  status?: number;
}> {
  try {
    const { secretKey, countdownTime, autoStart = false } = request;

    if (!secretKey || secretKey !== SECRET_KEY) {
      return { success: false, error: "Invalid secret key", status: 403 };
    }

    if (!countdownTime || countdownTime <= 0) {
      return { success: false, error: "Invalid countdown time", status: 400 };
    }

    const existing = await getTimer();
    if (
      existing &&
      (existing.phase === "active" ||
        existing.phase === "countdown" ||
        existing.phase === "paused")
    ) {
      const response = buildTimerResponse(existing);
      return {
        success: false,
        error: "Timer already exists",
        data: response,
        status: 409,
      };
    }

    const now = Date.now();
    const timer: TimerState = {
      _id: 1,
      phase: autoStart ? "countdown" : "active",
      countdownStartTime: autoStart ? now : undefined,
      mainStartTime: autoStart ? undefined : now,
      originalDuration: countdownTime,
      totalDuration: countdownTime,
      extensions: [],
      createdAt: now,
      startedAt: autoStart ? undefined : now,
    };

    await upsertTimer(timer);
    const response = buildTimerResponse(timer);
    return { success: true, data: response, status: 201 };
  } catch (error) {
    console.error("Error creating timer:", error);
    return { success: false, error: "Internal server error", status: 500 };
  }
}

export async function getTimerStatus(): Promise<{
  success: boolean;
  data?: TimerResponse;
  error?: string;
  status?: number;
}> {
  try {
    const timer = await getTimer();
    if (!timer) {
      return { success: false, error: "No timer found", status: 404 };
    }

    const mutated = applyTransitions(timer);
    if (mutated) await upsertTimer(timer);

    const response = buildTimerResponse(timer);
    return { success: true, data: response, status: 200 };
  } catch (error) {
    console.error("Error fetching timer:", error);
    return { success: false, error: "Internal server error", status: 500 };
  }
}

export async function startCountdown(request: StartCountdownRequest): Promise<{
  success: boolean;
  data?: TimerResponse;
  error?: string;
  status?: number;
}> {
  try {
    const { secretKey } = request;

    if (!secretKey || secretKey !== SECRET_KEY) {
      return { success: false, error: "Invalid secret key", status: 403 };
    }

    const timer = await getTimer();
    if (!timer) {
      return { success: false, error: "No timer found", status: 404 };
    }

    if (timer.phase === "active" || timer.phase === "countdown") {
      return { success: false, error: "Timer is already running", status: 409 };
    }

    timer.phase = "countdown";
    timer.countdownStartTime = Date.now();
    await upsertTimer(timer);

    const response = buildTimerResponse(timer);
    return { success: true, data: response, status: 200 };
  } catch (error) {
    console.error("Error starting countdown:", error);
    return { success: false, error: "Internal server error", status: 500 };
  }
}

export async function controlTimer(
  request: ExtendTimerRequest & {
    action?: "pause" | "resume" | "stop" | "extend";
  }
): Promise<{
  success: boolean;
  data?: TimerResponse;
  error?: string;
  status?: number;
}> {
  try {
    const { secretKey, action = "extend", additionalTime, reason } = request;

    if (!secretKey || secretKey !== SECRET_KEY) {
      return { success: false, error: "Invalid secret key", status: 403 };
    }

    const timer = await getTimer();
    if (!timer) {
      return { success: false, error: "No timer found", status: 404 };
    }

    switch (action) {
      case "extend":
        if (!additionalTime || additionalTime <= 0) {
          return {
            success: false,
            error: "Invalid additional time",
            status: 400,
          };
        }

        const extension: TimerExtension = {
          id: generateId(),
          addedTime: additionalTime,
          addedAt: Date.now(),
          reason: reason,
        };

        timer.extensions.push(extension);
        timer.totalDuration += additionalTime;
        await upsertTimer(timer);

        const extendResponse = buildTimerResponse(timer);
        return { success: true, data: extendResponse, status: 200 };

      case "pause":
        if (timer.phase !== "active") {
          return { success: false, error: "Timer is not active", status: 409 };
        }

        timer.phase = "paused";
        timer.pausedAt = Date.now();
        await upsertTimer(timer);

        const pauseResponse = buildTimerResponse(timer);
        return { success: true, data: pauseResponse, status: 200 };

      case "resume":
        if (timer.phase !== "paused") {
          return { success: false, error: "Timer is not paused", status: 409 };
        }

        const pausedDuration = Date.now() - timer.pausedAt!;
        timer.mainStartTime! += pausedDuration;
        timer.phase = "active";
        timer.pausedAt = undefined;
        await upsertTimer(timer);

        const resumeResponse = buildTimerResponse(timer);
        return { success: true, data: resumeResponse, status: 200 };

      case "stop":
        timer.phase = "completed";
        timer.completedAt = Date.now();
        await upsertTimer(timer);

        const stopResponse = buildTimerResponse(timer);
        return { success: true, data: stopResponse, status: 200 };

      default:
        return { success: false, error: "Invalid action", status: 400 };
    }
  } catch (error) {
    console.error("Error controlling timer:", error);
    return { success: false, error: "Internal server error", status: 500 };
  }
}

export async function deleteTimerController(request: {
  secretKey: string;
}): Promise<{ success: boolean; error?: string; status?: number }> {
  try {
    const { secretKey } = request;

    if (!secretKey || secretKey !== SECRET_KEY) {
      return { success: false, error: "Invalid secret key", status: 403 };
    }

    const timer = await getTimer();
    if (!timer) {
      return { success: false, error: "No timer found", status: 404 };
    }

    await deleteTimer();
    return { success: true, status: 200 };
  } catch (error) {
    console.error("Error deleting timer:", error);
    return { success: false, error: "Internal server error", status: 500 };
  }
}
