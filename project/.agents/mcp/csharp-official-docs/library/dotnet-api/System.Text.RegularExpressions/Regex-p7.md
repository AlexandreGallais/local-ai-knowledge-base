---
title: "Regex class (part 7 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/Regex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Regex class (part 7 of 9)

## Regex.Replace(String, String, Int32) method

```csharp
public string Replace (string input, string replacement, int count);
```

In a specified input string, replaces a specified maximum number of strings that match a regular
expression pattern with a specified replacement string.

Parameters:

- `input`: The string to search for a match.
- `replacement`: The replacement string.
- `count`: The maximum number of times the replacement can occur.

Returns: A new string that is identical to the input string, except that the replacement string takes the place
of each matched string. If the regular expression pattern is not matched in the current instance, the
method returns the current instance unchanged.

Exceptions:

- `ArgumentNullException`: `input` or `replacement` is `null`.
- `RegexMatchTimeoutException`: A time-out occurred.

The search begins at the start of the `input` string. The `replacement`
parameter specifies the string that replaces each match and supports
substitutions.

If `count` is negative, replacements continue to the end of the string.

Because the method returns `input` unchanged if there is no match, you can use the
`Object.ReferenceEquals` method to determine whether the method has made
any replacements.

## Regex.Replace(String, String, String) method

```csharp
public static string Replace (string input, string pattern, string replacement);
```

In a specified input string, replaces all strings that match a specified regular expression pattern
with a specified replacement string.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.
- `replacement`: The replacement string.

Returns: A new string that is identical to the input string, except that the replacement string takes the place
of each matched string. If `pattern` is not matched in the current instance, the method
returns the current instance unchanged.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input`, `pattern`, or `replacement` is
`null`.
- `RegexMatchTimeoutException`: A time-out occurred.

The static `Regex.Replace` methods are equivalent to constructing a
`Regex` object with the specified regular expression pattern and calling the instance method
`Regex.Replace`.

The `replacement` parameter specifies the string that replaces each match in
`input`. `replacement` can consist of any combination of literal text
and substitutions.
Substitutions are the only regular expression language elements that are recognized in a replacement
pattern.

Because the method returns `input` unchanged if there is no match, you can use the
`Object.ReferenceEquals` method to determine whether the method has made
any replacements.

## Regex.Replace(String, String, MatchEvaluator) method

```csharp
public static string Replace (string input, string pattern, System.Text.RegularExpressions.MatchEvaluator evaluator);
```

In a specified input string, replaces all strings that match a specified regular expression with a
string returned by a `MatchEvaluator` delegate.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.
- `evaluator`: A custom method that examines each match and returns either the original
matched string or a replacement string.

Returns: A new string that is identical to the input string, except that a replacement string takes the place
of each matched string. If `pattern` is not matched in the current instance, the
method returns the current instance unchanged.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input`, `pattern`, or `evaluator` is
`null`.
- `RegexMatchTimeoutException`: A time-out occurred.

This method is useful for replacing a regular expression match if any of the following conditions is
true: the replacement string cannot readily be specified by a regular expression replacement pattern,
the replacement string results from processing the matched string, or the replacement string results
from conditional processing.

The method is equivalent to calling the `Regex.Matches` method and passing
each `Match` object in the returned `MatchCollection` to the
`evaluator` delegate.

Because the method returns `input` unchanged if there is no match, you can use the
`Object.ReferenceEquals` method to determine whether the method has made
any replacements.

## Regex.Replace(String, MatchEvaluator, Int32) method

```csharp
public string Replace (string input, System.Text.RegularExpressions.MatchEvaluator evaluator, int count);
```

In a specified input string, replaces a specified maximum number of strings that match a regular
expression pattern with a string returned by a `MatchEvaluator` delegate.

Parameters:

- `input`: The string to search for a match.
- `evaluator`: A custom method that examines each match and returns either the original
matched string or a replacement string.
- `count`: The maximum number of times the replacement will occur.

Returns: A new string that is identical to the input string, except that a replacement string takes the place
of each matched string. If the regular expression pattern is not matched in the current instance, the
method returns the current instance unchanged.

Exceptions:

- `ArgumentNullException`: `input` or `evaluator` is `null`.
- `RegexMatchTimeoutException`: A time-out occurred.

This method is useful for replacing a regular expression match if any of the following conditions is
true: the replacement string cannot readily be specified by a regular expression replacement pattern,
the replacement string results from processing the matched string, or the replacement string results
from conditional processing.

The method is equivalent to calling the `Regex.Matches` method and passing the
first `count``Match` objects in the returned
`MatchCollection` to the `evaluator` delegate.

If `count` is negative, replacements continue to the end of the string.

Because the method returns `input` unchanged if there is no match, you can use the
`Object.ReferenceEquals` method to determine whether the method has made
any replacements.

## Regex.Replace(String, String, Int32, Int32) method

```csharp
public string Replace (string input, string replacement, int count, int startat);
```

In a specified input substring, replaces a specified maximum number of strings that match a regular
expression pattern with a specified replacement string.

Parameters:

- `input`: The string to search for a match.
- `replacement`: The replacement string.
- `count`: The maximum number of times the replacement can occur.
- `startat`: The character position in the input string where the search begins.

Returns: A new string that is identical to the input string, except that the replacement string takes the place
of each matched string. If the regular expression pattern is not matched in the current instance, the
method returns the current instance unchanged.

Exceptions:

- `ArgumentNullException`: `input` or `replacement` is `null`.
- `ArgumentOutOfRangeException`: `startat` is less than zero or greater than the length of `input`.
- `RegexMatchTimeoutException`: A time-out occurred.

For more details about `startat`, see the Remarks section of
`Regex.Match`.

The `replacement` parameter specifies the string that replaces each match and supports
substitutions.

If `count` is negative, replacements continue to the end of the string.

## Regex.Replace(String, String, String, RegexOptions) method

```csharp
public static string Replace (string input, string pattern, string replacement, System.Text.RegularExpressions.RegexOptions options);
```

In a specified input string, replaces all strings that match a specified regular expression with a
specified replacement string. Specified options modify the matching operation.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.
- `replacement`: The replacement string.
- `options`: A bitwise combination of the enumeration values that provide options for
matching.

Returns: A new string that is identical to the input string, except that the replacement string takes the place
of each matched string. If `pattern` is not matched in the current instance, the method
returns the current instance unchanged.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input`, `pattern`, or `replacement` is
`null`.
- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of `RegexOptions` values.
- `RegexMatchTimeoutException`: A time-out occurred.

The static `Regex.Replace` methods are equivalent to
constructing a `Regex` object with the specified regular expression pattern and calling the
instance method `Regex.Replace`.

The `replacement` parameter specifies the string that replaces each match in
`input`. `replacement` can consist of any combination of literal text
and substitutions.
Substitutions are the only regular expression language elements that are recognized in a replacement
pattern.

Because the method returns `input` unchanged if there is no match, you can use the
`Object.ReferenceEquals` method to determine whether the method has made
any replacements.

If you specify `RegexOptions.RightToLeft` for the `options` parameter,
the search for matches begins at the end of the input string and moves left; otherwise, the search
begins at the start of the input string and moves right.

## Regex.Replace(String, String, MatchEvaluator, RegexOptions) method

```csharp
public static string Replace (string input, string pattern, System.Text.RegularExpressions.MatchEvaluator evaluator, System.Text.RegularExpressions.RegexOptions options);
```

In a specified input string, replaces all strings that match a specified regular expression with a
string returned by a `MatchEvaluator` delegate. Specified options modify the matching
operation.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.
- `evaluator`: A custom method that examines each match and returns either the original
matched string or a replacement string.
- `options`: A bitwise combination of the enumeration values that provide options for
matching.

Returns: A new string that is identical to the input string, except that a replacement string takes the place
of each matched string. If `pattern` is not matched in the current instance, the
method returns the current instance unchanged.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input`, `pattern`, or `evaluator` is
`null`.
- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of `RegexOptions` values.
- `RegexMatchTimeoutException`: A time-out occurred.

This method is useful for replacing a regular expression match if any of the following conditions is
true: the replacement string cannot readily be specified by a regular expression replacement pattern,
the replacement string results from processing the matched string, or the replacement string results
from conditional processing.

The method is equivalent to calling the `Regex.Matches` method and passing
each `Match` object in the returned `MatchCollection` to the
`evaluator` delegate.

Because the method returns `input` unchanged if there is no match, you can use the
`Object.ReferenceEquals` method to determine whether the method has made
any replacements.

If you specify `RegexOptions.RightToLeft` for the `options` parameter,
the search for matches begins at the end of the input string and moves left; otherwise, the search
begins at the start of the input string and moves right.

## Regex.Replace(String, MatchEvaluator, Int32, Int32) method

```csharp
public string Replace (string input, System.Text.RegularExpressions.MatchEvaluator evaluator, int count, int startat);
```

In a specified input substring, replaces a specified maximum number of strings that match a regular
expression pattern with a string returned by a `MatchEvaluator` delegate.

Parameters:

- `input`: The string to search for a match.
- `evaluator`: A custom method that examines each match and returns either the original
matched string or a replacement string.
- `count`: The maximum number of times the replacement will occur.
- `startat`: The character position in the input string where the search begins.

Returns: A new string that is identical to the input string, except that a replacement string takes the place
of each matched string. If the regular expression pattern is not matched in the current instance, the
method returns the current instance unchanged.

Exceptions:

- `ArgumentNullException`: `input` or `evaluator` is `null`.
- `ArgumentOutOfRangeException`: `startat` is less than zero or greater than the length of `input`.
- `RegexMatchTimeoutException`: A time-out occurred.

For more details about `startat`, see the Remarks section of
`Regex.Match`.

The method passes the first `count``Match` objects to the
`evaluator` delegate.
