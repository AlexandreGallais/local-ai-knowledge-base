---
title: "Regex class (part 4 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/Regex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Regex class (part 4 of 9)

## Regex.EnumerateSplits(Char>, String, RegexOptions, TimeSpan) method

```csharp
public static System.Text.RegularExpressions.Regex.ValueSplitEnumerator EnumerateSplits (ReadOnlySpan<char> input, string pattern, System.Text.RegularExpressions.RegexOptions options, TimeSpan matchTimeout);
```

Searches an input span for all occurrences of a regular expression and returns a `ValueSplitEnumerator` to iterate over the splits around matches.

Parameters:

- `input`: The span to search for a match.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that specify options for matching.
- `matchTimeout`: A time-out interval, or `Regex.InfiniteMatchTimeout` to indicate that the method should not time out.

Returns: A `ValueSplitEnumerator` to iterate over the splits around matches.

Exceptions:

- `ArgumentNullException`: `pattern` is null.
- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of RegexOptions values, or `matchTimeout` is negative, zero, or greater than approximately 24 days.
- `RegexParseException`: A regular expression parsing error occurred.

The behavior of `Regex.EnumerateSplits` is similar to the behavior of `Regex.Split`, producing the splits
one at a time as part of iterating through the resulting enumerator rather than all at once as part of a single array. However, there are a few notable differences.
`Regex.Split` will include the contents of capture groups in the resulting splits, while `Regex.EnumerateSplits` will not.
And if `RegexOptions.RightToLeft` is specified, `Regex.Split` will reverse the order of the resulting splits to be left-to-right, whereas
`Regex.EnumerateSplits` will yield the splits in the order they're found right-to-left.

Each match won't actually happen until `ValueSplitEnumerator.MoveNext` is invoked on the enumerator, with one match being performed per `ValueSplitEnumerator.MoveNext` call.
Since the evaluation of the match happens lazily, any changes to the passed in input in between calls to `ValueSplitEnumerator.MoveNext` may affect the match results;
such changes should be avoided and are not supported.

## Regex.Escape(String) method

```csharp
public static string Escape (string str);
```

Escapes a minimal set of characters (\, *, +, ?, |, {, [, (, ), ^, $, ., #, and white space)
by replacing them with their escape codes. This instructs the regular expression engine to interpret
these characters literally rather than as metacharacters.

Parameters:

- `str`: The input string that contains the text to convert.

Returns: A string of characters with metacharacters converted to their escaped form.

Exceptions:

- `ArgumentNullException`: `str` is `null`.

`Regex.Escape` converts a string so that the regular expression engine will interpret any
metacharacters that it may contain as character literals. It is particularly important for strings
that are defined dynamically using characters not known at design time.

While this method escapes the straight opening bracket ([) and opening brace ({) characters,
it does not escape their corresponding closing characters (] and }). In most cases, escaping
these is not necessary.

## Regex.GetGroupNames() method

```csharp
public string[] GetGroupNames ();
```

Returns an array of capturing group names for the regular expression.

Returns: A string array of group names.

The collection of group names contains the set of strings used to name capturing groups in the
expression. Even if capturing groups are not explicitly named, they are automatically assigned
numerical names ("0", "1", "2", and so on). Group "0" always designates the entire match.

## Regex.GetGroupNumbers() method

```csharp
public int[] GetGroupNumbers ();
```

Returns an array of capturing group numbers that correspond to group names in an array.

Returns: An integer array of group numbers.

Groups can be referred to using both their assigned number and their name (if one was provided).
The returned array is ordered so that each number maps to the same group name returned by
`Regex.GetGroupNames` at the corresponding index.

## Regex.GroupNameFromNumber(Int32) method

```csharp
public string GroupNameFromNumber (int i);
```

Gets the group name that corresponds to the specified group number.

Parameters:

- `i`: The group number to convert to the corresponding group name.

Returns: A string that contains the group name associated with the specified group number. If there is no
group name that corresponds to the specified group number, the method returns `String.Empty`.

A regular expression pattern may contain either named or numbered capturing groups. Numbered groups
are delimited by the syntax `(subexpression)` and are assigned numbers based on their order in
the regular expression. Named groups are delimited by the syntax `(?<name>subexpression)`.
The `Regex.GroupNameFromNumber` method identifies both named groups and numbered groups by
their ordinal positions in the regular expression.

## Regex.GroupNumberFromName(String) method

```csharp
public int GroupNumberFromName (string name);
```

Returns the group number that corresponds to the specified group name.

Parameters:

- `name`: The group name to convert to the corresponding group number.

Returns: The group number that corresponds to the specified group name, or -1 if
`name` is not a valid group name.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

The `Regex.GroupNumberFromName` method identifies both named groups and numbered groups by
their ordinal positions in the regular expression. Ordinal position zero always represents the
entire regular expression. All numbered groups are then counted before named groups, regardless
of their actual position in the regular expression pattern.

## Regex.InitializeReferences() method

```csharp
protected void InitializeReferences ();
```

Used by a `Regex` object generated by the
`Regex.CompileToAssembly` method. This method is obsolete.

Exceptions:

- `NotSupportedException`: References have already been initialized.

To be added.

## Regex.IsMatch(Char>) method

```csharp
public bool IsMatch (ReadOnlySpan<char> input);
```

Indicates whether the regular expression specified in the `Regex` constructor finds a
match in a specified input span.

Parameters:

- `input`: The span to search for a match.

Returns: `true` if the regular expression finds a match; otherwise, `false`.

Exceptions:

- `RegexMatchTimeoutException`: A time-out occurred.

To be added.

## Regex.IsMatch(String) method

```csharp
public bool IsMatch (string input);
```

Indicates whether the regular expression specified in the `Regex` constructor finds a
match in a specified input string.

Parameters:

- `input`: The string to search for a match.

Returns: `true` if the regular expression finds a match; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `input` is `null`.
- `RegexMatchTimeoutException`: A time-out occurred.

The `Regex.IsMatch` method is typically used to validate a string or to ensure that a
string conforms to a particular pattern without retrieving that string for subsequent manipulation.
To determine whether one or more strings match a regular expression pattern and retrieve them for
subsequent manipulation, call the `Regex.Match` or `Regex.Matches` method.

The `RegexMatchTimeoutException` exception is thrown if the execution time of the matching
operation exceeds the time-out interval specified by the
`Regex.#ctor` constructor. If you do not set a time-out interval
when you call the constructor, the exception is thrown if the operation exceeds any time-out value
established for the application domain in which the `Regex` object is created. If no
time-out is defined in the `Regex` constructor call or in the application domain's
properties, or if the time-out value is `Regex.InfiniteMatchTimeout`, no exception
is thrown.

## Regex.IsMatch(Char>, Int32) method

```csharp
public bool IsMatch (ReadOnlySpan<char> input, int startat);
```

Indicates whether the regular expression specified in the `Regex` constructor finds a
match in a specified input span, starting at the specified position.

Parameters:

- `input`: The span to search for a match.
- `startat`: The zero-based character position at which to start the search.

Returns: `true` if the regular expression finds a match; otherwise, `false`.

Exceptions:

- `RegexMatchTimeoutException`: A time-out occurred.

To be added.

## Regex.IsMatch(Char>, String) method

```csharp
public static bool IsMatch (ReadOnlySpan<char> input, string pattern);
```

Indicates whether the specified regular expression finds a match in the specified input span.

Parameters:

- `input`: The span to search for a match.
- `pattern`: The regular expression pattern to match.

Returns: `true` if the regular expression finds a match; otherwise, `false`.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `pattern` is `null`.
- `RegexMatchTimeoutException`: A time-out occurred.

To be added.

## Regex.IsMatch(String, Int32) method

```csharp
public bool IsMatch (string input, int startat);
```

Indicates whether the regular expression specified in the `Regex` constructor finds a
match in the specified input string, beginning at the specified starting position in the string.

Parameters:

- `input`: The string to search for a match.
- `startat`: The character position at which to start the search.

Returns: `true` if the regular expression finds a match; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `input` is `null`.
- `ArgumentOutOfRangeException`: `startat` is less than zero or greater than the length of `input`.
- `RegexMatchTimeoutException`: A time-out occurred.

The `Regex.IsMatch` method is typically used to validate a string or to ensure
that a string conforms to a particular pattern without retrieving that string for subsequent
manipulation. To retrieve matched strings, call the `Regex.Match` or
`Regex.Matches` method instead.

For more details about `startat`, see the remarks for
`Regex.Match`.

## Regex.IsMatch(String, String) method

```csharp
public static bool IsMatch (string input, string pattern);
```

Indicates whether the specified regular expression finds a match in the specified input string.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.

Returns: `true` if the regular expression finds a match; otherwise, `false`.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input` or `pattern` is `null`.
- `RegexMatchTimeoutException`: A time-out occurred.

The `Regex.IsMatch` method is typically used to validate a string or to ensure
that a string conforms to a particular pattern without retrieving that string for subsequent manipulation.
To retrieve matched strings, call the `Regex.Match` or
`Regex.Matches` method instead.

The static `Regex.IsMatch` method is equivalent to constructing a
`Regex` object with the specified pattern and calling the `Regex.IsMatch`
instance method. The pattern is cached for rapid retrieval by the regular expression engine.

## Regex.IsMatch(Char>, String, RegexOptions) method

```csharp
public static bool IsMatch (ReadOnlySpan<char> input, string pattern, System.Text.RegularExpressions.RegexOptions options);
```

Indicates whether the specified regular expression finds a match in the specified input span,
using the specified matching options.

Parameters:

- `input`: The span to search for a match.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that provide options for matching.

Returns: `true` if the regular expression finds a match; otherwise, `false`.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `pattern` is `null`.
- `RegexMatchTimeoutException`: A time-out occurred.
- `ArgumentOutOfRangeException`: `options` is not a valid `RegexOptions` value.

To be added.

## Regex.IsMatch(String, String, RegexOptions) method

```csharp
public static bool IsMatch (string input, string pattern, System.Text.RegularExpressions.RegexOptions options);
```

Indicates whether the specified regular expression finds a match in the specified input string,
using the specified matching options.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that provide options for matching.

Returns: `true` if the regular expression finds a match; otherwise, `false`.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input` or `pattern` is `null`.
- `ArgumentOutOfRangeException`: `options` is not a valid `RegexOptions` value.
- `RegexMatchTimeoutException`: A time-out occurred.

The `Regex.IsMatch` method is typically used to validate a string
or to ensure that a string conforms to a particular pattern without retrieving that string for
subsequent manipulation. To retrieve matched strings, call the
`Regex.Match` or
`Regex.Matches` method instead.

The static `Regex.IsMatch` method is equivalent to constructing a
`Regex` object with the specified pattern and options and calling the
`Regex.IsMatch` instance method. The pattern is cached for rapid retrieval by the
regular expression engine.

## Regex.IsMatch(Char>, String, RegexOptions, TimeSpan) method

```csharp
public static bool IsMatch (ReadOnlySpan<char> input, string pattern, System.Text.RegularExpressions.RegexOptions options, TimeSpan matchTimeout);
```

Indicates whether the specified regular expression finds a match in the specified input span,
using the specified matching options and time-out interval.

Parameters:

- `input`: The span to search for a match.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that provide options for matching.
- `matchTimeout`: A time-out interval, or `Regex.InfiniteMatchTimeout` to indicate
that the method should not time out.

Returns: `true` if the regular expression finds a match; otherwise, `false`.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `pattern` is `null`.
- `RegexMatchTimeoutException`: A time-out occurred.
- `ArgumentOutOfRangeException`: `options` is not a valid `RegexOptions` value
-or-
`matchTimeout` is negative, zero, or greater than approximately 24 days.

To be added.
