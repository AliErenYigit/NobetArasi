import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../src/components/AppButton";
import { AppCard } from "../src/components/AppCard";
import { QuestionOptionButton } from "../src/components/QuestionOptionButton";
import { Screen } from "../src/components/Screen";
import { colors } from "../src/constants/theme";
import { getQuestionsByCategoryId } from "../src/data/questions";
import type { QuestionOption, QuizAnswer } from "../src/types/quiz";

export default function QuizScreen() {
  const params = useLocalSearchParams<{
    categoryId?: string;
    categoryName?: string;
  }>();

  const categoryId = Number(params.categoryId ?? 0);

  const questions = useMemo(
    () => getQuestionsByCategoryId(categoryId, 10),
    [categoryId],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<
    QuestionOption["id"] | null
  >(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

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
      const correctCount = nextAnswers.reduce((total, answer) => {
        const question = questions.find((item) => item.id === answer.questionId);

        if (!question) {
          return total;
        }

        return question.correctOptionId === answer.selectedOptionId
          ? total + 1
          : total;
      }, 0);

      router.replace({
        pathname: "/result",
        params: {
          correctCount: String(correctCount),
          totalQuestions: String(questions.length),
          categoryId: String(categoryId),
          categoryName: params.categoryName ?? "Quiz",
        },
      });

      return;
    }

    setAnswers(nextAnswers);
    setSelectedOptionId(null);
    setCurrentIndex((value) => value + 1);
  }

  if (!currentQuestion) {
    return (
      <Screen>
        <Text style={styles.counter}>Soru bulunamadı</Text>
        <Text style={styles.emptyText}>
          Bu kategori için demo soru verisi bulunamadı.
        </Text>

        <View style={styles.buttonWrapper}>
          <AppButton onPress={() => router.replace("/categories")}>
            Kategoriye Dön
          </AppButton>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.category}>{params.categoryName ?? "Quiz"}</Text>
      <Text style={styles.counter}>
        Soru {currentIndex + 1} / {questions.length}
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
  emptyText: {
    marginTop: 8,
    fontSize: 16,
    color: colors.mutedText,
    lineHeight: 24,
  },
});