---
title: "Int64 struct (part 6 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Int64.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int64 struct (part 6 of 8)

## Int64.System.Numerics.INumberBase<System.Int64>.IsNaN(Int64) method

```csharp
static bool INumberBase<long>.IsNaN (long value);
```

Determines if a value is NaN.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is NaN; otherwise, `false`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.IsNegativeInfinity(Int64) method

```csharp
static bool INumberBase<long>.IsNegativeInfinity (long value);
```

Determines if a value is negative infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative infinity; otherwise, `false`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.IsNormal(Int64) method

```csharp
static bool INumberBase<long>.IsNormal (long value);
```

Determines if a value is normal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is normal; otherwise, `false`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.IsPositiveInfinity(Int64) method

```csharp
static bool INumberBase<long>.IsPositiveInfinity (long value);
```

Determines if a value is positive infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive infinity; otherwise, `false`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.IsRealNumber(Int64) method

```csharp
static bool INumberBase<long>.IsRealNumber (long value);
```

Determines if a value represents a real number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a real number; otherwise, `false`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.IsSubnormal(Int64) method

```csharp
static bool INumberBase<long>.IsSubnormal (long value);
```

Determines if a value is subnormal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is subnormal; otherwise, `false`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.IsZero(Int64) method

```csharp
static bool INumberBase<long>.IsZero (long value);
```

Determines if a value is zero.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is zero; otherwise, `false`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.MaxMagnitudeNumber(Int64, Int64) method

```csharp
static long INumberBase<long>.MaxMagnitudeNumber (long x, long y);
```

Compares two values to compute which has the greater magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.MinMagnitudeNumber(Int64, Int64) method

```csharp
static long INumberBase<long>.MinMagnitudeNumber (long x, long y);
```

Compares two values to compute which has the lesser magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.MultiplyAddEstimate(Int64, Int64, Int64) method

```csharp
static long INumberBase<long>.MultiplyAddEstimate (long left, long right, long addend);
```

Computes an estimate of (`left` * `right`) + `addend`.

Parameters:

- `left`: The value to be multiplied with `right`.
- `right`: The value to be multiplied with `left`.
- `addend`: The value to be added to the result of `left` multiplied by `right`.

Returns: An estimate of (`left` * `right`) + `addend`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.TryConvertToChecked<TOther>(Int64, TOther) method

```csharp
static bool INumberBase<long>.TryConvertToChecked<TOther> (long value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.TryConvertToSaturating<TOther>(Int64, TOther) method

```csharp
static bool INumberBase<long>.TryConvertToSaturating<TOther> (long value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.TryConvertToTruncating<TOther>(Int64, TOther) method

```csharp
static bool INumberBase<long>.TryConvertToTruncating<TOther> (long value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.TryConvertFromChecked<TOther>(TOther, Int64) method

```csharp
static bool INumberBase<long>.TryConvertFromChecked<TOther> (TOther value, out long result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.TryConvertFromSaturating<TOther>(TOther, Int64) method

```csharp
static bool INumberBase<long>.TryConvertFromSaturating<TOther> (TOther value, out long result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Int64.System.Numerics.INumberBase<System.Int64>.TryConvertFromTruncating<TOther>(TOther, Int64) method

```csharp
static bool INumberBase<long>.TryConvertFromTruncating<TOther> (TOther value, out long result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Int64.System.Numerics.IShiftOperators<System.Int64,System.Int32,System.Int64>.op_LeftShift(Int64, Int32) method

```csharp
static long IShiftOperators<long,int,long>.operator << (long value, int shiftAmount);
```

Shifts a value left by a given amount.

Parameters:

- `value`: The value that is shifted left by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted left.

Returns: The result of shifting `value` left by `shiftAmount`.

To be added.

## Int64.System.Numerics.IShiftOperators<System.Int64,System.Int32,System.Int64>.op_RightShift(Int64, Int32) method

```csharp
static long IShiftOperators<long,int,long>.operator >> (long value, int shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

To be added.

## Int64.System.Numerics.IShiftOperators<System.Int64,System.Int32,System.Int64>.op_UnsignedRightShift(Int64, Int32) method

```csharp
static long IShiftOperators<long,int,long>.op_UnsignedRightShift (long value, int shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

To be added.

## Int64.System.Numerics.ISubtractionOperators<System.Int64,System.Int64,System.Int64>.op_CheckedSubtraction(Int64, Int64) method

```csharp
static long ISubtractionOperators<long,long,long>.op_CheckedSubtraction (long left, long right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that's subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

To be added.

## Int64.System.Numerics.ISubtractionOperators<System.Int64,System.Int64,System.Int64>.op_Subtraction(Int64, Int64) method

```csharp
static long ISubtractionOperators<long,long,long>.operator - (long left, long right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that's subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

To be added.

## Int64.System.Numerics.IUnaryNegationOperators<System.Int64,System.Int64>.op_CheckedUnaryNegation(Int64) method

```csharp
static long IUnaryNegationOperators<long,long>.op_CheckedUnaryNegation (long value);
```

Computes the checked unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## Int64.System.Numerics.IUnaryNegationOperators<System.Int64,System.Int64>.op_UnaryNegation(Int64) method

```csharp
static long IUnaryNegationOperators<long,long>.operator - (long value);
```

Computes the unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## Int64.System.Numerics.IUnaryPlusOperators<System.Int64,System.Int64>.op_UnaryPlus(Int64) method

```csharp
static long IUnaryPlusOperators<long,long>.operator + (long value);
```

Computes the unary plus of a value.

Parameters:

- `value`: The value for which to compute the unary plus.

Returns: The unary plus of `value`.

To be added.

## Int64.ToString() method

```csharp
public override string ToString ();
```

Converts the numeric value of this instance to its equivalent string representation.

Returns: The string representation of the value of this instance, consisting of a minus sign if the value is negative, and a sequence of digits ranging from 0 to 9 with no leading zeroes.

#### Remarks
The `ToString` method formats an `Int64` value in the default ("G", or general) format by using the `NumberFormatInfo` object of the current culture. If you want to specify a different format or culture, use the other overloads of the `Int64.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|A specific culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|
|A specific format|A specific culture|`ToString`|

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

#### Examples
The following example displays an `Int64` value using the default `ToString` method. It also displays the string representations of the `Int64` value that results from using a number of standard format specifiers. The examples are displayed using the formatting conventions of the en-US culture.

_Code sample not included: ~/snippets/csharp/System/Int64/ToString/ToString.cs._

## Int64.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified culture-specific format information.

Parameters:

- `provider`: An `IFormatProvider` that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `provider`.

#### Remarks
The `ToString` method formats an `Int64` value in the default ("G", or general) format by using the `NumberFormatInfo` object of a specified culture. If you want to specify a different format or the current culture, use the other overloads of the `Int64.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|
|A specific format|A specific culture|`ToString`|

The `provider` parameter is an object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of the string that is returned by this method. The object that implements `IFormatProvider` can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting rules are to be used.

- A `NumberFormatInfo` object that contains specific numeric formatting information for this value.

- A custom object that implements `IFormatProvider` and whose `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides formatting information.

If `provider` is `null` or a `NumberFormatInfo` object cannot be obtained from `provider`, the return value is formatted with the `NumberFormatInfo` object for the current culture.

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

#### Examples
The following example displays the string representation of an `Int64` value using `CultureInfo` objects that represent several different cultures.

_Code sample not included: ~/snippets/csharp/System/Int64/ToString/ToString.cs._
