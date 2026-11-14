---
title: "IntPtr struct (part 2 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IntPtr.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IntPtr struct (part 2 of 6)

## IntPtr.CreateTruncating<TOther>(TOther) method

```csharp
public static IntPtr CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that is used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## IntPtr.DivRem(IntPtr, IntPtr) method

```csharp
public static (IntPtr Quotient, IntPtr Remainder) DivRem (IntPtr left, IntPtr right);
```

Computes the quotient and remainder of two values.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient and remainder of `left` divided-by `right`.

Exceptions:

- `DivideByZeroException`: `right` is zero.
- `OverflowException`: `left` is <see cref="F:System.IntPtr.MinValue">IntPtr.MinValue</see> and `right` is -1.

To be added.

## IntPtr.Equals(IntPtr) method

```csharp
public bool Equals (IntPtr other);
```

Indicates whether the current object is equal to another object of the same type.

Parameters:

- `other`: An object to compare with this object.

Returns: `true` if the current object is equal to `other`; otherwise, `false`.

To be added.

## IntPtr.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance or `null`.

Returns: `true` if `obj` is an instance of `IntPtr` and equals the value of this instance; otherwise, `false`.

To be added.

## IntPtr.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## IntPtr.IsEvenInteger(IntPtr) method

```csharp
public static bool IsEvenInteger (IntPtr value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## IntPtr.IsNegative(IntPtr) method

```csharp
public static bool IsNegative (IntPtr value);
```

Determines if a value is negative.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsPositive` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## IntPtr.IsOddInteger(IntPtr) method

```csharp
public static bool IsOddInteger (IntPtr value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## IntPtr.IsPositive(IntPtr) method

```csharp
public static bool IsPositive (IntPtr value);
```

Determines if a value is positive.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsNegative` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## IntPtr.IsPow2(IntPtr) method

```csharp
public static bool IsPow2 (IntPtr value);
```

Determines if a value is a power of two.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a power of two; otherwise, `false`.

To be added.

## IntPtr.LeadingZeroCount(IntPtr) method

```csharp
public static IntPtr LeadingZeroCount (IntPtr value);
```

Computes the number of leading zeros in a value.

Parameters:

- `value`: The value whose leading zeroes are to be counted.

Returns: The number of leading zeros in `value`.

To be added.

## IntPtr.Log10(IntPtr) method

```csharp
public static IntPtr Log10 (IntPtr value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## IntPtr.Log2(IntPtr) method

```csharp
public static IntPtr Log2 (IntPtr value);
```

Computes the log2 of a value.

Parameters:

- `value`: The value whose log2 is to be computed.

Returns: The log2 of `value`.

To be added.

## IntPtr.Max(IntPtr, IntPtr) method

```csharp
public static IntPtr Max (IntPtr x, IntPtr y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `maximum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## IntPtr.MaxMagnitude(IntPtr, IntPtr) method

```csharp
public static IntPtr MaxMagnitude (IntPtr x, IntPtr y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `maximumMagnitude` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## IntPtr.Min(IntPtr, IntPtr) method

```csharp
public static IntPtr Min (IntPtr x, IntPtr y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `minimum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## IntPtr.MinMagnitude(IntPtr, IntPtr) method

```csharp
public static IntPtr MinMagnitude (IntPtr x, IntPtr y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `minimumMagnitude` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## IntPtr.op_Addition(IntPtr, Int32) method

```csharp
public static IntPtr operator + (IntPtr pointer, int offset);
```

Adds an offset to a signed integer.

Parameters:

- `pointer`: The signed integer to add the offset to.
- `offset`: The offset to add.

Returns: A new signed integer that reflects the addition of `offset` to `pointer`.

#### Remarks
The `IntPtr.op_Addition` method defines the addition operation for `IntPtr` objects. It enables code such as the following.

_Code sample not included: ~/snippets/csharp/System/IntPtr/op_Addition/addition1.cs._

Languages that do not support custom operators can call the `IntPtr.Add` method instead.

The addition operation does not throw an exception if the result is too large to represent as a signed integer in the executing process. Instead, it is performed in an unchecked context.

In C# starting from version 11, this API is only accessible via reflection. The addition operator is directly recognized by the language and will follow the normal language behavior for addition operations, including overflowing in a `checked` context if the result is too large to represent.

The equivalent method for this operator is `Add`

## IntPtr.op_Equality(IntPtr, IntPtr) method

```csharp
public static bool operator == (IntPtr value1, IntPtr value2);
```

Determines whether two specified instances of `IntPtr` are equal.

Parameters:

- `value1`: The first signed integer to compare.
- `value2`: The second signed integer to compare.

Returns: `true` if `value1` equals `value2`; otherwise, `false`.

The equivalent method for this operator is `Equals`

## IntPtr.op_Explicit(Int32) method

```csharp
public static explicit operator IntPtr (int value);
```

Converts the value of a 32-bit signed integer to an `IntPtr`.

Parameters:

- `value`: A 32-bit signed integer.

Returns: A new instance of `IntPtr` initialized to `value`.

To be added.

## IntPtr.op_Explicit(Int64) method

```csharp
public static explicit operator IntPtr (long value);
```

Converts the value of a 64-bit signed integer to an `IntPtr`.

Parameters:

- `value`: A 64-bit signed integer.

Returns: A new instance of `IntPtr` initialized to `value`.

Exceptions:

- `OverflowException`: In a 32-bit process, `value` is too large to represent as an `IntPtr`.

To be added.

## IntPtr.op_Explicit(IntPtr) method

```csharp
public static explicit operator int (IntPtr value);
```

Converts the value of the specified `IntPtr` to a 32-bit signed integer.

Parameters:

- `value`: The signed integer to convert.

Returns: The contents of `value`.

Exceptions:

- `OverflowException`: In a 64-bit process, the value of `value` is too large to represent as a 32-bit signed integer.

#### Remarks
An exception is only thrown if the value of `value` requires more bits than the executing process supports.

## IntPtr.op_Explicit(IntPtr) method

```csharp
public static explicit operator long (IntPtr value);
```

Converts the value of the specified `IntPtr` to a 64-bit signed integer.

Parameters:

- `value`: The signed integer to convert.

Returns: The contents of `value`.

To be added.

## IntPtr.op_Explicit(IntPtr) method

```csharp
public static explicit operator void* (IntPtr value);
```

Converts the value of the specified `IntPtr` to a pointer to an unspecified type.

This API is not CLS-compliant.

Parameters:

- `value`: The signed integer to convert.

Returns: The contents of `value`.

To be added.

## IntPtr.op_Explicit(Void*) method

```csharp
public static explicit operator IntPtr (void* value);
```

Converts the specified pointer to an unspecified type to an `IntPtr`.

This API is not CLS-compliant.

Parameters:

- `value`: A pointer to an unspecified type.

Returns: A new instance of `IntPtr` initialized to `value`.

To be added.

## IntPtr.op_Inequality(IntPtr, IntPtr) method

```csharp
public static bool operator != (IntPtr value1, IntPtr value2);
```

Determines whether two specified instances of `IntPtr` are not equal.

Parameters:

- `value1`: The first signed integer to compare.
- `value2`: The second signed integer to compare.

Returns: `true` if `value1` does not equal `value2`; otherwise, `false`.

The equivalent method for this operator is `Equals`

## IntPtr.op_Subtraction(IntPtr, Int32) method

```csharp
public static IntPtr operator - (IntPtr pointer, int offset);
```

Subtracts an offset from a signed integer.

Parameters:

- `pointer`: The signed integer to subtract the offset from.
- `offset`: The offset to subtract.

Returns: A new signed integer that reflects the subtraction of `offset` from `pointer`.

#### Remarks
The `IntPtr.op_Subtraction` method defines the subtraction operation for `IntPtr` objects. It enables code such as the following.

_Code sample not included: ~/snippets/csharp/System/IntPtr/op_Addition/op_subtraction1.cs._

Languages that do not support custom operators can call the `IntPtr.Subtract` method instead.

The subtraction operation does not throw an exception if the result is too small to represent as a signed integer in the executing process. Instead, it is performed in an unchecked context.

In C# starting from version 11, this API is only accessible via reflection. The subtraction operator is directly recognized by the language and will follow the normal language behavior for subtraction operations, including overflowing in a `checked` context if the result is too small to represent.

The equivalent method for this operator is `Subtract`

## IntPtr.Parse(String) method

```csharp
public static IntPtr Parse (string s);
```

Converts the string representation of a number to its signed native integer equivalent.

Parameters:

- `s`: A string containing a number to convert.

Returns: A signed native integer equivalent to the number contained in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than `IntPtr.MinValue` or greater than `IntPtr.MaxValue`.

To be added.

## IntPtr.Parse(Byte>, IFormatProvider) method

```csharp
public static IntPtr Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## IntPtr.Parse(Char>, IFormatProvider) method

```csharp
public static IntPtr Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## IntPtr.Parse(String, NumberStyles) method

```csharp
public static IntPtr Parse (string s, System.Globalization.NumberStyles style);
```

Converts the string representation of a number in a specified style to its signed native integer equivalent.

Parameters:

- `s`: A string containing a number to convert.
- `style`: A bitwise combination of the enumeration values that indicates the style elements that can be present in `s`.

Returns: A signed native integer equivalent to the number contained in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentException`: `style` is not a `NumberStyles` value or `style` is not a combination of `NumberStyles.AllowHexSpecifier` and `NumberStyles.HexNumber` values.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than `IntPtr.MinValue` or greater than `IntPtr.MaxValue`.

To be added.
