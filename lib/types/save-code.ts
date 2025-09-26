export interface SaveCodeRequest {
  questionId: string;
  language: string;
  code: string;
  round?: string;
  email: string;
}

export interface UpdateCodeRequest {
  id: string;
  code: string;
  email: string;
}

export interface DeleteCodeRequest {
  id: string;
  email: string;
}

export interface CodeState {
  _id: string;
  email: string;
  questionId: string;
  language: string;
  code: string;
  round?: string;
  createdAt: number;
  updatedAt?: number;
}

export interface CodeResponse {
  message: string;
  codeId: string;
  email: string;
  questionId: string;
  language: string;
  code: string;
  round?: string;
  createdAt: number;
  updatedAt?: number;
}
