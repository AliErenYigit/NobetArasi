import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../src/components/AppButton";
import { AppCard } from "../src/components/AppCard";
import { ProgressBar } from "../src/components/ProgressBar";
import { Screen } from "../src/components/Screen";
import { colors } from "../src/constants/theme";

export default function HomeScreen() {
  const totalXp = 0;
  const nextLevelXp = 300;

  return (
    <Screen>
      <View>
        <Text style={styles.greeting}>Merhaba</Text>
        <Text style={styles.title}>Bugünkü nöbet arası hazır.</Text>
      </View>

      <View style={styles.section}>
        <AppCard>
          <Text style={styles.cardTitle}>Level 1</Text>
          <Text style={styles.cardText}>XP: {totalXp} / {nextLevelXp}</Text>

          <View style={styles.progressWrapper}>
            <ProgressBar value={totalXp} max={nextLevelXp} />
          </View>
        </AppCard>
      </View>

      <View style={styles.section}>
        <AppCard>
          <Text style={styles.cardTitle}>10 Soruluk Quiz</Text>
          <Text style={styles.cardText}>
            Bir kategori seç, kısa quiz çöz ve XP kazan.
          </Text>

          <View style={styles.buttonWrapper}>
            <AppButton onPress={() => router.push("/categories")}>
              Kategori Seç
            </AppButton>
          </View>
        </AppCard>
      </View>

      <View style={styles.footer}>
        <AppButton variant="secondary" onPress={() => router.replace("/login")}>
          Çıkış Yap
        </AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  greeting: {
    fontSize: 16,
    color: colors.mutedText,
    fontWeight: "600",
  },
  title: {
    marginTop: 6,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    color: colors.text,
  },
  section: {
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },
  cardText: {
    marginTop: 8,
    fontSize: 15,
    color: colors.softText,
    lineHeight: 22,
  },
  progressWrapper: {
    marginTop: 14,
  },
  buttonWrapper: {
    marginTop: 16,
  },
  footer: {
    marginTop: 20,
  },
});