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
  output?: string;
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
