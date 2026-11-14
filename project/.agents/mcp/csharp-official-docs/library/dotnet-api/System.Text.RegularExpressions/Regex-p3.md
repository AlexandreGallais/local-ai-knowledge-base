---
title: "Regex class (part 3 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/Regex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Regex class (part 3 of 9)

## Regex.EnumerateMatches(Char>, Int32) method

```csharp
public System.Text.RegularExpressions.Regex.ValueMatchEnumerator EnumerateMatches (ReadOnlySpan<char> input, int startat);
```

Searches an input span for all occurrences of a regular expression and returns a `ValueMatchEnumerator` to iterate over the matches.

Parameters:

- `input`: The span to search for a match.
- `startat`: The zero-based character position at which to start the search.

Returns: A `ValueMatchEnumerator` to iterate over the matches.

Each match won't actually happen until `ValueMatchEnumerator.MoveNext` is invoked on the enumerator, with one match being performed per `ValueMatchEnumerator.MoveNext` call.
Since the evaluation of the match happens lazily, any changes to the passed in input in between calls to `ValueMatchEnumerator.MoveNext` will affect the match results.
The enumerator returned by this method, as well as the structs returned by the enumerator that wrap each match found in the input are ref structs which
make this method be amortized allocation free.

## Regex.EnumerateMatches(Char>, String) method

```csharp
public static System.Text.RegularExpressions.Regex.ValueMatchEnumerator EnumerateMatches (ReadOnlySpan<char> input, string pattern);
```

Searches an input span for all occurrences of a regular expression and returns a `ValueMatchEnumerator` to iterate over the matches.

Parameters:

- `input`: The span to search for a match.
- `pattern`: The regular expression pattern to match.

Returns: A `ValueMatchEnumerator` to iterate over the matches.

Exceptions:

- `ArgumentNullException`: `pattern` is null.
- `RegexParseException`: A regular expression parsing error occurred.

Each match won't actually happen until `ValueMatchEnumerator.MoveNext` is invoked on the enumerator, with one match being performed per `ValueMatchEnumerator.MoveNext` call.
Since the evaluation of the match happens lazily, any changes to the passed in input in between calls to `ValueMatchEnumerator.MoveNext` will affect the match results.
The enumerator returned by this method, as well as the structs returned by the enumerator that wrap each match found in the input are ref structs which
make this method be amortized allocation free.

## Regex.EnumerateMatches(Char>, String, RegexOptions) method

```csharp
public static System.Text.RegularExpressions.Regex.ValueMatchEnumerator EnumerateMatches (ReadOnlySpan<char> input, string pattern, System.Text.RegularExpressions.RegexOptions options);
```

Searches an input span for all occurrences of a regular expression and returns a `ValueMatchEnumerator` to iterate over the matches.

Parameters:

- `input`: The span to search for a match.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that specify options for matching.

Returns: A `ValueMatchEnumerator` to iterate over the matches.

Exceptions:

- `ArgumentNullException`: `pattern` is null.
- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of RegexOptions values.
- `RegexParseException`: A regular expression parsing error occurred.

Each match won't actually happen until `ValueMatchEnumerator.MoveNext` is invoked on the enumerator, with one match being performed per `ValueMatchEnumerator.MoveNext` call.
Since the evaluation of the match happens lazily, any changes to the passed in input in between calls to `ValueMatchEnumerator.MoveNext` will affect the match results.
The enumerator returned by this method, as well as the structs returned by the enumerator that wrap each match found in the input are ref structs which
make this method be amortized allocation free.

## Regex.EnumerateMatches(Char>, String, RegexOptions, TimeSpan) method

```csharp
public static System.Text.RegularExpressions.Regex.ValueMatchEnumerator EnumerateMatches (ReadOnlySpan<char> input, string pattern, System.Text.RegularExpressions.RegexOptions options, TimeSpan matchTimeout);
```

Searches an input span for all occurrences of a regular expression and returns a `ValueMatchEnumerator` to iterate over the matches.

Parameters:

- `input`: The span to search for a match.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that specify options for matching.
- `matchTimeout`: A time-out interval, or `Regex.InfiniteMatchTimeout` to indicate that the method should not time out.

Returns: A `ValueMatchEnumerator` to iterate over the matches.

Exceptions:

- `ArgumentNullException`: `pattern` is null.
- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of RegexOptions values, or `matchTimeout` is negative, zero, or greater than approximately 24 days.
- `RegexParseException`: A regular expression parsing error occurred.

Each match won't actually happen until `ValueMatchEnumerator.MoveNext` is invoked on the enumerator, with one match being performed per `ValueMatchEnumerator.MoveNext` call.
Since the evaluation of the match happens lazily, any changes to the passed in input in between calls to `ValueMatchEnumerator.MoveNext` will affect the match results.
The enumerator returned by this method, as well as the structs returned by the enumerator that wrap each match found in the input are ref structs which
make this method be amortized allocation free.

## Regex.EnumerateSplits(Char>) method

```csharp
public System.Text.RegularExpressions.Regex.ValueSplitEnumerator EnumerateSplits (ReadOnlySpan<char> input);
```

Searches an input span for all occurrences of a regular expression and returns a `ValueSplitEnumerator` to iterate over the splits around matches.

Parameters:

- `input`: The span to search for a match.

Returns: A `ValueSplitEnumerator` to iterate over the matches.

The behavior of `Regex.EnumerateSplits` is similar to the behavior of `Regex.Split`, producing the splits
one at a time as part of iterating through the resulting enumerator rather than all at once as part of a single array. However, there are a few notable differences.
`Regex.Split` will include the contents of capture groups in the resulting splits, while `Regex.EnumerateSplits` will not.
And if `RegexOptions.RightToLeft` is specified, `Regex.Split` will reverse the order of the resulting splits to be left-to-right, whereas
`Regex.EnumerateSplits` will yield the splits in the order they're found right-to-left.

Each match won't actually happen until `ValueSplitEnumerator.MoveNext` is invoked on the enumerator, with one match being performed per `ValueSplitEnumerator.MoveNext` call.
Since the evaluation of the match happens lazily, any changes to the passed in input in between calls to `ValueSplitEnumerator.MoveNext` may affect the match results;
such changes should be avoided and are not supported.

## Regex.EnumerateSplits(Char>, Int32) method

```csharp
public System.Text.RegularExpressions.Regex.ValueSplitEnumerator EnumerateSplits (ReadOnlySpan<char> input, int count);
```

Searches an input span for all occurrences of a regular expression and returns a `ValueSplitEnumerator` to iterate over the splits around matches.

Parameters:

- `input`: The span to search for a match.
- `count`: The maximum number of times the split can occur. If 0, all splits are available.

Returns: A `ValueSplitEnumerator` to iterate over the matches.

The behavior of `Regex.EnumerateSplits` is similar to the behavior of `Regex.Split`, producing the splits
one at a time as part of iterating through the resulting enumerator rather than all at once as part of a single array. However, there are a few notable differences.
`Regex.Split` will include the contents of capture groups in the resulting splits, while `Regex.EnumerateSplits` will not.
And if `RegexOptions.RightToLeft` is specified, `Regex.Split` will reverse the order of the resulting splits to be left-to-right, whereas
`Regex.EnumerateSplits` will yield the splits in the order they're found right-to-left.

Each match won't actually happen until `ValueSplitEnumerator.MoveNext` is invoked on the enumerator, with one match being performed per `ValueSplitEnumerator.MoveNext` call.
Since the evaluation of the match happens lazily, any changes to the passed in input in between calls to `ValueSplitEnumerator.MoveNext` may affect the match results;
such changes should be avoided and are not supported.

## Regex.EnumerateSplits(Char>, String) method

```csharp
public static System.Text.RegularExpressions.Regex.ValueSplitEnumerator EnumerateSplits (ReadOnlySpan<char> input, string pattern);
```

Searches an input span for all occurrences of a regular expression and returns a `ValueSplitEnumerator` to iterate over the splits around matches.

Parameters:

- `input`: The span to search for a match.
- `pattern`: The regular expression pattern to match.

Returns: A `ValueSplitEnumerator` to iterate over the splits around matches.

Exceptions:

- `ArgumentNullException`: `pattern` is null.
- `RegexParseException`: A regular expression parsing error occurred.

The behavior of `Regex.EnumerateSplits` is similar to the behavior of `Regex.Split`, producing the splits
one at a time as part of iterating through the resulting enumerator rather than all at once as part of a single array. However, there are a few notable differences.
`Regex.Split` will include the contents of capture groups in the resulting splits, while `Regex.EnumerateSplits` will not.
And if `RegexOptions.RightToLeft` is specified, `Regex.Split` will reverse the order of the resulting splits to be left-to-right, whereas
`Regex.EnumerateSplits` will yield the splits in the order they're found right-to-left.

Each match won't actually happen until `ValueSplitEnumerator.MoveNext` is invoked on the enumerator, with one match being performed per `ValueSplitEnumerator.MoveNext` call.
Since the evaluation of the match happens lazily, any changes to the passed in input in between calls to `ValueSplitEnumerator.MoveNext` may affect the match results;
such changes should be avoided and are not supported.

## Regex.EnumerateSplits(Char>, Int32, Int32) method

```csharp
public System.Text.RegularExpressions.Regex.ValueSplitEnumerator EnumerateSplits (ReadOnlySpan<char> input, int count, int startat);
```

Searches an input span for all occurrences of a regular expression and returns a `ValueSplitEnumerator` to iterate over the splits around matches.

Parameters:

- `input`: The span to search for a match.
- `count`: The maximum number of times the split can occur. If 0, all splits are available.
- `startat`: The zero-based character position at which to start the search.

Returns: A `ValueSplitEnumerator` to iterate over the matches.

The behavior of `Regex.EnumerateSplits` is similar to the behavior of `Regex.Split`, producing the splits
one at a time as part of iterating through the resulting enumerator rather than all at once as part of a single array. However, there are a few notable differences.
`Regex.Split` will include the contents of capture groups in the resulting splits, while `Regex.EnumerateSplits` will not.
And if `RegexOptions.RightToLeft` is specified, `Regex.Split` will reverse the order of the resulting splits to be left-to-right, whereas
`Regex.EnumerateSplits` will yield the splits in the order they're found right-to-left.

Each match won't actually happen until `ValueSplitEnumerator.MoveNext` is invoked on the enumerator, with one match being performed per `ValueSplitEnumerator.MoveNext` call.
Since the evaluation of the match happens lazily, any changes to the passed in input in between calls to `ValueSplitEnumerator.MoveNext` may affect the match results;
such changes should be avoided and are not supported.

## Regex.EnumerateSplits(Char>, String, RegexOptions) method

```csharp
public static System.Text.RegularExpressions.Regex.ValueSplitEnumerator EnumerateSplits (ReadOnlySpan<char> input, string pattern, System.Text.RegularExpressions.RegexOptions options);
```

Searches an input span for all occurrences of a regular expression and returns a `ValueSplitEnumerator` to iterate over the splits around matches.

Parameters:

- `input`: The span to search for a match.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that specify options for matching.

Returns: A `ValueSplitEnumerator` to iterate over the splits around matches.

Exceptions:

- `ArgumentNullException`: `pattern` is null.
- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of RegexOptions values.
- `RegexParseException`: A regular expression parsing error occurred.

The behavior of `Regex.EnumerateSplits` is similar to the behavior of `Regex.Split`, producing the splits
one at a time as part of iterating through the resulting enumerator rather than all at once as part of a single array. However, there are a few notable differences.
`Regex.Split` will include the contents of capture groups in the resulting splits, while `Regex.EnumerateSplits` will not.
And if `RegexOptions.RightToLeft` is specified, `Regex.Split` will reverse the order of the resulting splits to be left-to-right, whereas
`Regex.EnumerateSplits` will yield the splits in the order they're found right-to-left.

Each match won't actually happen until `ValueSplitEnumerator.MoveNext` is invoked on the enumerator, with one match being performed per `ValueSplitEnumerator.MoveNext` call.
Since the evaluation of the match happens lazily, any changes to the passed in input in between calls to `ValueSplitEnumerator.MoveNext` may affect the match results;
such changes should be avoided and are not supported.
