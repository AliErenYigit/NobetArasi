import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Merhaba</Text>
        <Text style={styles.title}>Bugünkü nöbet arası hazır.</Text>
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.cardTitle}>Level 1</Text>
        <Text style={styles.cardText}>XP: 0 / 300</Text>

        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      <View style={styles.quizCard}>
        <Text style={styles.cardTitle}>10 Soruluk Quiz</Text>
        <Text style={styles.cardText}>
          Bir kategori seç, 10 soruluk kısa quiz çöz ve XP kazan.
        </Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/categories")}
        >
          <Text style={styles.primaryButtonText}>Kategori Seç</Text>
        </Pressable>
      </View>

      <Pressable style={styles.secondaryButton} onPress={() => router.replace("/login")}>
        <Text style={styles.secondaryButtonText}>Çıkış Yap</Text>
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
    gap: 20,
  },
  greeting: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "600",
  },
  title: {
    marginTop: 6,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    color: "#0F172A",
  },
  progressCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  quizCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  cardText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
  progressBar: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "#E2E8F0",
    marginTop: 14,
    overflow: "hidden",
  },
  progressFill: {
    width: "0%",
    height: "100%",
    backgroundColor: "#0F766E",
  },
  primaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#0F766E",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#64748B",
    fontWeight: "700",
  },
});