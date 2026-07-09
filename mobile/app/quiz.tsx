import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getQuizQuestions } from "../src/api/quizApi";
import { AppButton } from "../src/components/AppButton";
import { AppCard } from "../src/components/AppCard";
import { ProtectedScreen } from "../src/components/ProtectedScreen";
import { QuestionOptionButton } from "../src/components/QuestionOptionButton";
import { Screen } from "../src/components/Screen";
import { colors } from "../src/constants/theme";
import type {
  QuestionOptionId,
  QuizAnswer,
  QuizQuestion,
} from "../src/types/quiz";

export default function QuizScreen() {
  const params = useLocalSearchParams<{
    categoryId?: string;
    categoryName?: string;
  }>();

  const categoryId = Number(params.categoryId ?? 0);
  const categoryName = params.categoryName ?? "Quiz";

  const {
    data: questions,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["quiz-questions", categoryId, 10, "five-options"],
    queryFn: () =>
      getQuizQuestions({
        categoryId,
        count: 10,
      }),
    enabled: categoryId > 0,
    staleTime: 0,
    refetchOnMount: "always",
  });

  const safeQuestions = useMemo<QuizQuestion[]>(
    () => questions ?? [],
    [questions],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] =
    useState<QuestionOptionId | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  const currentQuestion = safeQuestions[currentIndex];
  const isLastQuestion = currentIndex === safeQuestions.length - 1;

  function handleAnswer() {
    if (!currentQuestion || selectedOptionId === null) {
      return;
    }

    const nextAnswers: QuizAnswer[] = [
      ...answers,
      {
        questionId: currentQuestion.id,
        selectedOptionId,
      },
    ];

    if (isLastQuestion) {
      router.replace({
        pathname: "/result",
        params: {
          categoryId: String(categoryId),
          categoryName,
          answers: JSON.stringify(nextAnswers),
        },
      });

      return;
    }

    setAnswers(nextAnswers);
    setSelectedOptionId(null);
    setCurrentIndex((value) => value + 1);
  }

  function handleRetry() {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setAnswers([]);
    refetch();
  }

  if (categoryId <= 0) {
    return (
      <ProtectedScreen>
        <Screen>
          <Text style={styles.counter}>Kategori bulunamadı</Text>
          <Text style={styles.emptyText}>
            Quiz başlatmak için geçerli bir kategori seçilmelidir.
          </Text>

          <View style={styles.buttonWrapper}>
            <AppButton onPress={() => router.replace("/categories")}>
              Kategoriye Dön
            </AppButton>
          </View>
        </Screen>
      </ProtectedScreen>
    );
  }

  if (isLoading) {
    return (
      <ProtectedScreen>
        <Screen>
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.stateText}>Sorular hazırlanıyor...</Text>
          </View>
        </Screen>
      </ProtectedScreen>
    );
  }

  if (isError) {
    return (
      <ProtectedScreen>
        <Screen>
          <Text style={styles.counter}>Sorular alınamadı</Text>
          <Text style={styles.emptyText}>
            {error instanceof Error
              ? error.message
              : "Beklenmeyen bir hata oluştu."}
          </Text>

          <View style={styles.buttonWrapper}>
            <AppButton onPress={handleRetry}>
              {isRefetching ? "Tekrar deneniyor..." : "Tekrar Dene"}
            </AppButton>
          </View>

          <View style={styles.secondaryButtonWrapper}>
            <AppButton
              variant="secondary"
              onPress={() => router.replace("/categories")}
            >
              Kategoriye Dön
            </AppButton>
          </View>
        </Screen>
      </ProtectedScreen>
    );
  }

  if (!currentQuestion) {
    return (
      <ProtectedScreen>
        <Screen>
          <Text style={styles.counter}>Soru bulunamadı</Text>
          <Text style={styles.emptyText}>
            Bu kategori için aktif soru bulunamadı.
          </Text>

          <View style={styles.buttonWrapper}>
            <AppButton onPress={() => router.replace("/categories")}>
              Kategoriye Dön
            </AppButton>
          </View>
        </Screen>
      </ProtectedScreen>
    );
  }

  return (
    <ProtectedScreen>
      <Screen>
        <Text style={styles.category}>{categoryName}</Text>
        <Text style={styles.counter}>
          Soru {currentIndex + 1} / {safeQuestions.length}
        </Text>

        <AppCard>
          <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
        </AppCard>

        <View style={styles.options}>
          {currentQuestion.options.map((option) => (
            <QuestionOptionButton
              key={option.id}
              option={option}
              selected={selectedOptionId === option.id}
              onPress={() => setSelectedOptionId(option.id)}
            />
          ))}
        </View>

        <View style={styles.buttonWrapper}>
          <AppButton
            onPress={handleAnswer}
            disabled={selectedOptionId === null}
          >
            {isLastQuestion ? "Quiz'i Bitir" : "Sonraki Soru"}
          </AppButton>
        </View>
      </Screen>
    </ProtectedScreen>
  );
}

const styles = StyleSheet.create({
  category: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  counter: {
    marginTop: 6,
    marginBottom: 24,
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
  },
  questionText: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: "700",
    color: colors.text,
  },
  options: {
    marginTop: 24,
    gap: 12,
  },
  buttonWrapper: {
    marginTop: 28,
  },
  secondaryButtonWrapper: {
    marginTop: 8,
  },
  emptyText: {
    marginTop: 8,
    fontSize: 16,
    color: colors.mutedText,
    lineHeight: 24,
  },
  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  stateText: {
    marginTop: 12,
    fontSize: 15,
    color: colors.mutedText,
    fontWeight: "600",
  },
});