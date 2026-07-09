namespace NobetArasi.Application.Common;

public sealed record ServiceResult<T>(
    bool Succeeded,
    T? Value,
    string? ErrorCode,
    string? ErrorMessage)
{
    public static ServiceResult<T> Success(T value)
    {
        return new ServiceResult<T>(
            true,
            value,
            null,
            null);
    }

    public static ServiceResult<T> Failure(string errorCode, string errorMessage)
    {
        return new ServiceResult<T>(
            false,
            default,
            errorCode,
            errorMessage);
    }
}