import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSentenceCase(input: string): string {
  const trimmedInput = input.trim();
  if (trimmedInput.length === 0) {
    return "";
  }

  const sentences = trimmedInput.split(/(?<=[.!?])\s+/);

  const sentenceCased = sentences.map((sentence) => {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  });

  return sentenceCased.join(" ");
}

export function getUserIDFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user_id || payload.userId || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
