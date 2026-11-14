---
title: "StringSegment struct (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Primitives/StringSegment.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringSegment struct (part 2 of 2)

## StringSegment.op_Implicit(StringSegment) method

```csharp
public static implicit operator ReadOnlySpan<char> (Microsoft.Extensions.Primitives.StringSegment segment);
```

Creates a see `ReadOnlySpan<T>` from the given `StringSegment`.

Parameters:

- `segment`: The `StringSegment` to convert to a `ReadOnlySpan<T>`.

Returns: To be added.

To be added.

## StringSegment.op_Implicit(String) method

```csharp
public static implicit operator Microsoft.Extensions.Primitives.StringSegment (string? value);
```

Creates a new `StringSegment` from the given `String`.

Parameters:

- `value`: The `String` to convert to a `StringSegment`.

Returns: To be added.

To be added.

## StringSegment.op_Inequality(StringSegment, StringSegment) method

```csharp
public static bool operator != (Microsoft.Extensions.Primitives.StringSegment left, Microsoft.Extensions.Primitives.StringSegment right);
```

Checks if two specified `StringSegment` have different values.

Parameters:

- `left`: The first `StringSegment` to compare, or `null`.
- `right`: The second `StringSegment` to compare, or `null`.

Returns: `true` if the value of `left` is different from the value of `right`; otherwise, `false`.

To be added.

## StringSegment.Split(Char[]) method

```csharp
public Microsoft.Extensions.Primitives.StringTokenizer Split (char[] chars);
```

Splits a string into `StringSegment`s that are based on the characters in an array.

Parameters:

- `chars`: A character array that delimits the substrings in this string, an empty array that
contains no delimiters, or null.

Returns: An `StringTokenizer` whose elements contain the `StringSegment`s from this instance
that are delimited by one or more characters in `chars`.

To be added.

## StringSegment.StartsWith(String, StringComparison) method

```csharp
public bool StartsWith (string text, StringComparison comparisonType);
```

Checks if the beginning of this `StringSegment` matches the specified `String` when compared using the specified `comparisonType`.

Parameters:

- `text`: The `String`to compare.
- `comparisonType`: One of the enumeration values that specifies the rules to use in the comparison.

Returns: `true` if `text` matches the beginning of this `StringSegment`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `text` is `null`.

To be added.

## StringSegment.Subsegment(Int32) method

```csharp
public Microsoft.Extensions.Primitives.StringSegment Subsegment (int offset);
```

Retrieves a `StringSegment` that represents a substring from this `StringSegment`.
The `StringSegment` starts at the position specified by `offset`.

Parameters:

- `offset`: The zero-based starting character position of a substring in this `StringSegment`.

Returns: A `StringSegment` that begins at `offset` in this `StringSegment`
whose length is the remainder.

Exceptions:

- `ArgumentOutOfRangeException`: `offset` is greater than or equal to `StringSegment.Length` or less than zero.

To be added.

## StringSegment.Subsegment(Int32, Int32) method

```csharp
public Microsoft.Extensions.Primitives.StringSegment Subsegment (int offset, int length);
```

Retrieves a `StringSegment` that represents a substring from this `StringSegment`.
The `StringSegment` starts at the position specified by `offset` and has the specified `length`.

Parameters:

- `offset`: The zero-based starting character position of a substring in this `StringSegment`.
- `length`: The number of characters in the substring.

Returns: A `StringSegment` that is equivalent to the substring of `length` that begins at `offset` in this `StringSegment`.

Exceptions:

- `ArgumentOutOfRangeException`: `offset` or `length` is less than zero, or `offset` + `length` is
greater than `StringSegment.Length`.

To be added.

## StringSegment.Substring(Int32) method

```csharp
public string Substring (int offset);
```

Retrieves a substring from this `StringSegment`.
The substring starts at the position specified by `offset` and has the remaining length.

Parameters:

- `offset`: The zero-based starting character position of a substring in this `StringSegment`.

Returns: A `String` that is equivalent to the substring of remaining length that begins at
`offset` in this `StringSegment`.

Exceptions:

- `ArgumentOutOfRangeException`: `offset` is greater than or equal to `StringSegment.Length` or less than zero.

To be added.

## StringSegment.Substring(Int32, Int32) method

```csharp
public string Substring (int offset, int length);
```

Retrieves a substring from this `StringSegment`.
The substring starts at the position specified by `offset` and has the specified `length`.

Parameters:

- `offset`: The zero-based starting character position of a substring in this `StringSegment`.
- `length`: The number of characters in the substring.

Returns: A `String` that is equivalent to the substring of `length` that begins at
`offset` in this `StringSegment`.

Exceptions:

- `ArgumentOutOfRangeException`: `offset` or `length` is less than zero, or `offset` + `length` is
greater than `StringSegment.Length`.

To be added.

## StringSegment.ToString() method

```csharp
public override string ToString ();
```

Returns the `String` represented by this `StringSegment` or `String.Empty` if the `StringSegment` does not contain a value.

Returns: The `String` represented by this `StringSegment` or `String.Empty` if the `StringSegment` does not contain a value.

To be added.

## StringSegment.Trim() method

```csharp
public Microsoft.Extensions.Primitives.StringSegment Trim ();
```

Removes all leading and trailing whitespaces.

Returns: The trimmed `StringSegment`.

To be added.

## StringSegment.TrimEnd() method

```csharp
public Microsoft.Extensions.Primitives.StringSegment TrimEnd ();
```

Removes all trailing whitespaces.

Returns: The trimmed `StringSegment`.

To be added.

## StringSegment.TrimStart() method

```csharp
public Microsoft.Extensions.Primitives.StringSegment TrimStart ();
```

Removes all leading whitespaces.

Returns: The trimmed `StringSegment`.

To be added.

## StringSegment.Empty field

```csharp
public static readonly Microsoft.Extensions.Primitives.StringSegment Empty;
```

A `StringSegment` for `String.Empty`.

To be added.
