---
title: "UInt128 struct (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UInt128.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UInt128 struct (part 3 of 5)

## UInt128.op_Multiply(UInt128, UInt128) method

```csharp
public static UInt128 operator * (UInt128 left, UInt128 right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied-by `right`.

To be added.

## UInt128.op_OnesComplement(UInt128) method

```csharp
public static UInt128 operator ~ (UInt128 value);
```

Computes the ones-complement representation of a given value.

Parameters:

- `value`: The value for which to compute the ones-complement.

Returns: The ones-complement of `value`.

To be added.

## UInt128.op_RightShift(UInt128, Int32) method

```csharp
public static UInt128 operator >> (UInt128 value, int shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

#### Remarks

This operation is meant to perform a signed (otherwise known as an arithmetic) right shift on signed types.

## UInt128.op_Subtraction(UInt128, UInt128) method

```csharp
public static UInt128 operator - (UInt128 left, UInt128 right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that is subtracted from `left`.

Returns: The difference of `right` subtracted from `left`.

To be added.

## UInt128.op_UnaryNegation(UInt128) method

```csharp
public static UInt128 operator - (UInt128 value);
```

Computes the unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## UInt128.op_UnaryPlus(UInt128) method

```csharp
public static UInt128 operator + (UInt128 value);
```

Computes the unary plus of a value.

Parameters:

- `value`: The value for which to compute the unary plus.

Returns: The unary plus of `value`.

To be added.

## UInt128.op_UnsignedRightShift(UInt128, Int32) method

```csharp
public static UInt128 op_UnsignedRightShift (UInt128 value, int shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

#### Remarks

This operation is meant to perform n unsigned (otherwise known as a logical) right shift on all types.

## UInt128.Parse(String) method

```csharp
public static UInt128 Parse (string s);
```

Parses a string into a value.

Parameters:

- `s`: A string containing a number to parse.

Returns: The result of parsing `s`.

To be added.

## UInt128.Parse(Byte>, IFormatProvider) method

```csharp
public static UInt128 Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## UInt128.Parse(Char>, IFormatProvider) method

```csharp
public static UInt128 Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## UInt128.Parse(String, NumberStyles) method

```csharp
public static UInt128 Parse (string s, System.Globalization.NumberStyles style);
```

Parses a string into a value.

Parameters:

- `s`: A string containing a number to parse.
- `style`: A bitwise combination of number styles that can be present in `s`.

Returns: The result of parsing `s`.

To be added.

## UInt128.Parse(String, IFormatProvider) method

```csharp
public static UInt128 Parse (string s, IFormatProvider? provider);
```

Parses a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## UInt128.Parse(Byte>, NumberStyles, IFormatProvider) method

```csharp
public static UInt128 Parse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Integer, IFormatProvider? provider = default);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## UInt128.Parse(Char>, NumberStyles, IFormatProvider) method

```csharp
public static UInt128 Parse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Integer, IFormatProvider? provider = default);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `style`: A bitwise combination of number styles that can be present in `s`.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## UInt128.Parse(String, NumberStyles, IFormatProvider) method

```csharp
public static UInt128 Parse (string s, System.Globalization.NumberStyles style, IFormatProvider? provider);
```

Parses a string into a value.

Parameters:

- `s`: The string to parse.
- `style`: A bitwise combination of number styles that can be present in `s`.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## UInt128.PopCount(UInt128) method

```csharp
public static UInt128 PopCount (UInt128 value);
```

Computes the number of bits that are set in a value.

Parameters:

- `value`: The value whose set bits are to be counted.

Returns: The number of set bits in `value`.

To be added.

## UInt128.RotateLeft(UInt128, Int32) method

```csharp
public static UInt128 RotateLeft (UInt128 value, int rotateAmount);
```

Rotates a value left by a given amount.

Parameters:

- `value`: The value that is rotated left by `rotateAmount`.
- `rotateAmount`: The amount by which `value` is rotated left.

Returns: The result of rotating `value` left by `rotateAmount`.

To be added.

## UInt128.RotateRight(UInt128, Int32) method

```csharp
public static UInt128 RotateRight (UInt128 value, int rotateAmount);
```

Rotates a value right by a given amount.

Parameters:

- `value`: The value that is rotated right by `rotateAmount`.
- `rotateAmount`: The amount by which `value` is rotated right.

Returns: The result of rotating `value` right by `rotateAmount`.

To be added.

## UInt128.Sign(UInt128) method

```csharp
public static int Sign (UInt128 value);
```

Computes the sign of a value.

Parameters:

- `value`: The value whose sign is to be computed.

Returns: A positive value if `value` is positive, `INumberBase<T>.Zero` if `value` is zero, and a negative value if `value` is negative.

#### Remarks

It is recommended that a function return `1`, `0`, and `-1`, respectively.

## UInt128.System.Numerics.IBinaryInteger<System.UInt128>.GetByteCount() method

```csharp
int IBinaryInteger<UInt128>.GetByteCount ();
```

Gets the number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

Returns: The number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

To be added.

## UInt128.System.Numerics.IBinaryInteger<System.UInt128>.GetShortestBitLength() method

```csharp
int IBinaryInteger<UInt128>.GetShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current value.

Returns: The length, in bits, of the shortest two's complement representation of the current value.

To be added.

## UInt128.System.Numerics.IBinaryInteger<System.UInt128>.TryReadBigEndian(Byte>, Boolean, UInt128) method

```csharp
static bool IBinaryInteger<UInt128>.TryReadBigEndian (ReadOnlySpan<byte> source, bool isUnsigned, out UInt128 value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## UInt128.System.Numerics.IBinaryInteger<System.UInt128>.TryReadLittleEndian(Byte>, Boolean, UInt128) method

```csharp
static bool IBinaryInteger<UInt128>.TryReadLittleEndian (ReadOnlySpan<byte> source, bool isUnsigned, out UInt128 value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## UInt128.System.Numerics.IBinaryInteger<System.UInt128>.TryWriteBigEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<UInt128>.TryWriteBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## UInt128.System.Numerics.IBinaryInteger<System.UInt128>.TryWriteLittleEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<UInt128>.TryWriteLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## UInt128.System.Numerics.INumber<System.UInt128>.CopySign(UInt128, UInt128) method

```csharp
static UInt128 INumber<UInt128>.CopySign (UInt128 value, UInt128 sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## UInt128.System.Numerics.INumber<System.UInt128>.MaxNumber(UInt128, UInt128) method

```csharp
static UInt128 INumber<UInt128>.MaxNumber (UInt128 x, UInt128 y);
```

Compares two values to compute which is greater and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## UInt128.System.Numerics.INumber<System.UInt128>.MinNumber(UInt128, UInt128) method

```csharp
static UInt128 INumber<UInt128>.MinNumber (UInt128 x, UInt128 y);
```

Compares two values to compute which is lesser and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.Abs(UInt128) method

```csharp
static UInt128 INumberBase<UInt128>.Abs (UInt128 value);
```

Computes the absolute of a value.

Parameters:

- `value`: The value for which to get its absolute.

Returns: The absolute of `value`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.IsCanonical(UInt128) method

```csharp
static bool INumberBase<UInt128>.IsCanonical (UInt128 value);
```

Determines if a value is in its canonical representation.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is in its canonical representation; otherwise, `false`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.IsComplexNumber(UInt128) method

```csharp
static bool INumberBase<UInt128>.IsComplexNumber (UInt128 value);
```

Determines if a value represents a complex number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a complex number; otherwise, `false`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.IsFinite(UInt128) method

```csharp
static bool INumberBase<UInt128>.IsFinite (UInt128 value);
```

Determines if a value is finite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is finite; otherwise, `false`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.IsImaginaryNumber(UInt128) method

```csharp
static bool INumberBase<UInt128>.IsImaginaryNumber (UInt128 value);
```

Determines if a value represents a pure imaginary number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a pure imaginary number; otherwise, `false`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.IsInfinity(UInt128) method

```csharp
static bool INumberBase<UInt128>.IsInfinity (UInt128 value);
```

Determines if a value is infinite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is infinite; otherwise, `false`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.IsInteger(UInt128) method

```csharp
static bool INumberBase<UInt128>.IsInteger (UInt128 value);
```

Determines if a value represents an integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an integer; otherwise, `false`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.IsNaN(UInt128) method

```csharp
static bool INumberBase<UInt128>.IsNaN (UInt128 value);
```

Determines if a value is NaN.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is NaN; otherwise, `false`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.IsNegative(UInt128) method

```csharp
static bool INumberBase<UInt128>.IsNegative (UInt128 value);
```

Determines if a value is negative.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative; otherwise, `false`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.IsNegativeInfinity(UInt128) method

```csharp
static bool INumberBase<UInt128>.IsNegativeInfinity (UInt128 value);
```

Determines if a value is negative infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative infinity; otherwise, `false`.

To be added.
