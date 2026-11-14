---
title: "Single struct (part 8 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Single.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Single struct (part 8 of 14)

## Single.Parse(String, NumberStyles, IFormatProvider) method

```csharp
public static float Parse (string s, System.Globalization.NumberStyles style, IFormatProvider? provider);
```

Converts the string representation of a number in a specified style and culture-specific format to its single-precision floating-point number equivalent.

Parameters:

- `s`: A string that contains a number to convert.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Float` combined with `NumberStyles.AllowThousands`.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: A single-precision floating-point number equivalent to the numeric value or symbol specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not represent a numeric value.
- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` is the `NumberStyles.AllowHexSpecifier` value.

#### Remarks
Values that are too large to represent are rounded to `PositiveInfinity` or `NegativeInfinity` as required by the IEEE 754 specification.

The `style` parameter defines the style elements (such as white space, thousands separators, and currency symbols) that are allowed in the `s` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration. The following `NumberStyles` members are not supported:

-   `AllowHexSpecifier`

-   `HexNumber`

The `s` parameter can contain `NumberFormatInfo.PositiveInfinitySymbol`, `NumberFormatInfo.NegativeInfinitySymbol`, or `NumberFormatInfo.NaNSymbol` symbol for the culture specified by `provider`. This string comparison is case-insensitive. Depending on the value of `style`, the `s` parameter can also take the form:

[*ws*] [*$*] *sign**integral-digits*.[*fractional-digits*]*exponential-digits*][*ws*]

Elements framed in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|A series of white-space characters. White space can appear at the beginning of `s` if `style` includes the `AllowLeadingWhite` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingWhite` flag.|
|$|A culture-specific currency symbol. Its position in the string is defined by the `NumberFormatInfo.CurrencyNegativePattern` and `NumberFormatInfo.CurrencyPositivePattern` properties of the current culture. The current culture's currency symbol can appear in `s` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|A negative sign symbol (-) or a positive sign symbol (+). The sign can appear at the beginning of `s` if `style` includes the `AllowLeadingSign` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingSign` flag. Parentheses can be used in `s` to indicate a negative value if `style` includes the `AllowParentheses` flag.|
|*integral-digits*|A series of digits ranging from 0 to 9 that specify the integral part of the number. The *integral-digits* element can be absent if the string contains the *fractional-digits* element.|
|,|A culture-specific group separator. The current culture's group separator symbol can appear in `s` if `style` includes the `AllowThousands` flag|
|.|A culture-specific decimal point symbol. The current culture's decimal point symbol can appear in `s` if `style` includes the `AllowDecimalPoint` flag.|
|*fractional-digits*|A series of digits ranging from 0 to 9 that specify the fractional part of the number. Fractional digits can appear in `s` if `style` includes the `AllowDecimalPoint` flag.|
|E|The "e" or "E" character, which indicates that the value is represented in exponential (scientific) notation. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*exponential-digits*|A series of digits ranging from 0 to 9 that specify an exponent.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with digits only (which corresponds to the `None` style) always parses successfully if it is in the range of the `Single` type. The remaining `NumberStyles` members control elements that may be present, but are not required to be present, in the input string. The following table indicates how individual `NumberStyles` flags affect the elements that may be present in `s`.

|NumberStyles value|Elements permitted in `s` in addition to digits|
|------------------------|-----------------------------------------------------|
|`None`|The *integral-digits* element only.|
|`AllowDecimalPoint`|The decimal point (*.*) and *fractional-digits* elements.|
|`AllowExponent`|The "e" or "E" character, which indicates exponential notation. This flag by itself supports values in the form *digits*E*digits*; additional flags are needed to successfully parse strings with such elements as positive or negative signs and decimal point symbols.|
|`AllowLeadingWhite`|The *ws* element at the beginning of `s`.|
|`AllowTrailingWhite`|The *ws* element at the end of `s`.|
|`AllowLeadingSign`|The *sign* element at the beginning of `s`.|
|`AllowTrailingSign`|The *sign* element at the end of `s`.|
|`AllowParentheses`|The *sign* element in the form of parentheses enclosing the numeric value.|
|`AllowThousands`|The thousands separator (,) element.|
|`AllowCurrencySymbol`|The currency ($) element.|
|`Currency`|All elements. However, `s` cannot represent a hexadecimal number or a number in exponential notation.|
|`Float`|The *ws* element at the beginning or end of `s`, *sign* at the beginning of `s`, and the decimal point (.) symbol. The `s` parameter can also use exponential notation.|
|`Number`|The `ws`, `sign`, thousands separator (,) and decimal point (.) elements.|
|`Any`|All elements. However, `s` cannot represent a hexadecimal number.|

The `provider` parameter is an `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of `value`. Typically, `provider` can be any one of the following:

- A `CultureInfo` object that represents the culture that provides numeric formatting information. Its `CultureInfo.GetFormat` method returns the `NumberFormatInfo` object that provides numeric formatting information.

- A `NumberFormatInfo` object that provides formatting information. (Its implementation of `NumberFormatInfo.GetFormat` just returns itself.)

- A custom object that implements `IFormatProvider` and uses the `NumberFormatInfo.GetFormat` method to instantiate and return the `NumberFormatInfo` object that provides formatting information.

If `provider` is `null`, the `NumberFormatInfo` object for the current culture is used.

If `s` is out of range of the `Single` data type, the method returns `NegativeInfinity` if `s` is less than `MinValue` and `PositiveInfinity` if `s` is greater than `MaxValue`.

If a separator is encountered in the `s` parameter during a parse operation, and the applicable currency or number decimal and group separators are the same, the parse operation assumes that the separator is a decimal separator rather than a group separator. For more information about separators, see `NumberFormatInfo.CurrencyDecimalSeparator`, `NumberFormatInfo.NumberDecimalSeparator`, `NumberFormatInfo.CurrencyGroupSeparator`, and `NumberFormatInfo.NumberGroupSeparator`.

#### Examples
The following code example uses the `Parse` method to parse the string representations of `Single` values. Each string in an array is parsed using the formatting conventions of the en-US, nl-NL, and a custom culture. The custom culture defines its group separator symbol as the underscore ("_") and its group size as two.

_Code sample not included: ~/snippets/csharp/System/Single/Parse/parse3.cs._

## Single.Pow(Single, Single) method

```csharp
public static float Pow (float x, float y);
```

Computes a value raised to a given power.

Parameters:

- `x`: The value that is raised to the power of `x`.
- `y`: The power to which `x` is raised.

Returns: `x` raised to the power of `y`.

To be added.

## Single.RadiansToDegrees(Single) method

```csharp
public static float RadiansToDegrees (float radians);
```

Converts a given value from radians to degrees.

Parameters:

- `radians`: The value to convert to degrees.

Returns: The value of `radians` converted to degrees.

To be added.

## Single.ReciprocalEstimate(Single) method

```csharp
public static float ReciprocalEstimate (float x);
```

Computes an estimate of the reciprocal of a value.

Parameters:

- `x`: The value whose estimate of the reciprocal is to be computed.

Returns: An estimate of the reciprocal of `x`.

To be added.

## Single.ReciprocalSqrtEstimate(Single) method

```csharp
public static float ReciprocalSqrtEstimate (float x);
```

Computes an estimate of the reciprocal square root of a value.

Parameters:

- `x`: The value whose estimate of the reciprocal square root is to be computed.

Returns: An estimate of the reciprocal square root of `x`.

To be added.

## Single.RootN(Single, Int32) method

```csharp
public static float RootN (float x, int n);
```

Computes the n-th root of a value.

Parameters:

- `x`: The value whose `n`-th root is to be computed.
- `n`: The degree of the root to be computed.

Returns: The `n`-th root of `x`.

To be added.

## Single.Round(Single) method

```csharp
public static float Round (float x);
```

Rounds a value to the nearest integer using the default rounding mode (`MidpointRounding.ToEven`).

Parameters:

- `x`: The value to round.

Returns: The result of rounding `x` to the nearest integer using the default rounding mode.

To be added.

## Single.Round(Single, Int32) method

```csharp
public static float Round (float x, int digits);
```

Rounds a value to a specified number of fractional-digits using the default rounding mode (`MidpointRounding.ToEven`).

Parameters:

- `x`: The value to round.
- `digits`: The number of fractional digits to which `x` should be rounded.

Returns: The result of rounding `x` to `digits` fractional-digits using the default rounding mode.

To be added.

## Single.Round(Single, MidpointRounding) method

```csharp
public static float Round (float x, MidpointRounding mode);
```

Rounds a value to the nearest integer using the specified rounding mode.

Parameters:

- `x`: The value to round.
- `mode`: The mode under which `x` should be rounded.

Returns: The result of rounding `x` to the nearest integer using `mode`.

To be added.

## Single.Round(Single, Int32, MidpointRounding) method

```csharp
public static float Round (float x, int digits, MidpointRounding mode);
```

Rounds a value to a specified number of fractional-digits using the default rounding mode (`MidpointRounding.ToEven`).

Parameters:

- `x`: The value to round.
- `digits`: The number of fractional digits to which `x` should be rounded.
- `mode`: The mode under which `x` should be rounded.

Returns: The result of rounding `x` to `digits` fractional-digits using `mode`.

To be added.

## Single.ScaleB(Single, Int32) method

```csharp
public static float ScaleB (float x, int n);
```

Computes the product of a value and its base-radix raised to the specified power.

Parameters:

- `x`: The value that base-radix raised to the power of `n` multiplies.
- `n`: The value to which base-radix is raised before multipliying `x`.

Returns: The product of `x` and base-radix raised to the power of `n`.

To be added.

## Single.Sign(Single) method

```csharp
public static int Sign (float value);
```

Computes the sign of a value.

Parameters:

- `value`: The value whose sign is to be computed.

Returns: A positive value if `value` is positive, `INumberBase<T>.Zero` if `value` is zero, and a negative value if `value` is negative.

#### Remarks

It is recommended that a function return `1`, `0`, and `-1`, respectively.

## Single.Sin(Single) method

```csharp
public static float Sin (float x);
```

Computes the sine of a value.

Parameters:

- `x`: The value, in radians, whose sine is to be computed.

Returns: The sine of `x`.

#### Remarks

This computes `sin(x)`.

## Single.SinCos(Single) method

```csharp
public static (float Sin, float Cos) SinCos (float x);
```

Computes the sine and cosine of a value.

Parameters:

- `x`: The value, in radians, whose sine and cosine are to be computed.

Returns: The sine and cosine of `x`.

#### Remarks

This computes `(sin(x), cos(x))`.

## Single.SinCosPi(Single) method

```csharp
public static (float SinPi, float CosPi) SinCosPi (float x);
```

Computes the sine and cosine of a value.

Parameters:

- `x`: The value, in radians, whose sine and cosine are to be computed.

Returns: The sine and cosine of `x`.

#### Remarks

This computes `(sin(x), cos(x))`.

## Single.Sinh(Single) method

```csharp
public static float Sinh (float x);
```

Computes the hyperbolic sine of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic sine is to be computed.

Returns: The hyperbolic sine of `x`.

To be added.

## Single.SinPi(Single) method

```csharp
public static float SinPi (float x);
```

Computes the sine of a value that has been multiplied by `pi`.

Parameters:

- `x`: The value, in half-revolutions, that is multipled by `pi` before computing its sine.

Returns: The sine of `x` multiplied-by `pi`.

#### Remarks

This computes `sin(x * π)`.

## Single.Sqrt(Single) method

```csharp
public static float Sqrt (float x);
```

Computes the square-root of a value.

Parameters:

- `x`: The value whose square-root is to be computed.

Returns: The square-root of `x`.

To be added.

## Single.System.IConvertible.ToBoolean(IFormatProvider) method

```csharp
bool IConvertible.ToBoolean (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToBoolean`.

Parameters:

- `provider`: This parameter is ignored.

Returns: `true` if the value of the current instance is not zero; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Single` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToBoolean` method.

## Single.System.IConvertible.ToByte(IFormatProvider) method

```csharp
byte IConvertible.ToByte (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToByte`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Byte`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Single` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToByte` method.
