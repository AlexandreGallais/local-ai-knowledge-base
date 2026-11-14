---
title: "Rune struct (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Rune.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Rune struct

Namespace: `System.Text`

```csharp
public readonly struct Rune : IComparable, IComparable<System.Text.Rune>, IEquatable<System.Text.Rune>, ISpanFormattable, IUtf8SpanFormattable, IUtf8SpanParsable<System.Text.Rune>
```

Represents a Unicode scalar value ([ U+0000..U+D7FF ], inclusive; or [ U+E000..U+10FFFF ], inclusive).

A `Rune` instance represents a Unicode scalar value, which means any code point excluding the surrogate range (U+D800..U+DFFF). The type's constructors and conversion operators validate the input, so consumers can call the APIs assuming that the underlying `Rune` instance is well-formed.

If you aren't familiar with the terms Unicode scalar value, code point, surrogate range, and well-formed, see Introduction to character encoding in .NET.

#### When to use the Rune type

Consider using the `Rune` type if your code:

* Calls APIs that require Unicode scalar values
* Explicitly handles surrogate pairs

#### APIs that require Unicode scalar values

If your code iterates through the `char` instances in a `string` or a `ReadOnlySpan<char>`, some of the `char` methods won't work correctly on `char` instances that are in the surrogate range. For example, the following APIs require a scalar value `char` to work correctly:

* `Char.GetNumericValue`
* `Char.GetUnicodeCategory`
* `Char.IsDigit`
* `Char.IsLetter`
* `Char.IsLetterOrDigit`
* `Char.IsLower`
* `Char.IsNumber`
* `Char.IsPunctuation`
* `Char.IsSymbol`
* `Char.IsUpper`

The following example shows code that won't work correctly if any of the `char` instances are surrogate code points:

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/CountLettersInString.cs._

Here's equivalent code that works with a `ReadOnlySpan<char>`:

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/CountLettersInSpan.cs._
The preceding code works correctly with some languages such as English:

```csharp
CountLettersInString("Hello")
// Returns 5
```

But it won't work correctly for languages outside the Basic <example-value> Plane, such as Osage:

```csharp
CountLettersInString("𐓏𐓘𐓻𐓘𐓻𐓟 𐒻𐓟")
// Returns 0
```

The reason this method returns incorrect results for Osage text is that the `char` instances for Osage letters are surrogate code points. No single surrogate code point has enough information to determine if it's a letter.

If you change this code to use `Rune` instead of `char`, the method works correctly with code points outside the Basic <example-value> Plane:

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/CountLettersInString.cs._

Here's equivalent code that works with a `ReadOnlySpan<char>`:

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/CountLettersInSpan.cs._
The preceding code counts Osage letters correctly:

```csharp
CountLettersInString("𐓏𐓘𐓻𐓘𐓻𐓟 𐒻𐓟")
// Returns 8
```

#### Code that explicitly handles surrogate pairs

Consider using the `Rune` type if your code calls APIs that explicitly operate on surrogate code points, such as the following methods:

* `Char.IsSurrogate`
* `Char.IsSurrogatePair`
* `Char.IsHighSurrogate`
* `Char.IsLowSurrogate`
* `Char.ConvertFromUtf32`
* `Char.ConvertToUtf32`

For example, the following method has special logic to deal with surrogate `char` pairs:

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/WorkWithSurrogates.cs._
Such code is simpler if it uses `Rune`, as in the following example:

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/WorkWithSurrogates.cs._
#### When not to use `Rune`

You don't need to use the `Rune` type if your code:

* Looks for exact `char` matches
* Splits a string on a known char value

Using the `Rune` type may return incorrect results if your code:

* Counts the number of display characters in a `string`

#### Look for exact `char` matches

The following code iterates through a `string` looking for specific characters, returning the index of the first match. There's no need to change this code to use `Rune`, as the code is looking for characters that are represented by a single `char`.

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/FindFirstLetter.cs._
#### Split a string on a known `char`

It's common to call `string.Split` and use delimiters such as `' '` (space) or `','` (comma), as in the following example:

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/SplitStringOnChar.cs._
There is no need to use `Rune` here, because the code is looking for characters that are represented by a single `char`.

#### Count the number of display characters in a `string`

The number of `Rune` instances in a string might not match the number of user-perceivable characters shown when displaying the string.

Since `Rune` instances represent Unicode scalar values, components that follow the Unicode text segmentation guidelines can use `Rune` as a building block for counting display characters.

The `StringInfo` type can be used to count display characters, but it doesn't count correctly in all scenarios for .NET implementations other than .NET 5+.

For more information, see Grapheme clusters.

#### How to instantiate a `Rune`

There are several ways to get a `Rune` instance. You can use a constructor to create a `Rune` directly from:

* A code point.

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/InstantiateRunes.cs._
* A single `char`.

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/InstantiateRunes.cs._
* A surrogate `char` pair.

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/InstantiateRunes.cs._
All of the constructors throw an `ArgumentException` if the input doesn't represent a valid Unicode scalar value.

There are `Rune.TryCreate` methods available for callers who don't want exceptions to be thrown on failure.

`Rune` instances can also be read from existing input sequences. For instance, given a `ReadOnlySpan<char>` that represents UTF-16 data, the `Rune.DecodeFromUtf16` method returns the first `Rune` instance at the beginning of the input span. The `Rune.DecodeFromUtf8` method operates similarly, accepting a `ReadOnlySpan<byte>` parameter that represents UTF-8 data. There are equivalent methods to read from the end of the span instead of the beginning of the span.

#### Query properties of a `Rune`

To get the integer code point value of a `Rune` instance, use the `Value` property.

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/InstantiateRunes.cs._
Many of the static APIs available on the `char` type are also available on the `Rune` type. For instance, `Rune.IsWhiteSpace` and `Rune.GetUnicodeCategory` are equivalents to `Char.IsWhiteSpace` and `Char.GetUnicodeCategory` methods. The `Rune` methods correctly handle surrogate pairs.

The following example code takes a `ReadOnlySpan<char>` as input and trims from both the start and the end of the span every `Rune` that isn't a letter or a digit.

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/TrimNonLettersAndNonDigits.cs._
There are some API differences between `char` and `Rune`. For example:

* There is no `Rune` equivalent to `IsSurrogate`, since `Rune` instances by definition can never be surrogate code points.
* The `Rune.GetUnicodeCategory` doesn't always return the same result as `Char.GetUnicodeCategory`. It does return the same value as `CharUnicodeInfo.GetUnicodeCategory`. For more information, see the **Remarks** on `Char.GetUnicodeCategory`.

#### Convert a `Rune` to UTF-8 or UTF-16

Since a `Rune` is a Unicode scalar value, it can be converted to UTF-8, UTF-16, or UTF-32 encoding. The `Rune` type has built-in support for conversion to UTF-8 and UTF-16.

The `Rune.EncodeToUtf16` converts a `Rune` instance to `char` instances. To query the number of `char` instances that would result from converting a `Rune` instance to UTF-16, use the `Utf16SequenceLength` property. Similar methods exist for UTF-8 conversion.

The following example converts a `Rune` instance to a `char` array. The code assumes you have a `Rune` instance in the `rune` variable:

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/EncodeRune.cs._
Since a `string` is a sequence of UTF-16 chars, the following example also converts a `Rune` instance to UTF-16:

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/EncodeRune.cs._
The following example converts a `Rune` instance to a `UTF-8` byte array:

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/EncodeRune.cs._
The `Rune.EncodeToUtf16` and `Rune.EncodeToUtf8` methods return the actual number of elements written. They throw an exception if the destination buffer is too short to contain the result. There are non-throwing `Rune.TryEncodeToUtf8` and `Rune.TryEncodeToUtf16` methods as well for callers who want to avoid exceptions.

#### Rune in .NET vs. other languages

The term "rune" is not defined in the Unicode Standard. The term dates back to the creation of UTF-8. Rob Pike and Ken Thompson were looking for a term to describe what would eventually become known as a code point. They settled on the term "rune", and Rob Pike's later influence over the Go programming language helped popularize the term.

However, the .NET `Rune` type is not the equivalent of the Go `rune` type. In Go, the `rune` type is an alias for `int32`. A Go rune is intended to represent a Unicode code point, but it can be any 32-bit value, including surrogate code points and values that are not legal Unicode code points.

For similar types in other programming languages, see Rust's primitive `char` type or Swift's `Unicode.Scalar` type, both of which represent Unicode scalar values. They provide functionality similar to .NET's `Rune` type, and they disallow instantiation of values that are not legal Unicode scalar values.

## Rune.Rune(Char) constructor

```csharp
public Rune (char ch);
```

Creates a `Rune` from the provided UTF-16 code unit.

Parameters:

- `ch`: A UTF-16 code unit.

Exceptions:

- `ArgumentOutOfRangeException`: `ch` represents a UTF-16 surrogate code point (U+D800..U+DFFF, inclusive).

To be added.

## Rune.Rune(Int32) constructor

```csharp
public Rune (int value);
```

Creates a `Rune` from the specified 32-bit integer that represents a Unicode scalar value.

Parameters:

- `value`: A Unicode scalar value.

Exceptions:

- `ArgumentOutOfRangeException`: `value` does not represent a Unicode scalar value.

To be added.

## Rune.Rune(UInt32) constructor

```csharp
public Rune (uint value);
```

Creates a `Rune` from the specified 32-bit unsigned integer that represents a Unicode scalar value.

Parameters:

- `value`: A Unicode scalar value.

Exceptions:

- `ArgumentOutOfRangeException`: `value` does not represent a Unicode scalar value.

To be added.

## Rune.Rune(Char, Char) constructor

```csharp
public Rune (char highSurrogate, char lowSurrogate);
```

Creates a `Rune` from the provided UTF-16 surrogate pair.

Parameters:

- `highSurrogate`: The high surrogate of the surrogate pair.
- `lowSurrogate`: The low surrogate of the surrogate pair.

Exceptions:

- `ArgumentOutOfRangeException`: `highSurrogate` does not represent a UTF-16 high surrogate code point.

-or-

`lowSurrogate` does not represent a UTF-16 low surrogate code point.

To be added.

## Rune.IsAscii property

```csharp
public bool IsAscii { get; }
```

Gets a value that indicates whether the scalar value associated with this `Rune` is within the ASCII encoding range.

Returns: `true` if the scalar value associated is within the ASCII encoding range ([ U+0000..U+007F ]) and therefore representable by a single UTF-8 code unit; otherwise, `false`.

To be added.

## Rune.IsBmp property

```csharp
public bool IsBmp { get; }
```

Gets a value that indicates whether the scalar value associated with this `Rune` is within the BMP encoding range.

Returns: `true` if the scalar value associated is within the BMP encoding range ([ U+0000..U+FFFF ]) and therefore representable by a single UTF-16 code unit; otherwise, `false`.

To be added.

## Rune.Plane property

```csharp
public int Plane { get; }
```

Gets the Unicode plane (0 to 16, inclusive) that contains this scalar.

Returns: The Unicode plane (0 to 16, inclusive) that contains this scalar.

To be added.

## Rune.ReplacementChar property

```csharp
public static System.Text.Rune ReplacementChar { get; }
```

Gets a `Rune` instance that represents the Unicode replacement character U+FFFD.

Returns: A `Rune` instance that represents the Unicode replacement character U+FFFD.

To be added.

## Rune.Utf16SequenceLength property

```csharp
public int Utf16SequenceLength { get; }
```

Gets the length in code units (`Char`) of the UTF-16 sequence required to represent this scalar value.

Returns: The length in code units (`Char`) of the UTF-16 sequence required to represent this scalar value.

#### Remarks

The return value will be 1 or 2.

## Rune.Utf8SequenceLength property

```csharp
public int Utf8SequenceLength { get; }
```

Gets the length in code units of the UTF-8 sequence required to represent this scalar value.

Returns: The length in code units of the UTF-8 sequence required to represent this scalar value.

#### Remarks

The return value will be 1 through 4, inclusive.

## Rune.Value property

```csharp
public int Value { get; }
```

Gets the Unicode scalar value as an integer.

Returns: The Unicode scalar value as an integer.

To be added.

## Rune.CompareTo(Rune) method

```csharp
public int CompareTo (System.Text.Rune other);
```

Compares the current instance to the specified `Rune` instance.

Parameters:

- `other`: The instance to compare with the current instance.

Returns: A signed integer indicating the position of this instance in the sort order in relation to `other`: - Less than zero: This instance precedes `other`.
- Zero: The instance has the same position in the sort order as `other`.
- Greater than zero: This instance follows `other`.

To be added.
