---
title: "IFloatingPoint<TSelf> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IFloatingPoint`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IFloatingPoint<TSelf> interface

Namespace: `System.Numerics`

```csharp
public interface IFloatingPoint<TSelf> : IComparable<TSelf>, IEquatable<TSelf>, IParsable<TSelf>, ISpanParsable<TSelf>, IUtf8SpanParsable<TSelf>, System.Numerics.IAdditionOperators<TSelf,TSelf,TSelf>, System.Numerics.IAdditiveIdentity<TSelf,TSelf>, System.Numerics.IComparisonOperators<TSelf,TSelf,bool>, System.Numerics.IDecrementOperators<TSelf>, System.Numerics.IDivisionOperators<TSelf,TSelf,TSelf>, System.Numerics.IEqualityOperators<TSelf,TSelf,bool>, System.Numerics.IFloatingPointConstants<TSelf>, System.Numerics.IIncrementOperators<TSelf>, System.Numerics.IModulusOperators<TSelf,TSelf,TSelf>, System.Numerics.IMultiplicativeIdentity<TSelf,TSelf>, System.Numerics.IMultiplyOperators<TSelf,TSelf,TSelf>, System.Numerics.INumber<TSelf>, System.Numerics.INumberBase<TSelf>, System.Numerics.ISignedNumber<TSelf>, System.Numerics.ISubtractionOperators<TSelf,TSelf,TSelf>, System.Numerics.IUnaryNegationOperators<TSelf,TSelf>, System.Numerics.IUnaryPlusOperators<TSelf,TSelf> where TSelf : IFloatingPoint<TSelf>
```

Defines a floating-point type.

Parameters:

- `TSelf`: The type that implements the interface.

To be added.

## IFloatingPoint<TSelf>.Ceiling(TSelf) method

```csharp
public static virtual TSelf Ceiling (TSelf x);
```

Computes the ceiling of a value.

Parameters:

- `x`: The value whose ceiling is to be computed.

Returns: The ceiling of `x`.

To be added.

## IFloatingPoint<TSelf>.ConvertToInteger<TInteger>(TSelf) method

```csharp
public static virtual TInteger ConvertToInteger<TInteger> (TSelf value) where TInteger : System.Numerics.IBinaryInteger<TInteger>;
```

Converts a value to a specified integer type using saturation on overflow

Parameters:

- `TInteger`: The integer type to which `value` is converted.
- `value`: The value to be converted.

Returns: An instance of `TInteger` created from `value`.

To be added.

## IFloatingPoint<TSelf>.ConvertToIntegerNative<TInteger>(TSelf) method

```csharp
public static virtual TInteger ConvertToIntegerNative<TInteger> (TSelf value) where TInteger : System.Numerics.IBinaryInteger<TInteger>;
```

Converts a value to a specified integer type using platform specific behavior on overflow.

Parameters:

- `TInteger`: The integer type to which `value` is converted.
- `value`: The value to be converted.

Returns: An instance of `TInteger` created from `value`.

To be added.

## IFloatingPoint<TSelf>.Floor(TSelf) method

```csharp
public static virtual TSelf Floor (TSelf x);
```

Computes the floor of a value.

Parameters:

- `x`: The value whose floor is to be computed.

Returns: The floor of `x`.

To be added.

## IFloatingPoint<TSelf>.GetExponentByteCount() method

```csharp
public int GetExponentByteCount ();
```

Gets the number of bytes that will be written as part of `IFloatingPoint<T>.TryWriteExponentLittleEndian`.

Returns: The number of bytes that will be written as part of `IFloatingPoint<T>.TryWriteExponentLittleEndian`.

To be added.

## IFloatingPoint<TSelf>.GetExponentShortestBitLength() method

```csharp
public int GetExponentShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current exponent.

Returns: The length, in bits, of the shortest two's complement representation of the current exponent.

To be added.

## IFloatingPoint<TSelf>.GetSignificandBitLength() method

```csharp
public int GetSignificandBitLength ();
```

Gets the length, in bits, of the current significand.

Returns: The length, in bits, of the current significand.

To be added.

## IFloatingPoint<TSelf>.GetSignificandByteCount() method

```csharp
public int GetSignificandByteCount ();
```

Gets the number of bytes that will be written as part of `IFloatingPoint<T>.TryWriteSignificandLittleEndian`.

Returns: The number of bytes that will be written as part of `IFloatingPoint<T>.TryWriteSignificandLittleEndian`.

To be added.

## IFloatingPoint<TSelf>.Round(TSelf) method

```csharp
public static virtual TSelf Round (TSelf x);
```

Rounds a value to the nearest integer using the default rounding mode (`MidpointRounding.ToEven`).

Parameters:

- `x`: The value to round.

Returns: The result of rounding `x` to the nearest integer using the default rounding mode.

To be added.

## IFloatingPoint<TSelf>.Round(TSelf, Int32) method

```csharp
public static virtual TSelf Round (TSelf x, int digits);
```

Rounds a value to a specified number of fractional-digits using the default rounding mode (`MidpointRounding.ToEven`).

Parameters:

- `x`: The value to round.
- `digits`: The number of fractional digits to which `x` should be rounded.

Returns: The result of rounding `x` to `digits` fractional-digits using the default rounding mode.

To be added.

## IFloatingPoint<TSelf>.Round(TSelf, MidpointRounding) method

```csharp
public static virtual TSelf Round (TSelf x, MidpointRounding mode);
```

Rounds a value to the nearest integer using the specified rounding mode.

Parameters:

- `x`: The value to round.
- `mode`: The mode under which `x` should be rounded.

Returns: The result of rounding `x` to the nearest integer using `mode`.

To be added.

## IFloatingPoint<TSelf>.Round(TSelf, Int32, MidpointRounding) method

```csharp
public static abstract TSelf Round (TSelf x, int digits, MidpointRounding mode);
```

Rounds a value to a specified number of fractional digits using the specified rounding mode.

Parameters:

- `x`: The value to round.
- `digits`: The number of fractional digits to which `x` should be rounded.
- `mode`: The mode under which `x` should be rounded.

Returns: The result of rounding `x` to `digits` fractional-digits using `mode`.

To be added.

## IFloatingPoint<TSelf>.Truncate(TSelf) method

```csharp
public static virtual TSelf Truncate (TSelf x);
```

Truncates a value.

Parameters:

- `x`: The value to truncate.

Returns: The truncation of `x`.

To be added.

## IFloatingPoint<TSelf>.TryWriteExponentBigEndian(Byte>, Int32) method

```csharp
public bool TryWriteExponentBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current exponent, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current exponent should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the exponent was succesfully written to `destination`; otherwise, `false`.

To be added.

## IFloatingPoint<TSelf>.TryWriteExponentLittleEndian(Byte>, Int32) method

```csharp
public bool TryWriteExponentLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current exponent, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current exponent should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the exponent was succesfully written to `destination`; otherwise, `false`.

To be added.

## IFloatingPoint<TSelf>.TryWriteSignificandBigEndian(Byte>, Int32) method

```csharp
public bool TryWriteSignificandBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current significand, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current significand should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the significand was succesfully written to `destination`; otherwise, `false`.

To be added.

## IFloatingPoint<TSelf>.TryWriteSignificandLittleEndian(Byte>, Int32) method

```csharp
public bool TryWriteSignificandLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current significand, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current significand should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the significand was succesfully written to `destination`; otherwise, `false`.

To be added.

## IFloatingPoint<TSelf>.WriteExponentBigEndian(Byte[]) method

```csharp
public virtual int WriteExponentBigEndian (byte[] destination);
```

Writes the current exponent, in big-endian format, to a given array.

Parameters:

- `destination`: The array to which the current exponent should be written.

Returns: The number of bytes written to `destination`.

To be added.

## IFloatingPoint<TSelf>.WriteExponentBigEndian(Byte>) method

```csharp
public virtual int WriteExponentBigEndian (Span<byte> destination);
```

Writes the current exponent, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current exponent should be written.

Returns: The number of bytes written to `destination`.

To be added.

## IFloatingPoint<TSelf>.WriteExponentBigEndian(Byte[], Int32) method

```csharp
public virtual int WriteExponentBigEndian (byte[] destination, int startIndex);
```

Writes the current exponent, in big-endian format, to a given array.

Parameters:

- `destination`: The array to which the current exponent should be written.
- `startIndex`: The starting index at which the exponent should be written.

Returns: The number of bytes written to `destination` starting at `startIndex`.

To be added.

## IFloatingPoint<TSelf>.WriteExponentLittleEndian(Byte[]) method

```csharp
public virtual int WriteExponentLittleEndian (byte[] destination);
```

Writes the current exponent, in little-endian format, to a given array.

Parameters:

- `destination`: The array to which the current exponent should be written.

Returns: The number of bytes written to `destination`.

To be added.

## IFloatingPoint<TSelf>.WriteExponentLittleEndian(Byte>) method

```csharp
public virtual int WriteExponentLittleEndian (Span<byte> destination);
```

Writes the current exponent, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current exponent should be written.

Returns: The number of bytes written to `destination`.

To be added.

## IFloatingPoint<TSelf>.WriteExponentLittleEndian(Byte[], Int32) method

```csharp
public virtual int WriteExponentLittleEndian (byte[] destination, int startIndex);
```

Writes the current exponent, in little-endian format, to a given array.

Parameters:

- `destination`: The array to which the current exponent should be written.
- `startIndex`: The starting index at which the exponent should be written.

Returns: The number of bytes written to `destination` starting at `startIndex`.

To be added.

## IFloatingPoint<TSelf>.WriteSignificandBigEndian(Byte[]) method

```csharp
public virtual int WriteSignificandBigEndian (byte[] destination);
```

Writes the current significand, in big-endian format, to a given array.

Parameters:

- `destination`: The array to which the current significand should be written.

Returns: The number of bytes written to `destination`.

To be added.

## IFloatingPoint<TSelf>.WriteSignificandBigEndian(Byte>) method

```csharp
public virtual int WriteSignificandBigEndian (Span<byte> destination);
```

Writes the current significand, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current significand should be written.

Returns: The number of bytes written to `destination`.

To be added.

## IFloatingPoint<TSelf>.WriteSignificandBigEndian(Byte[], Int32) method

```csharp
public virtual int WriteSignificandBigEndian (byte[] destination, int startIndex);
```

Writes the current significand, in big-endian format, to a given array.

Parameters:

- `destination`: The array to which the current significand should be written.
- `startIndex`: The starting index at which the significand should be written.

Returns: The number of bytes written to `destination` starting at `startIndex`.

To be added.

## IFloatingPoint<TSelf>.WriteSignificandLittleEndian(Byte[]) method

```csharp
public virtual int WriteSignificandLittleEndian (byte[] destination);
```

Writes the current significand, in little-endian format, to a given array.

Parameters:

- `destination`: The array to which the current significand should be written.

Returns: The number of bytes written to `destination`.

To be added.

## IFloatingPoint<TSelf>.WriteSignificandLittleEndian(Byte>) method

```csharp
public virtual int WriteSignificandLittleEndian (Span<byte> destination);
```

Writes the current significand, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current significand should be written.

Returns: The number of bytes written to `destination`.

To be added.

## IFloatingPoint<TSelf>.WriteSignificandLittleEndian(Byte[], Int32) method

```csharp
public virtual int WriteSignificandLittleEndian (byte[] destination, int startIndex);
```

Writes the current significand, in little-endian format, to a given array.

Parameters:

- `destination`: The array to which the current significand should be written.
- `startIndex`: The starting index at which the significand should be written.

Returns: The number of bytes written to `destination` starting at `startIndex`.

To be added.
