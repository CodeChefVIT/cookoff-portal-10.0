export interface SaveCodeRequest {
  secretKey: string;
  userId: number;
  questionId: number;
  language: string;
  code: string;
  round?: string;
}

export interface UpdateCodeRequest {
  secretKey: string;
  id: string;
  code: string;
}

export interface DeleteCodeRequest {
  secretKey: string;
  id: string;
}

export interface CodeState {
  _id: string;
  userId: number;
  questionId: number;
  language: string;
  code: string;
  round?: string;
  createdAt: number;
  updatedAt?: number;
}

export interface CodeResponse {
  message: string;
  codeId: string;
  userId: number;
  questionId: number;
  language: string;
  code: string;
  round?: string;
  createdAt: number;
  updatedAt?: number;
}
