export interface ApiResponse {
  message: string;
  data: unknown;
}

export interface Question {
  id: string;
  title: string;
  points: number;
  description: string;
  inputFormat: string[];
  constraints: string[];
  outputFormat: string[];
  sampleTestInput: string[];
  sampleTestOutput: string[];
  explanation: string[];
  qType: string;
  round: number;
  isBountyActive: boolean;
}

export interface Testcase {
  id: string;
  expected_output: string;
  memory: number;
  input: string;
  hidden: boolean;
  runtime: number;
  question_id: string;
}
export interface Testcase {
  id: string;
  expected_output: string;
  memory: number;
  input: string;
  hidden: boolean;
  runtime: number;
  question_id: string;
  output?: string;
}

export interface Question {
  id: string;
  title: string;
  points: number;
  description: string;
  inputFormat: string[];
  constraints: string[];
  outputFormat: string[];
  sampleTestInput: string[];
  sampleTestOutput: string[];
  explanation: string[];
  qType: string;
  round: number;
  isBountyActive: boolean;
}

export interface QuestionTestcasePair {
  question: Question;
  testcases: Testcase[];
}

export interface QuestionWindowProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setQuestionID: React.Dispatch<React.SetStateAction<string>>;
  questionID: string;
}

export interface DashboardResponse {
  username: string;
  email: string;
  questions_completed: number[];
  questions_not_completed: number[];
  round_scores: number[];
  current_round: number;
}
