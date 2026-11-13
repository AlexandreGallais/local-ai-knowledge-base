---
title: "Attributes interpreted by the compiler: Nullable static analysis (part 1 of 8)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/attributes/nullable-analysis.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Attributes for null-state static analysis interpreted by the C# compiler

In a nullable enabled context, the compiler performs static analysis of code to determine the *null-state* of all reference type variables:

- *not-null*: Static analysis determines that a variable has a non-null value.
- *maybe-null*: Static analysis can't determine that a variable is assigned to a non-null value.

These states enable the compiler to provide warnings when you might dereference a null value, throwing a `System.NullReferenceException`. These attributes provide the compiler with semantic information about the *null-state* of arguments, return values, and object members. The attributes clarify the state of arguments and return values. The compiler provides more accurate warnings when your APIs are properly annotated with this semantic information.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

This article provides a brief description of each of the nullable reference type attributes and how to use them.

Let's start with an example. Imagine your library has the following API that retrieves a resource string. This method was originally compiled in a *nullable oblivious* context:

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
The preceding example follows the familiar `Try*` pattern in .NET. There are two reference parameters for this API: the `key` and the `message`. This API has the following rules relating to the *null-state* of these parameters:

- Callers shouldn't pass `null` as the argument for `key`.
- Callers can pass a variable whose value is `null` as the argument for `message`.
- If the `TryGetMessage` method returns `true`, the value of `message` isn't null. If the return value is `false`, the value of `message` is null.

The rule for `key` can be expressed succinctly: `key` should be a non-nullable reference type. The `message` parameter is more complex. It allows a variable that is null as the argument, but guarantees, on success, that the `out` argument isn't null. For these scenarios, you need a richer vocabulary to describe the expectations. The `NotNullWhen` attribute describes the *null-state* for the argument used for the `message` parameter.

> **Note:**
> Adding these attributes gives the compiler more information about the rules for your API. When calling code is compiled in a nullable enabled context, the compiler warns callers when they violate those rules. These attributes don't enable more checks on your implementation.

| Attribute | Category | Meaning |
| - | - | - |
| AllowNull | Precondition | A non-nullable parameter, field, or property might be null. |
| DisallowNull | Precondition | A nullable parameter, field, or property should never be null. |
| MaybeNull | Postcondition | A non-nullable parameter, field, property, or return value might be null. |
| NotNull | Postcondition | A nullable parameter, field, property, or return value is never null. |
| MaybeNullWhen | Conditional postcondition | A non-nullable argument might be null when the method returns the specified `bool` value. |
| NotNullWhen | Conditional postcondition | A nullable argument isn't null when the method returns the specified `bool` value. |
| NotNullIfNotNull | Conditional postcondition | A return value, property, or argument isn't null if the argument for the specified parameter isn't null. |
| MemberNotNull | Method and property helper methods | The listed member isn't null when the method returns. |
| MemberNotNullWhen | Method and property helper methods | The listed member isn't null when the method returns the specified `bool` value. |
| DoesNotReturn | Unreachable code | A method or property never returns. In other words, it always throws an exception. |
| DoesNotReturnIf | Unreachable code | This method or property never returns if the associated `bool` parameter has the specified value. |

The preceding descriptions are a quick reference to what each attribute does. The following sections describe the behavior and meaning of these attributes more thoroughly.
