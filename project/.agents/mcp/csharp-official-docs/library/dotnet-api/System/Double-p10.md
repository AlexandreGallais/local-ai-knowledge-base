---
title: "Double struct (part 10 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Double.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Double struct (part 10 of 14)

## Double.System.Numerics.IModulusOperators<System.Double,System.Double,System.Double>.op_Modulus(Double, Double) method

```csharp
static double IModulusOperators<double,double,double>.operator % (double left, double right);
```

Divides two values together to compute their modulus or remainder.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The modulus or remainder of `left` divided by `right`.

To be added.

## Double.System.Numerics.IMultiplyOperators<System.Double,System.Double,System.Double>.op_Multiply(Double, Double) method

```csharp
static double IMultiplyOperators<double,double,double>.operator * (double left, double right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.

## Double.System.Numerics.INumberBase<System.Double>.IsCanonical(Double) method

```csharp
static bool INumberBase<double>.IsCanonical (double value);
```

Determines if a value is in its canonical representation.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is in its canonical representation; otherwise, `false`.

To be added.

## Double.System.Numerics.INumberBase<System.Double>.IsComplexNumber(Double) method

```csharp
static bool INumberBase<double>.IsComplexNumber (double value);
```

Determines if a value represents a complex number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a complex number; otherwise, `false`.

To be added.

## Double.System.Numerics.INumberBase<System.Double>.IsImaginaryNumber(Double) method

```csharp
static bool INumberBase<double>.IsImaginaryNumber (double value);
```

Determines if a value represents a pure imaginary number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a pure imaginary number; otherwise, `false`.

To be added.

## Double.System.Numerics.INumberBase<System.Double>.IsZero(Double) method

```csharp
static bool INumberBase<double>.IsZero (double value);
```

Determines if a value is zero.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is zero; otherwise, `false`.

To be added.

## Double.System.Numerics.INumberBase<System.Double>.TryConvertToChecked<TOther>(Double, TOther) method

```csharp
static bool INumberBase<double>.TryConvertToChecked<TOther> (double value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Double.System.Numerics.INumberBase<System.Double>.TryConvertToSaturating<TOther>(Double, TOther) method

```csharp
static bool INumberBase<double>.TryConvertToSaturating<TOther> (double value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Double.System.Numerics.INumberBase<System.Double>.TryConvertToTruncating<TOther>(Double, TOther) method

```csharp
static bool INumberBase<double>.TryConvertToTruncating<TOther> (double value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Double.System.Numerics.INumberBase<System.Double>.TryConvertFromChecked<TOther>(TOther, Double) method

```csharp
static bool INumberBase<double>.TryConvertFromChecked<TOther> (TOther value, out double result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Double.System.Numerics.INumberBase<System.Double>.TryConvertFromSaturating<TOther>(TOther, Double) method

```csharp
static bool INumberBase<double>.TryConvertFromSaturating<TOther> (TOther value, out double result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Double.System.Numerics.INumberBase<System.Double>.TryConvertFromTruncating<TOther>(TOther, Double) method

```csharp
static bool INumberBase<double>.TryConvertFromTruncating<TOther> (TOther value, out double result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Double.System.Numerics.ISubtractionOperators<System.Double,System.Double,System.Double>.op_Subtraction(Double, Double) method

```csharp
static double ISubtractionOperators<double,double,double>.operator - (double left, double right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that's subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

To be added.

## Double.System.Numerics.IUnaryNegationOperators<System.Double,System.Double>.op_UnaryNegation(Double) method

```csharp
static double IUnaryNegationOperators<double,double>.operator - (double value);
```

Computes the unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## Double.System.Numerics.IUnaryPlusOperators<System.Double,System.Double>.op_UnaryPlus(Double) method

```csharp
static double IUnaryPlusOperators<double,double>.operator + (double value);
```

Computes the unary plus of a value.

Parameters:

- `value`: The value for which to compute the unary plus.

Returns: The unary plus of `value`.

To be added.

## Double.Tan(Double) method

```csharp
public static double Tan (double x);
```

Computes the tangent of a value.

Parameters:

- `x`: The value, in radians, whose tangent is to be computed.

Returns: The tangent of `x`.

#### Remarks

This computes `tan(x)`.

## Double.Tanh(Double) method

```csharp
public static double Tanh (double x);
```

Computes the hyperbolic tangent of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic tangent is to be computed.

Returns: The hyperbolic tangent of `x`.

To be added.

## Double.TanPi(Double) method

```csharp
public static double TanPi (double x);
```

Computes the tangent of a value that has been multipled by `pi`.

Parameters:

- `x`: The value, in half-revolutions, that is multipled by `pi` before computing its tangent.

Returns: The tangent of `x` multiplied-by `pi`.

#### Remarks

This computes `tan(x * π)`.

## Double.ToString() method

```csharp
public override string ToString ();
```

Converts the numeric value of this instance to its equivalent string representation.

Returns: The string representation of the value of this instance.

#### Remarks
The `ToString` method formats a `Double` value in the default ("G", or general) format of the current culture. If you want to specify a different format, precision, or culture, use the other overloads of the `Double.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|A specific culture|`ToString`|
|A specific format or precision|Default (current) culture|`ToString`|
|A specific format or precision|A specific culture|`ToString`|

The return value can be `NumberFormatInfo.PositiveInfinitySymbol`, `NumberFormatInfo.NegativeInfinitySymbol`, `NumberFormatInfo.NaNSymbol`, or a string of the form:

[sign]integral-digits.[fractional-digits]exponential-digits]

Optional elements are framed in square brackets ([ and ]). Elements that contain the term "digits" consist of a series of numeric characters ranging from 0 to 9. The elements listed in the following table are supported.

|Element|Description|
|-------------|-----------------|
|*sign*|A negative sign or positive sign symbol.|
|*integral-digits*|A series of digits specifying the integral part of the number. Integral-digits can be absent if there are fractional-digits.|
|'*.*'|A culture-specific decimal point symbol.|
|*fractional-digits*|A series of digits specifying the fractional part of the number.|
|'*E*'|An uppercase character 'E', indicating exponential (scientific) notation.|
|*exponential-digits*|A series of digits specifying an exponent.|

Some examples of the return value are "100", "-123,456,789", "123.45E+6", "500", "3.1416", "600", "-0.123", and "-Infinity".

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

#### Examples
The following example uses the default `ToString` method to display the string representations of a number of `Double` values.

_Code sample not included: ~/snippets/csharp/System/Double/ToString/ToString1.cs._

The following example illustrates the use of `Double.ToString`.

_Code sample not included: ~/snippets/csharp/System/Double/CompareTo/doublesample.cs._

## Double.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified culture-specific format information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `provider`.

#### Remarks
The `ToString` method formats a `Double` value in the default ("G", or general) format of a specified culture. If you want to specify a different format or culture, use the other overloads of the `Double.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current)|`ToString`|
|A specific format or precision|Default (current) culture|`ToString`|
|A specific format or precision|A specific culture|`ToString`|

The return value can be `NumberFormatInfo.PositiveInfinitySymbol`, `NumberFormatInfo.NegativeInfinitySymbol`, `NumberFormatInfo.NaNSymbol`, or a string of the form:

[sign]integral-digits.[fractional-digits]exponential-digits]

Optional elements are framed in square brackets ([ and ]). Elements that contain the term "digits" consist of a series of numeric characters ranging from 0 to 9. The elements listed in the following table are supported.

|Element|Description|
|-------------|-----------------|
|*sign*|A negative sign or positive sign symbol.|
|*integral-digits*|A series of digits specifying the integral part of the number. Integral-digits can be absent if there are fractional-digits.|
|'*.*'|A culture-specific decimal point symbol.|
|*fractional-digits*|A series of digits specifying the fractional part of the number.|
|'*E*'|An uppercase character 'E', indicating exponential (scientific) notation.|
|*exponential-digits*|A series of digits specifying an exponent.|

Some examples of the return value are "100", "-123,456,789", "123.45E+6", "500", "3.1416", "600", "-0.123", and "-Infinity".

This instance is formatted with the general numeric format specifier ("G").

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

The `provider` parameter is an `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object. Typically, `provider` is a `CultureInfo` object or a `NumberFormatInfo` object. The `provider` parameter supplies culture-specific information used in formatting. If `provider` is `null`, the return value is formatted using the `NumberFormatInfo` object for the current culture.

#### Examples
The following example displays the string representation of two `Double` values using `CultureInfo` objects that represent several different cultures.

_Code sample not included: ~/snippets/csharp/System/Double/ToString/ToString1.cs._

The following example illustrates the use of `Double.ToString`, taking a `String` and an `IFormatProvider` as parameters.

_Code sample not included: ~/snippets/csharp/System/Double/Overview/source.cs._
