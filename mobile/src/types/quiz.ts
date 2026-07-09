export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export type QuestionOptionId = "A" | "B" | "C" | "D" | "E";

export type QuestionOption = {
  id: QuestionOptionId;
  text: string;
};

export type QuizQuestion = {
  id: number;
  questionText: string;
  options: QuestionOption[];
};

export type QuizAnswer = {
  questionId: number;
  selectedOptionId: QuestionOptionId;
};

export type SubmitQuizRequest = {
  categoryId: number;
  answers: QuizAnswer[];
};

export type QuizSubmitAnswerResult = {
  questionId: number;
  questionText: string;
  selectedOptionId: QuestionOptionId;
  correctOptionId: QuestionOptionId;
  isCorrect: boolean;
  explanation: string;
  tusNote: string;
};

export type QuizSubmitResult = {
  attemptId: string;
  categoryId: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  earnedXp: number;
  totalXp: number;
  level: number;
  answers: QuizSubmitAnswerResult[];
};