
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