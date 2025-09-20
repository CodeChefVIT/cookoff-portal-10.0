import { handleAPIError } from "@/lib/error";
import { Question } from "@/schemas/api";
import api from "@/services";

interface TestcaseFromAPI {
  id: string;
  expected_output: string;
  memory: number;
  input: string;
  hidden: boolean;
  runtime: number;
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

export async function byRound(): Promise<QuestionWithTestcases[]> {
  try {
    const { data } = await api.get<ByRoundApiResponse>(`/question/round`);
    return data.questions_testcases;
  } catch (e) {
    throw handleAPIError(e);
  }
}
