import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "../src/constants/theme";
import { useAuth } from "../src/contexts/AuthContext";
import { Screen } from "../src/components/Screen";

export default function LoginScreen() {
  const { loginUser, authenticated, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!loading && authenticated) {
      router.replace("/home");
    }
  }, [loading, authenticated]);

  async function handleLogin() {
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Email ve şifre girilmelidir.");
      return;
    }

    try {
      setSubmitting(true);

      await loginUser({
        email: email.trim(),
        password,
      });

      // Burada router.replace çağırmıyoruz.
      // authenticated true olunca yukarıdaki useEffect yönlendirecek.
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Giriş yapılırken hata oluştu.";

      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

 return (
  <Screen centered keyboardAware>
    <View style={styles.header}>
      <Text style={styles.appName}>Nöbet Arası</Text>
      <Text style={styles.subtitle}>
        Nöbet arasında kısa klinik tekrarlar.
      </Text>
    </View>

    <View style={styles.form}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="ornek@mail.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Şifre</Text>
      <TextInput
        style={styles.input}
        placeholder="Şifren"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <Pressable
        style={[styles.primaryButton, submitting && styles.disabledButton]}
        onPress={handleLogin}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.primaryButtonText}>Giriş Yap</Text>
        )}
      </Pressable>

      <Link href="/register" style={styles.link}>
        Hesabın yok mu? Kayıt ol
      </Link>
    </View>
  </Screen>
);
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: 32,
  },
  appName: {
    fontSize: 34,
    fontWeight: "800",
    color: colors.text,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: colors.softText,
  },
  form: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    fontSize: 16,
  },
  primaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  disabledButton: {
    backgroundColor: colors.disabled,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  link: {
    marginTop: 16,
    textAlign: "center",
    color: colors.primary,
    fontWeight: "600",
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "600",
  },
});