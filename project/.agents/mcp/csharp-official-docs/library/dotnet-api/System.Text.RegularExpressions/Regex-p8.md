---
title: "Regex class (part 8 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/Regex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Regex class (part 8 of 9)

## Regex.Replace(String, String, String, RegexOptions, TimeSpan) method

```csharp
public static string Replace (string input, string pattern, string replacement, System.Text.RegularExpressions.RegexOptions options, TimeSpan matchTimeout);
```

In a specified input string, replaces all strings that match a specified regular expression with a
specified replacement string. Additional parameters specify options that modify the matching operation
and a time-out interval if no match is found.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.
- `replacement`: The replacement string.
- `options`: A bitwise combination of the enumeration values that provide options for
matching.
- `matchTimeout`: A time-out interval, or `Regex.InfiniteMatchTimeout` to
indicate that the method should not time out.

Returns: A new string that is identical to the input string, except that the replacement string takes the place
of each matched string. If `pattern` is not matched in the current instance, the method
returns the current instance unchanged.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input`, `pattern`, or `replacement` is
`null`.
- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of `RegexOptions` values.
-or-
`matchTimeout` is negative, zero, or greater than approximately 24 days.
- `RegexMatchTimeoutException`: A time-out occurred.

The static `Regex.Replace` methods are equivalent
to constructing a `Regex` object with the specified regular expression pattern and calling
the instance method `Regex.Replace`.

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

The `matchTimeout` parameter specifies how long a pattern matching method should try
to find a match before it times out. Setting a time-out interval prevents regular expressions that rely
on excessive backtracking from appearing to stop responding when they process input that contains near
matches. `matchTimeout` overrides any default time-out value defined for the
application domain in which the method executes.

## Regex.Replace(String, String, MatchEvaluator, RegexOptions, TimeSpan) method

```csharp
public static string Replace (string input, string pattern, System.Text.RegularExpressions.MatchEvaluator evaluator, System.Text.RegularExpressions.RegexOptions options, TimeSpan matchTimeout);
```

In a specified input string, replaces all substrings that match a specified regular expression with a
string returned by a `MatchEvaluator` delegate. Additional parameters specify options that
modify the matching operation and a time-out interval if no match is found.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.
- `evaluator`: A custom method that examines each match and returns either the original
matched string or a replacement string.
- `options`: A bitwise combination of the enumeration values that provide options for
matching.
- `matchTimeout`: A time-out interval, or `Regex.InfiniteMatchTimeout` to
indicate that the method should not time out.

Returns: A new string that is identical to the input string, except that a replacement string takes the place
of each matched string. If `pattern` is not matched in the current instance, the
method returns the current instance unchanged.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input`, `pattern`, or `evaluator` is
`null`.
- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of `RegexOptions` values.
-or-
`matchTimeout` is negative, zero, or greater than approximately 24 days.
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

The `matchTimeout` parameter specifies how long a pattern matching method should try
to find a match before it times out. `matchTimeout` overrides any default time-out
value defined for the application domain in which the method executes.

## Regex.Split(String) method

```csharp
public string[] Split (string input);
```

Splits an input string into an array of substrings at the positions defined by a
regular expression pattern specified in the `Regex` constructor.

Parameters:

- `input`: The string to split.

Returns: An array of strings.

Exceptions:

- `ArgumentNullException`: `input` is `null`.
- `RegexMatchTimeoutException`: A time-out occurred.

The <see cref="M:System.Text.RegularExpressions.Regex.Split(System.String)">Regex.Split</see> methods are similar to the
`String.Split` method, except that <see cref="M:System.Text.RegularExpressions.Regex.Split(System.String)">Regex.Split</see> splits
the string at a delimiter determined by a regular expression instead of a set of
characters. The string is split as many times as possible. If no match is found, the
return value contains one element whose value is the original input string.

If the regular expression can match the empty string, `Regex.Split` will
split the string into an array of single-character strings because the empty string
delimiter can be found at every location.

If capturing parentheses are used in the expression, any captured text is included in
the resulting string array.

If two adjacent matches are found, an empty string is placed in the array.

## Regex.Split(String, Int32) method

```csharp
public string[] Split (string input, int count);
```

Splits an input string a specified maximum number of times into an array of substrings,
at the positions defined by a regular expression specified in the `Regex`
constructor.

Parameters:

- `input`: The string to split.
- `count`: The maximum number of times the split can occur.

Returns: An array of strings.

Exceptions:

- `ArgumentNullException`: `input` is `null`.
- `RegexMatchTimeoutException`: A time-out occurred.

The <see cref="M:System.Text.RegularExpressions.Regex.Split(System.String)">Regex.Split</see> methods are similar to
`String.Split`. The `count` parameter specifies
the maximum number of substrings into which the input string can be split; the last
string contains the unsplit remainder of the string. A `count` value of
zero provides the default behavior of splitting as many times as possible.

If capturing parentheses are used in the expression, any captured text is included in
the resulting string array but is not counted toward the `count` limit.

Empty strings that result from adjacent matches are counted when determining whether
the number of matches has reached `count`.

## Regex.Split(String, String) method

```csharp
public static string[] Split (string input, string pattern);
```

Splits an input string into an array of substrings at the positions defined by a regular
expression pattern.

Parameters:

- `input`: The string to split.
- `pattern`: The regular expression pattern to match.

Returns: An array of strings.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input` or `pattern` is `null`.
- `RegexMatchTimeoutException`: A time-out occurred.

The static `Regex.Split` methods are equivalent to constructing a
`Regex` object with the specified regular expression pattern and calling the
instance method `Regex.Split`.

The <see cref="M:System.Text.RegularExpressions.Regex.Split(System.String)">Regex.Split</see> methods are similar to the
`String.Split` method, except that <see cref="M:System.Text.RegularExpressions.Regex.Split(System.String)">Regex.Split</see> splits
the string at a delimiter determined by a regular expression instead of a set of
characters. If the regular expression pattern includes capturing parentheses, the
captured text is included in the resulting string array. If the pattern includes
capturing parentheses, any captured text is included in the resulting string array, but
is not counted when determining whether the count limit has been reached.

If two adjacent matches are found, an empty string is placed in the array.

## Regex.Split(String, Int32, Int32) method

```csharp
public string[] Split (string input, int count, int startat);
```

Splits an input string a specified maximum number of times into an array of substrings,
at the positions defined by a regular expression specified in the `Regex`
constructor. The search for the regular expression pattern starts at a specified
character position in the input string.

Parameters:

- `input`: The string to split.
- `count`: The maximum number of times the split can occur.
- `startat`: The character position in the input string where the search begins.

Returns: An array of strings.

Exceptions:

- `ArgumentNullException`: `input` is `null`.
- `ArgumentOutOfRangeException`: `startat` is less than zero or greater than the length of
`input`.
- `RegexMatchTimeoutException`: A time-out occurred.

For more details about `startat`, see the Remarks section of
`Regex.Match`.

If capturing parentheses are used in the expression, any captured text is included in
the resulting string array but is not counted toward the `count` limit.

Empty strings that result from adjacent matches are counted when determining whether
the number of matches has reached `count`.

## Regex.Split(String, String, RegexOptions) method

```csharp
public static string[] Split (string input, string pattern, System.Text.RegularExpressions.RegexOptions options);
```

Splits an input string into an array of substrings at the positions defined by a
specified regular expression pattern. Specified options modify the matching operation.

Parameters:

- `input`: The string to split.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that provide options for matching.

Returns: An array of strings.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input` or `pattern` is `null`.
- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of
`RegexOptions` values.
- `RegexMatchTimeoutException`: A time-out occurred.

The static `Regex.Split` methods are equivalent to
constructing a `Regex` object with the specified regular expression pattern
and calling the instance method `Regex.Split`.

The <see cref="M:System.Text.RegularExpressions.Regex.Split(System.String)">Regex.Split</see> methods are similar to the
`String.Split` method, except that <see cref="M:System.Text.RegularExpressions.Regex.Split(System.String)">Regex.Split</see> splits
the string at a delimiter determined by a regular expression instead of a set of
characters. If the regular expression pattern includes capturing parentheses, the
captured text is included in the resulting string array. If the pattern includes
capturing parentheses, any captured text is included in the resulting string array, but
is not counted when determining whether the count limit has been reached.

If two adjacent matches are found, an empty string is placed in the array.

If you specify `RegexOptions.RightToLeft` for the
`options` parameter, the search for matches begins at the end of the
input string and moves left.
