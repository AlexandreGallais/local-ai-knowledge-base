---
title: "UInt32 struct (part 4 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UInt32.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UInt32 struct (part 4 of 8)

## UInt32.System.IConvertible.ToType(Type, IFormatProvider) method

```csharp
object IConvertible.ToType (Type type, IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToType`.

Parameters:

- `type`: The type to which to convert this `UInt32` value.
- `provider`: An `IFormatProvider` implementation that supplies culture-specific information about the format of the returned value.

Returns: The value of the current instance, converted to `type`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt32` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `static` (`Shared` in Visual Basic) `Convert.ChangeType` method.

## UInt32.System.IConvertible.ToUInt16(IFormatProvider) method

```csharp
ushort IConvertible.ToUInt16 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt16`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt16`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt32` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt16` method.

## UInt32.System.IConvertible.ToUInt32(IFormatProvider) method

```csharp
uint IConvertible.ToUInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt32`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, unchanged.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt32` instance is cast to an `IConvertible` interface.

## UInt32.System.IConvertible.ToUInt64(IFormatProvider) method

```csharp
ulong IConvertible.ToUInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt64`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt64`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt32` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt64` method.

## UInt32.System.Numerics.IAdditionOperators<System.UInt32,System.UInt32,System.UInt32>.op_Addition(UInt32, UInt32) method

```csharp
static uint IAdditionOperators<uint,uint,uint>.operator + (uint left, uint right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## UInt32.System.Numerics.IAdditionOperators<System.UInt32,System.UInt32,System.UInt32>.op_CheckedAddition(UInt32, UInt32) method

```csharp
static uint IAdditionOperators<uint,uint,uint>.op_CheckedAddition (uint left, uint right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## UInt32.System.Numerics.IBinaryInteger<System.UInt32>.GetByteCount() method

```csharp
int IBinaryInteger<uint>.GetByteCount ();
```

Gets the number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

Returns: The number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

To be added.

## UInt32.System.Numerics.IBinaryInteger<System.UInt32>.GetShortestBitLength() method

```csharp
int IBinaryInteger<uint>.GetShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current value.

Returns: The length, in bits, of the shortest two's complement representation of the current value.

To be added.

## UInt32.System.Numerics.IBinaryInteger<System.UInt32>.TryReadBigEndian(Byte>, Boolean, UInt32) method

```csharp
static bool IBinaryInteger<uint>.TryReadBigEndian (ReadOnlySpan<byte> source, bool isUnsigned, out uint value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## UInt32.System.Numerics.IBinaryInteger<System.UInt32>.TryReadLittleEndian(Byte>, Boolean, UInt32) method

```csharp
static bool IBinaryInteger<uint>.TryReadLittleEndian (ReadOnlySpan<byte> source, bool isUnsigned, out uint value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## UInt32.System.Numerics.IBinaryInteger<System.UInt32>.TryWriteBigEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<uint>.TryWriteBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## UInt32.System.Numerics.IBinaryInteger<System.UInt32>.TryWriteLittleEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<uint>.TryWriteLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## UInt32.System.Numerics.IBitwiseOperators<System.UInt32,System.UInt32,System.UInt32>.op_BitwiseAnd(UInt32, UInt32) method

```csharp
static uint IBitwiseOperators<uint,uint,uint>.operator & (uint left, uint right);
```

Computes the bitwise-and of two values.

Parameters:

- `left`: The value to `and` with `right`.
- `right`: The value to `and` with `left`.

Returns: The bitwise-and of `left` and `right`.

To be added.

## UInt32.System.Numerics.IBitwiseOperators<System.UInt32,System.UInt32,System.UInt32>.op_BitwiseOr(UInt32, UInt32) method

```csharp
static uint IBitwiseOperators<uint,uint,uint>.operator | (uint left, uint right);
```

Computes the bitwise-or of two values.

Parameters:

- `left`: The value to `or` with `right`.
- `right`: The value to `or` with `left`.

Returns: The bitwise-or of `left` and `right`.

To be added.

## UInt32.System.Numerics.IBitwiseOperators<System.UInt32,System.UInt32,System.UInt32>.op_ExclusiveOr(UInt32, UInt32) method

```csharp
static uint IBitwiseOperators<uint,uint,uint>.operator ^ (uint left, uint right);
```

Computes the exclusive-or of two values.

Parameters:

- `left`: The value to xor with `right`.
- `right`: The value to xor with `left`.

Returns: The exclusive-or of `left` and `right`.

To be added.

## UInt32.System.Numerics.IBitwiseOperators<System.UInt32,System.UInt32,System.UInt32>.op_OnesComplement(UInt32) method

```csharp
static uint IBitwiseOperators<uint,uint,uint>.operator ~ (uint value);
```

Computes the ones-complement representation of a given value.

Parameters:

- `value`: The value for which to compute the ones-complement.

Returns: The ones-complement of `value`.

To be added.

## UInt32.System.Numerics.IComparisonOperators<System.UInt32,System.UInt32,System.Boolean>.op_GreaterThan(UInt32, UInt32) method

```csharp
static bool IComparisonOperators<uint,uint,bool>.operator > (uint left, uint right);
```

Compares two values to determine which is greater.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

To be added.

## UInt32.System.Numerics.IComparisonOperators<System.UInt32,System.UInt32,System.Boolean>.op_GreaterThanOrEqual(UInt32, UInt32) method

```csharp
static bool IComparisonOperators<uint,uint,bool>.operator >= (uint left, uint right);
```

Compares two values to determine which is greater or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

To be added.

## UInt32.System.Numerics.IComparisonOperators<System.UInt32,System.UInt32,System.Boolean>.op_LessThan(UInt32, UInt32) method

```csharp
static bool IComparisonOperators<uint,uint,bool>.operator < (uint left, uint right);
```

Compares two values to determine which is less.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

To be added.

## UInt32.System.Numerics.IComparisonOperators<System.UInt32,System.UInt32,System.Boolean>.op_LessThanOrEqual(UInt32, UInt32) method

```csharp
static bool IComparisonOperators<uint,uint,bool>.operator <= (uint left, uint right);
```

Compares two values to determine which is less or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

To be added.

## UInt32.System.Numerics.IDecrementOperators<System.UInt32>.op_CheckedDecrement(UInt32) method

```csharp
static uint IDecrementOperators<uint>.op_CheckedDecrement (uint value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## UInt32.System.Numerics.IDecrementOperators<System.UInt32>.op_Decrement(UInt32) method

```csharp
static uint IDecrementOperators<uint>.operator -- (uint value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## UInt32.System.Numerics.IDivisionOperators<System.UInt32,System.UInt32,System.UInt32>.op_Division(UInt32, UInt32) method

```csharp
static uint IDivisionOperators<uint,uint,uint>.operator / (uint left, uint right);
```

Divides one value by another to compute their quotient.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient of `left` divided by `right`.

To be added.

## UInt32.System.Numerics.IEqualityOperators<System.UInt32,System.UInt32,System.Boolean>.op_Equality(UInt32, UInt32) method

```csharp
static bool IEqualityOperators<uint,uint,bool>.operator == (uint left, uint right);
```

Compares two values to determine equality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## UInt32.System.Numerics.IEqualityOperators<System.UInt32,System.UInt32,System.Boolean>.op_Inequality(UInt32, UInt32) method

```csharp
static bool IEqualityOperators<uint,uint,bool>.operator != (uint left, uint right);
```

Compares two values to determine inequality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.

## UInt32.System.Numerics.IIncrementOperators<System.UInt32>.op_CheckedIncrement(UInt32) method

```csharp
static uint IIncrementOperators<uint>.op_CheckedIncrement (uint value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## UInt32.System.Numerics.IIncrementOperators<System.UInt32>.op_Increment(UInt32) method

```csharp
static uint IIncrementOperators<uint>.operator ++ (uint value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## UInt32.System.Numerics.IModulusOperators<System.UInt32,System.UInt32,System.UInt32>.op_Modulus(UInt32, UInt32) method

```csharp
static uint IModulusOperators<uint,uint,uint>.operator % (uint left, uint right);
```

Divides two values together to compute their modulus or remainder.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The modulus or remainder of `left` divided by `right`.

To be added.

## UInt32.System.Numerics.IMultiplyOperators<System.UInt32,System.UInt32,System.UInt32>.op_CheckedMultiply(UInt32, UInt32) method

```csharp
static uint IMultiplyOperators<uint,uint,uint>.op_CheckedMultiply (uint left, uint right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## UInt32.System.Numerics.IMultiplyOperators<System.UInt32,System.UInt32,System.UInt32>.op_Multiply(UInt32, UInt32) method

```csharp
static uint IMultiplyOperators<uint,uint,uint>.operator * (uint left, uint right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## UInt32.System.Numerics.INumber<System.UInt32>.CopySign(UInt32, UInt32) method

```csharp
static uint INumber<uint>.CopySign (uint value, uint sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## UInt32.System.Numerics.INumber<System.UInt32>.MaxNumber(UInt32, UInt32) method

```csharp
static uint INumber<uint>.MaxNumber (uint x, uint y);
```

Compares two values to compute which is greater and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## UInt32.System.Numerics.INumber<System.UInt32>.MinNumber(UInt32, UInt32) method

```csharp
static uint INumber<uint>.MinNumber (uint x, uint y);
```

Compares two values to compute which is lesser and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## UInt32.System.Numerics.INumberBase<System.UInt32>.Abs(UInt32) method

```csharp
static uint INumberBase<uint>.Abs (uint value);
```

Computes the absolute of a value.

Parameters:

- `value`: The value for which to get its absolute.

Returns: The absolute of `value`.

To be added.
