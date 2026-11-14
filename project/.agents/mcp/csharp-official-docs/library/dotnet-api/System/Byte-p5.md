---
title: "Byte struct (part 5 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Byte.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Byte struct (part 5 of 7)

## Byte.System.Numerics.INumberBase<System.Byte>.IsImaginaryNumber(Byte) method

```csharp
static bool INumberBase<byte>.IsImaginaryNumber (byte value);
```

Determines if a value represents a pure imaginary number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a pure imaginary number; otherwise, `false`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.IsInfinity(Byte) method

```csharp
static bool INumberBase<byte>.IsInfinity (byte value);
```

Determines if a value is infinite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is infinite; otherwise, `false`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.IsInteger(Byte) method

```csharp
static bool INumberBase<byte>.IsInteger (byte value);
```

Determines if a value represents an integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an integer; otherwise, `false`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.IsNaN(Byte) method

```csharp
static bool INumberBase<byte>.IsNaN (byte value);
```

Determines if a value is NaN.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is NaN; otherwise, `false`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.IsNegative(Byte) method

```csharp
static bool INumberBase<byte>.IsNegative (byte value);
```

Determines if a value is negative.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative; otherwise, `false`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.IsNegativeInfinity(Byte) method

```csharp
static bool INumberBase<byte>.IsNegativeInfinity (byte value);
```

Determines if a value is negative infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative infinity; otherwise, `false`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.IsNormal(Byte) method

```csharp
static bool INumberBase<byte>.IsNormal (byte value);
```

Determines if a value is normal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is normal; otherwise, `false`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.IsPositive(Byte) method

```csharp
static bool INumberBase<byte>.IsPositive (byte value);
```

Determines if a value is positive.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive; otherwise, `false`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.IsPositiveInfinity(Byte) method

```csharp
static bool INumberBase<byte>.IsPositiveInfinity (byte value);
```

Determines if a value is positive infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive infinity; otherwise, `false`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.IsRealNumber(Byte) method

```csharp
static bool INumberBase<byte>.IsRealNumber (byte value);
```

Determines if a value represents a real number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a real number; otherwise, `false`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.IsSubnormal(Byte) method

```csharp
static bool INumberBase<byte>.IsSubnormal (byte value);
```

Determines if a value is subnormal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is subnormal; otherwise, `false`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.IsZero(Byte) method

```csharp
static bool INumberBase<byte>.IsZero (byte value);
```

Determines if a value is zero.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is zero; otherwise, `false`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.MaxMagnitude(Byte, Byte) method

```csharp
static byte INumberBase<byte>.MaxMagnitude (byte x, byte y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.MaxMagnitudeNumber(Byte, Byte) method

```csharp
static byte INumberBase<byte>.MaxMagnitudeNumber (byte x, byte y);
```

Compares two values to compute which has the greater magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.MinMagnitude(Byte, Byte) method

```csharp
static byte INumberBase<byte>.MinMagnitude (byte x, byte y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.MinMagnitudeNumber(Byte, Byte) method

```csharp
static byte INumberBase<byte>.MinMagnitudeNumber (byte x, byte y);
```

Compares two values to compute which has the lesser magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.MultiplyAddEstimate(Byte, Byte, Byte) method

```csharp
static byte INumberBase<byte>.MultiplyAddEstimate (byte left, byte right, byte addend);
```

Computes an estimate of (`left` * `right`) + `addend`.

Parameters:

- `left`: The value to be multiplied with `right`.
- `right`: The value to be multiplied with `left`.
- `addend`: The value to be added to the result of `left` multiplied by `right`.

Returns: An estimate of (`left` * `right`) + `addend`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.TryConvertToChecked<TOther>(Byte, TOther) method

```csharp
static bool INumberBase<byte>.TryConvertToChecked<TOther> (byte value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.TryConvertToSaturating<TOther>(Byte, TOther) method

```csharp
static bool INumberBase<byte>.TryConvertToSaturating<TOther> (byte value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.TryConvertToTruncating<TOther>(Byte, TOther) method

```csharp
static bool INumberBase<byte>.TryConvertToTruncating<TOther> (byte value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.TryConvertFromChecked<TOther>(TOther, Byte) method

```csharp
static bool INumberBase<byte>.TryConvertFromChecked<TOther> (TOther value, out byte result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.TryConvertFromSaturating<TOther>(TOther, Byte) method

```csharp
static bool INumberBase<byte>.TryConvertFromSaturating<TOther> (TOther value, out byte result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Byte.System.Numerics.INumberBase<System.Byte>.TryConvertFromTruncating<TOther>(TOther, Byte) method

```csharp
static bool INumberBase<byte>.TryConvertFromTruncating<TOther> (TOther value, out byte result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Byte.System.Numerics.IShiftOperators<System.Byte,System.Int32,System.Byte>.op_LeftShift(Byte, Int32) method

```csharp
static byte IShiftOperators<byte,int,byte>.operator << (byte value, int shiftAmount);
```

Shifts a value left by a given amount.

Parameters:

- `value`: The value that is shifted left by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted left.

Returns: The result of shifting `value` left by `shiftAmount`.

To be added.

## Byte.System.Numerics.IShiftOperators<System.Byte,System.Int32,System.Byte>.op_RightShift(Byte, Int32) method

```csharp
static byte IShiftOperators<byte,int,byte>.operator >> (byte value, int shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

To be added.

## Byte.System.Numerics.IShiftOperators<System.Byte,System.Int32,System.Byte>.op_UnsignedRightShift(Byte, Int32) method

```csharp
static byte IShiftOperators<byte,int,byte>.op_UnsignedRightShift (byte value, int shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

To be added.

## Byte.System.Numerics.ISubtractionOperators<System.Byte,System.Byte,System.Byte>.op_CheckedSubtraction(Byte, Byte) method

```csharp
static byte ISubtractionOperators<byte,byte,byte>.op_CheckedSubtraction (byte left, byte right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that's subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

To be added.

## Byte.System.Numerics.ISubtractionOperators<System.Byte,System.Byte,System.Byte>.op_Subtraction(Byte, Byte) method

```csharp
static byte ISubtractionOperators<byte,byte,byte>.operator - (byte left, byte right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that's subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

To be added.

## Byte.System.Numerics.IUnaryNegationOperators<System.Byte,System.Byte>.op_CheckedUnaryNegation(Byte) method

```csharp
static byte IUnaryNegationOperators<byte,byte>.op_CheckedUnaryNegation (byte value);
```

Computes the checked unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## Byte.System.Numerics.IUnaryNegationOperators<System.Byte,System.Byte>.op_UnaryNegation(Byte) method

```csharp
static byte IUnaryNegationOperators<byte,byte>.operator - (byte value);
```

Computes the unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## Byte.System.Numerics.IUnaryPlusOperators<System.Byte,System.Byte>.op_UnaryPlus(Byte) method

```csharp
static byte IUnaryPlusOperators<byte,byte>.operator + (byte value);
```

Computes the unary plus of a value.

Parameters:

- `value`: The value for which to compute the unary plus.

Returns: The unary plus of `value`.

To be added.

## Byte.ToString() method

```csharp
public override string ToString ();
```

Converts the value of the current `Byte` object to its equivalent string representation.

Returns: The string representation of the value of this object, which consists of a sequence of digits that range from 0 to 9 with no leading zeroes.

#### Remarks
The return value is formatted with the general numeric format specifier ("G") and the `NumberFormatInfo` object for the thread current culture. To define the formatting of the `Byte` value's string representation, call the `Byte.ToString` method. To define both the format specifiers and culture used to create the string representation of a `Byte` value, call the `Byte.ToString` method.

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

For information about the thread current culture, see `Thread.CurrentCulture`.

#### Examples
The following example displays an array of byte values. Note that the `ToString` method is not called explicitly in the example. Instead, it is called implicitly, because of the use of the composite formatting feature, the F# example uses string interpolation.

_Code sample not included: ~/snippets/csharp/System/Byte/ToString/NewByteMembers.cs._
