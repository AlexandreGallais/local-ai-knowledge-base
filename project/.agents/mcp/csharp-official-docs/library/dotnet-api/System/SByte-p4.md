---
title: "SByte struct (part 4 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/SByte.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SByte struct (part 4 of 7)

## SByte.System.IConvertible.ToSingle(IFormatProvider) method

```csharp
float IConvertible.ToSingle (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToSingle`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Single`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `SByte` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToSingle` method.

## SByte.System.IConvertible.ToType(Type, IFormatProvider) method

```csharp
object IConvertible.ToType (Type type, IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToType`.

Parameters:

- `type`: The `Type` to which to convert this `SByte` value.
- `provider`: A `IFormatProvider` implementation that provides information about the format of the returned value.

Returns: The value of the current instance, converted to an object of type `type`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `SByte` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `static` (`Shared` in Visual Basic) `Convert.ChangeType` method.

## SByte.System.IConvertible.ToUInt16(IFormatProvider) method

```csharp
ushort IConvertible.ToUInt16 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt16`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt16`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `SByte` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt16` method.

## SByte.System.IConvertible.ToUInt32(IFormatProvider) method

```csharp
uint IConvertible.ToUInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt32`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt32`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `SByte` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt32` method.

## SByte.System.IConvertible.ToUInt64(IFormatProvider) method

```csharp
ulong IConvertible.ToUInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt64`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt64`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `SByte` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt64` method.

## SByte.System.Numerics.IAdditionOperators<System.SByte,System.SByte,System.SByte>.op_Addition(SByte, SByte) method

```csharp
static sbyte IAdditionOperators<sbyte,sbyte,sbyte>.operator + (sbyte left, sbyte right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## SByte.System.Numerics.IAdditionOperators<System.SByte,System.SByte,System.SByte>.op_CheckedAddition(SByte, SByte) method

```csharp
static sbyte IAdditionOperators<sbyte,sbyte,sbyte>.op_CheckedAddition (sbyte left, sbyte right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## SByte.System.Numerics.IBinaryInteger<System.SByte>.GetByteCount() method

```csharp
int IBinaryInteger<sbyte>.GetByteCount ();
```

Gets the number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

Returns: The number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

To be added.

## SByte.System.Numerics.IBinaryInteger<System.SByte>.GetShortestBitLength() method

```csharp
int IBinaryInteger<sbyte>.GetShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current value.

Returns: The length, in bits, of the shortest two's complement representation of the current value.

To be added.

## SByte.System.Numerics.IBinaryInteger<System.SByte>.TryReadBigEndian(Byte>, Boolean, SByte) method

```csharp
static bool IBinaryInteger<sbyte>.TryReadBigEndian (ReadOnlySpan<byte> source, bool isUnsigned, out sbyte value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## SByte.System.Numerics.IBinaryInteger<System.SByte>.TryReadLittleEndian(Byte>, Boolean, SByte) method

```csharp
static bool IBinaryInteger<sbyte>.TryReadLittleEndian (ReadOnlySpan<byte> source, bool isUnsigned, out sbyte value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## SByte.System.Numerics.IBinaryInteger<System.SByte>.TryWriteBigEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<sbyte>.TryWriteBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## SByte.System.Numerics.IBinaryInteger<System.SByte>.TryWriteLittleEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<sbyte>.TryWriteLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## SByte.System.Numerics.IBitwiseOperators<System.SByte,System.SByte,System.SByte>.op_BitwiseAnd(SByte, SByte) method

```csharp
static sbyte IBitwiseOperators<sbyte,sbyte,sbyte>.operator & (sbyte left, sbyte right);
```

Computes the bitwise-and of two values.

Parameters:

- `left`: The value to `and` with `right`.
- `right`: The value to `and` with `left`.

Returns: The bitwise-and of `left` and `right`.

To be added.

## SByte.System.Numerics.IBitwiseOperators<System.SByte,System.SByte,System.SByte>.op_BitwiseOr(SByte, SByte) method

```csharp
static sbyte IBitwiseOperators<sbyte,sbyte,sbyte>.operator | (sbyte left, sbyte right);
```

Computes the bitwise-or of two values.

Parameters:

- `left`: The value to `or` with `right`.
- `right`: The value to `or` with `left`.

Returns: The bitwise-or of `left` and `right`.

To be added.

## SByte.System.Numerics.IBitwiseOperators<System.SByte,System.SByte,System.SByte>.op_ExclusiveOr(SByte, SByte) method

```csharp
static sbyte IBitwiseOperators<sbyte,sbyte,sbyte>.operator ^ (sbyte left, sbyte right);
```

Computes the exclusive-or of two values.

Parameters:

- `left`: The value to xor with `right`.
- `right`: The value to xor with `left`.

Returns: The exclusive-or of `left` and `right`.

To be added.

## SByte.System.Numerics.IBitwiseOperators<System.SByte,System.SByte,System.SByte>.op_OnesComplement(SByte) method

```csharp
static sbyte IBitwiseOperators<sbyte,sbyte,sbyte>.operator ~ (sbyte value);
```

Computes the ones-complement representation of a given value.

Parameters:

- `value`: The value for which to compute the ones-complement.

Returns: The ones-complement of `value`.

To be added.

## SByte.System.Numerics.IComparisonOperators<System.SByte,System.SByte,System.Boolean>.op_GreaterThan(SByte, SByte) method

```csharp
static bool IComparisonOperators<sbyte,sbyte,bool>.operator > (sbyte left, sbyte right);
```

Compares two values to determine which is greater.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

To be added.

## SByte.System.Numerics.IComparisonOperators<System.SByte,System.SByte,System.Boolean>.op_GreaterThanOrEqual(SByte, SByte) method

```csharp
static bool IComparisonOperators<sbyte,sbyte,bool>.operator >= (sbyte left, sbyte right);
```

Compares two values to determine which is greater or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

To be added.

## SByte.System.Numerics.IComparisonOperators<System.SByte,System.SByte,System.Boolean>.op_LessThan(SByte, SByte) method

```csharp
static bool IComparisonOperators<sbyte,sbyte,bool>.operator < (sbyte left, sbyte right);
```

Compares two values to determine which is less.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

To be added.

## SByte.System.Numerics.IComparisonOperators<System.SByte,System.SByte,System.Boolean>.op_LessThanOrEqual(SByte, SByte) method

```csharp
static bool IComparisonOperators<sbyte,sbyte,bool>.operator <= (sbyte left, sbyte right);
```

Compares two values to determine which is less or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

To be added.

## SByte.System.Numerics.IDecrementOperators<System.SByte>.op_CheckedDecrement(SByte) method

```csharp
static sbyte IDecrementOperators<sbyte>.op_CheckedDecrement (sbyte value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## SByte.System.Numerics.IDecrementOperators<System.SByte>.op_Decrement(SByte) method

```csharp
static sbyte IDecrementOperators<sbyte>.operator -- (sbyte value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## SByte.System.Numerics.IDivisionOperators<System.SByte,System.SByte,System.SByte>.op_Division(SByte, SByte) method

```csharp
static sbyte IDivisionOperators<sbyte,sbyte,sbyte>.operator / (sbyte left, sbyte right);
```

Divides one value by another to compute their quotient.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient of `left` divided by `right`.

To be added.

## SByte.System.Numerics.IEqualityOperators<System.SByte,System.SByte,System.Boolean>.op_Equality(SByte, SByte) method

```csharp
static bool IEqualityOperators<sbyte,sbyte,bool>.operator == (sbyte left, sbyte right);
```

Compares two values to determine equality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## SByte.System.Numerics.IEqualityOperators<System.SByte,System.SByte,System.Boolean>.op_Inequality(SByte, SByte) method

```csharp
static bool IEqualityOperators<sbyte,sbyte,bool>.operator != (sbyte left, sbyte right);
```

Compares two values to determine inequality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.

## SByte.System.Numerics.IIncrementOperators<System.SByte>.op_CheckedIncrement(SByte) method

```csharp
static sbyte IIncrementOperators<sbyte>.op_CheckedIncrement (sbyte value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## SByte.System.Numerics.IIncrementOperators<System.SByte>.op_Increment(SByte) method

```csharp
static sbyte IIncrementOperators<sbyte>.operator ++ (sbyte value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## SByte.System.Numerics.IModulusOperators<System.SByte,System.SByte,System.SByte>.op_Modulus(SByte, SByte) method

```csharp
static sbyte IModulusOperators<sbyte,sbyte,sbyte>.operator % (sbyte left, sbyte right);
```

Divides two values together to compute their modulus or remainder.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The modulus or remainder of `left` divided by `right`.

To be added.

## SByte.System.Numerics.IMultiplyOperators<System.SByte,System.SByte,System.SByte>.op_CheckedMultiply(SByte, SByte) method

```csharp
static sbyte IMultiplyOperators<sbyte,sbyte,sbyte>.op_CheckedMultiply (sbyte left, sbyte right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## SByte.System.Numerics.IMultiplyOperators<System.SByte,System.SByte,System.SByte>.op_Multiply(SByte, SByte) method

```csharp
static sbyte IMultiplyOperators<sbyte,sbyte,sbyte>.operator * (sbyte left, sbyte right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## SByte.System.Numerics.INumber<System.SByte>.MaxNumber(SByte, SByte) method

```csharp
static sbyte INumber<sbyte>.MaxNumber (sbyte x, sbyte y);
```

Compares two values to compute which is greater and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## SByte.System.Numerics.INumber<System.SByte>.MinNumber(SByte, SByte) method

```csharp
static sbyte INumber<sbyte>.MinNumber (sbyte x, sbyte y);
```

Compares two values to compute which is lesser and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.
