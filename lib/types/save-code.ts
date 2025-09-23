export interface SaveCodeRequest {
  questionId: string;
  language: string;
  code: string;
  round?: string;
}

export interface UpdateCodeRequest {
  id: string;
  code: string;
}

export interface DeleteCodeRequest {
  id: string;
}

export interface CodeState {
  _id: string;
  userId: string;
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
  userId: string;
  questionId: string;
  language: string;
  code: string;
  round?: string;
  createdAt: number;
  updatedAt?: number;
}
