import { apiRequest } from "./httpClient";
import type {
  QuizQuestion,
  QuizSubmitResult,
  SubmitQuizRequest,
} from "../types/quiz";

type GetQuizQuestionsParams = {
  categoryId: number;
  count?: number;
};

export function getQuizQuestions({
  categoryId,
  count = 10,
}: GetQuizQuestionsParams) {
  const query = new URLSearchParams({
    categoryId: String(categoryId),
    count: String(count),
  });

  return apiRequest<QuizQuestion[]>(`/api/quiz/questions?${query.toString()}`, {
    method: "GET",
    authorized: true,
  });
}

export function submitQuiz(request: SubmitQuizRequest) {
  return apiRequest<QuizSubmitResult>("/api/quiz/submit", {
    method: "POST",
    body: request,
    authorized: true,
  });
}