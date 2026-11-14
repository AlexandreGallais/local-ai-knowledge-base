---
title: "Int64 struct (part 5 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Int64.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int64 struct (part 5 of 8)

## Int64.System.IConvertible.ToUInt32(IFormatProvider) method

```csharp
uint IConvertible.ToUInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt32`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt32`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt32` method.

## Int64.System.IConvertible.ToUInt64(IFormatProvider) method

```csharp
ulong IConvertible.ToUInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt64`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt64`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt64` method.

## Int64.System.Numerics.IAdditionOperators<System.Int64,System.Int64,System.Int64>.op_Addition(Int64, Int64) method

```csharp
static long IAdditionOperators<long,long,long>.operator + (long left, long right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## Int64.System.Numerics.IAdditionOperators<System.Int64,System.Int64,System.Int64>.op_CheckedAddition(Int64, Int64) method

```csharp
static long IAdditionOperators<long,long,long>.op_CheckedAddition (long left, long right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## Int64.System.Numerics.IBinaryInteger<System.Int64>.GetByteCount() method

```csharp
int IBinaryInteger<long>.GetByteCount ();
```

Gets the number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

Returns: The number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

To be added.

## Int64.System.Numerics.IBinaryInteger<System.Int64>.GetShortestBitLength() method

```csharp
int IBinaryInteger<long>.GetShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current value.

Returns: The length, in bits, of the shortest two's complement representation of the current value.

To be added.

## Int64.System.Numerics.IBinaryInteger<System.Int64>.TryReadBigEndian(Byte>, Boolean, Int64) method

```csharp
static bool IBinaryInteger<long>.TryReadBigEndian (ReadOnlySpan<byte> source, bool isUnsigned, out long value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Int64.System.Numerics.IBinaryInteger<System.Int64>.TryReadLittleEndian(Byte>, Boolean, Int64) method

```csharp
static bool IBinaryInteger<long>.TryReadLittleEndian (ReadOnlySpan<byte> source, bool isUnsigned, out long value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Int64.System.Numerics.IBinaryInteger<System.Int64>.TryWriteBigEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<long>.TryWriteBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## Int64.System.Numerics.IBinaryInteger<System.Int64>.TryWriteLittleEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<long>.TryWriteLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## Int64.System.Numerics.IBitwiseOperators<System.Int64,System.Int64,System.Int64>.op_BitwiseAnd(Int64, Int64) method

```csharp
static long IBitwiseOperators<long,long,long>.operator & (long left, long right);
```

Computes the bitwise-and of two values.

Parameters:

- `left`: The value to `and` with `right`.
- `right`: The value to `and` with `left`.

Returns: The bitwise-and of `left` and `right`.

To be added.

## Int64.System.Numerics.IBitwiseOperators<System.Int64,System.Int64,System.Int64>.op_BitwiseOr(Int64, Int64) method

```csharp
static long IBitwiseOperators<long,long,long>.operator | (long left, long right);
```

Computes the bitwise-or of two values.

Parameters:

- `left`: The value to `or` with `right`.
- `right`: The value to `or` with `left`.

Returns: The bitwise-or of `left` and `right`.

To be added.

## Int64.System.Numerics.IBitwiseOperators<System.Int64,System.Int64,System.Int64>.op_ExclusiveOr(Int64, Int64) method

```csharp
static long IBitwiseOperators<long,long,long>.operator ^ (long left, long right);
```

Computes the exclusive-or of two values.

Parameters:

- `left`: The value to xor with `right`.
- `right`: The value to xor with `left`.

Returns: The exclusive-or of `left` and `right`.

To be added.

## Int64.System.Numerics.IBitwiseOperators<System.Int64,System.Int64,System.Int64>.op_OnesComplement(Int64) method

```csharp
static long IBitwiseOperators<long,long,long>.operator ~ (long value);
```

Computes the ones-complement representation of a given value.

Parameters:

- `value`: The value for which to compute the ones-complement.

Returns: The ones-complement of `value`.

To be added.

## Int64.System.Numerics.IComparisonOperators<System.Int64,System.Int64,System.Boolean>.op_GreaterThan(Int64, Int64) method

```csharp
static bool IComparisonOperators<long,long,bool>.operator > (long left, long right);
```

Compares two values to determine which is greater.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

To be added.

## Int64.System.Numerics.IComparisonOperators<System.Int64,System.Int64,System.Boolean>.op_GreaterThanOrEqual(Int64, Int64) method

```csharp
static bool IComparisonOperators<long,long,bool>.operator >= (long left, long right);
```

Compares two values to determine which is greater or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

To be added.

## Int64.System.Numerics.IComparisonOperators<System.Int64,System.Int64,System.Boolean>.op_LessThan(Int64, Int64) method

```csharp
static bool IComparisonOperators<long,long,bool>.operator < (long left, long right);
```

Compares two values to determine which is less.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

To be added.

## Int64.System.Numerics.IComparisonOperators<System.Int64,System.Int64,System.Boolean>.op_LessThanOrEqual(Int64, Int64) method

```csharp
static bool IComparisonOperators<long,long,bool>.operator <= (long left, long right);
```

Compares two values to determine which is less or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

To be added.

## Int64.System.Numerics.IDecrementOperators<System.Int64>.op_CheckedDecrement(Int64) method

```csharp
static long IDecrementOperators<long>.op_CheckedDecrement (long value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## Int64.System.Numerics.IDecrementOperators<System.Int64>.op_Decrement(Int64) method

```csharp
static long IDecrementOperators<long>.operator -- (long value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## Int64.System.Numerics.IDivisionOperators<System.Int64,System.Int64,System.Int64>.op_Division(Int64, Int64) method

```csharp
static long IDivisionOperators<long,long,long>.operator / (long left, long right);
```

Divides one value by another to compute their quotient.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient of `left` divided by `right`.

To be added.

## Int64.System.Numerics.IEqualityOperators<System.Int64,System.Int64,System.Boolean>.op_Equality(Int64, Int64) method

```csharp
static bool IEqualityOperators<long,long,bool>.operator == (long left, long right);
```

Compares two values to determine equality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## Int64.System.Numerics.IEqualityOperators<System.Int64,System.Int64,System.Boolean>.op_Inequality(Int64, Int64) method

```csharp
static bool IEqualityOperators<long,long,bool>.operator != (long left, long right);
```

Compares two values to determine inequality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.

## Int64.System.Numerics.IIncrementOperators<System.Int64>.op_CheckedIncrement(Int64) method

```csharp
static long IIncrementOperators<long>.op_CheckedIncrement (long value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## Int64.System.Numerics.IIncrementOperators<System.Int64>.op_Increment(Int64) method

```csharp
static long IIncrementOperators<long>.operator ++ (long value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## Int64.System.Numerics.IModulusOperators<System.Int64,System.Int64,System.Int64>.op_Modulus(Int64, Int64) method

```csharp
static long IModulusOperators<long,long,long>.operator % (long left, long right);
```

Divides two values together to compute their modulus or remainder.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The modulus or remainder of `left` divided by `right`.

To be added.

## Int64.System.Numerics.IMultiplyOperators<System.Int64,System.Int64,System.Int64>.op_CheckedMultiply(Int64, Int64) method

```csharp
static long IMultiplyOperators<long,long,long>.op_CheckedMultiply (long left, long right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## Int64.System.Numerics.IMultiplyOperators<System.Int64,System.Int64,System.Int64>.op_Multiply(Int64, Int64) method

```csharp
static long IMultiplyOperators<long,long,long>.operator * (long left, long right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## Int64.System.Numerics.INumber<System.Int64>.MaxNumber(Int64, Int64) method

```csharp
static long INumber<long>.MaxNumber (long x, long y);
```

Compares two values to compute which is greater and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## Int64.System.Numerics.INumber<System.Int64>.MinNumber(Int64, Int64) method

```csharp
static long INumber<long>.MinNumber (long x, long y);
```

Compares two values to compute which is lesser and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.IsCanonical(Int64) method

```csharp
static bool INumberBase<long>.IsCanonical (long value);
```

Determines if a value is in its canonical representation.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is in its canonical representation; otherwise, `false`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.IsComplexNumber(Int64) method

```csharp
static bool INumberBase<long>.IsComplexNumber (long value);
```

Determines if a value represents a complex number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a complex number; otherwise, `false`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.IsFinite(Int64) method

```csharp
static bool INumberBase<long>.IsFinite (long value);
```

Determines if a value is finite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is finite; otherwise, `false`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.IsImaginaryNumber(Int64) method

```csharp
static bool INumberBase<long>.IsImaginaryNumber (long value);
```

Determines if a value represents a pure imaginary number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a pure imaginary number; otherwise, `false`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.IsInfinity(Int64) method

```csharp
static bool INumberBase<long>.IsInfinity (long value);
```

Determines if a value is infinite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is infinite; otherwise, `false`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.IsInteger(Int64) method

```csharp
static bool INumberBase<long>.IsInteger (long value);
```

Determines if a value represents an integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an integer; otherwise, `false`.

To be added.
