
export interface ApiResponse {
  message: string;
  data: unknown;
}

export interface Question {
  ID: string;
  Description: string;
  Title: string;
  InputFormat: string[];
  Points: number;
  Round: number;
  Constraints: string[];
  OutputFormat: string[];
  SampleTestInput: string[];
  SampleTestOutput: string[];
  Explanation: string[];
}