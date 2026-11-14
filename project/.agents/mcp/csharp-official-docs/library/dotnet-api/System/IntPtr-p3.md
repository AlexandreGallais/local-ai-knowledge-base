---
title: "IntPtr struct (part 3 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IntPtr.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IntPtr struct (part 3 of 6)

## IntPtr.Parse(String, IFormatProvider) method

```csharp
public static IntPtr Parse (string s, IFormatProvider? provider);
```

Converts the string representation of a number in a specified culture-specific format to its signed native integer equivalent.

Parameters:

- `s`: A string containing a number to convert.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: A signed native integer equivalent to the number contained in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than `IntPtr.MinValue` or greater than `IntPtr.MaxValue`.

To be added.

## IntPtr.Parse(Byte>, NumberStyles, IFormatProvider) method

```csharp
public static IntPtr Parse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Integer, IFormatProvider? provider = default);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## IntPtr.Parse(Char>, NumberStyles, IFormatProvider) method

```csharp
public static IntPtr Parse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Integer, IFormatProvider? provider = default);
```

Converts the read-only span of characters representation of a number in a specified style and culture-specific format to its signed native integer equivalent.

Parameters:

- `s`: A read-only span of characters containing a number to convert.
- `style`: A bitwise combination of the enumeration values that indicates the style elements that can be present in `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: A signed native integer equivalent to the number contained in `s`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value or `style` is not a combination of `NumberStyles.AllowHexSpecifier` and `NumberStyles.HexNumber` values.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than `IntPtr.MinValue` or greater than `IntPtr.MaxValue`.

To be added.

## IntPtr.Parse(String, NumberStyles, IFormatProvider) method

```csharp
public static IntPtr Parse (string s, System.Globalization.NumberStyles style, IFormatProvider? provider);
```

Converts the string representation of a number in a specified style and culture-specific format to its signed native integer equivalent.

Parameters:

- `s`: A string containing a number to convert.
- `style`: A bitwise combination of the enumeration values that indicates the style elements that can be present in `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: A signed native integer equivalent to the number contained in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentException`: `style` is not a `NumberStyles` value or `style` is not a combination of `NumberStyles.AllowHexSpecifier` and `NumberStyles.HexNumber` values.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than `IntPtr.MinValue` or greater than `IntPtr.MaxValue`.

To be added.

## IntPtr.PopCount(IntPtr) method

```csharp
public static IntPtr PopCount (IntPtr value);
```

Computes the number of bits that are set in a value.

Parameters:

- `value`: The value whose set bits are to be counted.

Returns: The number of set bits in `value`.

To be added.

## IntPtr.RotateLeft(IntPtr, Int32) method

```csharp
public static IntPtr RotateLeft (IntPtr value, int rotateAmount);
```

Rotates a value left by a given amount.

Parameters:

- `value`: The value that is rotated left by `rotateAmount`.
- `rotateAmount`: The amount by which `value` is rotated left.

Returns: The result of rotating `value` left by `rotateAmount`.

To be added.

## IntPtr.RotateRight(IntPtr, Int32) method

```csharp
public static IntPtr RotateRight (IntPtr value, int rotateAmount);
```

Rotates a value right by a given amount.

Parameters:

- `value`: The value that is rotated right by `rotateAmount`.
- `rotateAmount`: The amount by which `value` is rotated right.

Returns: The result of rotating `value` right by `rotateAmount`.

To be added.

## IntPtr.Sign(IntPtr) method

```csharp
public static int Sign (IntPtr value);
```

Computes the sign of a value.

Parameters:

- `value`: The value whose sign is to be computed.

Returns: A positive value if `value` is positive, `INumberBase<T>.Zero` if `value` is zero, and a negative value if `value` is negative.

#### Remarks

It is recommended that a function return `1`, `0`, and `-1`, respectively.

## IntPtr.Subtract(IntPtr, Int32) method

```csharp
public static IntPtr Subtract (IntPtr pointer, int offset);
```

Subtracts an offset from a signed integer.

Parameters:

- `pointer`: The signed integer to subtract the offset from.
- `offset`: The offset to subtract.

Returns: A new signed integer that reflects the subtraction of `offset` from `pointer`.

#### Remarks
The `IntPtr.Subtract` method does not throw an exception if the result is too small to represent as a signed integer in the executing process. Instead, the subtraction operation is performed in an unchecked context.

Languages that do not support operator overloading or custom operators can use this method to subtract an offset from the value of a pointer.

#### Examples
The following example instantiates an `IntPtr` object that points to the end of a ten-element array, and then calls the `IntPtr.Subtract` method to iterate the elements in the array in reverse order.

_Code sample not included: ~/snippets/csharp/System/IntPtr/Subtract/subtract1.cs._

## IntPtr.System.Numerics.IAdditionOperators<System.IntPtr,System.IntPtr,System.IntPtr>.op_Addition(IntPtr, IntPtr) method

```csharp
static IntPtr IAdditionOperators<IntPtr,IntPtr,IntPtr>.operator + (IntPtr left, IntPtr right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## IntPtr.System.Numerics.IAdditionOperators<System.IntPtr,System.IntPtr,System.IntPtr>.op_CheckedAddition(IntPtr, IntPtr) method

```csharp
static IntPtr IAdditionOperators<IntPtr,IntPtr,IntPtr>.op_CheckedAddition (IntPtr left, IntPtr right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that's added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## IntPtr.System.Numerics.IBinaryInteger<System.IntPtr>.GetByteCount() method

```csharp
int IBinaryInteger<IntPtr>.GetByteCount ();
```

Gets the number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

Returns: The number of bytes that will be written as part of `IBinaryInteger<T>.TryWriteLittleEndian`.

To be added.

## IntPtr.System.Numerics.IBinaryInteger<System.IntPtr>.GetShortestBitLength() method

```csharp
int IBinaryInteger<IntPtr>.GetShortestBitLength ();
```

Gets the length, in bits, of the shortest two's complement representation of the current value.

Returns: The length, in bits, of the shortest two's complement representation of the current value.

To be added.

## IntPtr.System.Numerics.IBinaryInteger<System.IntPtr>.TryReadBigEndian(Byte>, Boolean, IntPtr) method

```csharp
static bool IBinaryInteger<IntPtr>.TryReadBigEndian (ReadOnlySpan<byte> source, bool isUnsigned, out IntPtr value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## IntPtr.System.Numerics.IBinaryInteger<System.IntPtr>.TryReadLittleEndian(Byte>, Boolean, IntPtr) method

```csharp
static bool IBinaryInteger<IntPtr>.TryReadLittleEndian (ReadOnlySpan<byte> source, bool isUnsigned, out IntPtr value);
```

To be added.

Parameters:

- `source`: To be added.
- `isUnsigned`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## IntPtr.System.Numerics.IBinaryInteger<System.IntPtr>.TryWriteBigEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<IntPtr>.TryWriteBigEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in big-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## IntPtr.System.Numerics.IBinaryInteger<System.IntPtr>.TryWriteLittleEndian(Byte>, Int32) method

```csharp
bool IBinaryInteger<IntPtr>.TryWriteLittleEndian (Span<byte> destination, out int bytesWritten);
```

Tries to write the current value, in little-endian format, to a given span.

Parameters:

- `destination`: The span to which the current value should be written.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if the value was succesfully written to `destination`; otherwise, `false`.

To be added.

## IntPtr.System.Numerics.IBitwiseOperators<System.IntPtr,System.IntPtr,System.IntPtr>.op_BitwiseAnd(IntPtr, IntPtr) method

```csharp
static IntPtr IBitwiseOperators<IntPtr,IntPtr,IntPtr>.operator & (IntPtr left, IntPtr right);
```

Computes the bitwise-and of two values.

Parameters:

- `left`: The value to `and` with `right`.
- `right`: The value to `and` with `left`.

Returns: The bitwise-and of `left` and `right`.

To be added.

## IntPtr.System.Numerics.IBitwiseOperators<System.IntPtr,System.IntPtr,System.IntPtr>.op_BitwiseOr(IntPtr, IntPtr) method

```csharp
static IntPtr IBitwiseOperators<IntPtr,IntPtr,IntPtr>.operator | (IntPtr left, IntPtr right);
```

Computes the bitwise-or of two values.

Parameters:

- `left`: The value to `or` with `right`.
- `right`: The value to `or` with `left`.

Returns: The bitwise-or of `left` and `right`.

To be added.

## IntPtr.System.Numerics.IBitwiseOperators<System.IntPtr,System.IntPtr,System.IntPtr>.op_ExclusiveOr(IntPtr, IntPtr) method

```csharp
static IntPtr IBitwiseOperators<IntPtr,IntPtr,IntPtr>.operator ^ (IntPtr left, IntPtr right);
```

Computes the exclusive-or of two values.

Parameters:

- `left`: The value to xor with `right`.
- `right`: The value to xor with `left`.

Returns: The exclusive-or of `left` and `right`.

To be added.

## IntPtr.System.Numerics.IBitwiseOperators<System.IntPtr,System.IntPtr,System.IntPtr>.op_OnesComplement(IntPtr) method

```csharp
static IntPtr IBitwiseOperators<IntPtr,IntPtr,IntPtr>.operator ~ (IntPtr value);
```

Computes the ones-complement representation of a given value.

Parameters:

- `value`: The value for which to compute the ones-complement.

Returns: The ones-complement of `value`.

To be added.

## IntPtr.System.Numerics.IComparisonOperators<System.IntPtr,System.IntPtr,System.Boolean>.op_GreaterThan(IntPtr, IntPtr) method

```csharp
static bool IComparisonOperators<IntPtr,IntPtr,bool>.operator > (IntPtr left, IntPtr right);
```

Compares two values to determine which is greater.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

To be added.

## IntPtr.System.Numerics.IComparisonOperators<System.IntPtr,System.IntPtr,System.Boolean>.op_GreaterThanOrEqual(IntPtr, IntPtr) method

```csharp
static bool IComparisonOperators<IntPtr,IntPtr,bool>.operator >= (IntPtr left, IntPtr right);
```

Compares two values to determine which is greater or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

To be added.

## IntPtr.System.Numerics.IComparisonOperators<System.IntPtr,System.IntPtr,System.Boolean>.op_LessThan(IntPtr, IntPtr) method

```csharp
static bool IComparisonOperators<IntPtr,IntPtr,bool>.operator < (IntPtr left, IntPtr right);
```

Compares two values to determine which is less.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

To be added.

## IntPtr.System.Numerics.IComparisonOperators<System.IntPtr,System.IntPtr,System.Boolean>.op_LessThanOrEqual(IntPtr, IntPtr) method

```csharp
static bool IComparisonOperators<IntPtr,IntPtr,bool>.operator <= (IntPtr left, IntPtr right);
```

Compares two values to determine which is less or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

To be added.

## IntPtr.System.Numerics.IDecrementOperators<System.IntPtr>.op_CheckedDecrement(IntPtr) method

```csharp
static IntPtr IDecrementOperators<IntPtr>.op_CheckedDecrement (IntPtr value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## IntPtr.System.Numerics.IDecrementOperators<System.IntPtr>.op_Decrement(IntPtr) method

```csharp
static IntPtr IDecrementOperators<IntPtr>.operator -- (IntPtr value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.

## IntPtr.System.Numerics.IDivisionOperators<System.IntPtr,System.IntPtr,System.IntPtr>.op_Division(IntPtr, IntPtr) method

```csharp
static IntPtr IDivisionOperators<IntPtr,IntPtr,IntPtr>.operator / (IntPtr left, IntPtr right);
```

Divides one value by another to compute their quotient.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient of `left` divided by `right`.

To be added.

## IntPtr.System.Numerics.IIncrementOperators<System.IntPtr>.op_CheckedIncrement(IntPtr) method

```csharp
static IntPtr IIncrementOperators<IntPtr>.op_CheckedIncrement (IntPtr value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## IntPtr.System.Numerics.IIncrementOperators<System.IntPtr>.op_Increment(IntPtr) method

```csharp
static IntPtr IIncrementOperators<IntPtr>.operator ++ (IntPtr value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.
