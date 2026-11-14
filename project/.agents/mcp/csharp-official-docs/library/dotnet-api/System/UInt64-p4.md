---
title: "UInt64 struct (part 4 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UInt64.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UInt64 struct (part 4 of 8)

## UInt64.System.IConvertible.ToSByte(IFormatProvider) method

```csharp
sbyte IConvertible.ToSByte (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToSByte`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to an `SByte`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToSByte` method.

## UInt64.System.IConvertible.ToSingle(IFormatProvider) method

```csharp
float IConvertible.ToSingle (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToSingle`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Single`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToSingle` method.

## UInt64.System.IConvertible.ToType(Type, IFormatProvider) method

```csharp
object IConvertible.ToType (Type type, IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToType`.

Parameters:

- `type`: The type to which to convert this `UInt64` value.
- `provider`: An `IFormatProvider` implementation that supplies information about the format of the returned value.

Returns: The value of the current instance, converted to `type`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `static` (`Shared` in Visual Basic) `Convert.ChangeType` method.

## UInt64.System.IConvertible.ToUInt16(IFormatProvider) method

```csharp
ushort IConvertible.ToUInt16 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt16`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt16`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt16` method.

## UInt64.System.IConvertible.ToUInt32(IFormatProvider) method

```csharp
uint IConvertible.ToUInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt32`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt32`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt32` method.

## UInt64.System.IConvertible.ToUInt64(IFormatProvider) method

```csharp
ulong IConvertible.ToUInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt64`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, unchanged.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt64` instance is cast to an `IConvertible` interface.

## UInt64.System.Numerics.IAdditionOperators<System.UInt64,System.UInt64,System.UInt64>.op_Addition(UInt64, UInt64) method

```csharp
static ulong IAdditionOperators<ulong,ulong,ulong>.operator + (ulong left, ulong right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## UInt64.System.Numerics.IAdditionOperators<System.UInt64,System.UInt64,System.UInt64>.op_CheckedAddition(UInt64, UInt64) method

```csharp
static ulong IAdditionOperators<ulong,ulong,ulong>.op_CheckedAddition (ulong left, ulong right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## UInt64.System.Numerics.IBinaryInteger<System.UInt64>.GetByteCount() method

```csharp
int IBinaryInteger<ulong>.GetByteCount ();
```

Gets the number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

Returns: The number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

To be added.

## UInt64.System.Numerics.IBinaryInteger<System.UInt64>.GetShortestBitLength() method

```csharp
int IBinaryInteger<ulong>.GetShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current value.

Returns: The length, in bits, of the shortest two's complement representation of the current value.

To be added.

## UInt64.System.Numerics.IBinaryInteger<System.UInt64>.TryReadBigEndian(Byte>, Boolean, UInt64) method

```csharp
static bool IBinaryInteger<ulong>.TryReadBigEndian (ReadOnlySpan<byte> source, bool isUnsigned, out ulong value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## UInt64.System.Numerics.IBinaryInteger<System.UInt64>.TryReadLittleEndian(Byte>, Boolean, UInt64) method

```csharp
static bool IBinaryInteger<ulong>.TryReadLittleEndian (ReadOnlySpan<byte> source, bool isUnsigned, out ulong value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## UInt64.System.Numerics.IBinaryInteger<System.UInt64>.TryWriteBigEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<ulong>.TryWriteBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## UInt64.System.Numerics.IBinaryInteger<System.UInt64>.TryWriteLittleEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<ulong>.TryWriteLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## UInt64.System.Numerics.IBitwiseOperators<System.UInt64,System.UInt64,System.UInt64>.op_BitwiseAnd(UInt64, UInt64) method

```csharp
static ulong IBitwiseOperators<ulong,ulong,ulong>.operator & (ulong left, ulong right);
```

Computes the bitwise-and of two values.

Parameters:

- `left`: The value to `and` with `right`.
- `right`: The value to `and` with `left`.

Returns: The bitwise-and of `left` and `right`.

To be added.

## UInt64.System.Numerics.IBitwiseOperators<System.UInt64,System.UInt64,System.UInt64>.op_BitwiseOr(UInt64, UInt64) method

```csharp
static ulong IBitwiseOperators<ulong,ulong,ulong>.operator | (ulong left, ulong right);
```

Computes the bitwise-or of two values.

Parameters:

- `left`: The value to `or` with `right`.
- `right`: The value to `or` with `left`.

Returns: The bitwise-or of `left` and `right`.

To be added.

## UInt64.System.Numerics.IBitwiseOperators<System.UInt64,System.UInt64,System.UInt64>.op_ExclusiveOr(UInt64, UInt64) method

```csharp
static ulong IBitwiseOperators<ulong,ulong,ulong>.operator ^ (ulong left, ulong right);
```

Computes the exclusive-or of two values.

Parameters:

- `left`: The value to xor with `right`.
- `right`: The value to xor with `left`.

Returns: The exclusive-or of `left` and `right`.

To be added.

## UInt64.System.Numerics.IBitwiseOperators<System.UInt64,System.UInt64,System.UInt64>.op_OnesComplement(UInt64) method

```csharp
static ulong IBitwiseOperators<ulong,ulong,ulong>.operator ~ (ulong value);
```

Computes the ones-complement representation of a given value.

Parameters:

- `value`: The value for which to compute the ones-complement.

Returns: The ones-complement of `value`.

To be added.

## UInt64.System.Numerics.IComparisonOperators<System.UInt64,System.UInt64,System.Boolean>.op_GreaterThan(UInt64, UInt64) method

```csharp
static bool IComparisonOperators<ulong,ulong,bool>.operator > (ulong left, ulong right);
```

Compares two values to determine which is greater.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

To be added.

## UInt64.System.Numerics.IComparisonOperators<System.UInt64,System.UInt64,System.Boolean>.op_GreaterThanOrEqual(UInt64, UInt64) method

```csharp
static bool IComparisonOperators<ulong,ulong,bool>.operator >= (ulong left, ulong right);
```

Compares two values to determine which is greater or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

To be added.

## UInt64.System.Numerics.IComparisonOperators<System.UInt64,System.UInt64,System.Boolean>.op_LessThan(UInt64, UInt64) method

```csharp
static bool IComparisonOperators<ulong,ulong,bool>.operator < (ulong left, ulong right);
```

Compares two values to determine which is less.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

To be added.

## UInt64.System.Numerics.IComparisonOperators<System.UInt64,System.UInt64,System.Boolean>.op_LessThanOrEqual(UInt64, UInt64) method

```csharp
static bool IComparisonOperators<ulong,ulong,bool>.operator <= (ulong left, ulong right);
```

Compares two values to determine which is less or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

To be added.

## UInt64.System.Numerics.IDecrementOperators<System.UInt64>.op_CheckedDecrement(UInt64) method

```csharp
static ulong IDecrementOperators<ulong>.op_CheckedDecrement (ulong value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## UInt64.System.Numerics.IDecrementOperators<System.UInt64>.op_Decrement(UInt64) method

```csharp
static ulong IDecrementOperators<ulong>.operator -- (ulong value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## UInt64.System.Numerics.IDivisionOperators<System.UInt64,System.UInt64,System.UInt64>.op_Division(UInt64, UInt64) method

```csharp
static ulong IDivisionOperators<ulong,ulong,ulong>.operator / (ulong left, ulong right);
```

Divides one value by another to compute their quotient.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient of `left` divided by `right`.

To be added.

## UInt64.System.Numerics.IEqualityOperators<System.UInt64,System.UInt64,System.Boolean>.op_Equality(UInt64, UInt64) method

```csharp
static bool IEqualityOperators<ulong,ulong,bool>.operator == (ulong left, ulong right);
```

Compares two values to determine equality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## UInt64.System.Numerics.IEqualityOperators<System.UInt64,System.UInt64,System.Boolean>.op_Inequality(UInt64, UInt64) method

```csharp
static bool IEqualityOperators<ulong,ulong,bool>.operator != (ulong left, ulong right);
```

Compares two values to determine inequality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.

## UInt64.System.Numerics.IIncrementOperators<System.UInt64>.op_CheckedIncrement(UInt64) method

```csharp
static ulong IIncrementOperators<ulong>.op_CheckedIncrement (ulong value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## UInt64.System.Numerics.IIncrementOperators<System.UInt64>.op_Increment(UInt64) method

```csharp
static ulong IIncrementOperators<ulong>.operator ++ (ulong value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## UInt64.System.Numerics.IModulusOperators<System.UInt64,System.UInt64,System.UInt64>.op_Modulus(UInt64, UInt64) method

```csharp
static ulong IModulusOperators<ulong,ulong,ulong>.operator % (ulong left, ulong right);
```

Divides two values together to compute their modulus or remainder.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The modulus or remainder of `left` divided by `right`.

To be added.

## UInt64.System.Numerics.IMultiplyOperators<System.UInt64,System.UInt64,System.UInt64>.op_CheckedMultiply(UInt64, UInt64) method

```csharp
static ulong IMultiplyOperators<ulong,ulong,ulong>.op_CheckedMultiply (ulong left, ulong right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## UInt64.System.Numerics.IMultiplyOperators<System.UInt64,System.UInt64,System.UInt64>.op_Multiply(UInt64, UInt64) method

```csharp
static ulong IMultiplyOperators<ulong,ulong,ulong>.operator * (ulong left, ulong right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## UInt64.System.Numerics.INumber<System.UInt64>.CopySign(UInt64, UInt64) method

```csharp
static ulong INumber<ulong>.CopySign (ulong value, ulong sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.
