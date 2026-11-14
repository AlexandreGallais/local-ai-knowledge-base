---
title: "Int16 struct (part 5 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Int16.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int16 struct (part 5 of 7)

## Int16.System.Numerics.INumberBase<System.Int16>.IsNaN(Int16) method

```csharp
static bool INumberBase<short>.IsNaN (short value);
```

Determines if a value is NaN.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is NaN; otherwise, `false`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.IsNegativeInfinity(Int16) method

```csharp
static bool INumberBase<short>.IsNegativeInfinity (short value);
```

Determines if a value is negative infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative infinity; otherwise, `false`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.IsNormal(Int16) method

```csharp
static bool INumberBase<short>.IsNormal (short value);
```

Determines if a value is normal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is normal; otherwise, `false`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.IsPositiveInfinity(Int16) method

```csharp
static bool INumberBase<short>.IsPositiveInfinity (short value);
```

Determines if a value is positive infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive infinity; otherwise, `false`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.IsRealNumber(Int16) method

```csharp
static bool INumberBase<short>.IsRealNumber (short value);
```

Determines if a value represents a real number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a real number; otherwise, `false`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.IsSubnormal(Int16) method

```csharp
static bool INumberBase<short>.IsSubnormal (short value);
```

Determines if a value is subnormal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is subnormal; otherwise, `false`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.IsZero(Int16) method

```csharp
static bool INumberBase<short>.IsZero (short value);
```

Determines if a value is zero.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is zero; otherwise, `false`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.MaxMagnitudeNumber(Int16, Int16) method

```csharp
static short INumberBase<short>.MaxMagnitudeNumber (short x, short y);
```

Compares two values to compute which has the greater magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.MinMagnitudeNumber(Int16, Int16) method

```csharp
static short INumberBase<short>.MinMagnitudeNumber (short x, short y);
```

Compares two values to compute which has the lesser magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.MultiplyAddEstimate(Int16, Int16, Int16) method

```csharp
static short INumberBase<short>.MultiplyAddEstimate (short left, short right, short addend);
```

Computes an estimate of (`left` * `right`) + `addend`.

Parameters:

- `left`: The value to be multiplied with `right`.
- `right`: The value to be multiplied with `left`.
- `addend`: The value to be added to the result of `left` multiplied by `right`.

Returns: An estimate of (`left` * `right`) + `addend`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.TryConvertToChecked<TOther>(Int16, TOther) method

```csharp
static bool INumberBase<short>.TryConvertToChecked<TOther> (short value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.TryConvertToSaturating<TOther>(Int16, TOther) method

```csharp
static bool INumberBase<short>.TryConvertToSaturating<TOther> (short value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.TryConvertToTruncating<TOther>(Int16, TOther) method

```csharp
static bool INumberBase<short>.TryConvertToTruncating<TOther> (short value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.TryConvertFromChecked<TOther>(TOther, Int16) method

```csharp
static bool INumberBase<short>.TryConvertFromChecked<TOther> (TOther value, out short result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.TryConvertFromSaturating<TOther>(TOther, Int16) method

```csharp
static bool INumberBase<short>.TryConvertFromSaturating<TOther> (TOther value, out short result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Int16.System.Numerics.INumberBase<System.Int16>.TryConvertFromTruncating<TOther>(TOther, Int16) method

```csharp
static bool INumberBase<short>.TryConvertFromTruncating<TOther> (TOther value, out short result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Int16.System.Numerics.IShiftOperators<System.Int16,System.Int32,System.Int16>.op_LeftShift(Int16, Int32) method

```csharp
static short IShiftOperators<short,int,short>.operator << (short value, int shiftAmount);
```

Shifts a value left by a given amount.

Parameters:

- `value`: The value that is shifted left by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted left.

Returns: The result of shifting `value` left by `shiftAmount`.

To be added.

## Int16.System.Numerics.IShiftOperators<System.Int16,System.Int32,System.Int16>.op_RightShift(Int16, Int32) method

```csharp
static short IShiftOperators<short,int,short>.operator >> (short value, int shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

To be added.

## Int16.System.Numerics.IShiftOperators<System.Int16,System.Int32,System.Int16>.op_UnsignedRightShift(Int16, Int32) method

```csharp
static short IShiftOperators<short,int,short>.op_UnsignedRightShift (short value, int shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

To be added.

## Int16.System.Numerics.ISubtractionOperators<System.Int16,System.Int16,System.Int16>.op_CheckedSubtraction(Int16, Int16) method

```csharp
static short ISubtractionOperators<short,short,short>.op_CheckedSubtraction (short left, short right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that's subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

To be added.

## Int16.System.Numerics.ISubtractionOperators<System.Int16,System.Int16,System.Int16>.op_Subtraction(Int16, Int16) method

```csharp
static short ISubtractionOperators<short,short,short>.operator - (short left, short right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that's subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

To be added.

## Int16.System.Numerics.IUnaryNegationOperators<System.Int16,System.Int16>.op_CheckedUnaryNegation(Int16) method

```csharp
static short IUnaryNegationOperators<short,short>.op_CheckedUnaryNegation (short value);
```

Computes the checked unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## Int16.System.Numerics.IUnaryNegationOperators<System.Int16,System.Int16>.op_UnaryNegation(Int16) method

```csharp
static short IUnaryNegationOperators<short,short>.operator - (short value);
```

Computes the unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## Int16.System.Numerics.IUnaryPlusOperators<System.Int16,System.Int16>.op_UnaryPlus(Int16) method

```csharp
static short IUnaryPlusOperators<short,short>.operator + (short value);
```

Computes the unary plus of a value.

Parameters:

- `value`: The value for which to compute the unary plus.

Returns: The unary plus of `value`.

To be added.

## Int16.ToString() method

```csharp
public override string ToString ();
```

Converts the numeric value of this instance to its equivalent string representation.

Returns: The string representation of the value of this instance, consisting of a minus sign if the value is negative, and a sequence of digits ranging from 0 to 9 with no leading zeroes.

#### Remarks
The `ToString` method formats an `Int16` value in the default ("G", or general) format by using the `NumberFormatInfo` object of the current culture. If you want to specify a different format or culture, use the other overloads of the `Int16.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|A specific culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|
|A specific format|A specific culture|`ToString`|

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

#### Examples
The following example uses the `ToString` method to display an array of `Int16` values to the console.

_Code sample not included: ~/snippets/csharp/System/Int16/ToString/ToString1.cs._

## Int16.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified culture-specific format information.

Parameters:

- `provider`: An `IFormatProvider` that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `provider`.

#### Remarks
The `ToString` method formats an `Int16` value in the default ("G", or general) format by using the `NumberFormatInfo` object of a specified culture. If you want to specify a different format or the current culture, use the other overloads of the `Int16.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|
|A specific format|A specific culture|`ToString`|

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

The `provider` parameter is an `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object. Typically, `provider` is a `NumberFormatInfo` object or a `CultureInfo` object. The `NumberFormatInfo` object provides culture-specific information about the format of the string returned by this method. If `provider` is `null`, this instance is formatted with the `NumberFormatInfo` object for the current culture.

#### Examples
The following example iterates an array of `Int16` values and displays each of them to the console by calling the `ToString` method with different format providers. Because of the simple formatting defined by the default "G" format specifier, the formatted strings produced for each `Int16` value are identical regardless of the value of the `provider` parameter.

_Code sample not included: ~/snippets/csharp/System/Int16/ToString/ToString1.cs._
