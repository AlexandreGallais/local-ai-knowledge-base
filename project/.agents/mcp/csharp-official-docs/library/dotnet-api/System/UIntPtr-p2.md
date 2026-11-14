---
title: "UIntPtr struct (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UIntPtr.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UIntPtr struct (part 2 of 5)

## UIntPtr.Log10(UIntPtr) method

```csharp
public static UIntPtr Log10 (UIntPtr value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## UIntPtr.Log2(UIntPtr) method

```csharp
public static UIntPtr Log2 (UIntPtr value);
```

Computes the log2 of a value.

Parameters:

- `value`: The value whose log2 is to be computed.

Returns: The log2 of `value`.

To be added.

## UIntPtr.Max(UIntPtr, UIntPtr) method

```csharp
public static UIntPtr Max (UIntPtr x, UIntPtr y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `maximum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## UIntPtr.Min(UIntPtr, UIntPtr) method

```csharp
public static UIntPtr Min (UIntPtr x, UIntPtr y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `minimum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## UIntPtr.op_Addition(UIntPtr, Int32) method

```csharp
public static UIntPtr operator + (UIntPtr pointer, int offset);
```

Adds an offset to an unsigned integer.

Parameters:

- `pointer`: The unsigned integer to add the offset to.
- `offset`: The offset to add.

Returns: A new unsigned integer that reflects the addition of `offset` to `pointer`.

#### Remarks
The `UIntPtr.op_Addition` method defines the addition operation for `UIntPtr` objects. It enables code such as the following.

_Code sample not included: ~/snippets/csharp/System/UIntPtr/op_Addition/op_addition1.cs._

Languages that do not support custom operators can call the `UIntPtr.Add` method instead.

The addition operation does not throw an exception if the result is too large to represent as an unsigned integer in the executing process. Instead, it is performed in an unchecked context.

In C# starting from version 11, this API is only accessible via reflection. The addition operator is directly recognized by the language and will follow the normal language behavior for addition operations, including overflowing in a `checked` context if the result is too large to represent.

The equivalent method for this operator is `Add`.

## UIntPtr.op_Equality(UIntPtr, UIntPtr) method

```csharp
public static bool operator == (UIntPtr value1, UIntPtr value2);
```

Determines whether two specified instances of `UIntPtr` are equal.

Parameters:

- `value1`: The first unsigned integer to compare.
- `value2`: The second unsigned integer to compare.

Returns: `true` if `value1` equals `value2`; otherwise, `false`.

The equivalent method for this operator is `Equals`

## UIntPtr.op_Explicit(UInt32) method

```csharp
public static explicit operator UIntPtr (uint value);
```

Converts the value of a 32-bit unsigned integer to an `UIntPtr`.

Parameters:

- `value`: A 32-bit unsigned integer.

Returns: A new instance of `UIntPtr` initialized to `value`.

To be added.

## UIntPtr.op_Explicit(UInt64) method

```csharp
public static explicit operator UIntPtr (ulong value);
```

Converts the value of a 64-bit unsigned integer to an `UIntPtr`.

Parameters:

- `value`: A 64-bit unsigned integer.

Returns: A new instance of `UIntPtr` initialized to `value`.

Exceptions:

- `OverflowException`: In a 32-bit process, `value` is too large to represent as an `UIntPtr`.

To be added.

## UIntPtr.op_Explicit(UIntPtr) method

```csharp
public static explicit operator uint (UIntPtr value);
```

Converts the value of the specified `UIntPtr` to a 32-bit unsigned integer.

Parameters:

- `value`: The unsigned integer to convert.

Returns: The contents of `value`.

Exceptions:

- `OverflowException`: In a 64-bit process, the value of `value` is too large to represent as a 32-bit unsigned integer.

#### Remarks
An exception is only thrown if the value of `value` requires more bits than the executing process supports.

## UIntPtr.op_Explicit(UIntPtr) method

```csharp
public static explicit operator ulong (UIntPtr value);
```

Converts the value of the specified `UIntPtr` to a 64-bit unsigned integer.

Parameters:

- `value`: The unsigned integer to convert.

Returns: The contents of `value`.

To be added.

## UIntPtr.op_Explicit(UIntPtr) method

```csharp
public static explicit operator void* (UIntPtr value);
```

Converts the value of the specified `UIntPtr` to a pointer to an unspecified type.

This API is not CLS-compliant.

Parameters:

- `value`: The unsigned integer to convert.

Returns: The contents of `value`.

To be added.

## UIntPtr.op_Explicit(Void*) method

```csharp
public static explicit operator UIntPtr (void* value);
```

Converts the specified pointer to an unspecified type to an `UIntPtr`.

This API is not CLS-compliant.

Parameters:

- `value`: A pointer to an unspecified type.

Returns: A new instance of `UIntPtr` initialized to `value`.

To be added.

## UIntPtr.op_Inequality(UIntPtr, UIntPtr) method

```csharp
public static bool operator != (UIntPtr value1, UIntPtr value2);
```

Determines whether two specified instances of `UIntPtr` are not equal.

Parameters:

- `value1`: The first unsigned integer to compare.
- `value2`: The second unsigned integer to compare.

Returns: `true` if `value1` does not equal `value2`; otherwise, `false`.

The equivalent method for this operator is `Equals`

## UIntPtr.op_Subtraction(UIntPtr, Int32) method

```csharp
public static UIntPtr operator - (UIntPtr pointer, int offset);
```

Subtracts an offset from an unsigned integer.

Parameters:

- `pointer`: The unsigned integer to subtract the offset from.
- `offset`: The offset to subtract.

Returns: A new unsigned integer that reflects the subtraction of `offset` from `pointer`.

#### Remarks
The `UIntPtr.op_Subtraction` method defines the subtraction operation for `UIntPtr` objects. It enables code such as the following.

_Code sample not included: ~/snippets/csharp/System/UIntPtr/op_Addition/op_subtraction1.cs._

Languages that do not support custom operators can call the `UIntPtr.Subtract` method instead.

The subtraction operation does not throw an exception if the result is too small to represent as an unsigned integer in the executing process. Instead, it is performed in an unchecked context.

In C# starting from version 11, this API is only accessible via reflection. The subtraction operator is directly recognized by the language and will follow the normal language behavior for subtraction operations, including overflowing in a `checked` context if the result is too small to represent.

## UIntPtr.Parse(String) method

```csharp
public static UIntPtr Parse (string s);
```

Converts the string representation of a number to its unsigned native integer equivalent.

Parameters:

- `s`: A string containing a number to convert.

Returns: An unsigned native integer equivalent to the number contained in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than `UIntPtr.MinValue` or greater than `UIntPtr.MaxValue`.

To be added.

## UIntPtr.Parse(Byte>, IFormatProvider) method

```csharp
public static UIntPtr Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## UIntPtr.Parse(Char>, IFormatProvider) method

```csharp
public static UIntPtr Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## UIntPtr.Parse(String, NumberStyles) method

```csharp
public static UIntPtr Parse (string s, System.Globalization.NumberStyles style);
```

Converts the string representation of a number in a specified style to its unsigned native integer equivalent.

Parameters:

- `s`: A string containing a number to convert.
- `style`: A bitwise combination of the enumeration values that indicates the style elements that can be present in `s`.

Returns: An unsigned native integer equivalent to the number contained in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentException`: `style` is not a `NumberStyles` value or `style` is not a combination of `NumberStyles.AllowHexSpecifier` and `NumberStyles.HexNumber` values.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than `UIntPtr.MinValue` or greater than `UIntPtr.MaxValue`.

To be added.

## UIntPtr.Parse(String, IFormatProvider) method

```csharp
public static UIntPtr Parse (string s, IFormatProvider? provider);
```

Converts the string representation of a number in a specified culture-specific format to its unsigned native integer equivalent.

Parameters:

- `s`: A string containing a number to convert.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: An unsigned native integer equivalent to the number contained in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than `UIntPtr.MinValue` or greater than `UIntPtr.MaxValue`.

To be added.

## UIntPtr.Parse(Byte>, NumberStyles, IFormatProvider) method

```csharp
public static UIntPtr Parse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Integer, IFormatProvider? provider = default);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## UIntPtr.Parse(Char>, NumberStyles, IFormatProvider) method

```csharp
public static UIntPtr Parse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Integer, IFormatProvider? provider = default);
```

Converts the read-only span of characters representation of a number in optionally specified style and optionally specified culture-specific format to its unsigned native integer equivalent.

Parameters:

- `s`: A read-only span of characters containing a number to convert.
- `style`: An optional bitwise combination of the enumeration values that indicates the style elements that can be present in `s`. The default value is `NumberStyles.Integer`.
- `provider`: An optional object that supplies culture-specific formatting information about `s`. The default value is `default`.

Returns: An unsigned native integer equivalent to the number contained in `s`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value or `style` is not a combination of `NumberStyles.AllowHexSpecifier` and `NumberStyles.HexNumber` values.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than `UIntPtr.MinValue` or greater than `UIntPtr.MaxValue`.

To be added.

## UIntPtr.Parse(String, NumberStyles, IFormatProvider) method

```csharp
public static UIntPtr Parse (string s, System.Globalization.NumberStyles style, IFormatProvider? provider);
```

Converts the string representation of a number in a specified style and culture-specific format to its unsigned native integer equivalent.

Parameters:

- `s`: A string containing a number to convert.
- `style`: A bitwise combination of the enumeration values that indicates the style elements that can be present in `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: An unsigned native integer equivalent to the number contained in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentException`: `style` is not a `NumberStyles` value or `style` is not a combination of `NumberStyles.AllowHexSpecifier` and `NumberStyles.HexNumber` values.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than `UIntPtr.MinValue` or greater than `UIntPtr.MaxValue`.

To be added.

## UIntPtr.PopCount(UIntPtr) method

```csharp
public static UIntPtr PopCount (UIntPtr value);
```

Computes the number of bits that are set in a value.

Parameters:

- `value`: The value whose set bits are to be counted.

Returns: The number of set bits in `value`.

To be added.

## UIntPtr.RotateLeft(UIntPtr, Int32) method

```csharp
public static UIntPtr RotateLeft (UIntPtr value, int rotateAmount);
```

Rotates a value left by a given amount.

Parameters:

- `value`: The value that is rotated left by `rotateAmount`.
- `rotateAmount`: The amount by which `value` is rotated left.

Returns: The result of rotating `value` left by `rotateAmount`.

To be added.

## UIntPtr.RotateRight(UIntPtr, Int32) method

```csharp
public static UIntPtr RotateRight (UIntPtr value, int rotateAmount);
```

Rotates a value right by a given amount.

Parameters:

- `value`: The value that is rotated right by `rotateAmount`.
- `rotateAmount`: The amount by which `value` is rotated right.

Returns: The result of rotating `value` right by `rotateAmount`.

To be added.

## UIntPtr.Sign(UIntPtr) method

```csharp
public static int Sign (UIntPtr value);
```

Computes the sign of a value.

Parameters:

- `value`: The value whose sign is to be computed.

Returns: A positive value if `value` is positive, `INumberBase<T>.Zero` if `value` is zero, and a negative value if `value` is negative.

#### Remarks

It is recommended that a function return `1`, `0`, and `-1`, respectively.
