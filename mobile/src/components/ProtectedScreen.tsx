import { Redirect } from "expo-router";
import type { PropsWithChildren } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../constants/theme";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedScreen({ children }: PropsWithChildren) {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!authenticated) {
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});