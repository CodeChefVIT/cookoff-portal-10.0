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
  id: string; // uuid
  expected_output: string;
  memory: number; // double
  input: string;
  hidden: boolean;
  runtime: number; // double
  question_id: string; // uuid
}
export interface Testcase {
  id: string; // uuid
  expected_output: string;
  memory: number; // double
  input: string;
  hidden: boolean;
  runtime: number; // double
  question_id: string; // uuid
  output?: string;
}

export interface Question {
  id: string; // uuid
  title: string;
  points: number; // integer
  description: string;
  inputFormat: string[];
  constraints: string[];
  outputFormat: string[];
  sampleTestInput: string[];
  sampleTestOutput: string[];
  explanation: string[];
  qType: string;
  round: number; // integer
  isBountyActive: boolean;
}

export interface QuestionTestcasePair {
  question: Question;
  testcases: Testcase[];
}

export interface QuestionWindowProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setQuestionID: React.Dispatch<React.SetStateAction<string>>; // string, matches API
  questionID: string;
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

