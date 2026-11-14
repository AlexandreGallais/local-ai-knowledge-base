---
title: "Char struct (part 1 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Char.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Char struct

Namespace: `System`

```csharp
public readonly struct Char : IComparable<char>, IConvertible, IEquatable<char>, IParsable<char>, ISpanParsable<char>, IUtf8SpanParsable<char>, System.Numerics.IAdditionOperators<char,char,char>, System.Numerics.IAdditiveIdentity<char,char>, System.Numerics.IBinaryInteger<char>, System.Numerics.IBinaryNumber<char>, System.Numerics.IBitwiseOperators<char,char,char>, System.Numerics.IComparisonOperators<char,char,bool>, System.Numerics.IDecrementOperators<char>, System.Numerics.IDivisionOperators<char,char,char>, System.Numerics.IEqualityOperators<char,char,bool>, System.Numerics.IIncrementOperators<char>, System.Numerics.IMinMaxValue<char>, System.Numerics.IModulusOperators<char,char,char>, System.Numerics.IMultiplicativeIdentity<char,char>, System.Numerics.IMultiplyOperators<char,char,char>, System.Numerics.INumber<char>, System.Numerics.INumberBase<char>, System.Numerics.IShiftOperators<char,int,char>, System.Numerics.ISubtractionOperators<char,char,char>, System.Numerics.IUnaryNegationOperators<char,char>, System.Numerics.IUnaryPlusOperators<char,char>, System.Numerics.IUnsignedNumber<char>
```

Represents a character as a UTF-16 code unit.

The `Char` structure represents Unicode code points by using UTF-16 encoding. The value of a `Char` object is its 16-bit numeric (ordinal) value.

If you aren't familiar with Unicode, scalar values, code points, surrogate pairs, UTF-16, and the `Rune` type, see Introduction to character encoding in .NET.

This article examines the relationship between a `Char` object and a character and discusses some common tasks performed with `Char` instances. We recommend that you consider the `Rune` type as an alternative to `Char` for performing some of these tasks.

#### Char objects, Unicode characters, and strings

A `String` object is a sequential collection of `Char` structures that represents a string of text. Most Unicode characters can be represented by a single `Char` object, but a character that is encoded as a base character, surrogate pair, and/or combining character sequence is represented by multiple `Char` objects. For this reason, a `Char` structure in a `String` object is not necessarily equivalent to a single Unicode character.

Multiple 16-bit code units are used to represent single Unicode characters in the following cases:

- Glyphs, which may consist of a single character or of a base character followed by one or more combining characters. For example, the character ä is represented by a `Char` object whose code unit is U+0061 followed by a `Char` object whose code unit is U+0308. (The character ä can also be defined by a single `Char` object that has a code unit of U+00E4.) The following example illustrates that the character ä consists of two `Char` objects.

_Code sample not included: ~/snippets/csharp/System/Char/Overview/grapheme1.cs._

- Characters outside the Unicode Basic <example-value> Plane (BMP). Unicode supports sixteen planes in addition to the BMP, which represents plane 0. A Unicode code point is represented in UTF-32 by a 21-bit value that includes the plane. For example, U+1D160 represents the MUSICAL SYMBOL EIGHTH NOTE character. Because UTF-16 encoding has only 16 bits, characters outside the BMP are represented by surrogate pairs in UTF-16. The following example illustrates that the UTF-32 equivalent of U+1D160, the MUSICAL SYMBOL EIGHTH NOTE character, is U+D834 U+DD60. U+D834 is the high surrogate; high surrogates range from U+D800 through U+DBFF. U+DD60 is the low surrogate; low surrogates range from U+DC00 through U+DFFF.

_Code sample not included: ~/snippets/csharp/System/Char/Overview/surrogate1.cs._

#### Characters and character categories

Each Unicode character or valid surrogate pair belongs to a Unicode category. In .NET, Unicode categories are represented by members of the `UnicodeCategory` enumeration and include values such as `CurrencySymbol`, `LowercaseLetter`, and `SpaceSeparator`, for example.

To determine the Unicode category of a character, call the `Char.GetUnicodeCategory` method. For example, the following example calls the `Char.GetUnicodeCategory` to display the Unicode category of each character in a string. The example works correctly only if there are no surrogate pairs in the `String` instance.

_Code sample not included: ~/snippets/csharp/System/Char/Overview/GetUnicodeCategory3.cs._

Internally, for characters outside the ASCII range (U+0000 through U+00FF), the `Char.GetUnicodeCategory` method depends on Unicode categories reported by the `CharUnicodeInfo` class. Unicode characters are classified based on The Unicode Standard, Version 8.0.0.

#### Characters and text elements

Because a single character can be represented by multiple `Char` objects, it is not always meaningful to work with individual `Char` objects. For instance, the following example converts the Unicode code points that represent the Aegean numbers zero through 9 to UTF-16 encoded code units. Because it erroneously equates `Char` objects with characters, it inaccurately reports that the resulting string has 20 characters.

_Code sample not included: ~/snippets/csharp/System/Char/Overview/textelements2.cs._

You can do the following to avoid the assumption that a `Char` object represents a single character:

- You can work with a `String` object in its entirety instead of working with its individual characters to represent and analyze linguistic content.

- You can use `String.EnumerateRunes` as shown in the following example:

_Code sample not included: ~/snippets/csharp/System.Text/Rune/Overview/CountLettersInString.cs._

- You can use the `StringInfo` class to work with text elements instead of individual `Char` objects. The following example uses the `StringInfo` object to count the number of text elements in a string that consists of the Aegean numbers zero through nine. Because it considers a surrogate pair a single character, it correctly reports that the string contains ten characters.

_Code sample not included: ~/snippets/csharp/System/Char/Overview/textelements2a.cs._

- If a string contains a base character that has one or more combining characters, you can call the `String.Normalize` method to convert the substring to a single UTF-16 encoded code unit. The following example calls the `String.Normalize` method to convert the base character U+0061 (LATIN SMALL LETTER A) and combining character U+0308 (COMBINING DIAERESIS) to U+00E4 (LATIN SMALL LETTER A WITH DIAERESIS).

_Code sample not included: ~/snippets/csharp/System/Char/Overview/normalized.cs._

#### Common operations

The `Char` structure provides methods to compare `Char` objects, convert the value of the current `Char` object to an object of another type, and determine the Unicode category of a `Char` object:

|To do this|Use these `System.Char` methods|
|----------------|-------------------------------------|
|Compare `Char` objects|`Char.CompareTo` and `Char.Equals`|
|Convert a code point to a string|`Char.ConvertFromUtf32`See also the `Rune` type.|
|Convert a `Char` object or a surrogate pair of `Char` objects to a code point|For a single character: `ToInt32`For a surrogate pair or a character in a string: `Char.ConvertToUtf32`See also the `Rune` type.|
|Get the Unicode category of a character|`Char.GetUnicodeCategory`See also `Rune.GetUnicodeCategory`.|
|Determine whether a character is in a particular Unicode category such as digit, letter, punctuation, control character, and so on|`Char.IsControl`, `Char.IsDigit`, `Char.IsHighSurrogate`, `Char.IsLetter`, `Char.IsLetterOrDigit`, `Char.IsLower`, `Char.IsLowSurrogate`, `Char.IsNumber`, `Char.IsPunctuation`, `Char.IsSeparator`, `Char.IsSurrogate`, `Char.IsSurrogatePair`, `Char.IsSymbol`, `Char.IsUpper`, and `Char.IsWhiteSpace`See also corresponding methods on the `Rune` type.|
|Convert a `Char` object that represents a number to a numeric value type|`Char.GetNumericValue`See also `Rune.GetNumericValue`.|
|Convert a character in a string into a `Char` object|`Char.Parse` and `Char.TryParse`|
|Convert a `Char` object to a `String` object|`Char.ToString`|
|Change the case of a `Char` object|`Char.ToLower`, `Char.ToLowerInvariant`, `Char.ToUpper`, and `Char.ToUpperInvariant`See also corresponding methods on the `Rune` type.|

#### Char values and interop

When a managed `Char` type, which is represented as a Unicode UTF-16 encoded code unit, is passed to unmanaged code, the interop marshaller converts the character set to ANSI by default. You can apply the `DllImportAttribute` attribute to platform invoke declarations and the `StructLayoutAttribute` attribute to a COM interop declaration to control which character set a marshaled `Char` type uses.

The following code example demonstrates some of the methods in `Char`.

_Code sample not included: ~/snippets/csharp/System/Char/Overview/charstructure.cs._

## Char.System.Numerics.IAdditiveIdentity<System.Char,System.Char>.AdditiveIdentity property

```csharp
static char System.Numerics.IAdditiveIdentity<System.Char,System.Char>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## Char.System.Numerics.IBinaryNumber<System.Char>.AllBitsSet property

```csharp
static char System.Numerics.IBinaryNumber<System.Char>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## Char.System.Numerics.IMinMaxValue<System.Char>.MaxValue property

```csharp
static char System.Numerics.IMinMaxValue<System.Char>.MaxValue { get; }
```

Gets the maximum value of the current type.

Returns: To be added.

To be added.

## Char.System.Numerics.IMinMaxValue<System.Char>.MinValue property

```csharp
static char System.Numerics.IMinMaxValue<System.Char>.MinValue { get; }
```

Gets the minimum value of the current type.

Returns: To be added.

To be added.

## Char.System.Numerics.IMultiplicativeIdentity<System.Char,System.Char>.MultiplicativeIdentity property

```csharp
static char System.Numerics.IMultiplicativeIdentity<System.Char,System.Char>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## Char.System.Numerics.INumberBase<System.Char>.One property

```csharp
static char System.Numerics.INumberBase<System.Char>.One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## Char.System.Numerics.INumberBase<System.Char>.Radix property

```csharp
static int System.Numerics.INumberBase<System.Char>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## Char.System.Numerics.INumberBase<System.Char>.Zero property

```csharp
static char System.Numerics.INumberBase<System.Char>.Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## Char.CompareTo(Char) method

```csharp
public int CompareTo (char value);
```

Compares this instance to a specified `Char` object and indicates whether this instance precedes, follows, or appears in the same position in the sort order as the specified `Char` object.

Parameters:

- `value`: A `Char` object to compare.

Returns: A signed number indicating the position of this instance in the sort order in relation to the `value` parameter.

-  Less than zero

:  This instance precedes `value`.

-  Zero

:  This instance has the same position in the sort order as `value`.

-  Greater than zero

:  This instance follows `value`.

#### Remarks
This method implements the `IComparable<T>` interface and performs slightly better than the `Char.CompareTo` method because it does not have to convert the `value` parameter to an object.

The comparison performed by this method is based on the encoded values of this instance and `value`, not their lexicographical characteristics.

If the `Char.CompareTo` method parameter type has fewer bits (is narrower) than the instance type, some programming languages perform an implicit widening conversion that transforms the value of the parameter into a value with more bits.

For example, suppose the instance type is `Int32` and the parameter type is `Byte`. The Microsoft C# compiler generates instructions to represent the value of the parameter as an `Int32` object, then generates a `Int32.CompareTo` method that compares the values of the `Int32` instance and the `Int32` parameter representation.

Typically, implicit widening conversions are performed on numeric types. Consult your programming language's documentation to determine if its compiler performs widening conversions. If the instance and parameter types mismatch and a suitable conversion is not available, the compiler generates instructions to box the parameter and invoke the `Char.CompareTo` overload that takes an `Object` parameter.

#### Examples
The following code example demonstrates generic and non-generic versions of the `CompareTo` method for several value and reference types.

_Code sample not included: ~/snippets/csharp/System/Boolean/CompareTo/cat.cs._

## Char.CompareTo(Object) method

```csharp
public int CompareTo (object? value);
```

Compares this instance to a specified object and indicates whether this instance precedes, follows, or appears in the same position in the sort order as the specified `Object`.

Parameters:

- `value`: An object to compare this instance to, or `null`.

Returns: A signed number indicating the position of this instance in the sort order in relation to the `value` parameter.

-  Less than zero

:  This instance precedes `value`.

-  Zero

:  This instance has the same position in the sort order as `value`.

-  Greater than zero

:  This instance follows `value`.

-or-

`value` is `null`.

Exceptions:

- `ArgumentException`: `value` is not a `Char` object.

#### Remarks
The `Char.CompareTo` method implements the `IComparable` interface.

The `value` parameter must be `null` or an instance of `Char`; otherwise, an exception is thrown.

The comparison performed by this method is based on the encoded values of this instance and `value`, not necessarily their lexicographical characteristics. Any instance of `Char`, regardless of its value, is considered greater than `null`.

#### Examples
The following code example demonstrates `Char.CompareTo`.

_Code sample not included: ~/snippets/csharp/System/Char/CompareTo/compareto.cs._
