---
title: "String class (part 4 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 4 of 26)

For more information and an example, see the Normalization section earlier in this article.

## String.String(Char*) constructor

```csharp
public String (char* value);
```

Initializes a new instance of the `String` class to the value indicated by a specified pointer to an array of Unicode characters.

Parameters:

- `value`: A pointer to a null-terminated array of Unicode characters.

Exceptions:

- `ArgumentOutOfRangeException`: The current process does not have read access to all the addressed characters.
- `ArgumentException`: `value` specifies an array that contains an invalid Unicode character, or `value` specifies an address less than 64000.

#### Remarks

> **Note:**
> For examples and comprehensive usage information about this and other `String` constructor overloads, see the `String.%23ctor` constructor summary.

## String.String(Char[]) constructor

```csharp
public String (char[]? value);
```

Initializes a new instance of the `String` class to the Unicode characters indicated in the specified character array.

Parameters:

- `value`: An array of Unicode characters.

#### Remarks

> **Note:**
> For examples and comprehensive usage information about this and other `String` constructor overloads, see the `String.%23ctor` constructor summary.

## String.String(Char>) constructor

```csharp
public String (ReadOnlySpan<char> value);
```

Initializes a new instance of the `String` class to the Unicode characters indicated in the specified read-only span.

Parameters:

- `value`: A read-only span of Unicode characters.

To be added.

## String.String(SByte*) constructor

```csharp
public String (sbyte* value);
```

Initializes a new instance of the `String` class to the value indicated by a pointer to an array of 8-bit signed integers.

Parameters:

- `value`: A pointer to a null-terminated array of 8-bit signed integers. The integers are interpreted using the current system code page encoding on Windows (referred to as CP_ACP) and as UTF-8 encoding on non-Windows.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentException`: A new instance of `String` could not be initialized using `value`, assuming `value` is encoded in ANSI.
- `ArgumentOutOfRangeException`: The length of the new string to initialize, which is determined by the null termination character of `value`, is too large to allocate.
- `AccessViolationException`: `value` specifies an invalid address.

#### Remarks

> **Note:**
> For examples and comprehensive usage information about this and other `String` constructor overloads, see the `String.%23ctor` constructor summary.

## String.String(Char, Int32) constructor

```csharp
public String (char c, int count);
```

Initializes a new instance of the `String` class to the value indicated by a specified Unicode character repeated a specified number of times.

Parameters:

- `c`: A Unicode character.
- `count`: The number of times `c` occurs.

Exceptions:

- `ArgumentOutOfRangeException`: `count` is less than zero.

#### Remarks

> **Note:**
> For examples and comprehensive usage information about this and other `String` constructor overloads, see the `String.%23ctor` constructor summary.

## String.String(Char*, Int32, Int32) constructor

```csharp
public String (char* value, int startIndex, int length);
```

Initializes a new instance of the `String` class to the value indicated by a specified pointer to an array of Unicode characters, a starting character position within that array, and a length.

Parameters:

- `value`: A pointer to an array of Unicode characters.
- `startIndex`: The starting position within `value`.
- `length`: The number of characters within `value` to use.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` or `length` is less than zero, `value` + `startIndex` cause a pointer overflow, or the current process does not have read access to all the addressed characters.
- `ArgumentException`: `value` specifies an array that contains an invalid Unicode character, or `value` + `startIndex` specifies an address less than 64000.

#### Remarks

> **Note:**
> For examples and comprehensive usage information about this and other `String` constructor overloads, see the `String.%23ctor` constructor summary.

## String.String(Char[], Int32, Int32) constructor

```csharp
public String (char[] value, int startIndex, int length);
```

Initializes a new instance of the `String` class to the value indicated by an array of Unicode characters, a starting character position within that array, and a length.

Parameters:

- `value`: An array of Unicode characters.
- `startIndex`: The starting position within `value`.
- `length`: The number of characters within `value` to use.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` or `length` is less than zero.

-or-

The sum of `startIndex` and `length` is greater than the number of elements in `value`.

#### Remarks

> **Note:**
> For examples and comprehensive usage information about this and other `String` constructor overloads, see the `String.%23ctor` constructor summary.

## String.String(SByte*, Int32, Int32) constructor

```csharp
public String (sbyte* value, int startIndex, int length);
```

Initializes a new instance of the `String` class to the value indicated by a specified pointer to an array of 8-bit signed integers, a starting position within that array, and a length.

Parameters:

- `value`: A pointer to an array of 8-bit signed integers. The integers are interpreted using the current system code page encoding on Windows (referred to as CP_ACP) and as UTF-8 encoding on non-Windows.
- `startIndex`: The starting position within `value`.
- `length`: The number of sbytes within `value` to use.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` or `length` is less than zero.

-or-

The address specified by `value` + `startIndex` is too large for the current platform; that is, the address calculation overflowed.

-or-

The length of the new string to initialize is too large to allocate.
- `ArgumentException`: The address specified by `value` + `startIndex` is less than 64K.

-or-

A new instance of `String` could not be initialized using `value`, assuming `value` is encoded in ANSI.
- `AccessViolationException`: `value`, `startIndex`, and `length` collectively specify an invalid address.

#### Remarks

> **Note:**
> For examples and comprehensive usage information about this and other `String` constructor overloads, see the `String.%23ctor` constructor summary.

## String.String(SByte*, Int32, Int32, Encoding) constructor

```csharp
public String (sbyte* value, int startIndex, int length, System.Text.Encoding enc);
```

Initializes a new instance of the `String` class to the value indicated by a specified pointer to an array of 8-bit signed integers, a starting position within that array, a length, and an `Encoding` object.

Parameters:

- `value`: A pointer to an array of 8-bit signed integers.
- `startIndex`: The starting position within `value`.
- `length`: The number of sbytes within `value` to use.
- `enc`: An object that specifies how the array referenced by `value` is encoded. If `enc` is `null`, ANSI encoding is assumed.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` or `length` is less than zero.

-or-

The address specified by `value` + `startIndex` is too large for the current platform; that is, the address calculation overflowed.

-or-

The length of the new string to initialize is too large to allocate.
- `ArgumentException`: The address specified by `value` + `startIndex` is less than 64K.

-or-

A new instance of `String` could not be initialized using `value`, assuming `value` is encoded as specified by `enc`.
- `AccessViolationException`: `value`, `startIndex`, and `length` collectively specify an invalid address.

#### Remarks

> **Note:**
> For examples and comprehensive usage information about this and other `String` constructor overloads, see the `String.%23ctor` constructor summary.

## String.Chars property

```csharp
public char this[int index] { get; }
```

Gets the `Char` object at a specified position in the current `String` object.

Parameters:

- `index`: A position in the current string.

Returns: The object at position `index`.

Exceptions:

- `IndexOutOfRangeException`: `index` is greater than or equal to the length of this object or less than zero.

#### Remarks
The `index` parameter is zero-based.

This property returns the `Char` object at the position specified by the `index` parameter. However, a Unicode character might be represented by more than one `Char`. Use the `StringInfo` class to work with Unicode characters instead of `Char` objects. For more information, see the "Char Objects and Unicode Characters" section in the `String` class overview.

In C#, the `Chars` property is an indexer. In Visual Basic, it is the default property of the `String` class. Each `Char` object in the string can be accessed by using code such as the following.

_Code sample not included: ~/snippets/csharp/System/String/Chars/chars1.cs._

#### Examples
The following example demonstrates how you can use this indexer in a routine to validate a string.

_Code sample not included: ~/snippets/csharp/System/String/Chars/uri_ishexdigit.cs._

## String.Length property

```csharp
public int Length { get; }
```

Gets the number of characters in the current `String` object.

Returns: The number of characters in the current string.

#### Remarks
The `Length` property returns the number of `Char` objects in this instance, not the number of Unicode characters. The reason is that a Unicode character might be represented by more than one `Char`. Use the `StringInfo` class to work with each Unicode character instead of each `Char`.

In some languages, such as C and C++, a null character indicates the end of a string. In .NET, a null character can be embedded in a string. When a string includes one or more null characters, they are included in the length of the total string. For example, in the following string, the substrings "abc" and "def" are separated by a null character. The `Length` property returns 7, which indicates that it includes the six alphabetic characters as well as the null character.

_Code sample not included: ~/snippets/csharp/System/String/Overview/System.String.Class.cs._

#### Examples
The following example demonstrates the `Length` property.

_Code sample not included: ~/snippets/csharp/System/String/Length/length.cs._

## String.Clone() method

```csharp
public object Clone ();
```

Returns a reference to this instance of `String`.

Returns: This instance of `String`.

#### Remarks
The return value is not an independent copy of this instance; it is simply another view of the same data. Use the `String.Copy` or `String.CopyTo` method to create a separate `String` object with the same value as this instance.

Because the `String.Clone` method simply returns the existing string instance, there is little reason to call it directly.

## String.Compare(String, String) method

```csharp
public static int Compare (string? strA, string? strB);
```

Compares two specified `String` objects and returns an integer that indicates their relative position in the sort order.

Parameters:

- `strA`: The first string to compare.
- `strB`: The second string to compare.

Returns: A 32-bit signed integer that indicates the lexical relationship between the two comparands.

-  Less than zero

: `strA` precedes `strB` in the sort order.

-  Zero

: `strA` occurs in the same position as `strB` in the sort order.

-  Greater than zero

: `strA` follows `strB` in the sort order.

#### Remarks
The comparison uses the current culture to obtain culture-specific information such as casing rules and the alphabetic order of individual characters. For example, a culture could specify that certain combinations of characters be treated as a single character, or uppercase and lowercase characters be compared in a particular way, or that the sorting order of a character depends on the characters that precede or follow it.

The comparison is performed using word sort rules. For more information about word, string, and ordinal sorts, see `CompareOptions`.

> **Warning:**
> When comparing strings, you should call the `Compare` method, which requires that you explicitly specify the type of string comparison that the method uses. For more information, see Best Practices for Using Strings.

One or both comparands can be `null`. By definition, any string, including the empty string (""), compares greater than a null reference; and two null references compare equal to each other.

The comparison terminates when an inequality is discovered or both strings have been compared. However, if the two strings compare equal to the end of one string, and the other string has characters remaining, then the string with remaining characters is considered greater. The return value is the result of the last comparison performed.

Unexpected results can occur when comparisons are affected by culture-specific casing rules. For example, in Turkish, the following example yields the wrong results because the file system in Turkish does not use linguistic casing rules for the letter "i" in "file".

_Code sample not included: ~/snippets/csharp/System/String/Compare/remarks.cs._

Compare the path name to "file" using an ordinal comparison. The correct code to do this is as follows:

_Code sample not included: ~/snippets/csharp/System/String/Compare/remarks.cs._

#### Examples
The following example calls the `Compare` method to compare three sets of strings.

_Code sample not included: ~/snippets/csharp/System/String/Compare/compare02.cs._

In the following example, the `ReverseStringComparer` class demonstrates how you can evaluate two strings with the `String.Compare` method.

_Code sample not included: ~/snippets/csharp/System/String/Compare/ArrayListSample.cs._
