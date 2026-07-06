import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../src/components/AppButton";
import { AppCard } from "../src/components/AppCard";
import { Screen } from "../src/components/Screen";
import { colors } from "../src/constants/theme";
import { calculateEarnedXp } from "../src/utils/xp";

export default function ResultScreen() {
  const params = useLocalSearchParams<{
    correctCount?: string;
    totalQuestions?: string;
    categoryId?: string;
    categoryName?: string;
  }>();

  const correctCount = Number(params.correctCount ?? 0);
  const totalQuestions = Number(params.totalQuestions ?? 0);
  const wrongCount = totalQuestions - correctCount;
  const earnedXp = calculateEarnedXp(correctCount, totalQuestions);

  return (
    <Screen>
      <Text style={styles.title}>Quiz Tamamlandı</Text>
      <Text style={styles.subtitle}>{params.categoryName ?? "Quiz"}</Text>

      <View style={styles.resultWrapper}>
        <AppCard>
          <View style={styles.center}>
            <Text style={styles.score}>
              {correctCount} / {totalQuestions}
            </Text>
            <Text style={styles.scoreLabel}>Doğru cevap</Text>
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{correctCount}</Text>
              <Text style={styles.statLabel}>Doğru</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{wrongCount}</Text>
              <Text style={styles.statLabel}>Yanlış</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{earnedXp}</Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>
          </View>
        </AppCard>
      </View>

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
  buttonWrapper: {
    marginTop: 28,
  },
  secondaryButtonWrapper: {
    marginTop: 8,
  },
});