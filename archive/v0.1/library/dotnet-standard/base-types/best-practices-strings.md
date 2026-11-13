---
title: "Best Practices for Comparing Strings in .NET (part 1 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/best-practices-strings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Best practices for comparing strings in .NET

.NET provides extensive support for developing localized and globalized applications, and makes it easy to apply the conventions of either the current culture or a specific culture when performing common operations such as sorting and displaying strings. But sorting or comparing strings isn't always a culture-sensitive operation. For example, strings that are used internally by an application typically should be handled identically across all cultures. When culturally independent string data, such as XML tags, HTML tags, user names, file paths, and the names of system objects, are interpreted as if they were culture-sensitive, application code can be subject to subtle bugs, poor performance, and, in some cases, security issues.

This article examines the string sorting, comparison, and casing methods in .NET, presents recommendations for selecting an appropriate string-handling method, and provides additional information about string-handling methods.

## Recommendations for string usage

When you develop with .NET, follow these recommendations when you compare strings.

> **Tip:**
> Various string-related methods perform comparison. Examples include `System.String.Equals*`, `System.String.Compare*`, `System.String.IndexOf*`, and `System.String.StartsWith*`.

- Use overloads that explicitly specify the string comparison rules for string operations. Typically, this involves calling a method overload that has a parameter of type `System.StringComparison`.
- Use `System.StringComparison.Ordinal` or `System.StringComparison.OrdinalIgnoreCase` for comparisons as your safe default for culture-agnostic string matching.
- Use comparisons with `System.StringComparison.Ordinal` or `System.StringComparison.OrdinalIgnoreCase` for better performance.
- Use string operations that are based on `System.StringComparison.CurrentCulture` when you display output to the user.
- Use the non-linguistic `System.StringComparison.Ordinal` or `System.StringComparison.OrdinalIgnoreCase` values instead of string operations based on `System.Globalization.CultureInfo.InvariantCulture*` when the comparison is linguistically irrelevant (symbolic, for example).
- Use the `System.String.ToUpperInvariant*` method instead of the `System.String.ToLowerInvariant*` method when you normalize strings for comparison.
- Use an overload of the `System.String.Equals*` method to test whether two strings are equal.
- Use the `System.String.Compare*` and `System.String.CompareTo*` methods to sort strings, not to check for equality.
- Use culture-sensitive formatting to display non-string data, such as numbers and dates, in a user interface. Use formatting with the invariant culture to persist non-string data in string form.

Avoid the following practices when you compare strings:

- Don't use overloads that don't explicitly or implicitly specify the string comparison rules for string operations.
- Don't use string operations based on `System.StringComparison.InvariantCulture` in most cases. One of the few exceptions is when you're persisting linguistically meaningful but culturally agnostic data.
- Don't use an overload of the `System.String.Compare*` or `System.String.CompareTo*` method and test for a return value of zero to determine whether two strings are equal.

> **Tip:**
> The CA1307, CA1309, and CA1310 code analysis rules help identify call sites where a linguistic comparer is used unintentionally. To enable them and surface violations as build errors, set the following properties in your project file:
>
> ```xml
> <PropertyGroup>
>   <AnalysisMode>All</AnalysisMode>
>   <WarningsAsErrors>$(WarningsAsErrors);CA1307;CA1309;CA1310</WarningsAsErrors>
> </PropertyGroup>
> ```

## Specify string comparisons explicitly

Most of the string manipulation methods in .NET are overloaded. Typically, one or more overloads accept default settings, whereas others accept no defaults and instead define the precise way in which strings are to be compared or manipulated. Most of the methods that don't rely on defaults include a parameter of type `System.StringComparison`, which is an enumeration that explicitly specifies rules for string comparison by culture and case. The following table describes the `System.StringComparison` enumeration members.

| `StringComparison` member                               | Description                                                       |
|---------------------------------------------------------|-------------------------------------------------------------------|
| `System.StringComparison.CurrentCulture`           | Performs a case-sensitive comparison using the current culture.   |
| `System.StringComparison.CurrentCultureIgnoreCase` | Performs a case-insensitive comparison using the current culture. |
| `System.StringComparison.InvariantCulture`         | Performs a case-sensitive comparison using the invariant culture. |
| `System.StringComparison.InvariantCultureIgnoreCase` | Performs a case-insensitive comparison using the invariant culture. |
| `System.StringComparison.Ordinal` | Performs an ordinal comparison. |
| `System.StringComparison.OrdinalIgnoreCase` | Performs a case-insensitive ordinal comparison. |

For example, the `System.String.IndexOf*` method, which returns the index of a substring in a `System.String` object that matches either a character or a string, has nine overloads:

- `System.String.IndexOf(System.Char)`, `System.String.IndexOf(System.Char,System.Int32)`, and `System.String.IndexOf(System.Char,System.Int32,System.Int32)`, which by default performs an ordinal (case-sensitive and culture-insensitive) search for a character in the string.
- `System.String.IndexOf(System.String)`, `System.String.IndexOf(System.String,System.Int32)`, and `System.String.IndexOf(System.String,System.Int32,System.Int32)`, which by default performs a case-sensitive and culture-sensitive search for a substring in the string.
- `System.String.IndexOf(System.String,System.StringComparison)`, `System.String.IndexOf(System.String,System.Int32,System.StringComparison)`, and `System.String.IndexOf(System.String,System.Int32,System.Int32,System.StringComparison)`, which include a parameter of type `System.StringComparison` that allows the form of the comparison to be specified.

We recommend that you select an overload that doesn't use default values, for the following reasons:

- Some overloads with default parameters (those that search for a `System.Char` in the string instance) perform an ordinal comparison, whereas others (those that search for a string in the string instance) are culture-sensitive. It's difficult to remember which method uses which default value, and easy to confuse the overloads.
- The intent of the code that relies on default values for method calls isn't clear. In the following example, which relies on defaults, it's difficult to know whether the developer actually intended an ordinal or a linguistic comparison of two strings, or whether a case difference between `url.Scheme` and "https" might cause the test for equality to return `false`.

```csharp
Uri url = new("https://learn.microsoft.com/");

// Incorrect
if (string.Equals(url.Scheme, "https"))
{
    // ...Code to handle HTTPS protocol.
}
```
```vb
Dim url As New Uri("https://learn.microsoft.com/")

' Incorrect
If String.Equals(url.Scheme, "https") Then
    ' ...Code to handle HTTPS protocol.
End If
```
In general, we recommend that you call a method that doesn't rely on defaults, because it makes the intent of the code unambiguous. This, in turn, makes the code more readable and easier to debug and maintain. The following example addresses the questions raised about the previous example. It makes it clear that ordinal comparison is used and that differences in case are ignored.

```csharp
Uri url = new("https://learn.microsoft.com/");

// Correct
if (string.Equals(url.Scheme, "https", StringComparison.OrdinalIgnoreCase))
{
    // ...Code to handle HTTPS protocol.
}
```
```vb
Dim url As New Uri("https://learn.microsoft.com/")

' Incorrect
If String.Equals(url.Scheme, "https", StringComparison.OrdinalIgnoreCase) Then
    ' ...Code to handle HTTPS protocol.
End If
```
