import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ResultScreen() {
  const params = useLocalSearchParams<{
    correctCount?: string;
    totalQuestions?: string;
    categoryName?: string;
  }>();

  const correctCount = Number(params.correctCount ?? 0);
  const totalQuestions = Number(params.totalQuestions ?? 0);
  const wrongCount = totalQuestions - correctCount;
  const earnedXp = correctCount * 10 + 20;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Tamamlandı</Text>
      <Text style={styles.subtitle}>{params.categoryName ?? "Quiz"}</Text>

      <View style={styles.resultCard}>
        <Text style={styles.score}>
          {correctCount} / {totalQuestions}
        </Text>
        <Text style={styles.scoreLabel}>Doğru cevap</Text>

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
      </View>

      <Pressable style={styles.primaryButton} onPress={() => router.replace("/categories")}>
        <Text style={styles.primaryButtonText}>Yeni Quiz Çöz</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => router.replace("/home")}>
        <Text style={styles.secondaryButtonText}>Ana Sayfaya Dön</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
  },
  resultCard: {
    marginTop: 32,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  score: {
    fontSize: 52,
    fontWeight: "900",
    color: "#0F766E",
  },
  scoreLabel: {
    marginTop: 4,
    fontSize: 16,
    color: "#475569",
    fontWeight: "600",
  },
  stats: {
    flexDirection: "row",
    marginTop: 28,
    gap: 12,
  },
  statItem: {
    minWidth: 82,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
  },
  statLabel: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },
  primaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#0F766E",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  secondaryButtonText: {
    color: "#64748B",
    fontWeight: "700",
  },
});