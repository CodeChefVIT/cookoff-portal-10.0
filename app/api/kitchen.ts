import { byRound, Question, TestcaseFromAPI } from "@/api/question";
import api from "@/services";

export async function getKitchenData(): Promise<{
  questions: Question[];
  testcases: TestcaseFromAPI[];
}> {
  const questions = await byRound();

  const testcases = questions.flatMap((q) => {
    if (!q.testcases) return [];
    return q.testcases.map((tc) => ({
      ID: tc.ID,
      Input: tc.Input,
      ExpectedOutput: tc.ExpectedOutput,
      Hidden: tc.Hidden,
      Runtime: tc.Runtime,
      Memory: tc.Memory,
      QuestionID: tc.QuestionID,
    }));
  });
  return { questions, testcases };
}
interface RunCodeRequest {
  source_code: string;
  language_id: number;
  question_id: string;
}

interface ExecutionResult {
  token: string;
  status: {
    id: number;
    description: string;
  };
  stdout: string;
  time: string;
  memory: number;
  stderr: string;
  message: string;
  language: string;
  compile_output: string;
}

interface RunCodeResponse {
  result: ExecutionResult[];
  no_testcases_passed: number;
}

export async function getTestCasesAfterRun(
  sourceCode: string,
  languageId: number,
  questionId: string
): Promise<RunCodeResponse> {
  try {
    const requestData: RunCodeRequest = {
      source_code: sourceCode,
      language_id: languageId,
      question_id: questionId,
    };

    const response = await api.post<RunCodeResponse>("/runcode", requestData);
    // console.log("in get", response);

    return response.data;
  } catch (error) {
    console.error("Error running code:", error);
    throw error;
  }
}

export async function submitCode(
  source_code: string,
  language_id: number,
  question_id: string
): Promise<{ submission_id: string }> {
  try {
    const request: RunCodeRequest = {
      source_code: source_code,
      language_id: language_id,
      question_id: question_id,
    };
    const response = await api.post<{ submission_id: string }>(
      "/submit",
      request
    );
    return response.data;
  } catch (error) {
    console.error("error submitting code: ", error);
    throw error;
  }
}

interface TestCaseResult {
  id: string;
  runtime: number;
  memory: number;
  status: string;
  description: string;
  expected_output: string;
  compile_output: string;
}

interface SubmissionResult {
  id: string;
  question_id: string;
  passed: number;
  failed: number;
  runtime: number;
  memory: number;
  submission_time: string;
  description: string;
  testcases: TestCaseResult[];
}

export async function getSubmissionResult(
  submission_id: string
): Promise<SubmissionResult> {
  try {
    const response = await api.get<SubmissionResult>(
      `/result/${submission_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting submission result:", error);
    throw error;
  }
}
