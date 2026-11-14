---
title: "Attributes interpreted by the compiler: Nullable static analysis (part 8 of 8)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/attributes/nullable-analysis.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Attributes interpreted by the compiler: Nullable static analysis (part 8 of 8)

## Stop nullable analysis when called method throws

Some methods, typically exception helpers, or other utility methods, always exit by throwing an exception. Or, a helper throws an exception based on the value of a Boolean argument.

In the first case, add the `System.Diagnostics.CodeAnalysis.DoesNotReturnAttribute` attribute to the method declaration. The compiler's *null-state* analysis doesn't check any code in a method that follows a call to a method annotated with `DoesNotReturn`. Consider this method:

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
The compiler doesn't issue any warnings after the call to `FailFast`.

In the second case, add the `System.Diagnostics.CodeAnalysis.DoesNotReturnIfAttribute` attribute to a Boolean parameter of the method. You can modify the previous example as follows:

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
When the value of the argument matches the value of the `DoesNotReturnIf` constructor, the compiler doesn't perform any *null-state* analysis after that method.

## Summary

Adding nullable reference types provides an initial vocabulary to describe your API's expectations for variables that could be `null`. The attributes provide a richer vocabulary to describe the null state of variables as preconditions and postconditions. By using these attributes, you more clearly describe your expectations and provide a better experience for the developers using your APIs.

As you update libraries for a nullable context, add these attributes to guide users of your APIs to the correct usage. These attributes help you fully describe the null-state of arguments and return values.

- AllowNull: A non-nullable field, parameter, or property might be null.
- DisallowNull: A nullable field, parameter, or property should never be null.
- MaybeNull: A non-nullable field, parameter, property, or return value might be null.
- NotNull: A nullable field, parameter, property, or return value is never null.
- MaybeNullWhen: A non-nullable argument might be null when the method returns the specified `bool` value.
- NotNullWhen: A nullable argument isn't null when the method returns the specified `bool` value.
- NotNullIfNotNull: A parameter, property, or return value isn't null if the argument for the specified parameter isn't null.
- DoesNotReturn: A method or property never returns. In other words, it always throws an exception.
- DoesNotReturnIf: This method or property never returns if the associated `bool` parameter has the specified value.
