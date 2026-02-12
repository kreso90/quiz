export interface Quiz {
  id: number;
  name: string;
  questions: Question[];
}

export interface Question {
  id: number;
  question: string;
  answer: string;
}