---
title: "IBinaryInteger<TSelf> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IBinaryInteger`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IBinaryInteger<TSelf> interface

Namespace: `System.Numerics`

```csharp
public interface IBinaryInteger<TSelf> : IComparable<TSelf>, IEquatable<TSelf>, IParsable<TSelf>, ISpanParsable<TSelf>, IUtf8SpanParsable<TSelf>, System.Numerics.IAdditionOperators<TSelf,TSelf,TSelf>, System.Numerics.IAdditiveIdentity<TSelf,TSelf>, System.Numerics.IBinaryNumber<TSelf>, System.Numerics.IBitwiseOperators<TSelf,TSelf,TSelf>, System.Numerics.IComparisonOperators<TSelf,TSelf,bool>, System.Numerics.IDecrementOperators<TSelf>, System.Numerics.IDivisionOperators<TSelf,TSelf,TSelf>, System.Numerics.IEqualityOperators<TSelf,TSelf,bool>, System.Numerics.IIncrementOperators<TSelf>, System.Numerics.IModulusOperators<TSelf,TSelf,TSelf>, System.Numerics.IMultiplicativeIdentity<TSelf,TSelf>, System.Numerics.IMultiplyOperators<TSelf,TSelf,TSelf>, System.Numerics.INumber<TSelf>, System.Numerics.INumberBase<TSelf>, System.Numerics.IShiftOperators<TSelf,int,TSelf>, System.Numerics.ISubtractionOperators<TSelf,TSelf,TSelf>, System.Numerics.IUnaryNegationOperators<TSelf,TSelf>, System.Numerics.IUnaryPlusOperators<TSelf,TSelf> where TSelf : IBinaryInteger<TSelf>
```

Defines an integer type that is represented in a base-2 format.

Parameters:

- `TSelf`: The type that implements the interface.

To be added.

## IBinaryInteger<TSelf>.Divide(TSelf, TSelf, DivisionRounding) method

```csharp
public static virtual TSelf Divide (TSelf left, TSelf right, System.Numerics.DivisionRounding mode);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.
- `mode`: To be added.

Returns: To be added.

To be added.

## IBinaryInteger<TSelf>.DivRem(TSelf, TSelf) method

```csharp
public static virtual (TSelf Quotient, TSelf Remainder) DivRem (TSelf left, TSelf right);
```

Computes the quotient and remainder of two values.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient and remainder of `left` divided by `right`.

Exceptions:

- `DivideByZeroException`: `right` is zero.

To be added.

## IBinaryInteger<TSelf>.DivRem(TSelf, TSelf, DivisionRounding) method

```csharp
public static virtual (TSelf Quotient, TSelf Remainder) DivRem (TSelf left, TSelf right, System.Numerics.DivisionRounding mode);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.
- `mode`: To be added.

Returns: To be added.

To be added.

## IBinaryInteger<TSelf>.GetByteCount() method

```csharp
public int GetByteCount ();
```

Gets the number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

Returns: The number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

To be added.

## IBinaryInteger<TSelf>.GetShortestBitLength() method

```csharp
public int GetShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current value.

Returns: The length, in bits, of the shortest two's complement representation of the current value.

To be added.

## IBinaryInteger<TSelf>.LeadingZeroCount(TSelf) method

```csharp
public static virtual TSelf LeadingZeroCount (TSelf value);
```

Computes the number of leading zero bits in a value.

Parameters:

- `value`: The value whose leading zero bits are to be counted.

Returns: The number of leading zero bits in `value`.

To be added.

## IBinaryInteger<TSelf>.Log10(TSelf) method

```csharp
public static virtual TSelf Log10 (TSelf value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## IBinaryInteger<TSelf>.PopCount(TSelf) method

```csharp
public static abstract TSelf PopCount (TSelf value);
```

Computes the number of bits that are set in a value.

Parameters:

- `value`: The value whose set bits are to be counted.

Returns: The number of set bits in `value`.

To be added.

## IBinaryInteger<TSelf>.ReadBigEndian(Byte[], Boolean) method

```csharp
public static virtual TSelf ReadBigEndian (byte[] source, bool isUnsigned);
```

Reads a two's complement number from a given array, in big-endian format, and converts it to an instance of the current type.

Parameters:

- `source`: The array from which the two's complement number should be read.
- `isUnsigned`: `true` if `source` represents an unsigned two's complement number; otherwise, `false` to indicate it represents a signed two's complement number.

Returns: The value read from `source`.

Exceptions:

- `OverflowException`: `source` is not representable by `TSelf`

To be added.

## IBinaryInteger<TSelf>.ReadBigEndian(Byte>, Boolean) method

```csharp
public static virtual TSelf ReadBigEndian (ReadOnlySpan<byte> source, bool isUnsigned);
```

Reads a two's complement number from a given span, in big-endian format, and converts it to an instance of the current type.

Parameters:

- `source`: The array from which the two's complement number should be read.
- `isUnsigned`: `true` if `source` represents an unsigned two's complement number; otherwise, `false` to indicate it represents a signed two's complement number.

Returns: The value read from `source`.

Exceptions:

- `OverflowException`: `source` is not representable by `TSelf`

To be added.

## IBinaryInteger<TSelf>.ReadBigEndian(Byte[], Int32, Boolean) method

```csharp
public static virtual TSelf ReadBigEndian (byte[] source, int startIndex, bool isUnsigned);
```

Reads a two's complement number from a given array, in big-endian format, and converts it to an instance of the current type.

Parameters:

- `source`: The array from which the two's complement number should be read.
- `startIndex`: The starting index from which the value should be read.
- `isUnsigned`: `true` if `source` represents an unsigned two's complement number; otherwise, `false` to indicate it represents a signed two's complement number.

Returns: The value read from `source` starting at `startIndex`.

Exceptions:

- `OverflowException`: `source` is not representable by `TSelf`

To be added.

## IBinaryInteger<TSelf>.ReadLittleEndian(Byte[], Boolean) method

```csharp
public static virtual TSelf ReadLittleEndian (byte[] source, bool isUnsigned);
```

Reads a two's complement number from a given array, in little-endian format, and converts it to an instance of the current type.

Parameters:

- `source`: The array from which the two's complement number should be read.
- `isUnsigned`: `true` if `source` represents an unsigned two's complement number; otherwise, `false` to indicate it represents a signed two's complement number.

Returns: The value read from `source`.

Exceptions:

- `OverflowException`: `source` is not representable by `TSelf`

To be added.

## IBinaryInteger<TSelf>.ReadLittleEndian(Byte>, Boolean) method

```csharp
public static virtual TSelf ReadLittleEndian (ReadOnlySpan<byte> source, bool isUnsigned);
```

Reads a two's complement number from a given span, in little-endian format, and converts it to an instance of the current type.

Parameters:

- `source`: The array from which the two's complement number should be read.
- `isUnsigned`: `true` if `source` represents an unsigned two's complement number; otherwise, `false` to indicate it represents a signed two's complement number.

Returns: The value read from `source`.

Exceptions:

- `OverflowException`: `source` is not representable by `TSelf`

To be added.

## IBinaryInteger<TSelf>.ReadLittleEndian(Byte[], Int32, Boolean) method

```csharp
public static virtual TSelf ReadLittleEndian (byte[] source, int startIndex, bool isUnsigned);
```

Reads a two's complement number from a given array, in little-endian format, and converts it to an instance of the current type.

Parameters:

- `source`: The array from which the two's complement number should be read.
- `startIndex`: The starting index from which the value should be read.
- `isUnsigned`: `true` if `source` represents an unsigned two's complement number; otherwise, `false` to indicate it represents a signed two's complement number.

Returns: The value read from `source` starting at `startIndex`.

Exceptions:

- `OverflowException`: `source` is not representable by `TSelf`

To be added.

## IBinaryInteger<TSelf>.Remainder(TSelf, TSelf, DivisionRounding) method

```csharp
public static virtual TSelf Remainder (TSelf left, TSelf right, System.Numerics.DivisionRounding mode);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.
- `mode`: To be added.

Returns: To be added.

To be added.

## IBinaryInteger<TSelf>.RotateLeft(TSelf, Int32) method

```csharp
public static virtual TSelf RotateLeft (TSelf value, int rotateAmount);
```

Rotates a value left by a given amount.

Parameters:

- `value`: The value that is rotated left by `rotateAmount`.
- `rotateAmount`: The amount by which `value` is rotated left.

Returns: The result of rotating `value` left by `rotateAmount`.

To be added.

## IBinaryInteger<TSelf>.RotateRight(TSelf, Int32) method

```csharp
public static virtual TSelf RotateRight (TSelf value, int rotateAmount);
```

Rotates a value right by a given amount.

Parameters:

- `value`: The value that is rotated right by `rotateAmount`.
- `rotateAmount`: The amount by which `value` is rotated right.

Returns: The result of rotating `value` right by `rotateAmount`.

To be added.

## IBinaryInteger<TSelf>.TrailingZeroCount(TSelf) method

```csharp
public static abstract TSelf TrailingZeroCount (TSelf value);
```

Computes the number of trailing zero bits in a value.

Parameters:

- `value`: The value whose trailing zero bits are to be counted.

Returns: The number of trailing zero bits in `value`.

To be added.

## IBinaryInteger<TSelf>.TryReadBigEndian(Byte>, Boolean, TSelf) method

```csharp
public static abstract bool TryReadBigEndian (ReadOnlySpan<byte> source, bool isUnsigned, out TSelf value);
```

Tries to read a two's complement number from a span, in big-endian format, and convert it to an instance of the current type.

Parameters:

- `source`: The span from which the two's complement number should be read.
- `isUnsigned`: `true` if `source` represents an unsigned two's complement number; otherwise, `false` to indicate it represents a signed two's complement number.
- `value`: On return, contains the value read from `source` or `default` if a value could not be read.

Returns: `true` if the value was successfully read from `source`; otherwise, `false`.

To be added.

## IBinaryInteger<TSelf>.TryReadLittleEndian(Byte>, Boolean, TSelf) method

```csharp
public static abstract bool TryReadLittleEndian (ReadOnlySpan<byte> source, bool isUnsigned, out TSelf value);
```

Tries to read a two's complement number from a span, in little-endian format, and convert it to an instance of the current type.

Parameters:

- `source`: The span from which the two's complement number should be read.
- `isUnsigned`: `true` if `source` represents an unsigned two's complement number; otherwise, `false` to indicate it represents a signed two's complement number.
- `value`: On return, contains the value read from `source` or `default` if a value could not be read.

Returns: `true` if the value was successfully read from `source`; otherwise, `false`.

To be added.

## IBinaryInteger<TSelf>.TryWriteBigEndian(Byte>, Int32) method

```csharp
public bool TryWriteBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was successfully written to `destination`; otherwise, `false`.

To be added.

## IBinaryInteger<TSelf>.TryWriteLittleEndian(Byte>, Int32) method

```csharp
public bool TryWriteLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was successfully written to `destination`; otherwise, `false`.

To be added.

## IBinaryInteger<TSelf>.WriteBigEndian(Byte[]) method

```csharp
public virtual int WriteBigEndian (byte[] destination);
```

Writes the current value, in big-endian format, to a given array.

Parameters:

- `destination`: The array to which the current value should be written.

Returns: The number of bytes written to `destination`.

To be added.

## IBinaryInteger<TSelf>.WriteBigEndian(Byte>) method

```csharp
public virtual int WriteBigEndian (Span<byte> destination);
```

Writes the current value, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.

Returns: The number of bytes written to `destination`.

To be added.

## IBinaryInteger<TSelf>.WriteBigEndian(Byte[], Int32) method

```csharp
public virtual int WriteBigEndian (byte[] destination, int startIndex);
```

Writes the current value, in big-endian format, to a given array.

Parameters:

- `destination`: The array to which the current value should be written.
- `startIndex`: The starting index at which the value should be written.

Returns: The number of bytes written to `destination` starting at `startIndex`.

To be added.

## IBinaryInteger<TSelf>.WriteLittleEndian(Byte[]) method

```csharp
public virtual int WriteLittleEndian (byte[] destination);
```

Writes the current value, in little-endian format, to a given array.

Parameters:

- `destination`: The array to which the current value should be written.

Returns: The number of bytes written to `destination`.

To be added.

## IBinaryInteger<TSelf>.WriteLittleEndian(Byte>) method

```csharp
public virtual int WriteLittleEndian (Span<byte> destination);
```

Writes the current value, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.

Returns: The number of bytes written to `destination`.

To be added.

## IBinaryInteger<TSelf>.WriteLittleEndian(Byte[], Int32) method

```csharp
public virtual int WriteLittleEndian (byte[] destination, int startIndex);
```

Writes the current value, in little-endian format, to a specified array starting at a specified index.

Parameters:

- `destination`: The array to which the current value should be written.
- `startIndex`: The starting index at which the value should be written.

Returns: The number of bytes written to `destination` starting at `startIndex`.

To be added.
