export interface ApiResponse<T = unknown> {
  status: string;
  message: string;
  data?: T;
  error?: string;
}

export interface Question {
  id: string;
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
