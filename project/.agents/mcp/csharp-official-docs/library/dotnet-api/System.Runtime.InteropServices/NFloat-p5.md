---
title: "NFloat struct (part 5 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/NFloat.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NFloat struct (part 5 of 8)

## NFloat.op_Modulus(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat operator % (System.Runtime.InteropServices.NFloat left, System.Runtime.InteropServices.NFloat right);
```

Divides two values together to compute their remainder.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The remainder of `left` divided-by `right`.

To be added.

## NFloat.op_Multiply(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat operator * (System.Runtime.InteropServices.NFloat left, System.Runtime.InteropServices.NFloat right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied-by `right`.

To be added.

## NFloat.op_Subtraction(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat operator - (System.Runtime.InteropServices.NFloat left, System.Runtime.InteropServices.NFloat right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that's subtracted from `left`.

Returns: The difference of `right` subtracted from `left`.

To be added.

## NFloat.op_UnaryNegation(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat operator - (System.Runtime.InteropServices.NFloat value);
```

Computes the unary negation of a value.

Parameters:

- `value`: The value for which to compute its unary negation.

Returns: The unary negation of `value`.

To be added.

## NFloat.op_UnaryPlus(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat operator + (System.Runtime.InteropServices.NFloat value);
```

Computes the unary plus of a value.

Parameters:

- `value`: The value for which to compute its unary plus.

Returns: The unary plus of `value`.

To be added.

## NFloat.Parse(String) method

```csharp
public static System.Runtime.InteropServices.NFloat Parse (string s);
```

Converts the string representation of a number to its floating-point number equivalent.

Parameters:

- `s`: A string that contains the number to convert.

Returns: A floating-point number that is equivalent to the numeric value or symbol specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not represent a number in a valid format.

To be added.

## NFloat.Parse(Byte>, IFormatProvider) method

```csharp
public static System.Runtime.InteropServices.NFloat Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## NFloat.Parse(Char>, IFormatProvider) method

```csharp
public static System.Runtime.InteropServices.NFloat Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## NFloat.Parse(String, NumberStyles) method

```csharp
public static System.Runtime.InteropServices.NFloat Parse (string s, System.Globalization.NumberStyles style);
```

Converts the string representation of a number in a specified style to its floating-point number equivalent.

Parameters:

- `s`: A string that contains the number to convert.
- `style`: A bitwise combination of enumeration values that indicate the style elements that can be present in `s`.

Returns: A floating-point number that is equivalent to the numeric value or symbol specified in `s`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` includes the `NumberStyles.AllowHexSpecifier` value.
- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not represent a number in a valid format.

To be added.

## NFloat.Parse(String, IFormatProvider) method

```csharp
public static System.Runtime.InteropServices.NFloat Parse (string s, IFormatProvider? provider);
```

Converts the string representation of a number in a specified culture-specific format to its floating-point number equivalent.

Parameters:

- `s`: A string that contains the number to convert.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: A floating-point number that is equivalent to the numeric value or symbol specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not represent a number in a valid format.

To be added.

## NFloat.Parse(Byte>, NumberStyles, IFormatProvider) method

```csharp
public static System.Runtime.InteropServices.NFloat Parse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.AllowThousands | System.Globalization.NumberStyles.Float, IFormatProvider? provider = default);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## NFloat.Parse(Char>, NumberStyles, IFormatProvider) method

```csharp
public static System.Runtime.InteropServices.NFloat Parse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.AllowThousands | System.Globalization.NumberStyles.Float, IFormatProvider? provider = default);
```

Converts a character span that contains the string representation of a number in a specified style and culture-specific format to its floating-point number equivalent.

Parameters:

- `s`: A character span that contains the number to convert.
- `style`: A bitwise combination of enumeration values that indicate the style elements that can be present in `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: A floating-point number that is equivalent to the numeric value or symbol specified in `s`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` includes the `NumberStyles.AllowHexSpecifier` value.
- `FormatException`: `s` does not represent a number in a valid format.

To be added.

## NFloat.Parse(String, NumberStyles, IFormatProvider) method

```csharp
public static System.Runtime.InteropServices.NFloat Parse (string s, System.Globalization.NumberStyles style, IFormatProvider? provider);
```

Converts the string representation of a number in a specified style and culture-specific format to its floating-point number equivalent.

Parameters:

- `s`: A string that contains the number to convert.
- `style`: A bitwise combination of enumeration values that indicate the style elements that can be present in `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: A floating-point number that is equivalent to the numeric value or symbol specified in `s`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` includes the `NumberStyles.AllowHexSpecifier` value.
- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not represent a number in a valid format.

To be added.

## NFloat.Pow(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Pow (System.Runtime.InteropServices.NFloat x, System.Runtime.InteropServices.NFloat y);
```

Computes a value raised to a given power.

Parameters:

- `x`: The value that's raised to the power of `x`.
- `y`: The power to which `x` is raised.

Returns: `x` raised to the power of `y`.

To be added.

## NFloat.RadiansToDegrees(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat RadiansToDegrees (System.Runtime.InteropServices.NFloat radians);
```

Converts a given value from radians to degrees.

Parameters:

- `radians`: The value to convert to degrees.

Returns: The value of `radians` converted to degrees.

To be added.

## NFloat.ReciprocalEstimate(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat ReciprocalEstimate (System.Runtime.InteropServices.NFloat x);
```

Computes an estimate of the reciprocal of a value.

Parameters:

- `x`: The value whose estimate of the reciprocal is to be computed.

Returns: An estimate of the reciprocal of `x`.

To be added.

## NFloat.ReciprocalSqrtEstimate(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat ReciprocalSqrtEstimate (System.Runtime.InteropServices.NFloat x);
```

Computes an estimate of the reciprocal square root of a value.

Parameters:

- `x`: The value whose estimate of the reciprocal square root is to be computed.

Returns: An estimate of the reciprocal square root of `x`.

To be added.

## NFloat.RootN(NFloat, Int32) method

```csharp
public static System.Runtime.InteropServices.NFloat RootN (System.Runtime.InteropServices.NFloat x, int n);
```

Computes the n-th root of a value.

Parameters:

- `x`: The value whose `n`-th root is to be computed.
- `n`: The degree of the root to be computed.

Returns: The `n`-th root of `x`.

To be added.

## NFloat.Round(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Round (System.Runtime.InteropServices.NFloat x);
```

Rounds a value to the nearest integer using the default rounding mode (`MidpointRounding.ToEven`).

Parameters:

- `x`: The value to round.

Returns: The result of rounding `x` to the nearest integer using the default rounding mode.

To be added.

## NFloat.Round(NFloat, Int32) method

```csharp
public static System.Runtime.InteropServices.NFloat Round (System.Runtime.InteropServices.NFloat x, int digits);
```

Rounds a value to a specified number of fractional-digits using the default rounding mode (`MidpointRounding.ToEven`).

Parameters:

- `x`: The value to round.
- `digits`: The number of fractional digits to which `x` should be rounded.

Returns: The result of rounding `x` to `digits` fractional-digits using the default rounding mode.

To be added.

## NFloat.Round(NFloat, MidpointRounding) method

```csharp
public static System.Runtime.InteropServices.NFloat Round (System.Runtime.InteropServices.NFloat x, MidpointRounding mode);
```

Rounds a value to the nearest integer using the specified rounding mode.

Parameters:

- `x`: The value to round.
- `mode`: The mode under which `x` should be rounded.

Returns: The result of rounding `x` to the nearest integer using `mode`.

To be added.

## NFloat.Round(NFloat, Int32, MidpointRounding) method

```csharp
public static System.Runtime.InteropServices.NFloat Round (System.Runtime.InteropServices.NFloat x, int digits, MidpointRounding mode);
```

Rounds a value to a specified number of fractional-digits using the default rounding mode (`MidpointRounding.ToEven`).

Parameters:

- `x`: The value to round.
- `digits`: The number of fractional digits to which `x` should be rounded.
- `mode`: The mode under which `x` should be rounded.

Returns: The result of rounding `x` to `digits` fractional-digits using `mode`.

To be added.

## NFloat.ScaleB(NFloat, Int32) method

```csharp
public static System.Runtime.InteropServices.NFloat ScaleB (System.Runtime.InteropServices.NFloat x, int n);
```

Computes the product of a value and its base-radix raised to the specified power.

Parameters:

- `x`: The value that base-radix raised to the power of `n` multiplies.
- `n`: The value to which base-radix is raised before multipliying `x`.

Returns: The product of `x` and base-radix raised to the power of `n`.

To be added.

## NFloat.Sign(NFloat) method

```csharp
public static int Sign (System.Runtime.InteropServices.NFloat value);
```

Computes the sign of a value.

Parameters:

- `value`: The value whose sign is to be computed.

Returns: A positive value if `value` is positive, `INumberBase<T>.Zero` if `value` is zero, and a negative value if `value` is negative.

#### Remarks

It is recommended that a function return `1`, `0`, and `-1`, respectively.

## NFloat.Sin(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Sin (System.Runtime.InteropServices.NFloat x);
```

Computes the sine of a value.

Parameters:

- `x`: The value, in radians, whose sine is to be computed.

Returns: The sine of `x`.

#### Remarks

This computes `sin(x)`.

## NFloat.SinCos(NFloat) method

```csharp
public static (System.Runtime.InteropServices.NFloat Sin, System.Runtime.InteropServices.NFloat Cos) SinCos (System.Runtime.InteropServices.NFloat x);
```

Computes the sine and cosine of a value.

Parameters:

- `x`: The value, in radians, whose sine and cosine are to be computed.

Returns: The sine and cosine of `x`.

#### Remarks

This computes `(sin(x), cos(x))`.

## NFloat.SinCosPi(NFloat) method

```csharp
public static (System.Runtime.InteropServices.NFloat SinPi, System.Runtime.InteropServices.NFloat CosPi) SinCosPi (System.Runtime.InteropServices.NFloat x);
```

Computes the sine and cosine of a value.

Parameters:

- `x`: The value, in half-revolutions, that is multipled by `pi` before computing its sine and cosine.

Returns: The sine and cosine of `x`.

#### Remarks

This computes `(sin(x), cos(x))`.

## NFloat.Sinh(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Sinh (System.Runtime.InteropServices.NFloat x);
```

Computes the hyperbolic sine of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic sine is to be computed.

Returns: The hyperbolic sine of `x`.

To be added.

## NFloat.SinPi(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat SinPi (System.Runtime.InteropServices.NFloat x);
```

Computes the sine of a value that has been multiplied by `pi`.

Parameters:

- `x`: The value, in half-revolutions, that is multipled by `pi` before computing its sine.

Returns: The sine of `x` multiplied-by `pi`.

#### Remarks

This computes `sin(x * π)`.

## NFloat.Sqrt(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Sqrt (System.Runtime.InteropServices.NFloat x);
```

Computes the square-root of a value.

Parameters:

- `x`: The value whose square-root is to be computed.

Returns: The square-root of `x`.

To be added.
