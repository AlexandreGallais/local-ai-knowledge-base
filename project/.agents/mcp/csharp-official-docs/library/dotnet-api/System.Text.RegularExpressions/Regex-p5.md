---
title: "Regex class (part 5 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/Regex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Regex class (part 5 of 9)

## Regex.IsMatch(String, String, RegexOptions, TimeSpan) method

```csharp
public static bool IsMatch (string input, string pattern, System.Text.RegularExpressions.RegexOptions options, TimeSpan matchTimeout);
```

Indicates whether the specified regular expression finds a match in the specified input string,
using the specified matching options and time-out interval.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that provide options for matching.
- `matchTimeout`: A time-out interval, or `Regex.InfiniteMatchTimeout` to indicate
that the method should not time out.

Returns: `true` if the regular expression finds a match; otherwise, `false`.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input` or `pattern` is `null`.
- `ArgumentOutOfRangeException`: `options` is not a valid `RegexOptions` value.
-or-
`matchTimeout` is negative, zero, or greater than approximately 24 days.
- `RegexMatchTimeoutException`: A time-out occurred.

The `Regex.IsMatch` method is typically used to validate
a string or to ensure that a string conforms to a particular pattern without retrieving that string
for subsequent manipulation. To retrieve matched strings, call the
`Regex.Match` or
`Regex.Matches` method instead.

The static `Regex.IsMatch` method is equivalent to
constructing a `Regex` object with the specified pattern and options and calling the
`Regex.IsMatch` instance method. The pattern is cached for rapid retrieval by the
regular expression engine.

The `matchTimeout` parameter specifies how long a pattern matching method should try
to find a match before it times out. Setting a time-out interval prevents regular expressions that
rely on excessive backtracking from appearing to stop responding when they process input that contains
near matches. If no match is found in that time interval, the method throws a
`RegexMatchTimeoutException` exception. `matchTimeout` overrides any
default time-out value defined for the application domain in which the method executes.

## Regex.Match(String) method

```csharp
public System.Text.RegularExpressions.Match Match (string input);
```

Searches the specified input string for the first occurrence of the regular expression specified in
the `Regex` constructor.

Parameters:

- `input`: The string to search for a match.

Returns: An object that contains information about the match.

Exceptions:

- `ArgumentNullException`: `input` is `null`.
- `RegexMatchTimeoutException`: A time-out occurred.

The `Regex.Match` method returns the first substring that matches a regular expression
pattern in an input string.

You can determine whether the regular expression pattern has been found in the input string by
checking the returned `Match` object's `Group.Success` property. If a match
is found, the returned `Match` object's `Capture.Value` property contains the
matched substring. If no match is found, its value is `String.Empty`.

This method returns the first match. You can retrieve subsequent matches by repeatedly calling the
returned `Match` object's `Match.NextMatch` method. You can also retrieve all
matches in a single method call by calling `Regex.Matches`.

The `RegexMatchTimeoutException` exception is thrown if the execution time of the matching
operation exceeds the time-out interval specified by the
`Regex.#ctor` constructor. If you do not set a time-out interval
when you call the constructor, the exception is thrown if the operation exceeds any time-out value
established for the application domain in which the `Regex` object is created. If no
time-out is defined in the `Regex` constructor call or in the application domain's
properties, or if the time-out value is `Regex.InfiniteMatchTimeout`, no exception
is thrown.

## Regex.Match(String, Int32) method

```csharp
public System.Text.RegularExpressions.Match Match (string input, int startat);
```

Searches the input string for the first occurrence of a regular expression, beginning at the
specified starting position in the string.

Parameters:

- `input`: The string to search for a match.
- `startat`: The zero-based character position at which to start the search.

Returns: An object that contains information about the match.

Exceptions:

- `ArgumentNullException`: `input` is `null`.
- `ArgumentOutOfRangeException`: `startat` is less than zero or greater than the length of `input`.
- `RegexMatchTimeoutException`: A time-out occurred.

The `Match` method returns the first substring that matches a regular expression pattern,
starting at or after the `startat` character position, in an input string. The regular expression pattern for which the
`Match` method searches is defined by the call to one of the `Regex`
class constructors. For information about the language elements used to build a regular expression pattern,
see Regular Expression Language - Quick Reference.

## The `startat` parameter

Use the `startat` parameter to specify the character position at which the search starts. In a left-to-right search, any matches that begin before `startat` in the string are ignored.
To start at the default position, use the `Match` overload (or pass 0 for a left-to-right search and `input.Length` for a right-to-left search).
Despite starting the search at `startat`, the index of any returned match is relative to the start of the string.

Although the regular expression engine doesn't return any match starting before `startat`, it doesn't ignore the string before `startat`. This means that assertions
such as anchors or lookbehind assertions
still apply to the input as a whole. For example, the following code includes a pattern with a lookbehind assertion that's satisfied even though it occurs
before the `startat` index of 5 in the input string.

_Code sample not included: ~/snippets/csharp/System.Text.RegularExpressions/Regex/Match/Regex.Examples.cs._
> **Tip:**
> - If a pattern starts with the `^` anchor, `startat` is greater than 0, and the regular expression isn't using `Multiline`, no matches will ever be found since they are constrained by `^` to start at index 0.
> - The `\G` anchor is satisfied at `startat`. Because of this, if you want to restrict
>   a match so that it begins exactly at a particular character position in the string, anchor the regular expression with a `\G` on the left for a left-to-right pattern.
>   This restricts the match so it must start exactly at `startat` (or, when multiple matches are desired, so the matches are contiguous).

## Right-to-left searches

A right-to-left search, that is, when the regular expression pattern is constructed with the
`RightToLeft` option, behaves in the following ways:

- The scan moves in the opposite direction and the pattern is matched from back (right) to front (left).
- The default starting position is the right end of the input string.
- If `startat` is specified, the right-to-left scan begins at the character at `startat` - 1 (not `startat`).
- When the `\G` anchor is specified at the right end of a pattern, it restricts the (first) match to end exactly at `startat` - 1.

For more information about right-to-left searches, see Right-to-left mode.

## Determine whether a match is found

You can determine whether the regular expression pattern has been found in the input string by checking the value of the returned `Match`
object's `Success` property. If a match is found, the returned `Match` object's
`Value` property contains the substring from `input` that matches the regular expression pattern.
If no match is found, its value is `Empty`.

## First or multiple matches

This method returns the first substring found by scanning `input` starting at the `startat` position (or, for right-to-left searches, at `startat` - 1) that matches the regular expression pattern.
You can retrieve subsequent matches by repeatedly calling the returned `Match` object's
`Match.NextMatch` method. You can also retrieve all matches in a single method call by calling the
`Matches` method.

## Time-out exceptions

The `RegexMatchTimeoutException` exception is thrown if the execution time of the matching operation exceeds the time-out
interval specified by the `%23ctor`
constructor. If you do not set a time-out interval when you call the constructor, the exception is thrown if the operation exceeds any time-out value established
for the application domain in which the `Regex` object is created. If no time-out is defined in the `Regex`
constructor call or in the application domain's properties, or if the time-out value is `InfiniteMatchTimeout`,
no exception is thrown.

## Regex.Match(String, String) method

```csharp
public static System.Text.RegularExpressions.Match Match (string input, string pattern);
```

Searches the specified input string for the first occurrence of the specified regular expression.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.

Returns: An object that contains information about the match.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input` or `pattern` is `null`.
- `RegexMatchTimeoutException`: A time-out occurred.

The static `Regex.Match` method is equivalent to constructing a
`Regex` object with the specified pattern and calling the instance
`Regex.Match` method. The regular expression engine caches the pattern.

You can determine whether the regular expression pattern has been found in the input string by
checking the returned `Match` object's `Group.Success` property. If a match
is found, the returned `Match` object's `Capture.Value` property contains the
matched substring. If no match is found, its value is `String.Empty`.

You can retrieve subsequent matches by repeatedly calling the returned `Match` object's
`Match.NextMatch` method. You can also retrieve all matches in a single method call by
calling the `Regex.Matches` method.

## Regex.Match(String, Int32, Int32) method

```csharp
public System.Text.RegularExpressions.Match Match (string input, int beginning, int length);
```

Searches the input string for the first occurrence of a regular expression, beginning at the
specified starting position and searching only the specified number of characters.

Parameters:

- `input`: The string to search for a match.
- `beginning`: The zero-based character position in the input string that defines the
leftmost position to be searched.
- `length`: The number of characters in the substring to include in the search.

Returns: An object that contains information about the match.

Exceptions:

- `ArgumentNullException`: `input` is `null`.
- `ArgumentOutOfRangeException`: `beginning` is less than zero or greater than the length of
`input`.
-or-
`length` is less than zero or greater than the length of `input`.
-or-
`beginning` + `length` - 1 identifies a position that is outside
the range of `input`.
- `RegexMatchTimeoutException`: A time-out occurred.

The `Regex.Match` method searches the portion of `input`
defined by the `beginning` and `length` parameters for the regular
expression pattern. `beginning` always defines the index of the leftmost character
to include in the search, and `length` defines the maximum number of characters to
search. Together, they define the range of the search. The behavior is exactly as if the input was
effectively `input.Substring(beginning, length)`, except that the index of any match is counted
relative to the start of `input`. This means that any anchors or zero-width
assertions at the start or end of the pattern behave as if there is no input outside of this range.

If the search proceeds from left to right (the default), the regular expression engine searches from
the character at index `beginning` to the character at index
`beginning` + `length` - 1. If the regular expression engine was
instantiated by using the `RegexOptions.RightToLeft` option, the engine searches from the
character at index `beginning` + `length` - 1 to the character at
index `beginning`.

This method returns the first match found within this range. You can retrieve subsequent matches by
repeatedly calling the returned `Match` object's `Match.NextMatch` method.

## Regex.Match(String, String, RegexOptions) method

```csharp
public static System.Text.RegularExpressions.Match Match (string input, string pattern, System.Text.RegularExpressions.RegexOptions options);
```

Searches the input string for the first occurrence of the specified regular expression, using the
specified matching options.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that provide options for matching.

Returns: An object that contains information about the match.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input` or `pattern` is `null`.
- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of `RegexOptions` values.
- `RegexMatchTimeoutException`: A time-out occurred.

The static `Regex.Match` method is equivalent to constructing a
`Regex` object with the `Regex.#ctor` constructor and calling
the instance `Regex.Match` method.

You can determine whether the regular expression pattern has been found in the input string by
checking the returned `Match` object's `Group.Success` property. You can
retrieve subsequent matches by repeatedly calling the returned `Match` object's
`Match.NextMatch` method. You can also retrieve all matches in a single method call by
calling the `Regex.Matches` method.
