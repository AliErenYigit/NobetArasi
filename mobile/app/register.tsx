import { Link, router } from "expo-router";
import { useState } from "react";
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

export default function RegisterScreen() {
  const { registerUser } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleRegister() {
    setErrorMessage("");

    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMessage("Ad soyad, email ve şifre girilmelidir.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Şifre en az 8 karakter olmalıdır.");
      return;
    }

    try {
      setSubmitting(true);

      await registerUser({
        fullName,
        email,
        password,
      });

      router.replace("/home");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Kayıt sırasında hata oluştu.";

      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
  <Screen centered keyboardAware>
    <Text style={styles.title}>Hesap Oluştur</Text>
    <Text style={styles.subtitle}>
      Kısa quizlerle klinik bilgini düzenli tekrar et.
    </Text>

    <View style={styles.form}>
      <Text style={styles.label}>Ad Soyad</Text>
      <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        value={fullName}
        onChangeText={setFullName}
      />

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
        placeholder="En az 8 karakter"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <Pressable
        style={[styles.primaryButton, submitting && styles.disabledButton]}
        onPress={handleRegister}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.primaryButtonText}>Kayıt Ol</Text>
        )}
      </Pressable>

      <Link href="/login" style={styles.link}>
        Zaten hesabın var mı? Giriş yap
      </Link>
    </View>
  </Screen>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.text,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 32,
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