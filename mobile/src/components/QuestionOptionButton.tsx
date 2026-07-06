import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius } from "../constants/theme";
import type { QuestionOption } from "../types/quiz";

type QuestionOptionButtonProps = {
  option: QuestionOption;
  selected: boolean;
  onPress: () => void;
};

export function QuestionOptionButton({
  option,
  selected,
  onPress,
}: QuestionOptionButtonProps) {
  return (
    <Pressable
      style={[styles.button, selected && styles.selectedButton]}
      onPress={onPress}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>
        {option.id}) {option.text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  selectedButton: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.softText,
    fontWeight: "600",
  },
  selectedText: {
    color: colors.primary,
  },
});