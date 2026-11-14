---
title: "Regex class (part 6 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/Regex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Regex class (part 6 of 9)

## Regex.Match(String, String, RegexOptions, TimeSpan) method

```csharp
public static System.Text.RegularExpressions.Match Match (string input, string pattern, System.Text.RegularExpressions.RegexOptions options, TimeSpan matchTimeout);
```

Searches the input string for the first occurrence of the specified regular expression, using the
specified matching options and time-out interval.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that provide options for matching.
- `matchTimeout`: A time-out interval, or `Regex.InfiniteMatchTimeout` to indicate
that the method should not time out.

Returns: An object that contains information about the match.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input` or `pattern` is `null`.
- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of `RegexOptions` values.
-or-
`matchTimeout` is negative, zero, or greater than approximately 24 days.
- `RegexMatchTimeoutException`: A time-out occurred.

The static `Regex.Match` method is equivalent to
constructing a `Regex` object with the
`Regex.#ctor` constructor and calling the instance
`Regex.Match` method.

You can determine whether the regular expression pattern has been found in the input string by
checking the returned `Match` object's `Group.Success` property. You can
retrieve subsequent matches by repeatedly calling the returned `Match` object's
`Match.NextMatch` method.

The `matchTimeout` parameter specifies how long a pattern matching method should try
to find a match before it times out. Setting a time-out interval prevents regular expressions that
rely on excessive backtracking from appearing to stop responding when they process input that contains
near matches. If no match is found in that time interval, the method throws a
`RegexMatchTimeoutException` exception. `matchTimeout` overrides any
default time-out value defined for the application domain in which the method executes.

## Regex.Matches(String) method

```csharp
public System.Text.RegularExpressions.MatchCollection Matches (string input);
```

Searches the specified input string for all occurrences of a regular expression.

Parameters:

- `input`: The string to search for a match.

Returns: A collection of the `Match` objects found by the search. If no matches are found, the
method returns an empty collection object.

Exceptions:

- `ArgumentNullException`: `input` is `null`.

The `Regex.Matches` method is similar to the `Regex.Match` method,
except that it returns information about all the matches found in the input string, instead of a
single match. The collection includes only matches and terminates at the first non-match.

The `Regex.Matches` method uses lazy evaluation to populate the returned
`MatchCollection` object. Accessing members of this collection such as
`MatchCollection.Count` and `MatchCollection.CopyTo` causes the collection to
be populated immediately. To take advantage of lazy evaluation, iterate the collection by using
`foreach`.

Because of its lazy evaluation, calling the `Regex.Matches` method does not throw a
`RegexMatchTimeoutException` exception. However, the exception is thrown when an operation
is performed on the `MatchCollection` object returned by this method, if the
`Regex.MatchTimeout` property is not `Regex.InfiniteMatchTimeout` and a
matching operation exceeds the time-out interval.

## Regex.Matches(String, Int32) method

```csharp
public System.Text.RegularExpressions.MatchCollection Matches (string input, int startat);
```

Searches the specified input string for all occurrences of a regular expression, beginning at the
specified starting position in the string.

Parameters:

- `input`: The string to search for a match.
- `startat`: The character position in the input string at which to start the search.

Returns: A collection of the `Match` objects found by the search. If no matches are found, the
method returns an empty collection object.

Exceptions:

- `ArgumentNullException`: `input` is `null`.
- `ArgumentOutOfRangeException`: `startat` is less than zero or greater than the length of `input`.

The `Regex.Matches` method is similar to the `Regex.Match`
method, except that it returns information about all the matches found in the input string, instead
of a single match.

For more details about `startat`, see the remarks for
`Regex.Match`.

The `Regex.Matches` method uses lazy evaluation to populate the returned
`MatchCollection` object. Accessing members of this collection such as
`MatchCollection.Count` and `MatchCollection.CopyTo` causes the collection to
be populated immediately. To take advantage of lazy evaluation, iterate the collection by using
`foreach`.

Because of its lazy evaluation, calling the `Regex.Matches` method does not throw
a `RegexMatchTimeoutException` exception. However, the exception is thrown when an
operation is performed on the `MatchCollection` object returned by this method, if the
`Regex.MatchTimeout` property is not `Regex.InfiniteMatchTimeout` and a
matching operation exceeds the time-out interval.

## Regex.Matches(String, String) method

```csharp
public static System.Text.RegularExpressions.MatchCollection Matches (string input, string pattern);
```

Searches the specified input string for all occurrences of a specified regular expression.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.

Returns: A collection of the `Match` objects found by the search. If no matches are found, the
method returns an empty collection object.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input` or `pattern` is `null`.

The `Regex.Matches` method is similar to the
`Regex.Match` method, except that it returns information about all the matches
found in the input string, instead of a single match.

The static `Matches` methods are equivalent to constructing a `Regex` object with
the specified regular expression pattern and calling the instance method `Matches`.

The `Regex.Matches` method uses lazy evaluation to populate the returned
`MatchCollection` object. Accessing members of this collection such as
`MatchCollection.Count` and `MatchCollection.CopyTo` causes the collection to
be populated immediately. To take advantage of lazy evaluation, iterate the collection by using
`foreach`.

Because of its lazy evaluation, calling the `Regex.Matches` method does not
throw a `RegexMatchTimeoutException` exception. However, the exception is thrown when an
operation is performed on the `MatchCollection` object returned by this method, if a
matching operation exceeds the time-out interval.

## Regex.Matches(String, String, RegexOptions) method

```csharp
public static System.Text.RegularExpressions.MatchCollection Matches (string input, string pattern, System.Text.RegularExpressions.RegexOptions options);
```

Searches the specified input string for all occurrences of a specified regular expression, using the
specified matching options.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that specify options for matching.

Returns: A collection of the `Match` objects found by the search. If no matches are found, the
method returns an empty collection object.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input` or `pattern` is `null`.
- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of `RegexOptions` values.

The `Regex.Matches` method is similar to the
`Regex.Match` method, except that it returns information about all
the matches found in the input string, instead of a single match.

The static `Matches` methods are equivalent to constructing a `Regex` object with
the specified regular expression pattern and calling the instance method `Matches`.

The `Regex.Matches` method uses lazy evaluation to populate the
returned `MatchCollection` object. Accessing members of this collection such as
`MatchCollection.Count` and `MatchCollection.CopyTo` causes the collection to
be populated immediately. To take advantage of lazy evaluation, iterate the collection by using
`foreach`.

Because of its lazy evaluation, calling the `Regex.Matches`
method does not throw a `RegexMatchTimeoutException` exception. However, the exception is
thrown when an operation is performed on the `MatchCollection` object returned by this
method, if a matching operation exceeds the time-out interval.

## Regex.Matches(String, String, RegexOptions, TimeSpan) method

```csharp
public static System.Text.RegularExpressions.MatchCollection Matches (string input, string pattern, System.Text.RegularExpressions.RegexOptions options, TimeSpan matchTimeout);
```

Searches the specified input string for all occurrences of a specified regular expression, using the
specified matching options and time-out interval.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that specify options for matching.
- `matchTimeout`: A time-out interval, or `Regex.InfiniteMatchTimeout` to indicate
that the method should not time out.

Returns: A collection of the `Match` objects found by the search. If no matches are found, the
method returns an empty collection object.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input` or `pattern` is `null`.
- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of `RegexOptions` values.
-or-
`matchTimeout` is negative, zero, or greater than approximately 24 days.

The `Regex.Matches` method is similar to the
`Regex.Match` method, except that it returns information
about all the matches found in the input string, instead of a single match.

The static `Matches` methods are equivalent to constructing a `Regex` object with
the specified regular expression pattern and calling the instance method `Matches`.

The `Regex.Matches` method uses lazy evaluation to
populate the returned `MatchCollection` object. Accessing members of this collection
such as `MatchCollection.Count` and `MatchCollection.CopyTo` causes the
collection to be populated immediately. To take advantage of lazy evaluation, iterate the collection
by using `foreach`.

Because of its lazy evaluation, calling the
`Regex.Matches` method does not throw a
`RegexMatchTimeoutException` exception. However, an exception is thrown when an operation
is performed on the `MatchCollection` object returned by this method, if a matching
operation exceeds the time-out interval specified by the `matchTimeout` parameter.

## Regex.Replace(String, String) method

```csharp
public string Replace (string input, string replacement);
```

In a specified input string, replaces all strings that match a regular expression pattern with a
specified replacement string.

Parameters:

- `input`: The string to search for a match.
- `replacement`: The replacement string.

Returns: A new string that is identical to the input string, except that the replacement string takes the place
of each matched string. If the regular expression pattern is not matched in the current instance, the
method returns the current instance unchanged.

Exceptions:

- `ArgumentNullException`: `input` or `replacement` is `null`.
- `RegexMatchTimeoutException`: A time-out occurred.

The search for the pattern begins at the beginning of the `input` string.

The `replacement` parameter specifies the string that replaces each match.
`replacement` can consist of any combination of literal text and
substitutions.
Substitutions are the only regular expression language elements that are recognized in a replacement
pattern.

Because the method returns `input` unchanged if there is no match, you can use the
`Object.ReferenceEquals` method to determine whether the method has made
any replacements.

## Regex.Replace(String, MatchEvaluator) method

```csharp
public string Replace (string input, System.Text.RegularExpressions.MatchEvaluator evaluator);
```

In a specified input string, replaces all strings that match a specified regular expression with a
string returned by a `MatchEvaluator` delegate.

Parameters:

- `input`: The string to search for a match.
- `evaluator`: A custom method that examines each match and returns either the original
matched string or a replacement string.

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

The method is equivalent to calling the `Regex.Matches` method and passing each
`Match` object in the returned `MatchCollection` to the
`evaluator` delegate.

Because the method returns `input` unchanged if there is no match, you can use the
`Object.ReferenceEquals` method to determine whether the method has made
any replacements.
