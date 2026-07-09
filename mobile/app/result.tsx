import { useMutation } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { submitQuiz } from "../src/api/quizApi";
import { AppButton } from "../src/components/AppButton";
import { AppCard } from "../src/components/AppCard";
import { ProtectedScreen } from "../src/components/ProtectedScreen";
import { Screen } from "../src/components/Screen";
import { colors } from "../src/constants/theme";
import { useAuth } from "../src/contexts/AuthContext";
import type { QuizAnswer, QuizSubmitResult } from "../src/types/quiz";

export default function ResultScreen() {
  const params = useLocalSearchParams<{
    categoryId?: string;
    categoryName?: string;
    answers?: string;
  }>();

  const { refreshCurrentUser } = useAuth();

  const categoryId = Number(params.categoryId ?? 0);
  const answers = parseAnswers(params.answers);

  const mutation = useMutation({
    mutationFn: submitQuiz,
    onSuccess: async () => {
      await refreshCurrentUser();
    },
  });

  useEffect(() => {
    if (categoryId <= 0 || answers.length === 0 || mutation.isPending || mutation.data) {
      return;
    }

    mutation.mutate({
      categoryId,
      answers,
    });
  }, [answers, categoryId, mutation]);

  return (
    <ProtectedScreen>
      <Screen>
        <Text style={styles.title}>Quiz Tamamlandı</Text>
        <Text style={styles.subtitle}>{params.categoryName ?? "Quiz"}</Text>

        {mutation.isPending ? (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.stateText}>Sonucun hesaplanıyor...</Text>
          </View>
        ) : null}

        {mutation.isError ? (
          <View style={styles.resultWrapper}>
            <AppCard>
              <Text style={styles.errorTitle}>Sonuç hesaplanamadı</Text>
              <Text style={styles.errorText}>
                {mutation.error instanceof Error
                  ? mutation.error.message
                  : "Beklenmeyen bir hata oluştu."}
              </Text>

              <View style={styles.buttonWrapper}>
                <AppButton
                  onPress={() =>
                    mutation.mutate({
                      categoryId,
                      answers,
                    })
                  }
                >
                  Tekrar Dene
                </AppButton>
              </View>
            </AppCard>
          </View>
        ) : null}

        {mutation.data ? <ResultContent result={mutation.data} /> : null}

        <View style={styles.buttonWrapper}>
          <AppButton onPress={() => router.replace("/categories")}>
            Yeni Quiz Çöz
          </AppButton>
        </View>

        <View style={styles.secondaryButtonWrapper}>
          <AppButton variant="secondary" onPress={() => router.replace("/home")}>
            Ana Sayfaya Dön
          </AppButton>
        </View>
      </Screen>
    </ProtectedScreen>
  );
}

function ResultContent({ result }: { result: QuizSubmitResult }) {
  return (
    <>
      <View style={styles.resultWrapper}>
        <AppCard>
          <View style={styles.center}>
            <Text style={styles.score}>
              {result.correctCount} / {result.totalQuestions}
            </Text>
            <Text style={styles.scoreLabel}>Doğru cevap</Text>
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{result.correctCount}</Text>
              <Text style={styles.statLabel}>Doğru</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{result.wrongCount}</Text>
              <Text style={styles.statLabel}>Yanlış</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{result.earnedXp}</Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>
          </View>

          <Text style={styles.levelText}>
            Güncel Level: {result.level} · Toplam XP: {result.totalXp}
          </Text>
        </AppCard>
      </View>

      <View style={styles.answersSection}>
        <Text style={styles.answersTitle}>Cevap Özeti</Text>

        {result.answers.map((answer, index) => (
          <View key={answer.questionId} style={styles.answerCard}>
            <Text style={styles.answerHeader}>
              Soru {index + 1} · {answer.isCorrect ? "Doğru" : "Yanlış"}
            </Text>

            <Text style={styles.answerQuestion}>{answer.questionText}</Text>

            <Text style={styles.answerMeta}>
              Senin cevabın: {answer.selectedOptionId}
            </Text>

            <Text style={styles.answerMeta}>
              Doğru cevap: {answer.correctOptionId}
            </Text>

            <Text style={styles.explanation}>{answer.explanation}</Text>

            <Text style={styles.tusNote}>{answer.tusNote}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

function parseAnswers(value: string | string[] | undefined): QuizAnswer[] {
  const rawValue = Array.isArray(value) ? value[0] : value;

  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isQuizAnswer);
  } catch {
    return [];
  }
}

function isQuizAnswer(value: unknown): value is QuizAnswer {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Partial<QuizAnswer>;

  return (
    typeof item.questionId === "number" &&
    ["A", "B", "C", "D", "E"].includes(String(item.selectedOptionId))
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 40,
    fontSize: 32,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: colors.mutedText,
    textAlign: "center",
  },
  centerState: {
    marginTop: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  stateText: {
    marginTop: 12,
    fontSize: 15,
    color: colors.mutedText,
    fontWeight: "600",
  },
  resultWrapper: {
    marginTop: 32,
  },
  center: {
    alignItems: "center",
  },
  score: {
    fontSize: 52,
    fontWeight: "900",
    color: colors.primary,
  },
  scoreLabel: {
    marginTop: 4,
    fontSize: 16,
    color: colors.softText,
    fontWeight: "600",
  },
  stats: {
    flexDirection: "row",
    marginTop: 28,
    gap: 12,
    justifyContent: "center",
  },
  statItem: {
    minWidth: 82,
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 13,
    color: colors.mutedText,
    fontWeight: "600",
  },
  levelText: {
    marginTop: 20,
    fontSize: 15,
    color: colors.softText,
    fontWeight: "700",
    textAlign: "center",
  },
  answersSection: {
    marginTop: 28,
    gap: 12,
  },
  answersTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
  },
  answerCard: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  answerHeader: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.primary,
  },
  answerQuestion: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
    color: colors.text,
  },
  answerMeta: {
    marginTop: 6,
    fontSize: 14,
    color: colors.softText,
    fontWeight: "600",
  },
  explanation: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: colors.softText,
  },
  tusNote: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: colors.primary,
    fontWeight: "700",
  },
  buttonWrapper: {
    marginTop: 28,
  },
  secondaryButtonWrapper: {
    marginTop: 8,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
  },
  errorText: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: colors.mutedText,
    textAlign: "center",
  },
});