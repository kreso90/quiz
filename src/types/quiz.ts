export interface Quiz {
  id: number;
  name: string;
  questions: Question[];
}

export interface Question {
  id: number;
  apiId?: string;
  question: string;
  answer: string;
}