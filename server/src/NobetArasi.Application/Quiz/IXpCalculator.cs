namespace NobetArasi.Application.Quiz;

public interface IXpCalculator
{
    int CalculateEarnedXp(int correctCount, int totalQuestions);

    int GetLevelFromTotalXp(int totalXp);

    int GetNextLevelXp(int level);
}