import { byRound, Question, TestcaseFromAPI } from "@/api/question";

export async function getKitchenData(): Promise<{
  questions: Question[];
  testcases: TestcaseFromAPI[];
  questionsWithTestcases: {
    question: Omit<Question, "testcases">;
    testcases: TestcaseFromAPI[];
  }[];
}> {
  const questionsWithTestcases = await byRound();
  const questions = questionsWithTestcases.map((q) => ({
    ...q.question,
    testcases: q.testcases,
  }));
  const testcases = questions.flatMap((q) => q.testcases || []);
  return { questions, testcases, questionsWithTestcases };
}
