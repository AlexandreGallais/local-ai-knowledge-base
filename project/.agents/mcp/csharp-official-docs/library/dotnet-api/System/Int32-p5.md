---
title: "Int32 struct (part 5 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Int32.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int32 struct (part 5 of 8)

## Int32.System.IConvertible.ToUInt32(IFormatProvider) method

```csharp
uint IConvertible.ToUInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt32`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt32`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int32` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt32` method.

## Int32.System.IConvertible.ToUInt64(IFormatProvider) method

```csharp
ulong IConvertible.ToUInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt64`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt64`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int32` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt64` method.

## Int32.System.Numerics.IAdditionOperators<System.Int32,System.Int32,System.Int32>.op_Addition(Int32, Int32) method

```csharp
static int IAdditionOperators<int,int,int>.operator + (int left, int right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## Int32.System.Numerics.IAdditionOperators<System.Int32,System.Int32,System.Int32>.op_CheckedAddition(Int32, Int32) method

```csharp
static int IAdditionOperators<int,int,int>.op_CheckedAddition (int left, int right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## Int32.System.Numerics.IBinaryInteger<System.Int32>.GetByteCount() method

```csharp
int IBinaryInteger<int>.GetByteCount ();
```

Gets the number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

Returns: The number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

To be added.

## Int32.System.Numerics.IBinaryInteger<System.Int32>.GetShortestBitLength() method

```csharp
int IBinaryInteger<int>.GetShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current value.

Returns: The length, in bits, of the shortest two's complement representation of the current value.

To be added.

## Int32.System.Numerics.IBinaryInteger<System.Int32>.TryReadBigEndian(Byte>, Boolean, Int32) method

```csharp
static bool IBinaryInteger<int>.TryReadBigEndian (ReadOnlySpan<byte> source, bool isUnsigned, out int value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Int32.System.Numerics.IBinaryInteger<System.Int32>.TryReadLittleEndian(Byte>, Boolean, Int32) method

```csharp
static bool IBinaryInteger<int>.TryReadLittleEndian (ReadOnlySpan<byte> source, bool isUnsigned, out int value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Int32.System.Numerics.IBinaryInteger<System.Int32>.TryWriteBigEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<int>.TryWriteBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## Int32.System.Numerics.IBinaryInteger<System.Int32>.TryWriteLittleEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<int>.TryWriteLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## Int32.System.Numerics.IBitwiseOperators<System.Int32,System.Int32,System.Int32>.op_BitwiseAnd(Int32, Int32) method

```csharp
static int IBitwiseOperators<int,int,int>.operator & (int left, int right);
```

Computes the bitwise-and of two values.

Parameters:

- `left`: The value to `and` with `right`.
- `right`: The value to `and` with `left`.

Returns: The bitwise-and of `left` and `right`.

To be added.

## Int32.System.Numerics.IBitwiseOperators<System.Int32,System.Int32,System.Int32>.op_BitwiseOr(Int32, Int32) method

```csharp
static int IBitwiseOperators<int,int,int>.operator | (int left, int right);
```

Computes the bitwise-or of two values.

Parameters:

- `left`: The value to `or` with `right`.
- `right`: The value to `or` with `left`.

Returns: The bitwise-or of `left` and `right`.

To be added.

## Int32.System.Numerics.IBitwiseOperators<System.Int32,System.Int32,System.Int32>.op_ExclusiveOr(Int32, Int32) method

```csharp
static int IBitwiseOperators<int,int,int>.operator ^ (int left, int right);
```

Computes the exclusive-or of two values.

Parameters:

- `left`: The value to xor with `right`.
- `right`: The value to xor with `left`.

Returns: The exclusive-or of `left` and `right`.

To be added.

## Int32.System.Numerics.IBitwiseOperators<System.Int32,System.Int32,System.Int32>.op_OnesComplement(Int32) method

```csharp
static int IBitwiseOperators<int,int,int>.operator ~ (int value);
```

Computes the ones-complement representation of a given value.

Parameters:

- `value`: The value for which to compute the ones-complement.

Returns: The ones-complement of `value`.

To be added.

## Int32.System.Numerics.IComparisonOperators<System.Int32,System.Int32,System.Boolean>.op_GreaterThan(Int32, Int32) method

```csharp
static bool IComparisonOperators<int,int,bool>.operator > (int left, int right);
```

Compares two values to determine which is greater.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

To be added.

## Int32.System.Numerics.IComparisonOperators<System.Int32,System.Int32,System.Boolean>.op_GreaterThanOrEqual(Int32, Int32) method

```csharp
static bool IComparisonOperators<int,int,bool>.operator >= (int left, int right);
```

Compares two values to determine which is greater or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

To be added.

## Int32.System.Numerics.IComparisonOperators<System.Int32,System.Int32,System.Boolean>.op_LessThan(Int32, Int32) method

```csharp
static bool IComparisonOperators<int,int,bool>.operator < (int left, int right);
```

Compares two values to determine which is less.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

To be added.

## Int32.System.Numerics.IComparisonOperators<System.Int32,System.Int32,System.Boolean>.op_LessThanOrEqual(Int32, Int32) method

```csharp
static bool IComparisonOperators<int,int,bool>.operator <= (int left, int right);
```

Compares two values to determine which is less or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

To be added.

## Int32.System.Numerics.IDecrementOperators<System.Int32>.op_CheckedDecrement(Int32) method

```csharp
static int IDecrementOperators<int>.op_CheckedDecrement (int value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## Int32.System.Numerics.IDecrementOperators<System.Int32>.op_Decrement(Int32) method

```csharp
static int IDecrementOperators<int>.operator -- (int value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## Int32.System.Numerics.IDivisionOperators<System.Int32,System.Int32,System.Int32>.op_Division(Int32, Int32) method

```csharp
static int IDivisionOperators<int,int,int>.operator / (int left, int right);
```

Divides one value by another to compute their quotient.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient of `left` divided by `right`.

To be added.

## Int32.System.Numerics.IEqualityOperators<System.Int32,System.Int32,System.Boolean>.op_Equality(Int32, Int32) method

```csharp
static bool IEqualityOperators<int,int,bool>.operator == (int left, int right);
```

Compares two values to determine equality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## Int32.System.Numerics.IEqualityOperators<System.Int32,System.Int32,System.Boolean>.op_Inequality(Int32, Int32) method

```csharp
static bool IEqualityOperators<int,int,bool>.operator != (int left, int right);
```

Compares two values to determine inequality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.

## Int32.System.Numerics.IIncrementOperators<System.Int32>.op_CheckedIncrement(Int32) method

```csharp
static int IIncrementOperators<int>.op_CheckedIncrement (int value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## Int32.System.Numerics.IIncrementOperators<System.Int32>.op_Increment(Int32) method

```csharp
static int IIncrementOperators<int>.operator ++ (int value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## Int32.System.Numerics.IModulusOperators<System.Int32,System.Int32,System.Int32>.op_Modulus(Int32, Int32) method

```csharp
static int IModulusOperators<int,int,int>.operator % (int left, int right);
```

Divides two values together to compute their modulus or remainder.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The modulus or remainder of `left` divided by `right`.

To be added.

## Int32.System.Numerics.IMultiplyOperators<System.Int32,System.Int32,System.Int32>.op_CheckedMultiply(Int32, Int32) method

```csharp
static int IMultiplyOperators<int,int,int>.op_CheckedMultiply (int left, int right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## Int32.System.Numerics.IMultiplyOperators<System.Int32,System.Int32,System.Int32>.op_Multiply(Int32, Int32) method

```csharp
static int IMultiplyOperators<int,int,int>.operator * (int left, int right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## Int32.System.Numerics.INumber<System.Int32>.MaxNumber(Int32, Int32) method

```csharp
static int INumber<int>.MaxNumber (int x, int y);
```

Compares two values to compute which is greater and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## Int32.System.Numerics.INumber<System.Int32>.MinNumber(Int32, Int32) method

```csharp
static int INumber<int>.MinNumber (int x, int y);
```

Compares two values to compute which is lesser and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## Int32.System.Numerics.INumberBase<System.Int32>.IsCanonical(Int32) method

```csharp
static bool INumberBase<int>.IsCanonical (int value);
```

Determines if a value is in its canonical representation.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is in its canonical representation; otherwise, `false`.

To be added.

## Int32.System.Numerics.INumberBase<System.Int32>.IsComplexNumber(Int32) method

```csharp
static bool INumberBase<int>.IsComplexNumber (int value);
```

Determines if a value represents a complex number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a complex number; otherwise, `false`.

To be added.

## Int32.System.Numerics.INumberBase<System.Int32>.IsFinite(Int32) method

```csharp
static bool INumberBase<int>.IsFinite (int value);
```

Determines if a value is finite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is finite; otherwise, `false`.

To be added.

## Int32.System.Numerics.INumberBase<System.Int32>.IsImaginaryNumber(Int32) method

```csharp
static bool INumberBase<int>.IsImaginaryNumber (int value);
```

Determines if a value represents a pure imaginary number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a pure imaginary number; otherwise, `false`.

To be added.

## Int32.System.Numerics.INumberBase<System.Int32>.IsInfinity(Int32) method

```csharp
static bool INumberBase<int>.IsInfinity (int value);
```

Determines if a value is infinite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is infinite; otherwise, `false`.

To be added.

## Int32.System.Numerics.INumberBase<System.Int32>.IsInteger(Int32) method

```csharp
static bool INumberBase<int>.IsInteger (int value);
```

Determines if a value represents an integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an integer; otherwise, `false`.

To be added.
