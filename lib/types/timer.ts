export interface TimerState {
  _id: number;
  phase: "countdown" | "active" | "paused" | "completed";
  countdownStartTime?: number;
  mainStartTime?: number;
  originalDuration: number;
  totalDuration: number;
  extensions: TimerExtension[];
  createdAt: number;
  startedAt?: number;
  pausedAt?: number;
  completedAt?: number;
}

export interface TimerExtension {
  id: string;
  addedTime: number;
  addedAt: number;
  reason?: string;
}

export interface TimerResponse {
  message: string;
  phase: "countdown" | "active" | "paused" | "completed";
  remainingTime: number;
  countdownValue?: 3 | 2 | 1 | 0;
  totalDuration: number;
  extensions: TimerExtension[];
  isActive: boolean;
}

export interface CreateTimerRequest {
  secretKey: string;
  countdownTime: number;
  autoStart?: boolean;
}

export interface ExtendTimerRequest {
  secretKey: string;
  additionalTime: number;
  reason?: string;
}

export interface StartCountdownRequest {
  secretKey: string;
}

export const COUNTDOWN_DURATION = 3000;
