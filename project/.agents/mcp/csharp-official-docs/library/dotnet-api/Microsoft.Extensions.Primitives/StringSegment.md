---
title: "StringSegment struct (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Primitives/StringSegment.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringSegment struct

Namespace: `Microsoft.Extensions.Primitives`

```csharp
public readonly struct StringSegment : IEquatable<Microsoft.Extensions.Primitives.StringSegment>, IEquatable<string>
```

An optimized representation of a substring.

To be added.

## StringSegment.StringSegment(String) constructor

```csharp
public StringSegment (string? buffer);
```

Initializes an instance of the `StringSegment` struct.

Parameters:

- `buffer`: The original `String`. The `StringSegment` includes the whole `String`.

To be added.

## StringSegment.StringSegment(String, Int32, Int32) constructor

```csharp
public StringSegment (string buffer, int offset, int length);
```

Initializes an instance of the `StringSegment` struct.

Parameters:

- `buffer`: The original `String` used as buffer.
- `offset`: The offset of the segment within the `buffer`.
- `length`: The length of the segment.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `length` is less than zero, or `offset` +
`length` is greater than the number of characters in `buffer`.

To be added.

## StringSegment.Buffer property

```csharp
public string? Buffer { get; }
```

Gets the `String` buffer for this `StringSegment`.

Returns: The `String` buffer for this `StringSegment`.

To be added.

## StringSegment.HasValue property

```csharp
public bool HasValue { get; }
```

Gets whether this `StringSegment` contains a valid value.

Returns: `true` if the `StringSegment` contains a valid value; `false` otherwise.

To be added.

## StringSegment.Item property

```csharp
public char this[int index] { get; }
```

Gets the `Char` at a specified position in the current `StringSegment`.

Parameters:

- `index`: The offset into the `StringSegment`

Returns: The `Char` at a specified position.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is greater than or equal to `StringSegment.Length` or less than zero.

To be added.

## StringSegment.Length property

```csharp
public int Length { get; }
```

Gets the length of this `StringSegment`.

Returns: The length of this `StringSegment`.

To be added.

## StringSegment.Offset property

```csharp
public int Offset { get; }
```

Gets the offset within the buffer for this `StringSegment`.

Returns: The offset within the buffer for this `StringSegment`.

To be added.

## StringSegment.Value property

```csharp
public string? Value { get; }
```

Gets the value of this segment as a `String`.

Returns: The value of this segment as a `String`.

To be added.

## StringSegment.AsMemory() method

```csharp
public ReadOnlyMemory<char> AsMemory ();
```

Gets a `ReadOnlyMemory<T>` from the current `StringSegment`.

Returns: The `ReadOnlyMemory<T>` from this `StringSegment`.

To be added.

## StringSegment.AsSpan() method

```csharp
public ReadOnlySpan<char> AsSpan ();
```

Gets a `ReadOnlySpan<T>` from the current `StringSegment`.

Returns: The `ReadOnlySpan<T>` from this `StringSegment`.

To be added.

## StringSegment.AsSpan(Int32) method

```csharp
public ReadOnlySpan<char> AsSpan (int start);
```

Gets a `ReadOnlySpan<T>` from the current `StringSegment` that starts
at the position specified by `start`, and has the remaining length.

Parameters:

- `start`: The zero-based starting character position in this `StringSegment`.

Returns: A `ReadOnlySpan<T>` with the remaining chars that begins at `start` in
this `StringSegment`.

Exceptions:

- `ArgumentOutOfRangeException`: `start` is greater than or equal to `StringSegment.Length` or less than zero.

To be added.

## StringSegment.AsSpan(Int32, Int32) method

```csharp
public ReadOnlySpan<char> AsSpan (int start, int length);
```

Gets a `ReadOnlySpan<T>` from the current `StringSegment` that starts
at the position specified by `start`, and has the specified `length`.

Parameters:

- `start`: The zero-based starting character position in this `StringSegment`.
- `length`: The number of characters in the span.

Returns: A `ReadOnlySpan<T>` with `length` that begins at
`start` in this `StringSegment`.

Exceptions:

- `ArgumentOutOfRangeException`: `start` or `length` is less than zero, or `start` + `length` is
greater than `StringSegment.Length`.

To be added.

## StringSegment.Compare(StringSegment, StringSegment, StringComparison) method

```csharp
public static int Compare (Microsoft.Extensions.Primitives.StringSegment a, Microsoft.Extensions.Primitives.StringSegment b, StringComparison comparisonType);
```

Compares substrings of two specified `StringSegment` objects using the specified rules,
and returns an integer that indicates their relative position in the sort order.

Parameters:

- `a`: The first `StringSegment` to compare.
- `b`: The second `StringSegment` to compare.
- `comparisonType`: One of the enumeration values that specifies the rules for the comparison.

Returns: A 32-bit signed integer indicating the lexical relationship between the two comparands.
The value is negative if `a` is less than `b`, 0 if the two comparands are equal,
and positive if `a` is greater than `b`.

To be added.

## StringSegment.EndsWith(String, StringComparison) method

```csharp
public bool EndsWith (string text, StringComparison comparisonType);
```

Checks if the end of this `StringSegment` matches the specified `String` when compared using the specified `comparisonType`.

Parameters:

- `text`: The `String`to compare.
- `comparisonType`: One of the enumeration values that specifies the rules to use in the comparison.

Returns: `true` if `text` matches the end of this `StringSegment`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `text` is `null`.

To be added.

## StringSegment.Equals(StringSegment) method

```csharp
public bool Equals (Microsoft.Extensions.Primitives.StringSegment other);
```

Indicates whether the current object is equal to another object of the same type.

Parameters:

- `other`: An object to compare with this object.

Returns: `true` if the current object is equal to `other`; otherwise, `false`.

To be added.

## StringSegment.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Indicates whether the current object is equal to another object of the same type.

Parameters:

- `obj`: An object to compare with this object.

Returns: `true` if the current object is equal to `obj`; otherwise, `false`.

To be added.

## StringSegment.Equals(String) method

```csharp
public bool Equals (string? text);
```

Checks if the specified `String` is equal to the current `StringSegment`.

Parameters:

- `text`: The `String` to compare with the current `StringSegment`.

Returns: `true` if the specified `String` is equal to the current `StringSegment`; otherwise, `false`.

To be added.

## StringSegment.Equals(StringSegment, StringComparison) method

```csharp
public bool Equals (Microsoft.Extensions.Primitives.StringSegment other, StringComparison comparisonType);
```

Indicates whether the current object is equal to another object of the same type.

Parameters:

- `other`: An object to compare with this object.
- `comparisonType`: One of the enumeration values that specifies the rules to use in the comparison.

Returns: `true` if the current object is equal to `other`; otherwise, `false`.

To be added.

## StringSegment.Equals(String, StringComparison) method

```csharp
public bool Equals (string? text, StringComparison comparisonType);
```

Checks if the specified `String` is equal to the current `StringSegment`.

Parameters:

- `text`: The `String` to compare with the current `StringSegment`.
- `comparisonType`: One of the enumeration values that specifies the rules to use in the comparison.

Returns: `true` if the specified `String` is equal to the current `StringSegment`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `text` is `null`.

To be added.

## StringSegment.Equals(StringSegment, StringSegment, StringComparison) method

```csharp
public static bool Equals (Microsoft.Extensions.Primitives.StringSegment a, Microsoft.Extensions.Primitives.StringSegment b, StringComparison comparisonType);
```

Determines whether two specified `StringSegment` objects have the same value. A parameter specifies the culture, case, and
sort rules used in the comparison.

Parameters:

- `a`: The first `StringSegment` to compare.
- `b`: The second `StringSegment` to compare.
- `comparisonType`: One of the enumeration values that specifies the rules for the comparison.

Returns: `true` if the objects are equal; otherwise, `false`.

To be added.

## StringSegment.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns a hash code for this instance.

Returns: A hash code for this instance, suitable for use in hashing algorithms and data structures like a hash table.

The returned hash code is suitable for use in hashing algorithms and data structures, for example, a hash table.

This method is expensive since it allocates on every call. However, the allocation is required to retain any behavior (such as hash code randomization) that `String.GetHashCode` has.

## StringSegment.IndexOf(Char) method

```csharp
public int IndexOf (char c);
```

Gets the zero-based index of the first occurrence of the character `c` in this `StringSegment`.

Parameters:

- `c`: The Unicode character to seek.

Returns: The zero-based index position of `c` from the beginning of the `StringSegment` if that character is found, or -1 if it is not.

To be added.

## StringSegment.IndexOf(Char, Int32) method

```csharp
public int IndexOf (char c, int start);
```

Gets the zero-based index of the first occurrence of the character `c` in this `StringSegment`.
The search starts at `start`.

Parameters:

- `c`: The Unicode character to seek.
- `start`: The zero-based index position at which the search starts.

Returns: The zero-based index position of `c` from the beginning of the `StringSegment` if that character is found, or -1 if it is not.

Exceptions:

- `ArgumentOutOfRangeException`: `start` is greater than or equal to `StringSegment.Length` or less than zero.

To be added.

## StringSegment.IndexOf(Char, Int32, Int32) method

```csharp
public int IndexOf (char c, int start, int count);
```

Gets the zero-based index of the first occurrence of the character `c` in this `StringSegment`.
The search starts at `start` and examines a specified number of `count` character positions.

Parameters:

- `c`: The Unicode character to seek.
- `start`: The zero-based index position at which the search starts.
- `count`: The number of characters to examine.

Returns: The zero-based index position of `c` from the beginning of the `StringSegment` if that character is found, or -1 if it is not.

Exceptions:

- `ArgumentOutOfRangeException`: `start` or `count` is less than zero, or `start` + `count` is
greater than `StringSegment.Length`.

To be added.

## StringSegment.IndexOfAny(Char[]) method

```csharp
public int IndexOfAny (char[] anyOf);
```

Reports the zero-based index of the first occurrence in this instance of any character in a specified array
of Unicode characters.

Parameters:

- `anyOf`: A Unicode character array containing one or more characters to seek.

Returns: The zero-based index position of the first occurrence in this instance where any character in `anyOf`
was found; -1 if no character in `anyOf` was found.

To be added.

## StringSegment.IndexOfAny(Char[], Int32) method

```csharp
public int IndexOfAny (char[] anyOf, int startIndex);
```

Reports the zero-based index of the first occurrence in this instance of any character in a specified array
of Unicode characters. The search starts at a specified character position.

Parameters:

- `anyOf`: A Unicode character array containing one or more characters to seek.
- `startIndex`: The search starting position.

Returns: The zero-based index position of the first occurrence in this instance where any character in `anyOf`
was found; -1 if no character in `anyOf` was found.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` is greater than or equal to `StringSegment.Length` or less than zero.

To be added.

## StringSegment.IndexOfAny(Char[], Int32, Int32) method

```csharp
public int IndexOfAny (char[] anyOf, int startIndex, int count);
```

Reports the zero-based index of the first occurrence in this instance of any character in a specified array
of Unicode characters. The search starts at a specified character position and examines a specified number
of character positions.

Parameters:

- `anyOf`: A Unicode character array containing one or more characters to seek.
- `startIndex`: The search starting position.
- `count`: The number of character positions to examine.

Returns: The zero-based index position of the first occurrence in this instance where any character in `anyOf`
was found; -1 if no character in `anyOf` was found.

Exceptions:

- `ArgumentNullException`: `anyOf` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` or `count` is less than zero, or `startIndex` + `count` is
greater than `StringSegment.Length`.

To be added.

## StringSegment.IsNullOrEmpty(StringSegment) method

```csharp
public static bool IsNullOrEmpty (Microsoft.Extensions.Primitives.StringSegment value);
```

Indicates whether the specified `StringSegment` is null or an Empty string.

Parameters:

- `value`: The `StringSegment` to test.

To be added.

## StringSegment.LastIndexOf(Char) method

```csharp
public int LastIndexOf (char value);
```

Reports the zero-based index position of the last occurrence of a specified Unicode character within this instance.

Parameters:

- `value`: The Unicode character to seek.

Returns: The zero-based index position of value if that character is found, or -1 if it is not.

To be added.

## StringSegment.op_Equality(StringSegment, StringSegment) method

```csharp
public static bool operator == (Microsoft.Extensions.Primitives.StringSegment left, Microsoft.Extensions.Primitives.StringSegment right);
```

Checks if two specified `StringSegment` have the same value.

Parameters:

- `left`: The first `StringSegment` to compare, or `null`.
- `right`: The second `StringSegment` to compare, or `null`.

Returns: `true` if the value of `left` is the same as the value of `right`; otherwise, `false`.

To be added.

## StringSegment.op_Implicit(StringSegment) method

```csharp
public static implicit operator ReadOnlyMemory<char> (Microsoft.Extensions.Primitives.StringSegment segment);
```

Creates a see `ReadOnlyMemory<T>` from the given `StringSegment`.

Parameters:

- `segment`: The `StringSegment` to convert to a `ReadOnlyMemory<T>`.

Returns: To be added.

To be added.
