import { handleAPIError } from "@/lib/error";
import api from "@/services";

// app/api/question.ts

export interface TestcaseFromAPI {
  id: string;
  input: string;
  output?: string;
  expected_output: string;
  hidden: boolean;
  runtime: number;
  memory: number;
  question_id: string;
}

// 👇 derived type without testcases
export type Question = {
  id: string;
  description: string;
  title: string;
  qType: string;
  isBountyActive: boolean;
  inputFormat: string[];
  points: number;
  round: number;
  constraints: string[];
  outputFormat: string[];
  sampleTestInput: string[];
  sampleTestOutput: string[];
  explanation: string[];
};
// your API function
export async function byRound(): Promise<QuestionWithTestcases[]> {
  const res = await fetch("/api/round"); // example
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export interface TestcaseFromAPI {
  id: string;
  input: string;
  output?: string;
  expected_output: string;
  hidden: boolean;
  runtime: number;
  memory: number;
  question_id: string;
}

export interface QuestionWithTestcases {
  question: Question;
  testcases: TestcaseFromAPI[];
}

interface ByRoundApiResponse {
  status: string;
  round: number;
  questions_testcases: QuestionWithTestcases[];
}
