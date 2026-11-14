---
title: "GeneratedRegexAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/GeneratedRegexAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GeneratedRegexAttribute class

Namespace: `System.Text.RegularExpressions`

```csharp
public sealed class GeneratedRegexAttribute : Attribute
```

Instructs the System.Text.RegularExpressions source generator to generate an implementation of the specified regular expression.

The generator associated with this attribute only supports C#. It only supplies an implementation when applied to
partial, parameterless, non-generic methods or get-only properties that are typed to return `Regex`.

When the `Regex` supports case-insensitive matches (either by passing
`RegexOptions.IgnoreCase` or using the inline `(?i)` switch in the pattern) the regex engines will
use an internal casing table to transform the passed in pattern into an equivalent case-sensitive one. For example,
given the pattern `abc`, the engines will transform it to the equivalent pattern `Aa[Cc]`. The
equivalences found in this internal casing table can change over time, for example in the case new characters are
added to a new version of Unicode. When using the source generator, this transformation happens at compile time,
which means the casing table used to find the equivalences will depend on the target framework at compile time.
This differs from the rest of the `Regex` engines, which perform this transformation at run time,
meaning they will always use casing table for the current runtime.

## GeneratedRegexAttribute.GeneratedRegexAttribute(String) constructor

```csharp
public GeneratedRegexAttribute (string pattern);
```

Initializes a new instance of `GeneratedRegexAttribute` with the specified pattern.

Parameters:

- `pattern`: The regular expression pattern to match.

To be added.

## GeneratedRegexAttribute.GeneratedRegexAttribute(String, RegexOptions) constructor

```csharp
public GeneratedRegexAttribute (string pattern, System.Text.RegularExpressions.RegexOptions options);
```

Initializes a new instance of `GeneratedRegexAttribute` with the specified pattern and options.

Parameters:

- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that modify the regular expression.

To be added.

## GeneratedRegexAttribute.GeneratedRegexAttribute(String, RegexOptions, Int32) constructor

```csharp
public GeneratedRegexAttribute (string pattern, System.Text.RegularExpressions.RegexOptions options, int matchTimeoutMilliseconds);
```

Initializes a new instance of `GeneratedRegexAttribute` with the specified pattern, options, and time-out value.

Parameters:

- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that modify the regular expression.
- `matchTimeoutMilliseconds`: A time-out interval (milliseconds), or `Timeout.Infinite`
to indicate that the method should not time out.

To be added.

## GeneratedRegexAttribute.GeneratedRegexAttribute(String, RegexOptions, String) constructor

```csharp
public GeneratedRegexAttribute (string pattern, System.Text.RegularExpressions.RegexOptions options, string cultureName);
```

Initializes a new instance of `GeneratedRegexAttribute` with the specified pattern and options.

Parameters:

- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that modify the regular expression.
- `cultureName`: The name of a culture to be used for case-insensitive comparisons.
`cultureName` is not case-sensitive.

For a list of predefined culture names on Windows systems, see the Language tag column in the
list of
language/region names supported by Windows. Culture names follow the standard defined by
BCP 47. In addition, starting with Windows 10,
`cultureName` can be any valid BCP-47 language tag.

If `cultureName` is `String.Empty`, the invariant culture will be used.

## GeneratedRegexAttribute.GeneratedRegexAttribute(String, RegexOptions, Int32, String) constructor

```csharp
public GeneratedRegexAttribute (string pattern, System.Text.RegularExpressions.RegexOptions options, int matchTimeoutMilliseconds, string cultureName);
```

Initializes a new instance of `GeneratedRegexAttribute` with the specified pattern, options,
time-out value, and culture.

Parameters:

- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that modify the regular expression.
- `matchTimeoutMilliseconds`: A time-out interval (milliseconds), or `Timeout.Infinite`
to indicate that the method should not time out.
- `cultureName`: The name of a culture to be used for case-insensitive comparisons.
`cultureName` is not case-sensitive.

For a list of predefined culture names on Windows systems, see the Language tag column in the
list of
language/region names supported by Windows. Culture names follow the standard defined by
BCP 47. In addition, starting with Windows 10,
`cultureName` can be any valid BCP-47 language tag.

If `cultureName` is `String.Empty`, the invariant culture will be used.

## GeneratedRegexAttribute.CultureName property

```csharp
public string CultureName { get; }
```

Gets the name of the culture to be used for case-insensitive comparisons.

Returns: To be added.

To be added.

## GeneratedRegexAttribute.MatchTimeoutMilliseconds property

```csharp
public int MatchTimeoutMilliseconds { get; }
```

Gets a time-out interval (milliseconds), or `Timeout.Infinite` to indicate that the method should not time out.

Returns: To be added.

To be added.

## GeneratedRegexAttribute.Options property

```csharp
public System.Text.RegularExpressions.RegexOptions Options { get; }
```

Gets a bitwise combination of the enumeration values that modify the regular expression.

Returns: To be added.

To be added.

## GeneratedRegexAttribute.Pattern property

```csharp
public string Pattern { get; }
```

Gets the regular expression pattern to match.

Returns: To be added.

To be added.
