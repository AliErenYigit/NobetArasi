import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getCategories } from "../src/api/categoryApi";
import { AppButton } from "../src/components/AppButton";
import { ProtectedScreen } from "../src/components/ProtectedScreen";
import { Screen } from "../src/components/Screen";
import { colors } from "../src/constants/theme";

export default function CategoriesScreen() {
  const {
    data: categories,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 0,
    refetchOnMount: "always",
  });

  return (
    <ProtectedScreen>
      <Screen>
        <Text style={styles.title}>Kategori Seç</Text>
        <Text style={styles.subtitle}>Her quiz 10 sorudan oluşur.</Text>

        {isLoading ? (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.stateText}>Kategoriler yükleniyor...</Text>
          </View>
        ) : null}

        {isError ? (
          <View style={styles.centerState}>
            <Text style={styles.errorTitle}>Kategoriler alınamadı</Text>
            <Text style={styles.errorText}>
              {error instanceof Error
                ? error.message
                : "Beklenmeyen bir hata oluştu."}
            </Text>

            <View style={styles.retryButton}>
              <AppButton onPress={() => refetch()}>
                {isRefetching ? "Tekrar deneniyor..." : "Tekrar Dene"}
              </AppButton>
            </View>
          </View>
        ) : null}

        {!isLoading && !isError && categories?.length === 0 ? (
          <View style={styles.centerState}>
            <Text style={styles.errorTitle}>Aktif kategori yok</Text>
            <Text style={styles.errorText}>
              Şu anda listelenecek aktif kategori bulunamadı.
            </Text>
          </View>
        ) : null}

        {!isLoading && !isError && categories && categories.length > 0 ? (
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
        ) : null}

        <View style={styles.footer}>
          <AppButton variant="secondary" onPress={() => router.back()}>
            Geri Dön
          </AppButton>
        </View>
      </Screen>
    </ProtectedScreen>
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
  centerState: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  stateText: {
    marginTop: 12,
    fontSize: 15,
    color: colors.mutedText,
    fontWeight: "600",
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
  retryButton: {
    width: "100%",
    marginTop: 18,
  },
  footer: {
    marginTop: 24,
  },
});