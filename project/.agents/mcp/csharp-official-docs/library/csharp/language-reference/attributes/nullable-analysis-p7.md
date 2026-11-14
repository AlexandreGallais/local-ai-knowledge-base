---
title: "Attributes interpreted by the compiler: Nullable static analysis (part 7 of 8)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/attributes/nullable-analysis.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Attributes interpreted by the compiler: Nullable static analysis (part 7 of 8)

There's one final attribute you might also need. Sometimes the null state of a return value depends on the null state of one or more arguments. These methods return a non-null value whenever certain arguments aren't `null`. To correctly annotate these methods, use the `NotNullIfNotNull` attribute. Consider the following method:

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
If the `url` argument isn't null, the output isn't `null`. Once nullable references are enabled, you need to add more annotations if your API can accept a null argument. You could annotate the return type as shown in the following code:

```csharp
string? GetTopLevelDomainFromFullUrl(string? url)
```

That annotation also works, but often forces callers to implement extra `null` checks. The contract is that the return value is `null` only when the argument `url` is `null`. To express that contract, annotate this method as shown in the following code:

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
The previous example uses the `nameof` operator for the parameter `url`. The return value and the argument are both annotated with the `?` indicating that either could be `null`. The attribute further clarifies that the return value isn't null when the `url` argument isn't `null`.

You specify conditional postconditions using these attributes:

- MaybeNullWhen: A non-nullable argument can be null when the method returns the specified `bool` value.
- NotNullWhen: A nullable argument isn't null when the method returns the specified `bool` value.
- NotNullIfNotNull: A return value isn't null if the argument for the specified parameter isn't null.

## Helper methods: `MemberNotNull` and `MemberNotNullWhen`

Use these attributes to specify your intent when you refactor common code from constructors into helper methods. The C# compiler analyzes constructors and field initializers to make sure that all non-nullable reference fields are initialized before each constructor returns. However, the C# compiler doesn't track field assignments through all helper methods. The compiler issues warning `CS8618` when fields aren't initialized directly in the constructor, but rather in a helper method. Add the `System.Diagnostics.CodeAnalysis.MemberNotNullAttribute` to a method declaration and specify the fields that are initialized to a non-null value in the method. For example, consider the following example:

```csharp
﻿using System.Diagnostics.CodeAnalysis;

namespace attributes;

class InitializeMembers
{
}

public class Container
{
    private string _uniqueIdentifier; // must be initialized.
    private string? _optionalMessage;

    public Container()
    {
        Helper();
    }

    public Container(string message)
    {
        Helper();
        _optionalMessage = message;
    }

    [MemberNotNull(nameof(_uniqueIdentifier))]
    private void Helper()
    {
        _uniqueIdentifier = DateTime.Now.Ticks.ToString();
    }
}
```
You can specify multiple field names as arguments to the `MemberNotNull` attribute constructor.

The `System.Diagnostics.CodeAnalysis.MemberNotNullWhenAttribute` has a `bool` argument. Use `MemberNotNullWhen` in situations where your helper method returns a `bool` indicating whether your helper method initialized fields.
