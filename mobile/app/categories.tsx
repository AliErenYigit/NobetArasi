import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const categories = [
  {
    id: 1,
    name: "Mikrobiyoloji",
    description: "Etkenler, tanı ipuçları ve temel klinik bilgiler.",
  },
  {
    id: 2,
    name: "Farmakoloji",
    description: "İlaç grupları, yan etkiler ve mekanizmalar.",
  },
  {
    id: 3,
    name: "Patoloji",
    description: "Hastalık mekanizmaları ve ayırıcı noktalar.",
  },
  {
    id: 4,
    name: "Dahiliye",
    description: "Klinik yaklaşım ve sık karşılaşılan tablolar.",
  },
];

export default function CategoriesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kategori Seç</Text>
      <Text style={styles.subtitle}>Her quiz 10 sorudan oluşur.</Text>

      <View style={styles.list}>
        {categories.map((category) => (
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

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Geri Dön</Text>
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
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 24,
    fontSize: 16,
    color: "#64748B",
  },
  list: {
    gap: 14,
  },
  categoryCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  categoryName: {
    fontSize: 19,
    fontWeight: "800",
    color: "#0F172A",
  },
  categoryDescription: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: "#475569",
  },
  backButton: {
    marginTop: 24,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "#64748B",
    fontWeight: "700",
  },
});