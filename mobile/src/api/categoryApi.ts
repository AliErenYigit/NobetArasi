import { apiRequest } from "./httpClient";
import type { Category } from "../types/quiz";

export function getCategories() {
  return apiRequest<Category[]>("/api/categories", {
    method: "GET",
    authorized: true,
  });
}