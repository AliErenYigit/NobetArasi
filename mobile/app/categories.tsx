import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../src/components/AppButton";
import { Screen } from "../src/components/Screen";
import { colors } from "../src/constants/theme";
import { demoCategories } from "../src/data/categories";

export default function CategoriesScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Kategori Seç</Text>
      <Text style={styles.subtitle}>Her quiz 10 sorudan oluşur.</Text>

      <View style={styles.list}>
        {demoCategories.map((category) => (
          <Pressable
            key={category.id}
            style={styles.categoryCard}
            onPress={() =>
              router.push({
                pathname: "/quiz",
                params: {
                  categoryId: String(category.id),
                  categoryName: category.name,
                },
              })
            }
          >
            <Text style={styles.categoryName}>{category.name}</Text>
            <Text style={styles.categoryDescription}>
              {category.description}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.footer}>
        <AppButton variant="secondary" onPress={() => router.back()}>
          Geri Dön
        </AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.text,
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 24,
    fontSize: 16,
    color: colors.mutedText,
  },
  list: {
    gap: 14,
  },
  categoryCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryName: {
    fontSize: 19,
    fontWeight: "800",
    color: colors.text,
  },
  categoryDescription: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: colors.softText,
  },
  footer: {
    marginTop: 24,
  },
});