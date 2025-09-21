
export interface ApiResponse {
  message: string;
  data: unknown;
}


export interface QuestionTestcasePair {
  question: Question;
  testcases: Testcase[];
}

export interface Question {
  id: string; // uuid
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

export interface DashboardResponse {
  status: "success";
  data: {
    userName: string;
    email: string;
    currentRound: number;
    questionsCompleted0: number;
    questionsCompleted1: number;
    questionsCompleted2: number;
    questionsCompleted3: number;
    questionsNotCompleted0: number;
    questionsNotCompleted1: number;
    questionsNotCompleted2: number;
    questionsNotCompleted3: number;
    round0Score: number;
    round1Score: number;
    round2Score: number;
    round3Score: number;
  };
}