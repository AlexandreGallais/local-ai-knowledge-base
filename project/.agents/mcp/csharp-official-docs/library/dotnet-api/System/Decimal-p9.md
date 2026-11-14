---
title: "Decimal struct (part 9 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Decimal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Decimal struct (part 9 of 12)

## Decimal.System.Numerics.IFloatingPoint<System.Decimal>.GetExponentShortestBitLength() method

```csharp
int IFloatingPoint<decimal>.GetExponentShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current exponent.

Returns: The length, in bits, of the shortest two's complement representation of the current exponent.

To be added.

## Decimal.System.Numerics.IFloatingPoint<System.Decimal>.GetSignificandBitLength() method

```csharp
int IFloatingPoint<decimal>.GetSignificandBitLength ();
```

Gets the length, in bits, of the current significand.

Returns: The length, in bits, of the current significand.

To be added.

## Decimal.System.Numerics.IFloatingPoint<System.Decimal>.GetSignificandByteCount() method

```csharp
int IFloatingPoint<decimal>.GetSignificandByteCount ();
```

Gets the number of bytes that will be written as part of `IFloatingPoint<T>.TryWriteSignificandLittleEndian`.

Returns: The number of bytes that will be written as part of `IFloatingPoint<T>.TryWriteSignificandLittleEndian`.

To be added.

## Decimal.System.Numerics.IFloatingPoint<System.Decimal>.TryWriteExponentBigEndian(Byte>, Int32) method

```csharp
bool IFloatingPoint<decimal>.TryWriteExponentBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current exponent, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current exponent should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the exponent was succesfully written to `destination`; otherwise, `false`.

To be added.

## Decimal.System.Numerics.IFloatingPoint<System.Decimal>.TryWriteExponentLittleEndian(Byte>, Int32) method

```csharp
bool IFloatingPoint<decimal>.TryWriteExponentLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current exponent, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current exponent should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the exponent was succesfully written to `destination`; otherwise, `false`.

To be added.

## Decimal.System.Numerics.IFloatingPoint<System.Decimal>.TryWriteSignificandBigEndian(Byte>, Int32) method

```csharp
bool IFloatingPoint<decimal>.TryWriteSignificandBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current significand, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current significand should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the significand was succesfully written to `destination`; otherwise, `false`.

To be added.

## Decimal.System.Numerics.IFloatingPoint<System.Decimal>.TryWriteSignificandLittleEndian(Byte>, Int32) method

```csharp
bool IFloatingPoint<decimal>.TryWriteSignificandLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current significand, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current significand should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the significand was succesfully written to `destination`; otherwise, `false`.

To be added.

## Decimal.System.Numerics.INumber<System.Decimal>.MaxNumber(Decimal, Decimal) method

```csharp
static decimal INumber<decimal>.MaxNumber (decimal x, decimal y);
```

Compares two values to compute which is greater and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## Decimal.System.Numerics.INumber<System.Decimal>.MinNumber(Decimal, Decimal) method

```csharp
static decimal INumber<decimal>.MinNumber (decimal x, decimal y);
```

Compares two values to compute which is lesser and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.IsComplexNumber(Decimal) method

```csharp
static bool INumberBase<decimal>.IsComplexNumber (decimal value);
```

Determines if a value represents a complex number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a complex number; otherwise, `false`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.IsFinite(Decimal) method

```csharp
static bool INumberBase<decimal>.IsFinite (decimal value);
```

Determines if a value is finite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is finite; otherwise, `false`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.IsImaginaryNumber(Decimal) method

```csharp
static bool INumberBase<decimal>.IsImaginaryNumber (decimal value);
```

Determines if a value represents a pure imaginary number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a pure imaginary number; otherwise, `false`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.IsInfinity(Decimal) method

```csharp
static bool INumberBase<decimal>.IsInfinity (decimal value);
```

Determines if a value is infinite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is infinite; otherwise, `false`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.IsNaN(Decimal) method

```csharp
static bool INumberBase<decimal>.IsNaN (decimal value);
```

Determines if a value is NaN.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is NaN; otherwise, `false`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.IsNegativeInfinity(Decimal) method

```csharp
static bool INumberBase<decimal>.IsNegativeInfinity (decimal value);
```

Determines if a value is negative infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative infinity; otherwise, `false`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.IsNormal(Decimal) method

```csharp
static bool INumberBase<decimal>.IsNormal (decimal value);
```

Determines if a value is normal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is normal; otherwise, `false`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.IsPositiveInfinity(Decimal) method

```csharp
static bool INumberBase<decimal>.IsPositiveInfinity (decimal value);
```

Determines if a value is positive infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive infinity; otherwise, `false`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.IsRealNumber(Decimal) method

```csharp
static bool INumberBase<decimal>.IsRealNumber (decimal value);
```

Determines if a value represents a real number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a real number; otherwise, `false`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.IsSubnormal(Decimal) method

```csharp
static bool INumberBase<decimal>.IsSubnormal (decimal value);
```

Determines if a value is subnormal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is subnormal; otherwise, `false`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.IsZero(Decimal) method

```csharp
static bool INumberBase<decimal>.IsZero (decimal value);
```

Determines if a value is zero.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is zero; otherwise, `false`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.MaxMagnitudeNumber(Decimal, Decimal) method

```csharp
static decimal INumberBase<decimal>.MaxMagnitudeNumber (decimal x, decimal y);
```

Compares two values to compute which has the greater magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.MinMagnitudeNumber(Decimal, Decimal) method

```csharp
static decimal INumberBase<decimal>.MinMagnitudeNumber (decimal x, decimal y);
```

Compares two values to compute which has the lesser magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.MultiplyAddEstimate(Decimal, Decimal, Decimal) method

```csharp
static decimal INumberBase<decimal>.MultiplyAddEstimate (decimal left, decimal right, decimal addend);
```

Computes an estimate of (`left` * `right`) + `addend`.

Parameters:

- `left`: The value to be multiplied with `right`.
- `right`: The value to be multiplied with `left`.
- `addend`: The value to be added to the result of `left` multiplied by `right`.

Returns: An estimate of (`left` * `right`) + `addend`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.TryConvertToChecked<TOther>(Decimal, TOther) method

```csharp
static bool INumberBase<decimal>.TryConvertToChecked<TOther> (decimal value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.TryConvertToSaturating<TOther>(Decimal, TOther) method

```csharp
static bool INumberBase<decimal>.TryConvertToSaturating<TOther> (decimal value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.TryConvertToTruncating<TOther>(Decimal, TOther) method

```csharp
static bool INumberBase<decimal>.TryConvertToTruncating<TOther> (decimal value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.TryConvertFromChecked<TOther>(TOther, Decimal) method

```csharp
static bool INumberBase<decimal>.TryConvertFromChecked<TOther> (TOther value, out decimal result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.TryConvertFromSaturating<TOther>(TOther, Decimal) method

```csharp
static bool INumberBase<decimal>.TryConvertFromSaturating<TOther> (TOther value, out decimal result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.TryConvertFromTruncating<TOther>(TOther, Decimal) method

```csharp
static bool INumberBase<decimal>.TryConvertFromTruncating<TOther> (TOther value, out decimal result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Decimal.System.Runtime.Serialization.IDeserializationCallback.OnDeserialization(Object) method

```csharp
void IDeserializationCallback.OnDeserialization (object sender);
```

Runs when the deserialization of an object has been completed.

Parameters:

- `sender`: The object that initiated the callback. The functionality for this parameter is not currently implemented.

Exceptions:

- `SerializationException`: The `Decimal` object contains invalid or corrupted data.

To be added.

## Decimal.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` with the data needed to serialize the target object.

Parameters:

- `info`: The `SerializationInfo` to populate with data.
- `context`: The destination (see `StreamingContext`) for this serialization.

To be added.
