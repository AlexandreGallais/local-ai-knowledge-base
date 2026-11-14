---
title: "Byte struct (part 4 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Byte.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Byte struct (part 4 of 7)

## Byte.System.IConvertible.ToUInt16(IFormatProvider) method

```csharp
ushort IConvertible.ToUInt16 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt16`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt16`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Byte` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt16` method.

## Byte.System.IConvertible.ToUInt32(IFormatProvider) method

```csharp
uint IConvertible.ToUInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt32`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt32`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Byte` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt32` method.

## Byte.System.IConvertible.ToUInt64(IFormatProvider) method

```csharp
ulong IConvertible.ToUInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt64`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt64`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Byte` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt64` method.

## Byte.System.Numerics.IAdditionOperators<System.Byte,System.Byte,System.Byte>.op_Addition(Byte, Byte) method

```csharp
static byte IAdditionOperators<byte,byte,byte>.operator + (byte left, byte right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## Byte.System.Numerics.IAdditionOperators<System.Byte,System.Byte,System.Byte>.op_CheckedAddition(Byte, Byte) method

```csharp
static byte IAdditionOperators<byte,byte,byte>.op_CheckedAddition (byte left, byte right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## Byte.System.Numerics.IBinaryInteger<System.Byte>.GetByteCount() method

```csharp
int IBinaryInteger<byte>.GetByteCount ();
```

Gets the number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

Returns: The number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

To be added.

## Byte.System.Numerics.IBinaryInteger<System.Byte>.GetShortestBitLength() method

```csharp
int IBinaryInteger<byte>.GetShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current value.

Returns: The length, in bits, of the shortest two's complement representation of the current value.

To be added.

## Byte.System.Numerics.IBinaryInteger<System.Byte>.TryReadBigEndian(Byte>, Boolean, Byte) method

```csharp
static bool IBinaryInteger<byte>.TryReadBigEndian (ReadOnlySpan<byte> source, bool isUnsigned, out byte value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Byte.System.Numerics.IBinaryInteger<System.Byte>.TryReadLittleEndian(Byte>, Boolean, Byte) method

```csharp
static bool IBinaryInteger<byte>.TryReadLittleEndian (ReadOnlySpan<byte> source, bool isUnsigned, out byte value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Byte.System.Numerics.IBinaryInteger<System.Byte>.TryWriteBigEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<byte>.TryWriteBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## Byte.System.Numerics.IBinaryInteger<System.Byte>.TryWriteLittleEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<byte>.TryWriteLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## Byte.System.Numerics.IBitwiseOperators<System.Byte,System.Byte,System.Byte>.op_BitwiseAnd(Byte, Byte) method

```csharp
static byte IBitwiseOperators<byte,byte,byte>.operator & (byte left, byte right);
```

Computes the bitwise-and of two values.

Parameters:

- `left`: The value to `and` with `right`.
- `right`: The value to `and` with `left`.

Returns: The bitwise-and of `left` and `right`.

To be added.

## Byte.System.Numerics.IBitwiseOperators<System.Byte,System.Byte,System.Byte>.op_BitwiseOr(Byte, Byte) method

```csharp
static byte IBitwiseOperators<byte,byte,byte>.operator | (byte left, byte right);
```

Computes the bitwise-or of two values.

Parameters:

- `left`: The value to `or` with `right`.
- `right`: The value to `or` with `left`.

Returns: The bitwise-or of `left` and `right`.

To be added.

## Byte.System.Numerics.IBitwiseOperators<System.Byte,System.Byte,System.Byte>.op_ExclusiveOr(Byte, Byte) method

```csharp
static byte IBitwiseOperators<byte,byte,byte>.operator ^ (byte left, byte right);
```

Computes the exclusive-or of two values.

Parameters:

- `left`: The value to xor with `right`.
- `right`: The value to xor with `left`.

Returns: The exclusive-or of `left` and `right`.

To be added.

## Byte.System.Numerics.IBitwiseOperators<System.Byte,System.Byte,System.Byte>.op_OnesComplement(Byte) method

```csharp
static byte IBitwiseOperators<byte,byte,byte>.operator ~ (byte value);
```

Computes the ones-complement representation of a given value.

Parameters:

- `value`: The value for which to compute the ones-complement.

Returns: The ones-complement of `value`.

To be added.

## Byte.System.Numerics.IComparisonOperators<System.Byte,System.Byte,System.Boolean>.op_GreaterThan(Byte, Byte) method

```csharp
static bool IComparisonOperators<byte,byte,bool>.operator > (byte left, byte right);
```

Compares two values to determine which is greater.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

To be added.

## Byte.System.Numerics.IComparisonOperators<System.Byte,System.Byte,System.Boolean>.op_GreaterThanOrEqual(Byte, Byte) method

```csharp
static bool IComparisonOperators<byte,byte,bool>.operator >= (byte left, byte right);
```

Compares two values to determine which is greater or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

To be added.

## Byte.System.Numerics.IComparisonOperators<System.Byte,System.Byte,System.Boolean>.op_LessThan(Byte, Byte) method

```csharp
static bool IComparisonOperators<byte,byte,bool>.operator < (byte left, byte right);
```

Compares two values to determine which is less.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

To be added.

## Byte.System.Numerics.IComparisonOperators<System.Byte,System.Byte,System.Boolean>.op_LessThanOrEqual(Byte, Byte) method

```csharp
static bool IComparisonOperators<byte,byte,bool>.operator <= (byte left, byte right);
```

Compares two values to determine which is less or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

To be added.

## Byte.System.Numerics.IDecrementOperators<System.Byte>.op_CheckedDecrement(Byte) method

```csharp
static byte IDecrementOperators<byte>.op_CheckedDecrement (byte value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## Byte.System.Numerics.IDecrementOperators<System.Byte>.op_Decrement(Byte) method

```csharp
static byte IDecrementOperators<byte>.operator -- (byte value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## Byte.System.Numerics.IDivisionOperators<System.Byte,System.Byte,System.Byte>.op_Division(Byte, Byte) method

```csharp
static byte IDivisionOperators<byte,byte,byte>.operator / (byte left, byte right);
```

Divides one value by another to compute their quotient.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient of `left` divided by `right`.

To be added.

## Byte.System.Numerics.IEqualityOperators<System.Byte,System.Byte,System.Boolean>.op_Equality(Byte, Byte) method

```csharp
static bool IEqualityOperators<byte,byte,bool>.operator == (byte left, byte right);
```

Compares two values to determine equality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## Byte.System.Numerics.IEqualityOperators<System.Byte,System.Byte,System.Boolean>.op_Inequality(Byte, Byte) method

```csharp
static bool IEqualityOperators<byte,byte,bool>.operator != (byte left, byte right);
```

Compares two values to determine inequality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.

## Byte.System.Numerics.IIncrementOperators<System.Byte>.op_CheckedIncrement(Byte) method

```csharp
static byte IIncrementOperators<byte>.op_CheckedIncrement (byte value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## Byte.System.Numerics.IIncrementOperators<System.Byte>.op_Increment(Byte) method

```csharp
static byte IIncrementOperators<byte>.operator ++ (byte value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## Byte.System.Numerics.IModulusOperators<System.Byte,System.Byte,System.Byte>.op_Modulus(Byte, Byte) method

```csharp
static byte IModulusOperators<byte,byte,byte>.operator % (byte left, byte right);
```

Divides two values together to compute their modulus or remainder.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The modulus or remainder of `left` divided by `right`.

To be added.

## Byte.System.Numerics.IMultiplyOperators<System.Byte,System.Byte,System.Byte>.op_CheckedMultiply(Byte, Byte) method

```csharp
static byte IMultiplyOperators<byte,byte,byte>.op_CheckedMultiply (byte left, byte right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## Byte.System.Numerics.IMultiplyOperators<System.Byte,System.Byte,System.Byte>.op_Multiply(Byte, Byte) method

```csharp
static byte IMultiplyOperators<byte,byte,byte>.operator * (byte left, byte right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## Byte.System.Numerics.INumber<System.Byte>.CopySign(Byte, Byte) method

```csharp
static byte INumber<byte>.CopySign (byte value, byte sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## Byte.System.Numerics.INumber<System.Byte>.MaxNumber(Byte, Byte) method

```csharp
static byte INumber<byte>.MaxNumber (byte x, byte y);
```

Compares two values to compute which is greater and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## Byte.System.Numerics.INumber<System.Byte>.MinNumber(Byte, Byte) method

```csharp
static byte INumber<byte>.MinNumber (byte x, byte y);
```

Compares two values to compute which is lesser and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.Abs(Byte) method

```csharp
static byte INumberBase<byte>.Abs (byte value);
```

Computes the absolute of a value.

Parameters:

- `value`: The value for which to get its absolute.

Returns: The absolute of `value`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.IsCanonical(Byte) method

```csharp
static bool INumberBase<byte>.IsCanonical (byte value);
```

Determines if a value is in its canonical representation.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is in its canonical representation; otherwise, `false`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.IsComplexNumber(Byte) method

```csharp
static bool INumberBase<byte>.IsComplexNumber (byte value);
```

Determines if a value represents a complex number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a complex number; otherwise, `false`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.IsFinite(Byte) method

```csharp
static bool INumberBase<byte>.IsFinite (byte value);
```

Determines if a value is finite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is finite; otherwise, `false`.

To be added.
