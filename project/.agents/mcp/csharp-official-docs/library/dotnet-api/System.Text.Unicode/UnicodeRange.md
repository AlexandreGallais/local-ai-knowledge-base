---
title: "UnicodeRange class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Unicode/UnicodeRange.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnicodeRange class

Namespace: `System.Text.Unicode`

```csharp
public sealed class UnicodeRange
```

Represents a contiguous range of Unicode code points.

#### Remarks

You use the static `UnicodeRange.Create` method or the `UnicodeRange.%23ctor` constructor to create a an arbitrary range of Unicode code points. You use the static properties of the `UnicodeRanges` class to retrieve a `UnicodeRange` instance that contains the code points in a Unicode named range.

Currently, the `UnicodeRange` class supports only the Basic <example-value> Plane (BMP), which extends from U+0000 to U+FFFF.

## UnicodeRange.UnicodeRange(Int32, Int32) constructor

```csharp
public UnicodeRange (int firstCodePoint, int length);
```

Creates a new `UnicodeRange` that includes a specified number of characters starting at a specified Unicode code point.

Parameters:

- `firstCodePoint`: The first code point in the range.
- `length`: The number of code points in the range.

Exceptions:

- `ArgumentOutOfRangeException`: `firstCodePoint` is less than zero or greater than 0xFFFF.

-or-

`length` is less than zero.

-or-

`firstCodePoint` plus `length` is greater than 0xFFFF.

#### Remarks

Any undefined code points between `firstCodePoint` and `firstCodePoint` + `length` - 1 are included in the `UnicodeRange` instance created by calling this constructor.

## UnicodeRange.FirstCodePoint property

```csharp
public int FirstCodePoint { get; }
```

Gets the first code point in the range represented by this `UnicodeRange` instance.

Returns: The first code point in the range.

To be added.

## UnicodeRange.Length property

```csharp
public int Length { get; }
```

Gets the number of code points in the range represented by this `UnicodeRange` instance.

Returns: The number of code points in the range.

To be added.

## UnicodeRange.Create(Char, Char) method

```csharp
public static System.Text.Unicode.UnicodeRange Create (char firstCharacter, char lastCharacter);
```

Creates a new `UnicodeRange` instance from a span of characters.

Parameters:

- `firstCharacter`: The first character in the range.
- `lastCharacter`: The last character in the range.

Returns: A range that includes all characters between `firstCharacter` and `lastCharacter`.

Exceptions:

- `ArgumentOutOfRangeException`: `lastCharacter` precedes `firstCharacter`.

To be added.
