---
title: "Attributes interpreted by the compiler: Nullable static analysis (part 4 of 8)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/attributes/nullable-analysis.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Attributes interpreted by the compiler: Nullable static analysis (part 4 of 8)

## Postconditions: `MaybeNull` and `NotNull`

Suppose you have a method with the following signature:

```csharp
public Customer FindCustomer(string lastName, string firstName)
```

You likely wrote a method like this to return `null` when the name sought isn't found. The `null` value clearly indicates that the record wasn't found. In this example, you'd likely change the return type from `Customer` to `Customer?`. Declaring the return value as a nullable reference type specifies the intent of this API clearly:

```csharp
public Customer? FindCustomer(string lastName, string firstName)
```

For reasons covered under Generics nullability that technique might not produce the static analysis that matches your API. You might have a generic method that follows a similar pattern:

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
The method returns `null` when the sought item isn't found. You can clarify that the method returns `null` when an item isn't found by adding the `MaybeNull` annotation to the method return:

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
The preceding code informs callers that the return value *can* actually be null. It also informs the compiler that the method can return a `null` expression even though the type is non-nullable. When you have a generic method that returns an instance of its type parameter, `T`, you can express that it never returns `null` by using the `NotNull` attribute.

You can also specify that a return value or an argument isn't null even though the type is a nullable reference type. The following method is a helper method that throws if its first argument is `null`:

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
You could call this routine as follows:
