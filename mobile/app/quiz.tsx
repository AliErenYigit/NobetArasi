import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const demoQuestions = [
  {
    id: 1,
    questionText:
      "Paslı balgam ile seyreden lober pnömonide en olası etken hangisidir?",
    options: [
      "Streptococcus pneumoniae",
      "Mycoplasma pneumoniae",
      "Klebsiella pneumoniae",
      "Staphylococcus aureus",
    ],
    correctIndex: 0,
    explanation:
      "Lober pnömoni ve paslı balgam klasik olarak S. pneumoniae ile ilişkilidir.",
  },
  {
    id: 2,
    questionText:
      "Bakteriyel menenjitte BOS bulguları için en uygun ifade hangisidir?",
    options: [
      "Lenfosit artışı, glukoz normal",
      "Nötrofil artışı, glukoz düşük",
      "Protein düşük, glukoz yüksek",
      "Eritrosit artışı, protein normal",
    ],
    correctIndex: 1,
    explanation:
      "Bakteriyel menenjitte BOS'ta nötrofil ve protein artar, glukoz düşer.",
  },
];

export default function QuizScreen() {
  const params = useLocalSearchParams<{
    categoryId?: string;
    categoryName?: string;
  }>();

  const questions = useMemo(() => demoQuestions, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  function handleAnswer() {
    if (selectedIndex === null) {
      return;
    }

    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    const nextCorrectCount = isCorrect ? correctCount + 1 : correctCount;

    if (isLastQuestion) {
      router.replace({
        pathname: "/result",
        params: {
          correctCount: String(nextCorrectCount),
          totalQuestions: String(questions.length),
          categoryName: params.categoryName ?? "Quiz",
        },
      });
      return;
    }

    setCorrectCount(nextCorrectCount);
    setSelectedIndex(null);
    setCurrentIndex((value) => value + 1);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{params.categoryName ?? "Quiz"}</Text>
      <Text style={styles.counter}>
        Soru {currentIndex + 1} / {questions.length}
      </Text>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
      </View>

      <View style={styles.options}>
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedIndex === index;

          return (
            <Pressable
              key={option}
              style={[styles.optionButton, isSelected && styles.selectedOption]}
              onPress={() => setSelectedIndex(index)}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.selectedOptionText,
                ]}
              >
                {String.fromCharCode(65 + index)}) {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        style={[
          styles.primaryButton,
          selectedIndex === null && styles.disabledButton,
        ]}
        onPress={handleAnswer}
        disabled={selectedIndex === null}
      >
        <Text style={styles.primaryButtonText}>
          {isLastQuestion ? "Quiz'i Bitir" : "Sonraki Soru"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 64,
    backgroundColor: "#F8FAFC",
  },
  category: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F766E",
  },
  counter: {
    marginTop: 6,
    marginBottom: 24,
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },
  questionCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  questionText: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: "700",
    color: "#0F172A",
  },
  options: {
    marginTop: 24,
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  selectedOption: {
    borderColor: "#0F766E",
    backgroundColor: "#ECFDF5",
  },
  optionText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#334155",
    fontWeight: "600",
  },
  selectedOptionText: {
    color: "#0F766E",
  },
  primaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#0F766E",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  disabledButton: {
    backgroundColor: "#94A3B8",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});