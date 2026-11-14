---
title: "NFloat struct (part 6 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/NFloat.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NFloat struct (part 6 of 8)

## NFloat.System.Numerics.IAdditionOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>.op_CheckedAddition(NFloat, NFloat) method

```csharp
static System.Runtime.InteropServices.NFloat IAdditionOperators<NFloat,NFloat,NFloat>.op_CheckedAddition (System.Runtime.InteropServices.NFloat left, System.Runtime.InteropServices.NFloat right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## NFloat.System.Numerics.IBitwiseOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>.op_BitwiseAnd(NFloat, NFloat) method

```csharp
static System.Runtime.InteropServices.NFloat IBitwiseOperators<NFloat,NFloat,NFloat>.operator & (System.Runtime.InteropServices.NFloat left, System.Runtime.InteropServices.NFloat right);
```

Computes the bitwise-and of two values.

Parameters:

- `left`: The value to `and` with `right`.
- `right`: The value to `and` with `left`.

Returns: The bitwise-and of `left` and `right`.

To be added.

## NFloat.System.Numerics.IBitwiseOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>.op_BitwiseOr(NFloat, NFloat) method

```csharp
static System.Runtime.InteropServices.NFloat IBitwiseOperators<NFloat,NFloat,NFloat>.operator | (System.Runtime.InteropServices.NFloat left, System.Runtime.InteropServices.NFloat right);
```

Computes the bitwise-or of two values.

Parameters:

- `left`: The value to `or` with `right`.
- `right`: The value to `or` with `left`.

Returns: The bitwise-or of `left` and `right`.

To be added.

## NFloat.System.Numerics.IBitwiseOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>.op_ExclusiveOr(NFloat, NFloat) method

```csharp
static System.Runtime.InteropServices.NFloat IBitwiseOperators<NFloat,NFloat,NFloat>.operator ^ (System.Runtime.InteropServices.NFloat left, System.Runtime.InteropServices.NFloat right);
```

Computes the exclusive-or of two values.

Parameters:

- `left`: The value to xor with `right`.
- `right`: The value to xor with `left`.

Returns: The exclusive-or of `left` and `right`.

To be added.

## NFloat.System.Numerics.IBitwiseOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>.op_OnesComplement(NFloat) method

```csharp
static System.Runtime.InteropServices.NFloat IBitwiseOperators<NFloat,NFloat,NFloat>.operator ~ (System.Runtime.InteropServices.NFloat value);
```

Computes the ones-complement representation of a given value.

Parameters:

- `value`: The value for which to compute the ones-complement.

Returns: The ones-complement of `value`.

To be added.

## NFloat.System.Numerics.IDecrementOperators<System.Runtime.InteropServices.NFloat>.op_CheckedDecrement(NFloat) method

```csharp
static System.Runtime.InteropServices.NFloat IDecrementOperators<NFloat>.op_CheckedDecrement (System.Runtime.InteropServices.NFloat value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## NFloat.System.Numerics.IDivisionOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>.op_CheckedDivision(NFloat, NFloat) method

```csharp
static System.Runtime.InteropServices.NFloat IDivisionOperators<NFloat,NFloat,NFloat>.op_CheckedDivision (System.Runtime.InteropServices.NFloat left, System.Runtime.InteropServices.NFloat right);
```

Divides two values to compute their quotient.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient of `left` divided by `right`.

To be added.

## NFloat.System.Numerics.IFloatingPoint<System.Runtime.InteropServices.NFloat>.GetExponentByteCount() method

```csharp
int IFloatingPoint<NFloat>.GetExponentByteCount ();
```

Gets the number of bytes that will be written as part of `IFloatingPoint<T>.TryWriteExponentLittleEndian`.

Returns: The number of bytes that will be written as part of `IFloatingPoint<T>.TryWriteExponentLittleEndian`.

To be added.

## NFloat.System.Numerics.IFloatingPoint<System.Runtime.InteropServices.NFloat>.GetExponentShortestBitLength() method

```csharp
int IFloatingPoint<NFloat>.GetExponentShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current exponent.

Returns: The length, in bits, of the shortest two's complement representation of the current exponent.

To be added.

## NFloat.System.Numerics.IFloatingPoint<System.Runtime.InteropServices.NFloat>.GetSignificandBitLength() method

```csharp
int IFloatingPoint<NFloat>.GetSignificandBitLength ();
```

Gets the length, in bits, of the current significand.

Returns: The length, in bits, of the current significand.

To be added.

## NFloat.System.Numerics.IFloatingPoint<System.Runtime.InteropServices.NFloat>.GetSignificandByteCount() method

```csharp
int IFloatingPoint<NFloat>.GetSignificandByteCount ();
```

Gets the number of bytes that will be written as part of `IFloatingPoint<T>.TryWriteSignificandLittleEndian`.

Returns: The number of bytes that will be written as part of `IFloatingPoint<T>.TryWriteSignificandLittleEndian`.

To be added.

## NFloat.System.Numerics.IFloatingPoint<System.Runtime.InteropServices.NFloat>.TryWriteExponentBigEndian(Byte>, Int32) method

```csharp
bool IFloatingPoint<NFloat>.TryWriteExponentBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current exponent, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current exponent should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the exponent was succesfully written to `destination`; otherwise, `false`.

To be added.

## NFloat.System.Numerics.IFloatingPoint<System.Runtime.InteropServices.NFloat>.TryWriteExponentLittleEndian(Byte>, Int32) method

```csharp
bool IFloatingPoint<NFloat>.TryWriteExponentLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current exponent, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current exponent should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the exponent was succesfully written to `destination`; otherwise, `false`.

To be added.

## NFloat.System.Numerics.IFloatingPoint<System.Runtime.InteropServices.NFloat>.TryWriteSignificandBigEndian(Byte>, Int32) method

```csharp
bool IFloatingPoint<NFloat>.TryWriteSignificandBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current significand, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current significand should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the significand was succesfully written to `destination`; otherwise, `false`.

To be added.

## NFloat.System.Numerics.IFloatingPoint<System.Runtime.InteropServices.NFloat>.TryWriteSignificandLittleEndian(Byte>, Int32) method

```csharp
bool IFloatingPoint<NFloat>.TryWriteSignificandLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current significand, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current significand should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the significand was succesfully written to `destination`; otherwise, `false`.

To be added.

## NFloat.System.Numerics.IIncrementOperators<System.Runtime.InteropServices.NFloat>.op_CheckedIncrement(NFloat) method

```csharp
static System.Runtime.InteropServices.NFloat IIncrementOperators<NFloat>.op_CheckedIncrement (System.Runtime.InteropServices.NFloat value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## NFloat.System.Numerics.IMultiplyOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>.op_CheckedMultiply(NFloat, NFloat) method

```csharp
static System.Runtime.InteropServices.NFloat IMultiplyOperators<NFloat,NFloat,NFloat>.op_CheckedMultiply (System.Runtime.InteropServices.NFloat left, System.Runtime.InteropServices.NFloat right);
```

Multiplies two values to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## NFloat.System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>.IsCanonical(NFloat) method

```csharp
static bool INumberBase<NFloat>.IsCanonical (System.Runtime.InteropServices.NFloat value);
```

Determines if a value is in its canonical representation.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is in its canonical representation; otherwise, `false`.

To be added.

## NFloat.System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>.IsComplexNumber(NFloat) method

```csharp
static bool INumberBase<NFloat>.IsComplexNumber (System.Runtime.InteropServices.NFloat value);
```

Determines if a value represents a complex number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a complex number; otherwise, `false`.

To be added.

## NFloat.System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>.IsImaginaryNumber(NFloat) method

```csharp
static bool INumberBase<NFloat>.IsImaginaryNumber (System.Runtime.InteropServices.NFloat value);
```

Determines if a value represents a pure imaginary number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a pure imaginary number; otherwise, `false`.

To be added.

## NFloat.System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>.IsZero(NFloat) method

```csharp
static bool INumberBase<NFloat>.IsZero (System.Runtime.InteropServices.NFloat value);
```

Determines if a value is zero.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is zero; otherwise, `false`.

To be added.

## NFloat.System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>.TryConvertToChecked<TOther>(NFloat, TOther) method

```csharp
static bool INumberBase<NFloat>.TryConvertToChecked<TOther> (System.Runtime.InteropServices.NFloat value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## NFloat.System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>.TryConvertToSaturating<TOther>(NFloat, TOther) method

```csharp
static bool INumberBase<NFloat>.TryConvertToSaturating<TOther> (System.Runtime.InteropServices.NFloat value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## NFloat.System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>.TryConvertToTruncating<TOther>(NFloat, TOther) method

```csharp
static bool INumberBase<NFloat>.TryConvertToTruncating<TOther> (System.Runtime.InteropServices.NFloat value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## NFloat.System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>.TryConvertFromChecked<TOther>(TOther, NFloat) method

```csharp
static bool INumberBase<NFloat>.TryConvertFromChecked<TOther> (TOther value, out System.Runtime.InteropServices.NFloat result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## NFloat.System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>.TryConvertFromSaturating<TOther>(TOther, NFloat) method

```csharp
static bool INumberBase<NFloat>.TryConvertFromSaturating<TOther> (TOther value, out System.Runtime.InteropServices.NFloat result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## NFloat.System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>.TryConvertFromTruncating<TOther>(TOther, NFloat) method

```csharp
static bool INumberBase<NFloat>.TryConvertFromTruncating<TOther> (TOther value, out System.Runtime.InteropServices.NFloat result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.
