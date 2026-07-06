export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export type QuestionOption = {
  id: "A" | "B" | "C" | "D";
  text: string;
};

export type QuizQuestion = {
  id: number;
  categoryId: number;
  questionText: string;
  options: QuestionOption[];
  correctOptionId: QuestionOption["id"];
  explanation: string;
  tusNote: string;
};

export type QuizAnswer = {
  questionId: number;
  selectedOptionId: QuestionOption["id"];
};

export type QuizResult = {
  categoryId: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  earnedXp: number;
};