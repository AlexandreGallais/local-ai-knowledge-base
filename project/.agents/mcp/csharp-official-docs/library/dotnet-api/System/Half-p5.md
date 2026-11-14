---
title: "Half struct (part 5 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Half.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Half struct (part 5 of 6)

## Half.Sinh(Half) method

```csharp
public static Half Sinh (Half x);
```

Computes the hyperbolic sine of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic sine is to be computed.

Returns: The hyperbolic sine of `x`.

To be added.

## Half.SinPi(Half) method

```csharp
public static Half SinPi (Half x);
```

Computes the sine of a value that has been multiplied by `pi`.

Parameters:

- `x`: The value, in half-revolutions, that is multipled by `pi` before computing its sine.

Returns: The sine of `x` multiplied-by `pi`.

#### Remarks

This computes `sin(x * π)`.

## Half.Sqrt(Half) method

```csharp
public static Half Sqrt (Half x);
```

Computes the square-root of a value.

Parameters:

- `x`: The value whose square-root is to be computed.

Returns: The square-root of `x`.

To be added.

## Half.System.Numerics.IBitwiseOperators<System.Half,System.Half,System.Half>.op_BitwiseAnd(Half, Half) method

```csharp
static Half IBitwiseOperators<Half,Half,Half>.operator & (Half left, Half right);
```

Computes the bitwise-and of two values.

Parameters:

- `left`: The value to `and` with `right`.
- `right`: The value to `and` with `left`.

Returns: The bitwise-and of `left` and `right`.

To be added.

## Half.System.Numerics.IBitwiseOperators<System.Half,System.Half,System.Half>.op_BitwiseOr(Half, Half) method

```csharp
static Half IBitwiseOperators<Half,Half,Half>.operator | (Half left, Half right);
```

Computes the bitwise-or of two values.

Parameters:

- `left`: The value to `or` with `right`.
- `right`: The value to `or` with `left`.

Returns: The bitwise-or of `left` and `right`.

To be added.

## Half.System.Numerics.IBitwiseOperators<System.Half,System.Half,System.Half>.op_ExclusiveOr(Half, Half) method

```csharp
static Half IBitwiseOperators<Half,Half,Half>.operator ^ (Half left, Half right);
```

Computes the exclusive-or of two values.

Parameters:

- `left`: The value to xor with `right`.
- `right`: The value to xor with `left`.

Returns: The exclusive-or of `left` and `right`.

To be added.

## Half.System.Numerics.IBitwiseOperators<System.Half,System.Half,System.Half>.op_OnesComplement(Half) method

```csharp
static Half IBitwiseOperators<Half,Half,Half>.operator ~ (Half value);
```

Computes the ones-complement representation of a given value.

Parameters:

- `value`: The value for which to compute the ones-complement.

Returns: The ones-complement of `value`.

To be added.

## Half.System.Numerics.IFloatingPoint<System.Half>.GetExponentByteCount() method

```csharp
int IFloatingPoint<Half>.GetExponentByteCount ();
```

Gets the number of bytes that will be written as part of `IFloatingPoint<T>.TryWriteExponentLittleEndian`.

Returns: The number of bytes that will be written as part of `IFloatingPoint<T>.TryWriteExponentLittleEndian`.

To be added.

## Half.System.Numerics.IFloatingPoint<System.Half>.GetExponentShortestBitLength() method

```csharp
int IFloatingPoint<Half>.GetExponentShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current exponent.

Returns: The length, in bits, of the shortest two's complement representation of the current exponent.

To be added.

## Half.System.Numerics.IFloatingPoint<System.Half>.GetSignificandBitLength() method

```csharp
int IFloatingPoint<Half>.GetSignificandBitLength ();
```

Gets the length, in bits, of the current significand.

Returns: The length, in bits, of the current significand.

To be added.

## Half.System.Numerics.IFloatingPoint<System.Half>.GetSignificandByteCount() method

```csharp
int IFloatingPoint<Half>.GetSignificandByteCount ();
```

Gets the number of bytes that will be written as part of `IFloatingPoint<T>.TryWriteSignificandLittleEndian`.

Returns: The number of bytes that will be written as part of `IFloatingPoint<T>.TryWriteSignificandLittleEndian`.

To be added.

## Half.System.Numerics.IFloatingPoint<System.Half>.TryWriteExponentBigEndian(Byte>, Int32) method

```csharp
bool IFloatingPoint<Half>.TryWriteExponentBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current exponent, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current exponent should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the exponent was succesfully written to `destination`; otherwise, `false`.

To be added.

## Half.System.Numerics.IFloatingPoint<System.Half>.TryWriteExponentLittleEndian(Byte>, Int32) method

```csharp
bool IFloatingPoint<Half>.TryWriteExponentLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current exponent, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current exponent should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the exponent was succesfully written to `destination`; otherwise, `false`.

To be added.

## Half.System.Numerics.IFloatingPoint<System.Half>.TryWriteSignificandBigEndian(Byte>, Int32) method

```csharp
bool IFloatingPoint<Half>.TryWriteSignificandBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current significand, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current significand should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the significand was succesfully written to `destination`; otherwise, `false`.

To be added.

## Half.System.Numerics.IFloatingPoint<System.Half>.TryWriteSignificandLittleEndian(Byte>, Int32) method

```csharp
bool IFloatingPoint<Half>.TryWriteSignificandLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current significand, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current significand should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the significand was succesfully written to `destination`; otherwise, `false`.

To be added.

## Half.System.Numerics.INumberBase<System.Half>.IsCanonical(Half) method

```csharp
static bool INumberBase<Half>.IsCanonical (Half value);
```

Determines if a value is in its canonical representation.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is in its canonical representation; otherwise, `false`.

To be added.

## Half.System.Numerics.INumberBase<System.Half>.IsComplexNumber(Half) method

```csharp
static bool INumberBase<Half>.IsComplexNumber (Half value);
```

Determines if a value represents a complex number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a complex number; otherwise, `false`.

To be added.

## Half.System.Numerics.INumberBase<System.Half>.IsImaginaryNumber(Half) method

```csharp
static bool INumberBase<Half>.IsImaginaryNumber (Half value);
```

Determines if a value represents a pure imaginary number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a pure imaginary number; otherwise, `false`.

To be added.

## Half.System.Numerics.INumberBase<System.Half>.IsZero(Half) method

```csharp
static bool INumberBase<Half>.IsZero (Half value);
```

Determines if a value is zero.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is zero; otherwise, `false`.

To be added.

## Half.System.Numerics.INumberBase<System.Half>.TryConvertToChecked<TOther>(Half, TOther) method

```csharp
static bool INumberBase<Half>.TryConvertToChecked<TOther> (Half value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Half.System.Numerics.INumberBase<System.Half>.TryConvertToSaturating<TOther>(Half, TOther) method

```csharp
static bool INumberBase<Half>.TryConvertToSaturating<TOther> (Half value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Half.System.Numerics.INumberBase<System.Half>.TryConvertToTruncating<TOther>(Half, TOther) method

```csharp
static bool INumberBase<Half>.TryConvertToTruncating<TOther> (Half value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Half.System.Numerics.INumberBase<System.Half>.TryConvertFromChecked<TOther>(TOther, Half) method

```csharp
static bool INumberBase<Half>.TryConvertFromChecked<TOther> (TOther value, out Half result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Half.System.Numerics.INumberBase<System.Half>.TryConvertFromSaturating<TOther>(TOther, Half) method

```csharp
static bool INumberBase<Half>.TryConvertFromSaturating<TOther> (TOther value, out Half result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Half.System.Numerics.INumberBase<System.Half>.TryConvertFromTruncating<TOther>(TOther, Half) method

```csharp
static bool INumberBase<Half>.TryConvertFromTruncating<TOther> (TOther value, out Half result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Half.Tan(Half) method

```csharp
public static Half Tan (Half x);
```

Computes the tangent of a value.

Parameters:

- `x`: The value, in radians, whose tangent is to be computed.

Returns: The tangent of `x`.

#### Remarks

This computes `tan(x)`.

## Half.Tanh(Half) method

```csharp
public static Half Tanh (Half x);
```

Computes the hyperbolic tangent of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic tangent is to be computed.

Returns: The hyperbolic tangent of `x`.

To be added.

## Half.TanPi(Half) method

```csharp
public static Half TanPi (Half x);
```

Computes the tangent of a value that has been multipled by `pi`.

Parameters:

- `x`: The value, in half-revolutions, that is multipled by `pi` before computing its tangent.

Returns: The tangent of `x` multiplied-by `pi`.

#### Remarks

This computes `tan(x * π)`.

## Half.ToString() method

```csharp
public override string ToString ();
```

Converts the numeric value of this instance to its equivalent string representation.

Returns: The string representation of the value of this instance.

To be added.

## Half.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified culture-specific format information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `provider`.

To be added.

## Half.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the numeric value of this instance to its equivalent string representation, using the specified format.

Parameters:

- `format`: A numeric format string.

Returns: The string representation of the value of this instance as specified by `format`.

Exceptions:

- `FormatException`: `format` is invalid.

To be added.

## Half.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified format and culture-specific format information.

Parameters:

- `format`: A numeric format string.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `provider`.

To be added.

## Half.Truncate(Half) method

```csharp
public static Half Truncate (Half x);
```

Truncates a value.

Parameters:

- `x`: The value to truncate.

Returns: The truncation of `x`.

To be added.

## Half.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<byte> utf8Destination, out int bytesWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current instance as UTF-8 into the provided span of bytes.

Parameters:

- `utf8Destination`: The span in which to write this instance's value formatted as a span of bytes.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `utf8Destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `utf8Destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `utf8Destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.
