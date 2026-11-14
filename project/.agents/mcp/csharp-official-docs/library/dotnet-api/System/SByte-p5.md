---
title: "SByte struct (part 5 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/SByte.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SByte struct (part 5 of 7)

## SByte.System.Numerics.INumberBase<System.SByte>.IsCanonical(SByte) method

```csharp
static bool INumberBase<sbyte>.IsCanonical (sbyte value);
```

Determines if a value is in its canonical representation.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is in its canonical representation; otherwise, `false`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.IsComplexNumber(SByte) method

```csharp
static bool INumberBase<sbyte>.IsComplexNumber (sbyte value);
```

Determines if a value represents a complex number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a complex number; otherwise, `false`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.IsFinite(SByte) method

```csharp
static bool INumberBase<sbyte>.IsFinite (sbyte value);
```

Determines if a value is finite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is finite; otherwise, `false`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.IsImaginaryNumber(SByte) method

```csharp
static bool INumberBase<sbyte>.IsImaginaryNumber (sbyte value);
```

Determines if a value represents a pure imaginary number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a pure imaginary number; otherwise, `false`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.IsInfinity(SByte) method

```csharp
static bool INumberBase<sbyte>.IsInfinity (sbyte value);
```

Determines if a value is infinite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is infinite; otherwise, `false`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.IsInteger(SByte) method

```csharp
static bool INumberBase<sbyte>.IsInteger (sbyte value);
```

Determines if a value represents an integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an integer; otherwise, `false`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.IsNaN(SByte) method

```csharp
static bool INumberBase<sbyte>.IsNaN (sbyte value);
```

Determines if a value is NaN.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is NaN; otherwise, `false`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.IsNegativeInfinity(SByte) method

```csharp
static bool INumberBase<sbyte>.IsNegativeInfinity (sbyte value);
```

Determines if a value is negative infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative infinity; otherwise, `false`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.IsNormal(SByte) method

```csharp
static bool INumberBase<sbyte>.IsNormal (sbyte value);
```

Determines if a value is normal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is normal; otherwise, `false`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.IsPositiveInfinity(SByte) method

```csharp
static bool INumberBase<sbyte>.IsPositiveInfinity (sbyte value);
```

Determines if a value is positive infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive infinity; otherwise, `false`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.IsRealNumber(SByte) method

```csharp
static bool INumberBase<sbyte>.IsRealNumber (sbyte value);
```

Determines if a value represents a real number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a real number; otherwise, `false`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.IsSubnormal(SByte) method

```csharp
static bool INumberBase<sbyte>.IsSubnormal (sbyte value);
```

Determines if a value is subnormal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is subnormal; otherwise, `false`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.IsZero(SByte) method

```csharp
static bool INumberBase<sbyte>.IsZero (sbyte value);
```

Determines if a value is zero.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is zero; otherwise, `false`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.MaxMagnitudeNumber(SByte, SByte) method

```csharp
static sbyte INumberBase<sbyte>.MaxMagnitudeNumber (sbyte x, sbyte y);
```

Compares two values to compute which has the greater magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.MinMagnitudeNumber(SByte, SByte) method

```csharp
static sbyte INumberBase<sbyte>.MinMagnitudeNumber (sbyte x, sbyte y);
```

Compares two values to compute which has the lesser magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.MultiplyAddEstimate(SByte, SByte, SByte) method

```csharp
static sbyte INumberBase<sbyte>.MultiplyAddEstimate (sbyte left, sbyte right, sbyte addend);
```

Computes an estimate of (`left` * `right`) + `addend`.

Parameters:

- `left`: The value to be multiplied with `right`.
- `right`: The value to be multiplied with `left`.
- `addend`: The value to be added to the result of `left` multiplied by `right`.

Returns: An estimate of (`left` * `right`) + `addend`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.TryConvertToChecked<TOther>(SByte, TOther) method

```csharp
static bool INumberBase<sbyte>.TryConvertToChecked<TOther> (sbyte value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.TryConvertToSaturating<TOther>(SByte, TOther) method

```csharp
static bool INumberBase<sbyte>.TryConvertToSaturating<TOther> (sbyte value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.TryConvertToTruncating<TOther>(SByte, TOther) method

```csharp
static bool INumberBase<sbyte>.TryConvertToTruncating<TOther> (sbyte value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.TryConvertFromChecked<TOther>(TOther, SByte) method

```csharp
static bool INumberBase<sbyte>.TryConvertFromChecked<TOther> (TOther value, out sbyte result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.TryConvertFromSaturating<TOther>(TOther, SByte) method

```csharp
static bool INumberBase<sbyte>.TryConvertFromSaturating<TOther> (TOther value, out sbyte result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## SByte.System.Numerics.INumberBase<System.SByte>.TryConvertFromTruncating<TOther>(TOther, SByte) method

```csharp
static bool INumberBase<sbyte>.TryConvertFromTruncating<TOther> (TOther value, out sbyte result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## SByte.System.Numerics.IShiftOperators<System.SByte,System.Int32,System.SByte>.op_LeftShift(SByte, Int32) method

```csharp
static sbyte IShiftOperators<sbyte,int,sbyte>.operator << (sbyte value, int shiftAmount);
```

Shifts a value left by a given amount.

Parameters:

- `value`: The value that is shifted left by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted left.

Returns: The result of shifting `value` left by `shiftAmount`.

To be added.

## SByte.System.Numerics.IShiftOperators<System.SByte,System.Int32,System.SByte>.op_RightShift(SByte, Int32) method

```csharp
static sbyte IShiftOperators<sbyte,int,sbyte>.operator >> (sbyte value, int shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

To be added.

## SByte.System.Numerics.IShiftOperators<System.SByte,System.Int32,System.SByte>.op_UnsignedRightShift(SByte, Int32) method

```csharp
static sbyte IShiftOperators<sbyte,int,sbyte>.op_UnsignedRightShift (sbyte value, int shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

To be added.

## SByte.System.Numerics.ISubtractionOperators<System.SByte,System.SByte,System.SByte>.op_CheckedSubtraction(SByte, SByte) method

```csharp
static sbyte ISubtractionOperators<sbyte,sbyte,sbyte>.op_CheckedSubtraction (sbyte left, sbyte right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that's subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

To be added.

## SByte.System.Numerics.ISubtractionOperators<System.SByte,System.SByte,System.SByte>.op_Subtraction(SByte, SByte) method

```csharp
static sbyte ISubtractionOperators<sbyte,sbyte,sbyte>.operator - (sbyte left, sbyte right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that's subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

To be added.

## SByte.System.Numerics.IUnaryNegationOperators<System.SByte,System.SByte>.op_CheckedUnaryNegation(SByte) method

```csharp
static sbyte IUnaryNegationOperators<sbyte,sbyte>.op_CheckedUnaryNegation (sbyte value);
```

Computes the checked unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## SByte.System.Numerics.IUnaryNegationOperators<System.SByte,System.SByte>.op_UnaryNegation(SByte) method

```csharp
static sbyte IUnaryNegationOperators<sbyte,sbyte>.operator - (sbyte value);
```

Computes the unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## SByte.System.Numerics.IUnaryPlusOperators<System.SByte,System.SByte>.op_UnaryPlus(SByte) method

```csharp
static sbyte IUnaryPlusOperators<sbyte,sbyte>.operator + (sbyte value);
```

Computes the unary plus of a value.

Parameters:

- `value`: The value for which to compute the unary plus.

Returns: The unary plus of `value`.

To be added.

## SByte.ToString() method

```csharp
public override string ToString ();
```

Converts the numeric value of this instance to its equivalent string representation.

Returns: The string representation of the value of this instance, consisting of a negative sign if the value is negative, and a sequence of digits ranging from 0 to 9 with no leading zeroes.

#### Remarks
The `ToString` method formats an `SByte` value in the default ("G", or general) format of the current culture. If you want to specify a different format or culture, use the other overloads of the `SByte.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|A specific culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|
|A specific format|A specific culture|`ToString`|

The return value is formatted using the general numeric format specifier ("G") The string representation of the `SByte` value includes a negative sign if its value is negative, and a sequence of digits ranging from 0 to 9 without leading zeros. The negative sign is defined by the `NumberFormatInfo` object for the current culture.

To define the formatting of the signed byte value's string representation, call the `ToString` method.

#### Examples
The following example displays an `SByte` value using the default `ToString` method. It also displays the string representations of the `SByte` value that results from using a number of standard format specifiers. The examples are displayed using the formatting conventions of the en-US culture.

_Code sample not included: ~/snippets/csharp/System/SByte/ToString/tostring2.cs._
