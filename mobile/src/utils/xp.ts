export function calculateEarnedXp(correctCount: number, totalQuestions: number) {
  const correctAnswerXp = correctCount * 10;
  const completionBonusXp = totalQuestions > 0 ? 20 : 0;
  const perfectBonusXp = correctCount === totalQuestions ? 30 : 0;

  return correctAnswerXp + completionBonusXp + perfectBonusXp;
}

export function getLevelFromTotalXp(totalXp: number) {
  if (totalXp >= 1800) return 5;
  if (totalXp >= 1200) return 4;
  if (totalXp >= 700) return 3;
  if (totalXp >= 300) return 2;

  return 1;
}

export function getNextLevelXp(currentLevel: number) {
  const levelMap: Record<number, number> = {
    1: 300,
    2: 700,
    3: 1200,
    4: 1800,
    5: 1800,
  };

  return levelMap[currentLevel] ?? 1800;
}