---
title: "UInt16 struct (part 4 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UInt16.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UInt16 struct (part 4 of 8)

## UInt16.System.IConvertible.ToType(Type, IFormatProvider) method

```csharp
object IConvertible.ToType (Type type, IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToType`.

Parameters:

- `type`: The type to which to convert this `UInt16` value.
- `provider`: An `IFormatProvider` implementation that supplies information about the format of the returned value.

Returns: The current value of this instance, converted to `type`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt16` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `static` (`Shared` in Visual Basic) `Convert.ChangeType` method.

## UInt16.System.IConvertible.ToUInt16(IFormatProvider) method

```csharp
ushort IConvertible.ToUInt16 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt16`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The current value of this instance, unchanged.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt16` instance is cast to an `IConvertible` interface.

## UInt16.System.IConvertible.ToUInt32(IFormatProvider) method

```csharp
uint IConvertible.ToUInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt32`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The current value of this instance, converted to a `UInt32`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt16` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt32` method.

## UInt16.System.IConvertible.ToUInt64(IFormatProvider) method

```csharp
ulong IConvertible.ToUInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt64`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The current value of this instance, converted to a `UInt64`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt16` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt64` method.

## UInt16.System.Numerics.IAdditionOperators<System.UInt16,System.UInt16,System.UInt16>.op_Addition(UInt16, UInt16) method

```csharp
static ushort IAdditionOperators<ushort,ushort,ushort>.operator + (ushort left, ushort right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## UInt16.System.Numerics.IAdditionOperators<System.UInt16,System.UInt16,System.UInt16>.op_CheckedAddition(UInt16, UInt16) method

```csharp
static ushort IAdditionOperators<ushort,ushort,ushort>.op_CheckedAddition (ushort left, ushort right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## UInt16.System.Numerics.IBinaryInteger<System.UInt16>.GetByteCount() method

```csharp
int IBinaryInteger<ushort>.GetByteCount ();
```

Gets the number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

Returns: The number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

To be added.

## UInt16.System.Numerics.IBinaryInteger<System.UInt16>.GetShortestBitLength() method

```csharp
int IBinaryInteger<ushort>.GetShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current value.

Returns: The length, in bits, of the shortest two's complement representation of the current value.

To be added.

## UInt16.System.Numerics.IBinaryInteger<System.UInt16>.TryReadBigEndian(Byte>, Boolean, UInt16) method

```csharp
static bool IBinaryInteger<ushort>.TryReadBigEndian (ReadOnlySpan<byte> source, bool isUnsigned, out ushort value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## UInt16.System.Numerics.IBinaryInteger<System.UInt16>.TryReadLittleEndian(Byte>, Boolean, UInt16) method

```csharp
static bool IBinaryInteger<ushort>.TryReadLittleEndian (ReadOnlySpan<byte> source, bool isUnsigned, out ushort value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## UInt16.System.Numerics.IBinaryInteger<System.UInt16>.TryWriteBigEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<ushort>.TryWriteBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## UInt16.System.Numerics.IBinaryInteger<System.UInt16>.TryWriteLittleEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<ushort>.TryWriteLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## UInt16.System.Numerics.IBitwiseOperators<System.UInt16,System.UInt16,System.UInt16>.op_BitwiseAnd(UInt16, UInt16) method

```csharp
static ushort IBitwiseOperators<ushort,ushort,ushort>.operator & (ushort left, ushort right);
```

Computes the bitwise-and of two values.

Parameters:

- `left`: The value to `and` with `right`.
- `right`: The value to `and` with `left`.

Returns: The bitwise-and of `left` and `right`.

To be added.

## UInt16.System.Numerics.IBitwiseOperators<System.UInt16,System.UInt16,System.UInt16>.op_BitwiseOr(UInt16, UInt16) method

```csharp
static ushort IBitwiseOperators<ushort,ushort,ushort>.operator | (ushort left, ushort right);
```

Computes the bitwise-or of two values.

Parameters:

- `left`: The value to `or` with `right`.
- `right`: The value to `or` with `left`.

Returns: The bitwise-or of `left` and `right`.

To be added.

## UInt16.System.Numerics.IBitwiseOperators<System.UInt16,System.UInt16,System.UInt16>.op_ExclusiveOr(UInt16, UInt16) method

```csharp
static ushort IBitwiseOperators<ushort,ushort,ushort>.operator ^ (ushort left, ushort right);
```

Computes the exclusive-or of two values.

Parameters:

- `left`: The value to xor with `right`.
- `right`: The value to xor with `left`.

Returns: The exclusive-or of `left` and `right`.

To be added.

## UInt16.System.Numerics.IBitwiseOperators<System.UInt16,System.UInt16,System.UInt16>.op_OnesComplement(UInt16) method

```csharp
static ushort IBitwiseOperators<ushort,ushort,ushort>.operator ~ (ushort value);
```

Computes the ones-complement representation of a given value.

Parameters:

- `value`: The value for which to compute the ones-complement.

Returns: The ones-complement of `value`.

To be added.

## UInt16.System.Numerics.IComparisonOperators<System.UInt16,System.UInt16,System.Boolean>.op_GreaterThan(UInt16, UInt16) method

```csharp
static bool IComparisonOperators<ushort,ushort,bool>.operator > (ushort left, ushort right);
```

Compares two values to determine which is greater.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

To be added.

## UInt16.System.Numerics.IComparisonOperators<System.UInt16,System.UInt16,System.Boolean>.op_GreaterThanOrEqual(UInt16, UInt16) method

```csharp
static bool IComparisonOperators<ushort,ushort,bool>.operator >= (ushort left, ushort right);
```

Compares two values to determine which is greater or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

To be added.

## UInt16.System.Numerics.IComparisonOperators<System.UInt16,System.UInt16,System.Boolean>.op_LessThan(UInt16, UInt16) method

```csharp
static bool IComparisonOperators<ushort,ushort,bool>.operator < (ushort left, ushort right);
```

Compares two values to determine which is less.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

To be added.

## UInt16.System.Numerics.IComparisonOperators<System.UInt16,System.UInt16,System.Boolean>.op_LessThanOrEqual(UInt16, UInt16) method

```csharp
static bool IComparisonOperators<ushort,ushort,bool>.operator <= (ushort left, ushort right);
```

Compares two values to determine which is less or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

To be added.

## UInt16.System.Numerics.IDecrementOperators<System.UInt16>.op_CheckedDecrement(UInt16) method

```csharp
static ushort IDecrementOperators<ushort>.op_CheckedDecrement (ushort value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## UInt16.System.Numerics.IDecrementOperators<System.UInt16>.op_Decrement(UInt16) method

```csharp
static ushort IDecrementOperators<ushort>.operator -- (ushort value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## UInt16.System.Numerics.IDivisionOperators<System.UInt16,System.UInt16,System.UInt16>.op_Division(UInt16, UInt16) method

```csharp
static ushort IDivisionOperators<ushort,ushort,ushort>.operator / (ushort left, ushort right);
```

Divides one value by another to compute their quotient.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient of `left` divided by `right`.

To be added.

## UInt16.System.Numerics.IEqualityOperators<System.UInt16,System.UInt16,System.Boolean>.op_Equality(UInt16, UInt16) method

```csharp
static bool IEqualityOperators<ushort,ushort,bool>.operator == (ushort left, ushort right);
```

Compares two values to determine equality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## UInt16.System.Numerics.IEqualityOperators<System.UInt16,System.UInt16,System.Boolean>.op_Inequality(UInt16, UInt16) method

```csharp
static bool IEqualityOperators<ushort,ushort,bool>.operator != (ushort left, ushort right);
```

Compares two values to determine inequality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.

## UInt16.System.Numerics.IIncrementOperators<System.UInt16>.op_CheckedIncrement(UInt16) method

```csharp
static ushort IIncrementOperators<ushort>.op_CheckedIncrement (ushort value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## UInt16.System.Numerics.IIncrementOperators<System.UInt16>.op_Increment(UInt16) method

```csharp
static ushort IIncrementOperators<ushort>.operator ++ (ushort value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## UInt16.System.Numerics.IModulusOperators<System.UInt16,System.UInt16,System.UInt16>.op_Modulus(UInt16, UInt16) method

```csharp
static ushort IModulusOperators<ushort,ushort,ushort>.operator % (ushort left, ushort right);
```

Divides two values together to compute their modulus or remainder.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The modulus or remainder of `left` divided by `right`.

To be added.

## UInt16.System.Numerics.IMultiplyOperators<System.UInt16,System.UInt16,System.UInt16>.op_CheckedMultiply(UInt16, UInt16) method

```csharp
static ushort IMultiplyOperators<ushort,ushort,ushort>.op_CheckedMultiply (ushort left, ushort right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## UInt16.System.Numerics.IMultiplyOperators<System.UInt16,System.UInt16,System.UInt16>.op_Multiply(UInt16, UInt16) method

```csharp
static ushort IMultiplyOperators<ushort,ushort,ushort>.operator * (ushort left, ushort right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## UInt16.System.Numerics.INumber<System.UInt16>.CopySign(UInt16, UInt16) method

```csharp
static ushort INumber<ushort>.CopySign (ushort value, ushort sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## UInt16.System.Numerics.INumber<System.UInt16>.MaxNumber(UInt16, UInt16) method

```csharp
static ushort INumber<ushort>.MaxNumber (ushort x, ushort y);
```

Compares two values to compute which is greater and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## UInt16.System.Numerics.INumber<System.UInt16>.MinNumber(UInt16, UInt16) method

```csharp
static ushort INumber<ushort>.MinNumber (ushort x, ushort y);
```

Compares two values to compute which is lesser and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.
