---
title: "Regex class (part 9 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/Regex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Regex class (part 9 of 9)

## Regex.Split(String, String, RegexOptions, TimeSpan) method

```csharp
public static string[] Split (string input, string pattern, System.Text.RegularExpressions.RegexOptions options, TimeSpan matchTimeout);
```

Splits an input string into an array of substrings at the positions defined by a
specified regular expression pattern. Additional parameters specify options that modify
the matching operation and a time-out interval if no match is found.

Parameters:

- `input`: The string to split.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that provide options for matching.
- `matchTimeout`: A time-out interval, or `Regex.InfiniteMatchTimeout` to indicate that the
method should not time out.

Returns: An array of strings.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `input` or `pattern` is `null`.
- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of
`RegexOptions` values.
-or-
`matchTimeout` is negative, zero, or greater than approximately 24 days.
- `RegexMatchTimeoutException`: A time-out occurred.

The static `Regex.Split` methods are
equivalent to constructing a `Regex` object with the specified regular
expression pattern and calling the instance method `Regex.Split`.

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

The `matchTimeout` parameter specifies how long a pattern matching
method should try to find a match before it times out.
`matchTimeout` overrides any default time-out value defined for the
application domain in which the method executes.

## Regex.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo si, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with the data necessary to deserialize the current `Regex` object.

Parameters:

- `si`: The object to populate with serialization information.
- `context`: The place to store and retrieve serialized data. This parameter is reserved for future use.

#### Remarks

Any objects that are included in the `SerializationInfo` are automatically tracked and serialized by the formatter.

> **Note:**
>  It is not guaranteed that this method will be called only once per object instance during serialization. Therefore, the method should be implemented in such a way that its behavior will be the same regardless of the number of times it is called.

## Regex.ToString() method

```csharp
public override string ToString ();
```

Returns the regular expression pattern that was passed into the `Regex` constructor.

Returns: The pattern that was passed into the `Regex` constructor.

#### Remarks
The `pattern` parameter consists of regular expression language elements that symbolically describe the string to match. For more information about regular expressions, see .NET Regular Expressions and Regular Expression Language - Quick Reference.

## Regex.Unescape(String) method

```csharp
public static string Unescape (string str);
```

Converts any escaped characters in the input string.

Parameters:

- `str`: The input string containing the text to convert.

Returns: A string of characters with any escaped characters converted to their unescaped form.

Exceptions:

- `ArgumentException`: `str` includes an unrecognized escape sequence.
- `ArgumentNullException`: `str` is `null`.

The `Regex.Unescape` method reverses the transformation performed by the
`Regex.Escape` method by removing the escape character ("\") from each escaped character.
It also unescapes hexadecimal values in verbatim string literals, converting them to the actual
printable characters (for example, `\x07` becomes `\a`).

## Regex.UseOptionC() method

```csharp
protected bool UseOptionC ();
```

True if the `RegexOptions.Compiled` option was set.

Returns: `true` if the `Regex.Options` property contains the `RegexOptions.Compiled` option; otherwise, `false`.

To be added.

## Regex.UseOptionR() method

```csharp
protected bool UseOptionR ();
```

True if the `RegexOptions.RightToLeft` option was set.

Returns: `true` if the `Regex.Options` property contains the `RegexOptions.RightToLeft` option; otherwise, `false`.

To be added.

## Regex.ValidateMatchTimeout(TimeSpan) method

```csharp
protected internal static void ValidateMatchTimeout (TimeSpan matchTimeout);
```

Validates that the specified match timeout value is valid.
The valid range is
```csharp
TimeSpan.Zero < matchTimeout <= Regex.MaximumMatchTimeout
```
.

Parameters:

- `matchTimeout`: The timeout value to validate.

Exceptions:

- `ArgumentOutOfRangeException`: If the specified timeout is not within a valid range.

To be added.

## Regex.capnames field

```csharp
protected internal System.Collections.Hashtable? capnames;
```

When named captures are used, maps capture names to their corresponding index.
Otherwise, `null`.

To be added.

## Regex.caps field

```csharp
protected internal System.Collections.Hashtable? caps;
```

When captures are sparse, maps capture numbers to their corresponding index
in the capture array. Otherwise, `null`.

To be added.

## Regex.capsize field

```csharp
protected internal int capsize;
```

The number of capturing groups defined in the regular expression pattern.

To be added.

## Regex.capslist field

```csharp
protected internal string[]? capslist;
```

When captures are sparse or named captures are used, contains the sorted list of capture names.
Otherwise, `null`.

To be added.

## Regex.factory field

```csharp
protected internal System.Text.RegularExpressions.RegexRunnerFactory? factory;
```

A factory used to create `RegexRunner` instances for executing the regular expression.

To be added.

## Regex.InfiniteMatchTimeout field

```csharp
public static readonly TimeSpan InfiniteMatchTimeout;
```

Specifies that a pattern-matching operation should not time out.

The `Regex.#ctor` constructor and a number of static matching
methods use the `Regex.InfiniteMatchTimeout` constant to indicate that the attempt to find a
pattern match should not time out.

Setting the regular expression engine's time-out value to `Regex.InfiniteMatchTimeout` can
cause regular expressions that rely on excessive backtracking to appear to stop responding when
processing text that nearly matches the regular expression pattern. If you disable time-outs, you
should ensure that your regular expression does not rely on excessive backtracking and that it
handles text that nearly matches the regular expression pattern. For more information about handling
backtracking, see
Backtracking.

## Regex.internalMatchTimeout field

```csharp
protected internal TimeSpan internalMatchTimeout;
```

The maximum amount of time that can elapse in a pattern-matching operation before the operation
times out.

To be added.

## Regex.pattern field

```csharp
protected internal string? pattern;
```

The regular expression pattern that was passed to the constructor.

To be added.

## Regex.roptions field

```csharp
protected internal System.Text.RegularExpressions.RegexOptions roptions;
```

The regular expression options that were passed to the constructor.

To be added.
