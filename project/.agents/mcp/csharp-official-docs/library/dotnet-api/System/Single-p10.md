---
title: "Single struct (part 10 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Single.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Single struct (part 10 of 14)

## Single.System.Numerics.INumberBase<System.Single>.IsCanonical(Single) method

```csharp
static bool INumberBase<float>.IsCanonical (float value);
```

Determines if a value is in its canonical representation.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is in its canonical representation; otherwise, `false`.

To be added.

## Single.System.Numerics.INumberBase<System.Single>.IsComplexNumber(Single) method

```csharp
static bool INumberBase<float>.IsComplexNumber (float value);
```

Determines if a value represents a complex number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a complex number; otherwise, `false`.

To be added.

## Single.System.Numerics.INumberBase<System.Single>.IsImaginaryNumber(Single) method

```csharp
static bool INumberBase<float>.IsImaginaryNumber (float value);
```

Determines if a value represents a pure imaginary number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a pure imaginary number; otherwise, `false`.

To be added.

## Single.System.Numerics.INumberBase<System.Single>.IsZero(Single) method

```csharp
static bool INumberBase<float>.IsZero (float value);
```

Determines if a value is zero.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is zero; otherwise, `false`.

To be added.

## Single.System.Numerics.INumberBase<System.Single>.TryConvertToChecked<TOther>(Single, TOther) method

```csharp
static bool INumberBase<float>.TryConvertToChecked<TOther> (float value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Single.System.Numerics.INumberBase<System.Single>.TryConvertToSaturating<TOther>(Single, TOther) method

```csharp
static bool INumberBase<float>.TryConvertToSaturating<TOther> (float value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Single.System.Numerics.INumberBase<System.Single>.TryConvertToTruncating<TOther>(Single, TOther) method

```csharp
static bool INumberBase<float>.TryConvertToTruncating<TOther> (float value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Single.System.Numerics.INumberBase<System.Single>.TryConvertFromChecked<TOther>(TOther, Single) method

```csharp
static bool INumberBase<float>.TryConvertFromChecked<TOther> (TOther value, out float result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Single.System.Numerics.INumberBase<System.Single>.TryConvertFromSaturating<TOther>(TOther, Single) method

```csharp
static bool INumberBase<float>.TryConvertFromSaturating<TOther> (TOther value, out float result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Single.System.Numerics.INumberBase<System.Single>.TryConvertFromTruncating<TOther>(TOther, Single) method

```csharp
static bool INumberBase<float>.TryConvertFromTruncating<TOther> (TOther value, out float result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Single.System.Numerics.ISubtractionOperators<System.Single,System.Single,System.Single>.op_Subtraction(Single, Single) method

```csharp
static float ISubtractionOperators<float,float,float>.operator - (float left, float right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that's subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

To be added.

## Single.System.Numerics.IUnaryNegationOperators<System.Single,System.Single>.op_UnaryNegation(Single) method

```csharp
static float IUnaryNegationOperators<float,float>.operator - (float value);
```

Computes the unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## Single.System.Numerics.IUnaryPlusOperators<System.Single,System.Single>.op_UnaryPlus(Single) method

```csharp
static float IUnaryPlusOperators<float,float>.operator + (float value);
```

Computes the unary plus of a value.

Parameters:

- `value`: The value for which to compute the unary plus.

Returns: The unary plus of `value`.

To be added.

## Single.Tan(Single) method

```csharp
public static float Tan (float x);
```

Computes the tangent of a value.

Parameters:

- `x`: The value, in radians, whose tangent is to be computed.

Returns: The tangent of `x`.

#### Remarks

This computes `tan(x)`.

## Single.Tanh(Single) method

```csharp
public static float Tanh (float x);
```

Computes the hyperbolic tangent of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic tangent is to be computed.

Returns: The hyperbolic tangent of `x`.

To be added.

## Single.TanPi(Single) method

```csharp
public static float TanPi (float x);
```

Computes the tangent of a value that has been multipled by `pi`.

Parameters:

- `x`: The value, in half-revolutions, that is multipled by `pi` before computing its tangent.

Returns: The tangent of `x` multiplied-by `pi`.

#### Remarks

This computes `tan(x * π)`.

## Single.ToString() method

```csharp
public override string ToString ();
```

Converts the numeric value of this instance to its equivalent string representation.

Returns: The string representation of the value of this instance.

#### Remarks
The `ToString` method formats a `Single` value in the default ("G", or general) format of the current culture. If you want to specify a different format or culture, use the other overloads of the `Single.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|A specific culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|
|A specific format|A specific culture|`ToString`|

The return value can be `NumberFormatInfo.PositiveInfinitySymbol`, `NumberFormatInfo.NegativeInfinitySymbol`, `NumberFormatInfo.NaNSymbol`, or a string of the form:

[sign]integral-digits.[fractional-digits]exponential-digits]

Optional elements are framed in square brackets ([ and ]). Elements that contain the term "digits" consist of a series of numeric characters ranging from 0 to 9. The following table lists each element:

|Element|Description|
|-------------|-----------------|
|*sign*|A negative sign or positive sign symbol.|
|*integral-digits*|A series of digits specifying the integral part of the number. Integral-digits can be absent if there are fractional-digits.|
|'.'|A culture-specific decimal point symbol.|
|*fractional-digits*|A series of digits specifying the fractional part of the number.|
|'e'|A lowercase character 'e', indicating exponential (scientific) notation.|
|*exponential-digits*|A series of digits specifying an exponent.|

Some examples of the return value are "100", "-123,456,789", "123.45e+6", "500", "3.1416", "600", "-0.123", and "-Infinity".

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

#### Examples
The following example uses the default `Single.ToString` method to display the string representations of a number of `Single` values.

_Code sample not included: ~/snippets/csharp/System/Single/ToString/ToString1.cs._

The following code example illustrates the use of the `Parse` method along with the `ToString` method.

_Code sample not included: ~/snippets/csharp/System/Single/CompareTo/singlesample.cs._

## Single.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified culture-specific format information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `provider`.

#### Remarks
The `ToString` method formats a `Single` value in the default ("G", or general) format of a specified culture. If you want to specify a different format or the current culture, use the other overloads of the `Single.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|
|A specific format|A specific culture|`ToString`|

The return value can be `NumberFormatInfo.PositiveInfinitySymbol`, `NumberFormatInfo.NegativeInfinitySymbol`, `NumberFormatInfo.NaNSymbol`, or a string of the form:

[sign]integral-digits.[fractional-digits]exponential-digits]

Optional elements are framed in square brackets ([ and ]). Elements containing the term "digits" consist of a series of numeric characters ranging from 0 to 9. The following table lists each element.

|Element|Description|
|-------------|-----------------|
|sign|A negative sign or positive sign symbol.|
|integral-digits|A series of digits specifying the integral part of the number. Integral-digits can be absent if there are fractional-digits.|
|'.'|A culture-specific decimal point symbol.|
|fractional-digits|A series of digits specifying the fractional part of the number.|
|'e'|A lowercase character 'e', indicating exponential (scientific) notation.|
|exponential-digits|A series of digits specifying an exponent.|

Some examples of the return value are "100", "-123,456,789", "123.45e+6", "500", "3.1416", "600", "-0.123", and "-Infinity".

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

The `provider` parameter is an `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object. Typically, `provider` is a `CultureInfo` object or a `NumberFormatInfo` object. The `provider` parameter supplies culture-specific information used in formatting. If `provider` is `null`, the return value is formatted using the `NumberFormatInfo` data for the current culture.

To convert a `Single` value to its string representation using a specified culture and a specific format string, call the `ToString` method.

#### Examples
The following example displays the string representation of two `Single` values using `CultureInfo` objects that represent several different cultures.

_Code sample not included: ~/snippets/csharp/System/Single/ToString/ToString1.cs._
