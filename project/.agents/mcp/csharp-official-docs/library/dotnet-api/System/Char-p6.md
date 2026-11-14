---
title: "Char struct (part 6 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Char.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Char struct (part 6 of 9)

## Char.System.IConvertible.ToUInt32(IFormatProvider) method

```csharp
uint IConvertible.ToUInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt32`.

Parameters:

- `provider`: An `IFormatProvider` object. (Specify `null` because the `provider` parameter is ignored.)

Returns: The converted value of the current `Char` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Char` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt32` method instead.

## Char.System.IConvertible.ToUInt64(IFormatProvider) method

```csharp
ulong IConvertible.ToUInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt64`.

Parameters:

- `provider`: An `IFormatProvider` object. (Specify `null` because the `provider` parameter is ignored.)

Returns: The converted value of the current `Char` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Char` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt64` method instead.

## Char.System.IFormattable.ToString(String, IFormatProvider) method

```csharp
string IFormattable.ToString (string format, IFormatProvider formatProvider);
```

Formats the value of the current instance using the specified format.

Parameters:

- `format`: The format to use.
-or-
A `null` reference (`Nothing` in Visual Basic) to use the default format defined for the type of the `IFormattable` implementation.
- `formatProvider`: The provider to use to format the value.
-or-
A `null` reference (`Nothing` in Visual Basic) to obtain the numeric format information from the current locale setting of the operating system.

Returns: The value of the current instance in the specified format.

To be added.

## Char.System.IParsable<System.Char>.Parse(String, IFormatProvider) method

```csharp
static char IParsable<char>.Parse (string s, IFormatProvider provider);
```

Parses a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## Char.System.IParsable<System.Char>.TryParse(String, IFormatProvider, Char) method

```csharp
static bool IParsable<char>.TryParse (string s, IFormatProvider provider, out char result);
```

To be added.

Parameters:

- `s`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Char.System.ISpanFormattable.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
bool ISpanFormattable.TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format, IFormatProvider provider);
```

Tries to format the value of the current instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Char.System.ISpanParsable<System.Char>.Parse(Char>, IFormatProvider) method

```csharp
static char ISpanParsable<char>.Parse (ReadOnlySpan<char> s, IFormatProvider provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## Char.System.ISpanParsable<System.Char>.TryParse(Char>, IFormatProvider, Char) method

```csharp
static bool ISpanParsable<char>.TryParse (ReadOnlySpan<char> s, IFormatProvider provider, out char result);
```

To be added.

Parameters:

- `s`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Char.System.IUtf8SpanFormattable.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

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

## Char.System.IUtf8SpanParsable<System.Char>.Parse(Byte>, IFormatProvider) method

```csharp
static char IUtf8SpanParsable<char>.Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider provider);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `provider`: To be added.

Returns: To be added.

To be added.

## Char.System.IUtf8SpanParsable<System.Char>.TryParse(Byte>, IFormatProvider, Char) method

```csharp
static bool IUtf8SpanParsable<char>.TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider provider, out char result);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Char.System.Numerics.IAdditionOperators<System.Char,System.Char,System.Char>.op_Addition(Char, Char) method

```csharp
static char IAdditionOperators<char,char,char>.operator + (char left, char right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## Char.System.Numerics.IAdditionOperators<System.Char,System.Char,System.Char>.op_CheckedAddition(Char, Char) method

```csharp
static char IAdditionOperators<char,char,char>.op_CheckedAddition (char left, char right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## Char.System.Numerics.IBinaryInteger<System.Char>.GetByteCount() method

```csharp
int IBinaryInteger<char>.GetByteCount ();
```

Gets the number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

Returns: The number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

To be added.

## Char.System.Numerics.IBinaryInteger<System.Char>.GetShortestBitLength() method

```csharp
int IBinaryInteger<char>.GetShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current value.

Returns: The length, in bits, of the shortest two's complement representation of the current value.

To be added.

## Char.System.Numerics.IBinaryInteger<System.Char>.LeadingZeroCount(Char) method

```csharp
static char IBinaryInteger<char>.LeadingZeroCount (char value);
```

Computes the number of leading zero bits in a value.

Parameters:

- `value`: The value whose leading zero bits are to be counted.

Returns: The number of leading zero bits in `value`.

To be added.

## Char.System.Numerics.IBinaryInteger<System.Char>.Log10(Char) method

```csharp
static char IBinaryInteger<char>.Log10 (char value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Char.System.Numerics.IBinaryInteger<System.Char>.PopCount(Char) method

```csharp
static char IBinaryInteger<char>.PopCount (char value);
```

Computes the number of bits that are set in a value.

Parameters:

- `value`: The value whose set bits are to be counted.

Returns: The number of set bits in `value`.

To be added.

## Char.System.Numerics.IBinaryInteger<System.Char>.RotateLeft(Char, Int32) method

```csharp
static char IBinaryInteger<char>.RotateLeft (char value, int rotateAmount);
```

Rotates a value left by a given amount.

Parameters:

- `value`: The value that's rotated left by `rotateAmount`.
- `rotateAmount`: The amount by which `value` is rotated left.

Returns: The result of rotating `value` left by `rotateAmount`.

To be added.

## Char.System.Numerics.IBinaryInteger<System.Char>.RotateRight(Char, Int32) method

```csharp
static char IBinaryInteger<char>.RotateRight (char value, int rotateAmount);
```

Rotates a value right by a given amount.

Parameters:

- `value`: The value that's rotated right by `rotateAmount`.
- `rotateAmount`: The amount by which `value` is rotated right.

Returns: The result of rotating `value` right by `rotateAmount`.

To be added.

## Char.System.Numerics.IBinaryInteger<System.Char>.TrailingZeroCount(Char) method

```csharp
static char IBinaryInteger<char>.TrailingZeroCount (char value);
```

Computes the number of trailing zero bits in a value.

Parameters:

- `value`: The value whose trailing zero bits are to be counted.

Returns: The number of trailing zero bits in `value`.

To be added.

## Char.System.Numerics.IBinaryInteger<System.Char>.TryReadBigEndian(Byte>, Boolean, Char) method

```csharp
static bool IBinaryInteger<char>.TryReadBigEndian (ReadOnlySpan<byte> source, bool isUnsigned, out char value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Char.System.Numerics.IBinaryInteger<System.Char>.TryReadLittleEndian(Byte>, Boolean, Char) method

```csharp
static bool IBinaryInteger<char>.TryReadLittleEndian (ReadOnlySpan<byte> source, bool isUnsigned, out char value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Char.System.Numerics.IBinaryInteger<System.Char>.TryWriteBigEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<char>.TryWriteBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## Char.System.Numerics.IBinaryInteger<System.Char>.TryWriteLittleEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<char>.TryWriteLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## Char.System.Numerics.IBinaryNumber<System.Char>.IsPow2(Char) method

```csharp
static bool IBinaryNumber<char>.IsPow2 (char value);
```

Determines if a value is a power of two.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a power of two; otherwise, `false`.

To be added.

## Char.System.Numerics.IBinaryNumber<System.Char>.Log2(Char) method

```csharp
static char IBinaryNumber<char>.Log2 (char value);
```

Computes the log2 of a value.

Parameters:

- `value`: The value whose log2 is to be computed.

Returns: The log2 of `value`.

To be added.

## Char.System.Numerics.IBitwiseOperators<System.Char,System.Char,System.Char>.op_BitwiseAnd(Char, Char) method

```csharp
static char IBitwiseOperators<char,char,char>.operator & (char left, char right);
```

Computes the bitwise-and of two values.

Parameters:

- `left`: The value to `and` with `right`.
- `right`: The value to `and` with `left`.

Returns: The bitwise-and of `left` and `right`.

To be added.

## Char.System.Numerics.IBitwiseOperators<System.Char,System.Char,System.Char>.op_BitwiseOr(Char, Char) method

```csharp
static char IBitwiseOperators<char,char,char>.operator | (char left, char right);
```

Computes the bitwise-or of two values.

Parameters:

- `left`: The value to `or` with `right`.
- `right`: The value to `or` with `left`.

Returns: The bitwise-or of `left` and `right`.

To be added.

## Char.System.Numerics.IBitwiseOperators<System.Char,System.Char,System.Char>.op_ExclusiveOr(Char, Char) method

```csharp
static char IBitwiseOperators<char,char,char>.operator ^ (char left, char right);
```

Computes the exclusive-or of two values.

Parameters:

- `left`: The value to xor with `right`.
- `right`: The value to xor with `left`.

Returns: The exclusive-or of `left` and `right`.

To be added.

## Char.System.Numerics.IBitwiseOperators<System.Char,System.Char,System.Char>.op_OnesComplement(Char) method

```csharp
static char IBitwiseOperators<char,char,char>.operator ~ (char value);
```

Computes the ones-complement representation of a given value.

Parameters:

- `value`: The value for which to compute the ones-complement.

Returns: The ones-complement of `value`.

To be added.

## Char.System.Numerics.IComparisonOperators<System.Char,System.Char,System.Boolean>.op_GreaterThan(Char, Char) method

```csharp
static bool IComparisonOperators<char,char,bool>.operator > (char left, char right);
```

Compares two values to determine which is greater.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

To be added.

## Char.System.Numerics.IComparisonOperators<System.Char,System.Char,System.Boolean>.op_GreaterThanOrEqual(Char, Char) method

```csharp
static bool IComparisonOperators<char,char,bool>.operator >= (char left, char right);
```

Compares two values to determine which is greater or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

To be added.
