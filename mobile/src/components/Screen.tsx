import type { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { colors } from "../constants/theme";

type ScreenProps = PropsWithChildren<{
  padded?: boolean;
  centered?: boolean;
  keyboardAware?: boolean;
}>;

export function Screen({
  children,
  padded = true,
  centered = false,
  keyboardAware = false,
}: ScreenProps) {
  const content = (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.scrollContent,
        padded && styles.padded,
        centered && styles.centered,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator
      nestedScrollEnabled
    >
      {children}
    </ScrollView>
  );

  if (keyboardAware) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {content}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return <SafeAreaView style={styles.safeArea}>{content}</SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 48,
    backgroundColor: colors.background,
  },
  padded: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  centered: {
    justifyContent: "center",
  },
});