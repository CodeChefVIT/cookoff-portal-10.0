import { byRound, Question, TestcaseFromAPI } from "@/api/question";

export async function getKitchenData(): Promise<{
  questions: Question[];
  testcases: TestcaseFromAPI[];
}> {
  const questions = await byRound();
  const testcases = questions.flatMap((q) => q.testcases || []);
  return { questions, testcases };
}
