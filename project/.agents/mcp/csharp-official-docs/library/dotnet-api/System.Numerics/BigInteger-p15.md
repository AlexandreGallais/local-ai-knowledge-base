---
title: "BigInteger struct (part 15 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 15 of 18)

## BigInteger.System.Numerics.IBinaryInteger<System.Numerics.BigInteger>.TryReadBigEndian(Byte>, Boolean, BigInteger) method

```csharp
static bool IBinaryInteger<BigInteger>.TryReadBigEndian (ReadOnlySpan<byte> source, bool isUnsigned, out System.Numerics.BigInteger value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## BigInteger.System.Numerics.IBinaryInteger<System.Numerics.BigInteger>.TryReadLittleEndian(Byte>, Boolean, BigInteger) method

```csharp
static bool IBinaryInteger<BigInteger>.TryReadLittleEndian (ReadOnlySpan<byte> source, bool isUnsigned, out System.Numerics.BigInteger value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## BigInteger.System.Numerics.IBinaryInteger<System.Numerics.BigInteger>.TryWriteBigEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<BigInteger>.TryWriteBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## BigInteger.System.Numerics.IBinaryInteger<System.Numerics.BigInteger>.TryWriteLittleEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<BigInteger>.TryWriteLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## BigInteger.System.Numerics.INumber<System.Numerics.BigInteger>.MaxNumber(BigInteger, BigInteger) method

```csharp
static System.Numerics.BigInteger INumber<BigInteger>.MaxNumber (System.Numerics.BigInteger x, System.Numerics.BigInteger y);
```

Compares two values to compute which is greater and returns the other value if one input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## BigInteger.System.Numerics.INumber<System.Numerics.BigInteger>.MinNumber(BigInteger, BigInteger) method

```csharp
static System.Numerics.BigInteger INumber<BigInteger>.MinNumber (System.Numerics.BigInteger x, System.Numerics.BigInteger y);
```

Compares two values to compute which is lesser and returns the other value if one input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## BigInteger.System.Numerics.INumber<System.Numerics.BigInteger>.Sign(BigInteger) method

```csharp
static int INumber<BigInteger>.Sign (System.Numerics.BigInteger value);
```

Computes the sign of a value.

Parameters:

- `value`: The value whose sign is to be computed.

Returns: A positive value if `value` is positive, `INumberBase<T>.Zero` if `value` is zero, and a negative value if `value` is negative.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.IsCanonical(BigInteger) method

```csharp
static bool INumberBase<BigInteger>.IsCanonical (System.Numerics.BigInteger value);
```

Determines if a value is in its canonical representation.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is in its canonical representation; otherwise, `false`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.IsComplexNumber(BigInteger) method

```csharp
static bool INumberBase<BigInteger>.IsComplexNumber (System.Numerics.BigInteger value);
```

Determines if a value represents a complex number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a complex number; otherwise, `false`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.IsFinite(BigInteger) method

```csharp
static bool INumberBase<BigInteger>.IsFinite (System.Numerics.BigInteger value);
```

Determines if a value is finite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is finite; otherwise, `false`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.IsImaginaryNumber(BigInteger) method

```csharp
static bool INumberBase<BigInteger>.IsImaginaryNumber (System.Numerics.BigInteger value);
```

Determines if a value represents a pure imaginary number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a pure imaginary number; otherwise, `false`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.IsInfinity(BigInteger) method

```csharp
static bool INumberBase<BigInteger>.IsInfinity (System.Numerics.BigInteger value);
```

Determines if a value is infinite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is infinite; otherwise, `false`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.IsInteger(BigInteger) method

```csharp
static bool INumberBase<BigInteger>.IsInteger (System.Numerics.BigInteger value);
```

Determines if a value represents an integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an integer; otherwise, `false`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.IsNaN(BigInteger) method

```csharp
static bool INumberBase<BigInteger>.IsNaN (System.Numerics.BigInteger value);
```

Determines if a value is NaN.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is NaN; otherwise, `false`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.IsNegativeInfinity(BigInteger) method

```csharp
static bool INumberBase<BigInteger>.IsNegativeInfinity (System.Numerics.BigInteger value);
```

Determines if a value is negative infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative infinity; otherwise, `false`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.IsNormal(BigInteger) method

```csharp
static bool INumberBase<BigInteger>.IsNormal (System.Numerics.BigInteger value);
```

Determines if a value is normal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is normal; otherwise, `false`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.IsPositiveInfinity(BigInteger) method

```csharp
static bool INumberBase<BigInteger>.IsPositiveInfinity (System.Numerics.BigInteger value);
```

Determines if a value is positive infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive infinity; otherwise, `false`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.IsRealNumber(BigInteger) method

```csharp
static bool INumberBase<BigInteger>.IsRealNumber (System.Numerics.BigInteger value);
```

Determines if a value represents a real number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a real number; otherwise, `false`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.IsSubnormal(BigInteger) method

```csharp
static bool INumberBase<BigInteger>.IsSubnormal (System.Numerics.BigInteger value);
```

Determines if a value is subnormal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is subnormal; otherwise, `false`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.IsZero(BigInteger) method

```csharp
static bool INumberBase<BigInteger>.IsZero (System.Numerics.BigInteger value);
```

Determines if a value is zero.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is zero; otherwise, `false`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.MaxMagnitudeNumber(BigInteger, BigInteger) method

```csharp
static System.Numerics.BigInteger INumberBase<BigInteger>.MaxMagnitudeNumber (System.Numerics.BigInteger x, System.Numerics.BigInteger y);
```

Compares two values to compute which has the greater magnitude and returns the other value if one input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.MinMagnitudeNumber(BigInteger, BigInteger) method

```csharp
static System.Numerics.BigInteger INumberBase<BigInteger>.MinMagnitudeNumber (System.Numerics.BigInteger x, System.Numerics.BigInteger y);
```

Compares two values to compute which has the lesser magnitude and returns the other value if one input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.MultiplyAddEstimate(BigInteger, BigInteger, BigInteger) method

```csharp
static System.Numerics.BigInteger INumberBase<BigInteger>.MultiplyAddEstimate (System.Numerics.BigInteger left, System.Numerics.BigInteger right, System.Numerics.BigInteger addend);
```

Computes an estimate of (`left` * `right`) + `addend`.

Parameters:

- `left`: The value to be multiplied with `right`.
- `right`: The value to be multiplied with `left`.
- `addend`: The value to be added to the result of `left` multiplied by `right`.

Returns: An estimate of (`left` * `right`) + `addend`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.TryConvertToChecked<TOther>(BigInteger, TOther) method

```csharp
static bool INumberBase<BigInteger>.TryConvertToChecked<TOther> (System.Numerics.BigInteger value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that is used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.TryConvertToSaturating<TOther>(BigInteger, TOther) method

```csharp
static bool INumberBase<BigInteger>.TryConvertToSaturating<TOther> (System.Numerics.BigInteger value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that is used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.TryConvertToTruncating<TOther>(BigInteger, TOther) method

```csharp
static bool INumberBase<BigInteger>.TryConvertToTruncating<TOther> (System.Numerics.BigInteger value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that is used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.TryConvertFromChecked<TOther>(TOther, BigInteger) method

```csharp
static bool INumberBase<BigInteger>.TryConvertFromChecked<TOther> (TOther value, out System.Numerics.BigInteger result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.TryConvertFromSaturating<TOther>(TOther, BigInteger) method

```csharp
static bool INumberBase<BigInteger>.TryConvertFromSaturating<TOther> (TOther value, out System.Numerics.BigInteger result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.TryConvertFromTruncating<TOther>(TOther, BigInteger) method

```csharp
static bool INumberBase<BigInteger>.TryConvertFromTruncating<TOther> (TOther value, out System.Numerics.BigInteger result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.
