export interface ApiResponse<T = unknown> {
  status: string;
  message: string;
  data?: T;
  error?: string;
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
