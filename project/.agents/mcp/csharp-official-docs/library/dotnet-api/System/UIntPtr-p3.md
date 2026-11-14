---
title: "UIntPtr struct (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UIntPtr.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UIntPtr struct (part 3 of 5)

## UIntPtr.Subtract(UIntPtr, Int32) method

```csharp
public static UIntPtr Subtract (UIntPtr pointer, int offset);
```

Subtracts an offset from an unsigned integer.

Parameters:

- `pointer`: The unsigned integer to subtract the offset from.
- `offset`: The offset to subtract.

Returns: A new unsigned integer that reflects the subtraction of `offset` from `pointer`.

#### Remarks
The `IntPtr.Subtract` method does not throw an exception if the result is too small to represent as an unsigned integer in the executing process. Instead, the subtraction operation is performed in an unchecked context.

Languages that do not support operator overloading or custom operators can use this method to subtract an offset from the value of a pointer.

#### Examples
The following example instantiates an `IntPtr` object that points to the end of a ten-element array, and then calls the `IntPtr.Subtract` method to iterate the elements in the array in reverse order.

_Code sample not included: ~/snippets/csharp/System/UIntPtr/Subtract/subtract1.cs._

## UIntPtr.System.Numerics.IAdditionOperators<System.UIntPtr,System.UIntPtr,System.UIntPtr>.op_Addition(UIntPtr, UIntPtr) method

```csharp
static UIntPtr IAdditionOperators<UIntPtr,UIntPtr,UIntPtr>.operator + (UIntPtr left, UIntPtr right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## UIntPtr.System.Numerics.IAdditionOperators<System.UIntPtr,System.UIntPtr,System.UIntPtr>.op_CheckedAddition(UIntPtr, UIntPtr) method

```csharp
static UIntPtr IAdditionOperators<UIntPtr,UIntPtr,UIntPtr>.op_CheckedAddition (UIntPtr left, UIntPtr right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## UIntPtr.System.Numerics.IBinaryInteger<System.UIntPtr>.GetByteCount() method

```csharp
int IBinaryInteger<UIntPtr>.GetByteCount ();
```

Gets the number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

Returns: The number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

To be added.

## UIntPtr.System.Numerics.IBinaryInteger<System.UIntPtr>.GetShortestBitLength() method

```csharp
int IBinaryInteger<UIntPtr>.GetShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current value.

Returns: The length, in bits, of the shortest two's complement representation of the current value.

To be added.

## UIntPtr.System.Numerics.IBinaryInteger<System.UIntPtr>.TryReadBigEndian(Byte>, Boolean, UIntPtr) method

```csharp
static bool IBinaryInteger<UIntPtr>.TryReadBigEndian (ReadOnlySpan<byte> source, bool isUnsigned, out UIntPtr value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## UIntPtr.System.Numerics.IBinaryInteger<System.UIntPtr>.TryReadLittleEndian(Byte>, Boolean, UIntPtr) method

```csharp
static bool IBinaryInteger<UIntPtr>.TryReadLittleEndian (ReadOnlySpan<byte> source, bool isUnsigned, out UIntPtr value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## UIntPtr.System.Numerics.IBinaryInteger<System.UIntPtr>.TryWriteBigEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<UIntPtr>.TryWriteBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.IBinaryInteger<System.UIntPtr>.TryWriteLittleEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<UIntPtr>.TryWriteLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.IBitwiseOperators<System.UIntPtr,System.UIntPtr,System.UIntPtr>.op_BitwiseAnd(UIntPtr, UIntPtr) method

```csharp
static UIntPtr IBitwiseOperators<UIntPtr,UIntPtr,UIntPtr>.operator & (UIntPtr left, UIntPtr right);
```

Computes the bitwise-and of two values.

Parameters:

- `left`: The value to `and` with `right`.
- `right`: The value to `and` with `left`.

Returns: The bitwise-and of `left` and `right`.

To be added.

## UIntPtr.System.Numerics.IBitwiseOperators<System.UIntPtr,System.UIntPtr,System.UIntPtr>.op_BitwiseOr(UIntPtr, UIntPtr) method

```csharp
static UIntPtr IBitwiseOperators<UIntPtr,UIntPtr,UIntPtr>.operator | (UIntPtr left, UIntPtr right);
```

Computes the bitwise-or of two values.

Parameters:

- `left`: The value to `or` with `right`.
- `right`: The value to `or` with `left`.

Returns: The bitwise-or of `left` and `right`.

To be added.

## UIntPtr.System.Numerics.IBitwiseOperators<System.UIntPtr,System.UIntPtr,System.UIntPtr>.op_ExclusiveOr(UIntPtr, UIntPtr) method

```csharp
static UIntPtr IBitwiseOperators<UIntPtr,UIntPtr,UIntPtr>.operator ^ (UIntPtr left, UIntPtr right);
```

Computes the exclusive-or of two values.

Parameters:

- `left`: The value to xor with `right`.
- `right`: The value to xor with `left`.

Returns: The exclusive-or of `left` and `right`.

To be added.

## UIntPtr.System.Numerics.IBitwiseOperators<System.UIntPtr,System.UIntPtr,System.UIntPtr>.op_OnesComplement(UIntPtr) method

```csharp
static UIntPtr IBitwiseOperators<UIntPtr,UIntPtr,UIntPtr>.operator ~ (UIntPtr value);
```

Computes the ones-complement representation of a given value.

Parameters:

- `value`: The value for which to compute the ones-complement.

Returns: The ones-complement of `value`.

To be added.

## UIntPtr.System.Numerics.IComparisonOperators<System.UIntPtr,System.UIntPtr,System.Boolean>.op_GreaterThan(UIntPtr, UIntPtr) method

```csharp
static bool IComparisonOperators<UIntPtr,UIntPtr,bool>.operator > (UIntPtr left, UIntPtr right);
```

Compares two values to determine which is greater.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.IComparisonOperators<System.UIntPtr,System.UIntPtr,System.Boolean>.op_GreaterThanOrEqual(UIntPtr, UIntPtr) method

```csharp
static bool IComparisonOperators<UIntPtr,UIntPtr,bool>.operator >= (UIntPtr left, UIntPtr right);
```

Compares two values to determine which is greater or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.IComparisonOperators<System.UIntPtr,System.UIntPtr,System.Boolean>.op_LessThan(UIntPtr, UIntPtr) method

```csharp
static bool IComparisonOperators<UIntPtr,UIntPtr,bool>.operator < (UIntPtr left, UIntPtr right);
```

Compares two values to determine which is less.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.IComparisonOperators<System.UIntPtr,System.UIntPtr,System.Boolean>.op_LessThanOrEqual(UIntPtr, UIntPtr) method

```csharp
static bool IComparisonOperators<UIntPtr,UIntPtr,bool>.operator <= (UIntPtr left, UIntPtr right);
```

Compares two values to determine which is less or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.IDecrementOperators<System.UIntPtr>.op_CheckedDecrement(UIntPtr) method

```csharp
static UIntPtr IDecrementOperators<UIntPtr>.op_CheckedDecrement (UIntPtr value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## UIntPtr.System.Numerics.IDecrementOperators<System.UIntPtr>.op_Decrement(UIntPtr) method

```csharp
static UIntPtr IDecrementOperators<UIntPtr>.operator -- (UIntPtr value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## UIntPtr.System.Numerics.IDivisionOperators<System.UIntPtr,System.UIntPtr,System.UIntPtr>.op_Division(UIntPtr, UIntPtr) method

```csharp
static UIntPtr IDivisionOperators<UIntPtr,UIntPtr,UIntPtr>.operator / (UIntPtr left, UIntPtr right);
```

Divides one value by another to compute their quotient.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient of `left` divided by `right`.

To be added.

## UIntPtr.System.Numerics.IIncrementOperators<System.UIntPtr>.op_CheckedIncrement(UIntPtr) method

```csharp
static UIntPtr IIncrementOperators<UIntPtr>.op_CheckedIncrement (UIntPtr value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## UIntPtr.System.Numerics.IIncrementOperators<System.UIntPtr>.op_Increment(UIntPtr) method

```csharp
static UIntPtr IIncrementOperators<UIntPtr>.operator ++ (UIntPtr value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## UIntPtr.System.Numerics.IModulusOperators<System.UIntPtr,System.UIntPtr,System.UIntPtr>.op_Modulus(UIntPtr, UIntPtr) method

```csharp
static UIntPtr IModulusOperators<UIntPtr,UIntPtr,UIntPtr>.operator % (UIntPtr left, UIntPtr right);
```

Divides two values together to compute their modulus or remainder.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The modulus or remainder of `left` divided by `right`.

To be added.

## UIntPtr.System.Numerics.IMultiplyOperators<System.UIntPtr,System.UIntPtr,System.UIntPtr>.op_CheckedMultiply(UIntPtr, UIntPtr) method

```csharp
static UIntPtr IMultiplyOperators<UIntPtr,UIntPtr,UIntPtr>.op_CheckedMultiply (UIntPtr left, UIntPtr right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## UIntPtr.System.Numerics.IMultiplyOperators<System.UIntPtr,System.UIntPtr,System.UIntPtr>.op_Multiply(UIntPtr, UIntPtr) method

```csharp
static UIntPtr IMultiplyOperators<UIntPtr,UIntPtr,UIntPtr>.operator * (UIntPtr left, UIntPtr right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## UIntPtr.System.Numerics.INumber<System.UIntPtr>.CopySign(UIntPtr, UIntPtr) method

```csharp
static UIntPtr INumber<UIntPtr>.CopySign (UIntPtr value, UIntPtr sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## UIntPtr.System.Numerics.INumber<System.UIntPtr>.MaxNumber(UIntPtr, UIntPtr) method

```csharp
static UIntPtr INumber<UIntPtr>.MaxNumber (UIntPtr x, UIntPtr y);
```

Compares two values to compute which is greater and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## UIntPtr.System.Numerics.INumber<System.UIntPtr>.MinNumber(UIntPtr, UIntPtr) method

```csharp
static UIntPtr INumber<UIntPtr>.MinNumber (UIntPtr x, UIntPtr y);
```

Compares two values to compute which is lesser and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.Abs(UIntPtr) method

```csharp
static UIntPtr INumberBase<UIntPtr>.Abs (UIntPtr value);
```

Computes the absolute of a value.

Parameters:

- `value`: The value for which to get its absolute.

Returns: The absolute of `value`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.IsCanonical(UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.IsCanonical (UIntPtr value);
```

Determines if a value is in its canonical representation.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is in its canonical representation; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.IsComplexNumber(UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.IsComplexNumber (UIntPtr value);
```

Determines if a value represents a complex number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a complex number; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.IsFinite(UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.IsFinite (UIntPtr value);
```

Determines if a value is finite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is finite; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.IsImaginaryNumber(UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.IsImaginaryNumber (UIntPtr value);
```

Determines if a value represents a pure imaginary number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a pure imaginary number; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.IsInfinity(UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.IsInfinity (UIntPtr value);
```

Determines if a value is infinite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is infinite; otherwise, `false`.

To be added.
