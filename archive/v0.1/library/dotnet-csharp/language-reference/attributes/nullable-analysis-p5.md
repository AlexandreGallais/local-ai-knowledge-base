---
title: "Attributes interpreted by the compiler: Nullable static analysis (part 5 of 8)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/attributes/nullable-analysis.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Attributes interpreted by the compiler: Nullable static analysis (part 5 of 8)

```csharp
﻿using System.Diagnostics.CodeAnalysis;

namespace attributes;

#nullable disable
public class NullableOblivious
{
    private Dictionary<string, string> _messageMap = new();
    bool TryGetMessage(string key, out string message)
    {
        if (_messageMap.ContainsKey(key))
            message = _messageMap[key];
        else
            message = null;
        return message != null;
    }

    public string ScreenName
    {
        get => _screenName;
        set => _screenName = value ?? GenerateRandomScreenName();
    }
    private string _screenName;
    private static string GenerateRandomScreenName() => throw new NotImplementedException();

    public string ReviewComment
    {
        get => _comment;
        set => _comment = value ?? throw new ArgumentNullException(nameof(value), "Cannot set to null");
    }
    string _comment;

    public T Find<T>(IEnumerable<T> sequence, Func<T, bool> predicate)
    {
        foreach (T item in sequence)
        {
            if (predicate(item)) return item;
        }
        return default;
    }

    public static void ThrowWhenNull(object value, string valueExpression = "")
    {
        if (value is null) throw new ArgumentNullException(nameof(value), valueExpression);
    }

    string GetTopLevelDomainFromFullUrl(string url)
    {
        return default;
    }

}

#nullable restore
public class NullableAttributes
{
    private Dictionary<string, string> _messageMap = new();

    bool TryGetMessage(string key, [NotNullWhen(true)] out string? message)
    {
        if (_messageMap.ContainsKey(key))
            message = _messageMap[key];
        else
            message = null;
        return message is not null;
    }

    [AllowNull]
    public string ScreenName
    {
        get => _screenName;
        set => _screenName = value ?? GenerateRandomScreenName();
    }
    private string _screenName = GenerateRandomScreenName();
    private static string GenerateRandomScreenName() => throw new NotImplementedException();

    [DisallowNull]
    public string? ReviewComment
    {
        get => _comment;
        set => _comment = value ?? throw new ArgumentNullException(nameof(value), "Cannot set to null");
    }
    string? _comment;

    [return: MaybeNull]
    public T Find<T>(IEnumerable<T> sequence, Func<T, bool> predicate)
    {
        foreach (T item in sequence)
        {
            if (predicate(item)) return item;
        }
        return default;
    }

    public static void ThrowWhenNull([NotNull] object? value, string valueExpression = "")
    {
        _ = value ?? throw new ArgumentNullException(nameof(value), valueExpression);
        // other logic elided
    }

    public static void LogMessage(string? message)
    {
        ThrowWhenNull(message, $"{nameof(message)} must not be null");

        Console.WriteLine(message.Length);
    }

    public static void ExampleNullCheck()
    {
        string? userInput = GetUserInput();
        if (!string.IsNullOrEmpty(userInput))
        {
            int messageLength = userInput.Length; // no null check needed.
        }
        // null check needed on userInput here.

    }

    private static string? GetUserInput() => throw new NotImplementedException();

    [DoesNotReturn]
    private void FailFast()
    {
        throw new InvalidOperationException();
    }

    public void SetState(object containedField)
    {
        if (containedField is null)
        {
            FailFast();
        }

        // containedField can't be null:
        _field = containedField;
    }

    object _field = new object();

    private void FailFastIf([DoesNotReturnIf(true)] bool isNull)
    {
        if (isNull)
        {
            throw new InvalidOperationException();
        }
    }

    public void SetFieldState(object? containedField)
    {
        FailFastIf(containedField == null);
        // No warning: containedField can't be null here:
        _field = containedField;
    }

    [return: NotNullIfNotNull(nameof(url))]
    string? GetTopLevelDomainFromFullUrl(string? url)
    {
        if (url is null)
        {
            return null;
        }
        else
        {
            return ".com";
        }
    }
}
```
After enabling null reference types, you want to ensure that the preceding code compiles without warnings. When the method returns, the `value` parameter is guaranteed to be not null. However, it's acceptable to call `ThrowWhenNull` with a null reference. You can make `value` a nullable reference type, and add the `NotNull` post-condition to the parameter declaration:

```csharp
﻿using System.Diagnostics.CodeAnalysis;

namespace attributes;

#nullable disable
public class NullableOblivious
{
    private Dictionary<string, string> _messageMap = new();
    bool TryGetMessage(string key, out string message)
    {
        if (_messageMap.ContainsKey(key))
            message = _messageMap[key];
        else
            message = null;
        return message != null;
    }

    public string ScreenName
    {
        get => _screenName;
        set => _screenName = value ?? GenerateRandomScreenName();
    }
    private string _screenName;
    private static string GenerateRandomScreenName() => throw new NotImplementedException();

    public string ReviewComment
    {
        get => _comment;
        set => _comment = value ?? throw new ArgumentNullException(nameof(value), "Cannot set to null");
    }
    string _comment;

    public T Find<T>(IEnumerable<T> sequence, Func<T, bool> predicate)
    {
        foreach (T item in sequence)
        {
            if (predicate(item)) return item;
        }
        return default;
    }

    public static void ThrowWhenNull(object value, string valueExpression = "")
    {
        if (value is null) throw new ArgumentNullException(nameof(value), valueExpression);
    }

    string GetTopLevelDomainFromFullUrl(string url)
    {
        return default;
    }

}

#nullable restore
public class NullableAttributes
{
    private Dictionary<string, string> _messageMap = new();

    bool TryGetMessage(string key, [NotNullWhen(true)] out string? message)
    {
        if (_messageMap.ContainsKey(key))
            message = _messageMap[key];
        else
            message = null;
        return message is not null;
    }

    [AllowNull]
    public string ScreenName
    {
        get => _screenName;
        set => _screenName = value ?? GenerateRandomScreenName();
    }
    private string _screenName = GenerateRandomScreenName();
    private static string GenerateRandomScreenName() => throw new NotImplementedException();

    [DisallowNull]
    public string? ReviewComment
    {
        get => _comment;
        set => _comment = value ?? throw new ArgumentNullException(nameof(value), "Cannot set to null");
    }
    string? _comment;

    [return: MaybeNull]
    public T Find<T>(IEnumerable<T> sequence, Func<T, bool> predicate)
    {
        foreach (T item in sequence)
        {
            if (predicate(item)) return item;
        }
        return default;
    }

    public static void ThrowWhenNull([NotNull] object? value, string valueExpression = "")
    {
        _ = value ?? throw new ArgumentNullException(nameof(value), valueExpression);
        // other logic elided
    }

    public static void LogMessage(string? message)
    {
        ThrowWhenNull(message, $"{nameof(message)} must not be null");

        Console.WriteLine(message.Length);
    }

    public static void ExampleNullCheck()
    {
        string? userInput = GetUserInput();
        if (!string.IsNullOrEmpty(userInput))
        {
            int messageLength = userInput.Length; // no null check needed.
        }
        // null check needed on userInput here.

    }

    private static string? GetUserInput() => throw new NotImplementedException();

    [DoesNotReturn]
    private void FailFast()
    {
        throw new InvalidOperationException();
    }

    public void SetState(object containedField)
    {
        if (containedField is null)
        {
            FailFast();
        }

        // containedField can't be null:
        _field = containedField;
    }

    object _field = new object();

    private void FailFastIf([DoesNotReturnIf(true)] bool isNull)
    {
        if (isNull)
        {
            throw new InvalidOperationException();
        }
    }

    public void SetFieldState(object? containedField)
    {
        FailFastIf(containedField == null);
        // No warning: containedField can't be null here:
        _field = containedField;
    }

    [return: NotNullIfNotNull(nameof(url))]
    string? GetTopLevelDomainFromFullUrl(string? url)
    {
        if (url is null)
        {
            return null;
        }
        else
        {
            return ".com";
        }
    }
}
```
The preceding code expresses the existing contract clearly: Callers can pass a variable with the `null` value, but the argument is guaranteed to never be null if the method returns without throwing an exception.

You specify unconditional postconditions by using the following attributes:

- MaybeNull: A non-nullable return value can be null.
- NotNull: A nullable return value is never null.
