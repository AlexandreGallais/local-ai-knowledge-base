---
title: "Half struct (part 4 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Half.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Half struct (part 4 of 6)

## Half.op_Implicit(Byte) method

```csharp
public static implicit operator Half (byte value);
```

Implicitly converts a `Byte` value to its nearest representable half-precision floating-point value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable half-precision floating-point value.

To be added.

## Half.op_Implicit(SByte) method

```csharp
public static implicit operator Half (sbyte value);
```

Implicitly converts a `SByte` value to its nearest representable half-precision floating-point value.

Parameters:

- `value`: The value to convert.

Returns: `value` converted to its nearest representable half-precision floating-point value.

To be added.

## Half.op_Increment(Half) method

```csharp
public static Half operator ++ (Half value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.

## Half.op_Inequality(Half, Half) method

```csharp
public static bool operator != (Half left, Half right);
```

Returns a value that indicates whether two specified `Half` values are not equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are not equal; otherwise, `false`.

To be added.

## Half.op_LessThan(Half, Half) method

```csharp
public static bool operator < (Half left, Half right);
```

Returns a value that indicates whether a specified `Half` value is less than another specified `Half` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

To be added.

## Half.op_LessThanOrEqual(Half, Half) method

```csharp
public static bool operator <= (Half left, Half right);
```

Returns a value that indicates whether a specified `Half` value is less than or equal to another specified `Half` value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

To be added.

## Half.op_Modulus(Half, Half) method

```csharp
public static Half operator % (Half left, Half right);
```

Divides two values together to compute their modulus or remainder.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The modulus or remainder of `left` divided-by `right`.

To be added.

## Half.op_Multiply(Half, Half) method

```csharp
public static Half operator * (Half left, Half right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied-by `right`.

To be added.

## Half.op_Subtraction(Half, Half) method

```csharp
public static Half operator - (Half left, Half right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that is subtracted from `left`.

Returns: The difference of `right` subtracted from `left`.

To be added.

## Half.op_UnaryNegation(Half) method

```csharp
public static Half operator - (Half value);
```

Computes the unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## Half.op_UnaryPlus(Half) method

```csharp
public static Half operator + (Half value);
```

Computes the unary plus of a value.

Parameters:

- `value`: The value for which to compute the unary plus.

Returns: The unary plus of `value`.

To be added.

## Half.Parse(String) method

```csharp
public static Half Parse (string s);
```

Converts the string representation of a number to its half-precision floating-point number equivalent.

Parameters:

- `s`: A string that contains a number to convert.

Returns: A half-precision floating-point number equivalent to the numeric value or symbol specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not represent a number in a valid format.
- `OverflowException`: `s` represents a number less than `Half.MinValue` or greater than `Half.MaxValue`.

To be added.

## Half.Parse(Byte>, IFormatProvider) method

```csharp
public static Half Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## Half.Parse(Char>, IFormatProvider) method

```csharp
public static Half Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## Half.Parse(String, NumberStyles) method

```csharp
public static Half Parse (string s, System.Globalization.NumberStyles style);
```

Converts the string representation of a number in a specified style to its single-precision floating-point number equivalent.

Parameters:

- `s`: A string that contains a number to convert.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`.

Returns: A half-precision floating-point number equivalent to the numeric value or symbol specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not represent a number in a valid format.
- `OverflowException`: `s` represents a number less than `Half.MinValue` or greater than `Half.MaxValue`.
- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`NumberStyles` includes the `NumberStyles.AllowHexSpecifier` value.

To be added.

## Half.Parse(String, IFormatProvider) method

```csharp
public static Half Parse (string s, IFormatProvider? provider);
```

Converts the string representation of a number in a specified culture-specific format to its single-precision floating-point number equivalent.

Parameters:

- `s`: A string that contains a number to convert.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: A half-precision floating-point number equivalent to the numeric value or symbol specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not represent a number in a valid format.
- `OverflowException`: `s` represents a number less than `Half.MinValue` or greater than `Half.MaxValue`.

To be added.

## Half.Parse(Byte>, NumberStyles, IFormatProvider) method

```csharp
public static Half Parse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.AllowThousands | System.Globalization.NumberStyles.Float, IFormatProvider? provider = default);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## Half.Parse(Char>, NumberStyles, IFormatProvider) method

```csharp
public static Half Parse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.AllowThousands | System.Globalization.NumberStyles.Float, IFormatProvider? provider = default);
```

Converts the string representation of a number in a specified style and culture-specific format to its single-precision floating-point number equivalent.

Parameters:

- `s`: Converts the string representation of a number to its half-precision floating-point number equivalent. A return value indicates whether the conversion succeeded or failed.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: A half-precision floating-point number equivalent to the numeric value or symbol specified in `s`.

Exceptions:

- `FormatException`: `s` does not represent a number in a valid format.
- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`NumberStyles` includes the `NumberStyles.AllowHexSpecifier` value.

To be added.

## Half.Parse(String, NumberStyles, IFormatProvider) method

```csharp
public static Half Parse (string s, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.AllowThousands | System.Globalization.NumberStyles.Float, IFormatProvider? provider = default);
```

Converts the string representation of a number in a specified style and culture-specific format to its single-precision floating-point number equivalent.

Parameters:

- `s`: A string that contains a number to convert.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: A half-precision floating-point number equivalent to the numeric value or symbol specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not represent a number in a valid format.
- `OverflowException`: `s` represents a number less than `Half.MinValue` or greater than `Half.MaxValue`.
- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`NumberStyles` includes the `NumberStyles.AllowHexSpecifier` value.

To be added.

## Half.Pow(Half, Half) method

```csharp
public static Half Pow (Half x, Half y);
```

Computes a value raised to a given power.

Parameters:

- `x`: The value that is raised to the power of `x`.
- `y`: The power to which `x` is raised.

Returns: `x` raised to the power of `y`.

To be added.

## Half.RadiansToDegrees(Half) method

```csharp
public static Half RadiansToDegrees (Half radians);
```

Converts a given value from radians to degrees.

Parameters:

- `radians`: The value to convert to degrees.

Returns: The value of `radians` converted to degrees.

To be added.

## Half.ReciprocalEstimate(Half) method

```csharp
public static Half ReciprocalEstimate (Half x);
```

Computes an estimate of the reciprocal of a value.

Parameters:

- `x`: The value whose estimate of the reciprocal is to be computed.

Returns: An estimate of the reciprocal of `x`.

To be added.

## Half.ReciprocalSqrtEstimate(Half) method

```csharp
public static Half ReciprocalSqrtEstimate (Half x);
```

Computes an estimate of the reciprocal square root of a value.

Parameters:

- `x`: The value whose estimate of the reciprocal square root is to be computed.

Returns: An estimate of the reciprocal square root of `x`.

To be added.

## Half.RootN(Half, Int32) method

```csharp
public static Half RootN (Half x, int n);
```

Computes the n-th root of a value.

Parameters:

- `x`: The value whose `n`-th root is to be computed.
- `n`: The degree of the root to be computed.

Returns: The `n`-th root of `x`.

To be added.

## Half.Round(Half) method

```csharp
public static Half Round (Half x);
```

Rounds a value to the nearest integer using the default rounding mode (`MidpointRounding.ToEven`).

Parameters:

- `x`: The value to round.

Returns: The result of rounding `x` to the nearest integer using the default rounding mode.

To be added.

## Half.Round(Half, Int32) method

```csharp
public static Half Round (Half x, int digits);
```

Rounds a value to a specified number of fractional-digits using the default rounding mode (`MidpointRounding.ToEven`).

Parameters:

- `x`: The value to round.
- `digits`: The number of fractional digits to which `x` should be rounded.

Returns: The result of rounding `x` to `digits` fractional-digits using the default rounding mode.

To be added.

## Half.Round(Half, MidpointRounding) method

```csharp
public static Half Round (Half x, MidpointRounding mode);
```

Rounds a value to the nearest integer using the specified rounding mode.

Parameters:

- `x`: The value to round.
- `mode`: The mode under which `x` should be rounded.

Returns: The result of rounding `x` to the nearest integer using `mode`.

To be added.

## Half.Round(Half, Int32, MidpointRounding) method

```csharp
public static Half Round (Half x, int digits, MidpointRounding mode);
```

Rounds a value to a specified number of fractional-digits using the default rounding mode (`MidpointRounding.ToEven`).

Parameters:

- `x`: The value to round.
- `digits`: The number of fractional digits to which `x` should be rounded.
- `mode`: The mode under which `x` should be rounded.

Returns: The result of rounding `x` to `digits` fractional-digits using `mode`.

To be added.

## Half.ScaleB(Half, Int32) method

```csharp
public static Half ScaleB (Half x, int n);
```

Computes the product of a value and its base-radix raised to the specified power.

Parameters:

- `x`: The value that base-radix raised to the power of `n` multiplies.
- `n`: The value to which base-radix is raised before multipliying `x`.

Returns: The product of `x` and base-radix raised to the power of `n`.

To be added.

## Half.Sign(Half) method

```csharp
public static int Sign (Half value);
```

Computes the sign of a value.

Parameters:

- `value`: The value whose sign is to be computed.

Returns: A positive value if `value` is positive, `INumberBase<T>.Zero` if `value` is zero, and a negative value if `value` is negative.

#### Remarks

It is recommended that a function return `1`, `0`, and `-1`, respectively.

## Half.Sin(Half) method

```csharp
public static Half Sin (Half x);
```

Computes the sine of a value.

Parameters:

- `x`: The value, in radians, whose sine is to be computed.

Returns: The sine of `x`.

#### Remarks

This computes `sin(x)`.

## Half.SinCos(Half) method

```csharp
public static (Half Sin, Half Cos) SinCos (Half x);
```

Computes the sine and cosine of a value.

Parameters:

- `x`: The value, in radians, whose sine and cosine are to be computed.

Returns: The sine and cosine of `x`.

#### Remarks

This computes `(sin(x), cos(x))`.

## Half.SinCosPi(Half) method

```csharp
public static (Half SinPi, Half CosPi) SinCosPi (Half x);
```

Computes the sine and cosine of a value that has been multiplied by `pi`.

Parameters:

- `x`: The value, in half-revolutions, that is multipled by `pi` before computing its sine and cosine.

Returns: The sine and cosine of`x` multiplied-by `pi`.

#### Remarks

This computes `(sin(x * π), cos(x * π))`.
