import { Question } from "../api";

export interface ApiResponse {
  message: string;
  data: unknown;
}


export interface QuestionTestcasePair {
  question: Question;
  testcases: Testcase[];
}

interface QuestionWindowProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setQuestionID: React.Dispatch<React.SetStateAction<string>>; // <- string not number
  questionID: string;
}


export interface Testcase {
  id: string; // uuid
  expected_output: string;
  memory: number; // double
  input: string;
  hidden: boolean;
  runtime: number; // double
  question_id: string; // uuid
}