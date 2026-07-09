namespace NobetArasi.Application.Quiz;

public sealed class XpCalculator : IXpCalculator
{
    public int CalculateEarnedXp(int correctCount, int totalQuestions)
    {
        if (totalQuestions <= 0)
        {
            return 0;
        }

        var correctAnswerXp = correctCount * 10;
        var completionBonusXp = 20;
        var perfectBonusXp = correctCount == totalQuestions ? 30 : 0;

        return correctAnswerXp + completionBonusXp + perfectBonusXp;
    }

    public int GetLevelFromTotalXp(int totalXp)
    {
        if (totalXp >= 1800) return 5;
        if (totalXp >= 1200) return 4;
        if (totalXp >= 700) return 3;
        if (totalXp >= 300) return 2;

        return 1;
    }

    public int GetNextLevelXp(int level)
    {
        return level switch
        {
            1 => 300,
            2 => 700,
            3 => 1200,
            4 => 1800,
            _ => 1800
        };
    }
}