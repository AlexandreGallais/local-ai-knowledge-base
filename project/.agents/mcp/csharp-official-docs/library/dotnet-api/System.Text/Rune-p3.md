---
title: "Rune struct (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Rune.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Rune struct (part 3 of 4)

## Rune.IsSymbol(Rune) method

```csharp
public static bool IsSymbol (System.Text.Rune value);
```

Returns a value that indicates whether the specified rune is categorized as a symbol character.

Parameters:

- `value`: The rune to evaluate.

Returns: `true` if `value` is a symbol character; otherwise, `false`.

#### Remarks

This method is equivalent to querying `GetUnicodeCategory` and comparing the result against any of the values `MathSymbol`, `CurrencySymbol`, `ModifierSymbol`, and `OtherSymbol`.

For more information, see `Char.IsSymbol`.

## Rune.IsUpper(Rune) method

```csharp
public static bool IsUpper (System.Text.Rune value);
```

Returns a value that indicates whether the specified rune is categorized as an uppercase letter.

Parameters:

- `value`: The rune to evaluate.

Returns: `true` if `value` is an uppercase letter; otherwise,`false`.

#### Remarks

This method is equivalent to querying `GetUnicodeCategory` and comparing the result against `UppercaseLetter`.

For more information, see `Char.IsUpper`.

## Rune.IsValid(Int32) method

```csharp
public static bool IsValid (int value);
```

Returns a value that indicates whether a 32-bit signed integer represents a valid Unicode scalar value; that is, it is in the range [ U+0000..U+D7FF ], inclusive; or [ U+E000..U+10FFFF ], inclusive.

Parameters:

- `value`: The Unicode scalar value.

Returns: `true` if `value` is a valid Unicode scalar value; otherwise, `false`.

To be added.

## Rune.IsValid(UInt32) method

```csharp
public static bool IsValid (uint value);
```

Returns a value that indicates whether a 32-bit unsigned integer represents a valid Unicode scalar value; that is, it is in the range [ U+0000..U+D7FF ], inclusive, or [ U+E000..U+10FFFF ], inclusive.

Parameters:

- `value`: The Unicode scalar value.

Returns: `true` if `value` is a valid Unicode scalar value; otherwise, `false`.

To be added.

## Rune.IsWhiteSpace(Rune) method

```csharp
public static bool IsWhiteSpace (System.Text.Rune value);
```

Returns a value that indicates whether the specified rune is categorized as a white space character.

Parameters:

- `value`: The rune to evaluate.

Returns: `true` if `value` is a white space character; otherwise, `false`.

#### Remarks

This method is generally equivalent to querying `GetUnicodeCategory` and comparing the result against any of the values `SpaceSeparator`, `LineSeparator`, and `ParagraphSeparator`. However, there are some `Rune`s in the `Control` category which are also classified as white space characters, and this method accounts for those values.

For more information, see `Char.IsWhiteSpace`.

## Rune.op_Equality(Rune, Rune) method

```csharp
public static bool operator == (System.Text.Rune left, System.Text.Rune right);
```

Returns a value that indicates whether two `Rune` instances are equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are equal; otherwise, `false`.

To be added.

## Rune.op_Explicit(Char) method

```csharp
public static explicit operator System.Text.Rune (char ch);
```

Defines an explicit conversion of a 16-bit Unicode character to a `Rune`.

Parameters:

- `ch`: The 16-bit Unicode character to convert.

Returns: `ch` as a 32-bit Unicode character.

Exceptions:

- `ArgumentOutOfRangeException`: `ch` is a Unicode scalar that represents a surrogate code point.

To be added.

## Rune.op_Explicit(Int32) method

```csharp
public static explicit operator System.Text.Rune (int value);
```

Defines an explicit conversion of a 32-bit signed integer to a `Rune`.

Parameters:

- `value`: The 32-bit signed integer to convert.

Returns: `value` as a 32-bit Unicode character.

Exceptions:

- `ArgumentOutOfRangeException`: `value` is an invalid Unicode scalar.

To be added.

## Rune.op_Explicit(UInt32) method

```csharp
public static explicit operator System.Text.Rune (uint value);
```

Defines an explicit conversion of a 32-bit unsigned integer to a `Rune`.

Parameters:

- `value`: The 32-bit signed integer to convert.

Returns: `value` as a 32-bit Unicode character.

Exceptions:

- `ArgumentOutOfRangeException`: `value` is an invalid Unicode scalar.

To be added.

## Rune.op_GreaterThan(Rune, Rune) method

```csharp
public static bool operator > (System.Text.Rune left, System.Text.Rune right);
```

Returns a value indicating whether a specified `Rune` is greater than another specified `Rune`.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

To be added.

## Rune.op_GreaterThanOrEqual(Rune, Rune) method

```csharp
public static bool operator >= (System.Text.Rune left, System.Text.Rune right);
```

Returns a value indicating whether a specified `Rune` is greater than or equal to another specified `Rune`.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

To be added.

## Rune.op_Inequality(Rune, Rune) method

```csharp
public static bool operator != (System.Text.Rune left, System.Text.Rune right);
```

Returns a value that indicates whether two `Rune` instances have different values.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are not equal; otherwise, `false`.

To be added.

## Rune.op_LessThan(Rune, Rune) method

```csharp
public static bool operator < (System.Text.Rune left, System.Text.Rune right);
```

Returns a value indicating whether a specified `Rune` is less than another specified `Rune`.

Parameters:

- `left`: The first value to compare.
- `right`: the second value to compare.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

To be added.

## Rune.op_LessThanOrEqual(Rune, Rune) method

```csharp
public static bool operator <= (System.Text.Rune left, System.Text.Rune right);
```

Returns a value indicating whether a specified `Rune` is less than or equal to another specified `Rune`.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

To be added.

## Rune.System.IComparable.CompareTo(Object) method

```csharp
int IComparable.CompareTo (object obj);
```

Compares the current instance to the specified object.

Parameters:

- `obj`: The object to compare with the current instance.

Returns: A signed integer indicating the position of this instance in the sort order in relation to `obj`: - Less than zero: This instance precedes `obj`.
- Zero: The instance has the same position in the sort order as `obj`.
- Greater than zero: This instance follows `obj`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Rune` instance is cast to an `IComparable` interface.

## Rune.System.IFormattable.ToString(String, IFormatProvider) method

```csharp
string IFormattable.ToString (string format, IFormatProvider formatProvider);
```

Formats the value of the current instance using the specified format.

Parameters:

- `format`: The format to use.
-or-
`null` (`Nothing` in Visual Basic) to use the default format defined for the type of the `IFormattable` implementation.
- `formatProvider`: The provider to use to format the value.
-or-
`null` (`Nothing` in Visual Basic) to obtain the numeric format information from the current locale setting of the operating system.

Returns: The value of the current instance in the specified format.

To be added.

## Rune.System.IParsable<System.Text.Rune>.Parse(String, IFormatProvider) method

```csharp
static System.Text.Rune IParsable<Rune>.Parse (string s, IFormatProvider provider);
```

To be added.

Parameters:

- `s`: To be added.
- `provider`: To be added.

Returns: To be added.

To be added.

## Rune.System.IParsable<System.Text.Rune>.TryParse(String, IFormatProvider, Rune) method

```csharp
static bool IParsable<Rune>.TryParse (string s, IFormatProvider provider, out System.Text.Rune result);
```

To be added.

Parameters:

- `s`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Rune.System.ISpanFormattable.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
bool ISpanFormattable.TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format, IFormatProvider provider);
```

Tries to format the value of the current instance into the provided span of characters.

Parameters:

- `destination`: When this method returns, contains this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Rune.System.ISpanParsable<System.Text.Rune>.Parse(Char>, IFormatProvider) method

```csharp
static System.Text.Rune ISpanParsable<Rune>.Parse (ReadOnlySpan<char> s, IFormatProvider provider);
```

To be added.

Parameters:

- `s`: To be added.
- `provider`: To be added.

Returns: To be added.

To be added.

## Rune.System.ISpanParsable<System.Text.Rune>.TryParse(Char>, IFormatProvider, Rune) method

```csharp
static bool ISpanParsable<Rune>.TryParse (ReadOnlySpan<char> s, IFormatProvider provider, out System.Text.Rune result);
```

To be added.

Parameters:

- `s`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Rune.System.IUtf8SpanFormattable.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

```csharp
bool IUtf8SpanFormattable.TryFormat (Span<byte> utf8Destination, out int bytesWritten, ReadOnlySpan<char> format, IFormatProvider provider);
```

Tries to format the value of the current instance as UTF-8 into the provided span of bytes.

Parameters:

- `utf8Destination`: The span in which to write this instance's value formatted as a span of bytes.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `utf8Destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `utf8Destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `utf8Destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Rune.System.IUtf8SpanParsable<System.Text.Rune>.Parse(Byte>, IFormatProvider) method

```csharp
static System.Text.Rune IUtf8SpanParsable<Rune>.Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## Rune.System.IUtf8SpanParsable<System.Text.Rune>.TryParse(Byte>, IFormatProvider, Rune) method

```csharp
static bool IUtf8SpanParsable<Rune>.TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider provider, out System.Text.Rune result);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Rune.ToLower(Rune, CultureInfo) method

```csharp
public static System.Text.Rune ToLower (System.Text.Rune value, System.Globalization.CultureInfo culture);
```

Returns a copy of the specified `Rune` converted to lowercase, using the casing rules of the specified culture.

Parameters:

- `value`: The 32-bit Unicode character to convert.
- `culture`: An object that supplies culture-specific casing rules.

Returns: The lowercase equivalent of `value`.

To be added.

## Rune.ToLowerInvariant(Rune) method

```csharp
public static System.Text.Rune ToLowerInvariant (System.Text.Rune value);
```

Returns a copy of the specified `Rune` converted to lowercase using the casing rules of the invariant culture.

Parameters:

- `value`: The 32-bit Unicode character to convert.

Returns: The lowercase equivalent of `value`.

To be added.

## Rune.ToLowerOrdinal(Rune) method

```csharp
public static System.Text.Rune ToLowerOrdinal (System.Text.Rune value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Rune.ToString() method

```csharp
public override string ToString ();
```

Returns the string representation of this `Rune` instance.

Returns: The string representation of this rune.

To be added.

## Rune.ToUpper(Rune, CultureInfo) method

```csharp
public static System.Text.Rune ToUpper (System.Text.Rune value, System.Globalization.CultureInfo culture);
```

Returns a copy of the specified `Rune` converted to uppercase, using the casing rules of the specified culture.

Parameters:

- `value`: The 32-bit Unicode character to convert.
- `culture`: An object that supplies culture-specific casing rules.

Returns: The uppercase equivalent of `value`.

To be added.

## Rune.ToUpperInvariant(Rune) method

```csharp
public static System.Text.Rune ToUpperInvariant (System.Text.Rune value);
```

Returns a copy of the specified `Rune` converted to uppercase using the casing rules of the invariant culture.

Parameters:

- `value`: The 32-bit Unicode character to convert.

Returns: The uppercase equivalent of `value`.

To be added.

## Rune.ToUpperOrdinal(Rune) method

```csharp
public static System.Text.Rune ToUpperOrdinal (System.Text.Rune value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Rune.TryCreate(Char, Rune) method

```csharp
public static bool TryCreate (char ch, out System.Text.Rune result);
```

Attempts to create a `Rune` from a specified character and returns a value that indicates whether the operation succeeded.

Parameters:

- `ch`: The character from which to create the rune.
- `result`: When this method returns, the rune that corresponds to `ch`.

Returns: `true` if the method succeeded; otherwise, `false`.

To be added.

## Rune.TryCreate(Int32, Rune) method

```csharp
public static bool TryCreate (int value, out System.Text.Rune result);
```

Attempts to create a `Rune` from a specified signed integer that represents a Unicode scalar value.

Parameters:

- `value`: The Unicode scalar value.
- `result`: When this method returns, the rune that corresponds to `value`.

Returns: `true` if the method succeeded; otherwise, `false`.

To be added.
