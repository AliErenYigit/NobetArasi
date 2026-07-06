import { Link, router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hesap Oluştur</Text>
      <Text style={styles.subtitle}>
        Kısa quizlerle klinik bilgini düzenli tekrar et.
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Ad Soyad</Text>
        <TextInput style={styles.input} placeholder="Ad Soyad" />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="ornek@mail.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Şifre</Text>
        <TextInput
          style={styles.input}
          placeholder="Şifren"
          secureTextEntry
        />

        <Pressable style={styles.primaryButton} onPress={() => router.push("/home")}>
          <Text style={styles.primaryButtonText}>Kayıt Ol</Text>
        </Pressable>

        <Link href="/login" style={styles.link}>
          Zaten hesabın var mı? Giriş yap
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 32,
    fontSize: 16,
    color: "#475569",
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
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  primaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#0F766E",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  link: {
    marginTop: 16,
    textAlign: "center",
    color: "#0F766E",
    fontWeight: "600",
  },
});