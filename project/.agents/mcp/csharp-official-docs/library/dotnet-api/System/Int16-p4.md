---
title: "Int16 struct (part 4 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Int16.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int16 struct (part 4 of 7)

## Int16.System.IConvertible.ToUInt32(IFormatProvider) method

```csharp
uint IConvertible.ToUInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt32`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt32`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int16` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt32` method.

## Int16.System.IConvertible.ToUInt64(IFormatProvider) method

```csharp
ulong IConvertible.ToUInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt64`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt64`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int16` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt64` method.

## Int16.System.Numerics.IAdditionOperators<System.Int16,System.Int16,System.Int16>.op_Addition(Int16, Int16) method

```csharp
static short IAdditionOperators<short,short,short>.operator + (short left, short right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## Int16.System.Numerics.IAdditionOperators<System.Int16,System.Int16,System.Int16>.op_CheckedAddition(Int16, Int16) method

```csharp
static short IAdditionOperators<short,short,short>.op_CheckedAddition (short left, short right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## Int16.System.Numerics.IBinaryInteger<System.Int16>.GetByteCount() method

```csharp
int IBinaryInteger<short>.GetByteCount ();
```

Gets the number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

Returns: The number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

To be added.

## Int16.System.Numerics.IBinaryInteger<System.Int16>.GetShortestBitLength() method

```csharp
int IBinaryInteger<short>.GetShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current value.

Returns: The length, in bits, of the shortest two's complement representation of the current value.

To be added.

## Int16.System.Numerics.IBinaryInteger<System.Int16>.TryReadBigEndian(Byte>, Boolean, Int16) method

```csharp
static bool IBinaryInteger<short>.TryReadBigEndian (ReadOnlySpan<byte> source, bool isUnsigned, out short value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Int16.System.Numerics.IBinaryInteger<System.Int16>.TryReadLittleEndian(Byte>, Boolean, Int16) method

```csharp
static bool IBinaryInteger<short>.TryReadLittleEndian (ReadOnlySpan<byte> source, bool isUnsigned, out short value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Int16.System.Numerics.IBinaryInteger<System.Int16>.TryWriteBigEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<short>.TryWriteBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## Int16.System.Numerics.IBinaryInteger<System.Int16>.TryWriteLittleEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<short>.TryWriteLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## Int16.System.Numerics.IBitwiseOperators<System.Int16,System.Int16,System.Int16>.op_BitwiseAnd(Int16, Int16) method

```csharp
static short IBitwiseOperators<short,short,short>.operator & (short left, short right);
```

Computes the bitwise-and of two values.

Parameters:

- `left`: The value to `and` with `right`.
- `right`: The value to `and` with `left`.

Returns: The bitwise-and of `left` and `right`.

To be added.

## Int16.System.Numerics.IBitwiseOperators<System.Int16,System.Int16,System.Int16>.op_BitwiseOr(Int16, Int16) method

```csharp
static short IBitwiseOperators<short,short,short>.operator | (short left, short right);
```

Computes the bitwise-or of two values.

Parameters:

- `left`: The value to `or` with `right`.
- `right`: The value to `or` with `left`.

Returns: The bitwise-or of `left` and `right`.

To be added.

## Int16.System.Numerics.IBitwiseOperators<System.Int16,System.Int16,System.Int16>.op_ExclusiveOr(Int16, Int16) method

```csharp
static short IBitwiseOperators<short,short,short>.operator ^ (short left, short right);
```

Computes the exclusive-or of two values.

Parameters:

- `left`: The value to xor with `right`.
- `right`: The value to xor with `left`.

Returns: The exclusive-or of `left` and `right`.

To be added.

## Int16.System.Numerics.IBitwiseOperators<System.Int16,System.Int16,System.Int16>.op_OnesComplement(Int16) method

```csharp
static short IBitwiseOperators<short,short,short>.operator ~ (short value);
```

Computes the ones-complement representation of a given value.

Parameters:

- `value`: The value for which to compute the ones-complement.

Returns: The ones-complement of `value`.

To be added.

## Int16.System.Numerics.IComparisonOperators<System.Int16,System.Int16,System.Boolean>.op_GreaterThan(Int16, Int16) method

```csharp
static bool IComparisonOperators<short,short,bool>.operator > (short left, short right);
```

Compares two values to determine which is greater.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

To be added.

## Int16.System.Numerics.IComparisonOperators<System.Int16,System.Int16,System.Boolean>.op_GreaterThanOrEqual(Int16, Int16) method

```csharp
static bool IComparisonOperators<short,short,bool>.operator >= (short left, short right);
```

Compares two values to determine which is greater or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

To be added.

## Int16.System.Numerics.IComparisonOperators<System.Int16,System.Int16,System.Boolean>.op_LessThan(Int16, Int16) method

```csharp
static bool IComparisonOperators<short,short,bool>.operator < (short left, short right);
```

Compares two values to determine which is less.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

To be added.

## Int16.System.Numerics.IComparisonOperators<System.Int16,System.Int16,System.Boolean>.op_LessThanOrEqual(Int16, Int16) method

```csharp
static bool IComparisonOperators<short,short,bool>.operator <= (short left, short right);
```

Compares two values to determine which is less or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

To be added.

## Int16.System.Numerics.IDecrementOperators<System.Int16>.op_CheckedDecrement(Int16) method

```csharp
static short IDecrementOperators<short>.op_CheckedDecrement (short value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## Int16.System.Numerics.IDecrementOperators<System.Int16>.op_Decrement(Int16) method

```csharp
static short IDecrementOperators<short>.operator -- (short value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## Int16.System.Numerics.IDivisionOperators<System.Int16,System.Int16,System.Int16>.op_Division(Int16, Int16) method

```csharp
static short IDivisionOperators<short,short,short>.operator / (short left, short right);
```

Divides one value by another to compute their quotient.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient of `left` divided by `right`.

To be added.

## Int16.System.Numerics.IEqualityOperators<System.Int16,System.Int16,System.Boolean>.op_Equality(Int16, Int16) method

```csharp
static bool IEqualityOperators<short,short,bool>.operator == (short left, short right);
```

Compares two values to determine equality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## Int16.System.Numerics.IEqualityOperators<System.Int16,System.Int16,System.Boolean>.op_Inequality(Int16, Int16) method

```csharp
static bool IEqualityOperators<short,short,bool>.operator != (short left, short right);
```

Compares two values to determine inequality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.

## Int16.System.Numerics.IIncrementOperators<System.Int16>.op_CheckedIncrement(Int16) method

```csharp
static short IIncrementOperators<short>.op_CheckedIncrement (short value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## Int16.System.Numerics.IIncrementOperators<System.Int16>.op_Increment(Int16) method

```csharp
static short IIncrementOperators<short>.operator ++ (short value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## Int16.System.Numerics.IModulusOperators<System.Int16,System.Int16,System.Int16>.op_Modulus(Int16, Int16) method

```csharp
static short IModulusOperators<short,short,short>.operator % (short left, short right);
```

Divides two values together to compute their modulus or remainder.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The modulus or remainder of `left` divided by `right`.

To be added.

## Int16.System.Numerics.IMultiplyOperators<System.Int16,System.Int16,System.Int16>.op_CheckedMultiply(Int16, Int16) method

```csharp
static short IMultiplyOperators<short,short,short>.op_CheckedMultiply (short left, short right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## Int16.System.Numerics.IMultiplyOperators<System.Int16,System.Int16,System.Int16>.op_Multiply(Int16, Int16) method

```csharp
static short IMultiplyOperators<short,short,short>.operator * (short left, short right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## Int16.System.Numerics.INumber<System.Int16>.MaxNumber(Int16, Int16) method

```csharp
static short INumber<short>.MaxNumber (short x, short y);
```

Compares two values to compute which is greater and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## Int16.System.Numerics.INumber<System.Int16>.MinNumber(Int16, Int16) method

```csharp
static short INumber<short>.MinNumber (short x, short y);
```

Compares two values to compute which is lesser and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.IsCanonical(Int16) method

```csharp
static bool INumberBase<short>.IsCanonical (short value);
```

Determines if a value is in its canonical representation.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is in its canonical representation; otherwise, `false`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.IsComplexNumber(Int16) method

```csharp
static bool INumberBase<short>.IsComplexNumber (short value);
```

Determines if a value represents a complex number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a complex number; otherwise, `false`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.IsFinite(Int16) method

```csharp
static bool INumberBase<short>.IsFinite (short value);
```

Determines if a value is finite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is finite; otherwise, `false`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.IsImaginaryNumber(Int16) method

```csharp
static bool INumberBase<short>.IsImaginaryNumber (short value);
```

Determines if a value represents a pure imaginary number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a pure imaginary number; otherwise, `false`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.IsInfinity(Int16) method

```csharp
static bool INumberBase<short>.IsInfinity (short value);
```

Determines if a value is infinite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is infinite; otherwise, `false`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.IsInteger(Int16) method

```csharp
static bool INumberBase<short>.IsInteger (short value);
```

Determines if a value represents an integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an integer; otherwise, `false`.

To be added.
