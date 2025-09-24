import { handleAPIError } from "@/lib/error";
import api from "@/services";

export interface TestcaseFromAPI {
  Id: string;
  Input: string;
  Output?: string;
  Expected_output: string;
  Hidden: boolean;
  Runtime: number;
  Memory: number;
  Question_id: string;
}

export type Question = {
  ID: string;
  Description: string;
  Title: string;
  Qtype: string;
  Isbountyactive: boolean;
  InputFormat: string[];
  Points: number;
  Round: number;
  Constraints: string[];
  OutputFormat: string[];
  SampleTestInput: string[];
  SampleTestOutput: string[];
  Explanation: string[];
  testcases?: TestcaseFromAPI[];
};
export async function byRound(): Promise<{
  question: Omit<Question, "testcases">;
  testcases: TestcaseFromAPI[];
}[]> {
  try {
    const { data } = await api.get<ByRoundApiResponse>(`/question/round`);
    console.log("byRound: ", data);

    return data.questions_testcases;
  } catch (e) {
    throw handleAPIError(e);
  }
}

interface ByRoundApiResponse {
  status: string;
  round: number;
  questions_testcases: {
    question: Omit<Question, "testcases">;
    testcases: TestcaseFromAPI[];
  }[];
}
