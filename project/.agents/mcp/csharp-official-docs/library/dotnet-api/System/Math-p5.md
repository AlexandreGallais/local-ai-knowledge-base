---
title: "Math class (part 5 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Math.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Math class (part 5 of 7)

## Math.Pow(Double, Double) method

```csharp
public static double Pow (double x, double y);
```

Returns a specified number raised to the specified power.

Parameters:

- `x`: A double-precision floating-point number to be raised to a power.
- `y`: A double-precision floating-point number that specifies a power.

Returns: The number `x` raised to the power `y`.

The following table indicates the return value when various values or ranges of values are specified for the `x` and `y` parameters. For more information, see `PositiveInfinity`, `NegativeInfinity`, and `NaN`.

| x                              | y                                        | Return value                             |
| ------------------------------ | ---------------------------------------- | ---------------------------------------- |
| Any value except `NaN`         | ±0                                       | 1                                        |
| `NaN`                          | ±0                                       | 1\*            |
| `NaN`                          | Any value except 0                       | `NaN`\*                                  |
| ±0                             | < 0 and an odd integer                   | `NegativeInfinity` or `PositiveInfinity` |
| ±0                             | `NegativeInfinity`                       | `PositiveInfinity`                       |
| ±0                             | `PositiveInfinity`                       | +0                                       |
| ±0                             | > 0 and an odd integer                   | ±0                                       |
| -1                             | `NegativeInfinity` or `PositiveInfinity` | 1                                        |
| +1                             | Any value except `NaN`                   | 1                                        |
| +1                             | `NaN`                                    | 1\*            |
| Any value except 1             | `NaN`                                    | `NaN`\*                                  |
| -1 < x < 1                     | `PositiveInfinity`                       | +0                                       |
| < -1 or > 1                    | `PositiveInfinity`                       | `PositiveInfinity`                       |
| -1 < x < 1                     | `NegativeInfinity`                       | `PositiveInfinity`                       |
| < -1 or > 1                    | `NegativeInfinity`                       | +0                                       |
| `PositiveInfinity`             | < 0                                      | +0                                       |
| `PositiveInfinity`             | > 0                                      | `PositiveInfinity`                       |
| `NegativeInfinity`             | < 0 and finite and odd integer           | -0                                       |
| `NegativeInfinity`             | > 0 and finite and odd integer           | `NegativeInfinity`                       |
| `NegativeInfinity`             | < 0 and finite and not an odd integer    | +0                                       |
| `NegativeInfinity`             | > 0 and finite and not an odd integer    | `PositiveInfinity`                       |
| ±0                             | < 0 and finite and not an odd integer    | `PositiveInfinity`                       |
| ±0                             | > 0 and finite and not an odd integer    | +0                                       |
| < 0 but not `NegativeInfinity` | Finite non-integer                       | `NaN`                                    |

\* These rows don't appear in the full set of rules for `pow` as defined by the IEEE Standard for Floating-Point Arithmetic. They're included here because .NET disables IEEE 754 floating-point exceptions and thus doesn't differentiate between `qNaN` (quiet NaN) and `sNaN` (signalling NaN). The IEEE 754 specification allows this exception disablement.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

#### Examples

The following example uses the `Math.Pow` method to calculate the value that results from raising 2 to a power ranging from 0 to 32.

_Code sample not included: ~/snippets/csharp/System/Math/Pow/pow1.cs._

## Math.ReciprocalEstimate(Double) method

```csharp
public static double ReciprocalEstimate (double d);
```

Returns an estimate of the reciprocal of a specified number.

Parameters:

- `d`: The number whose reciprocal is to be estimated.

Returns: An estimate of the reciprocal of `d`.

#### Remarks

On ARM64 hardware this may use the `FRECPE` instruction which performs a single Newton-Raphson iteration.

On hardware without specialized support, this may just return `1.0 / d`.

## Math.ReciprocalSqrtEstimate(Double) method

```csharp
public static double ReciprocalSqrtEstimate (double d);
```

Returns an estimate of the reciprocal square root of a specified number.

Parameters:

- `d`: The number whose reciprocal square root is to be estimated.

Returns: An estimate of the reciprocal square root `d`.

#### Remarks

On ARM64 hardware this may use the `FRSQRTE` instruction which performs a single Newton-Raphson iteration.

On hardware without specialized support, this may just return `1.0 / Sqrt(d)`.

## Math.Round(Decimal) method

```csharp
public static decimal Round (decimal d);
```

Rounds a decimal value to the nearest integral value, and rounds midpoint values to the nearest even number.

Parameters:

- `d`: A decimal number to be rounded.

Returns: The integer nearest the `d` parameter. If the fractional component of `d` is halfway between two integers, one of which is even and the other odd, the even number is returned. Note that this method returns a `Decimal` instead of an integral type.

Exceptions:

- `OverflowException`: The result is outside the range of a `Decimal`.

#### Remarks

This method uses the default rounding convention of `ToEven`. For information about rounding numbers with midpoint values, see Midpoint values and rounding conventions.

#### Examples

The following example demonstrates the `Round` method. The `Decimal` value of 4.5 rounds to 4 rather than 5, because this overload uses the default `ToEven` convention.

_Code sample not included: ~/snippets/csharp/System/Math/Round/rounddecimal1.cs._

## Math.Round(Double) method

```csharp
public static double Round (double a);
```

Rounds a double-precision floating-point value to the nearest integral value, and rounds midpoint values to the nearest even number.

Parameters:

- `a`: A double-precision floating-point number to be rounded.

Returns: The integer nearest `a`. If the fractional component of `a` is halfway between two integers, one of which is even and the other odd, then the even number is returned. Note that this method returns a `Double` instead of an integral type.

#### Remarks

This method uses the default rounding convention of `ToEven`. For information about rounding numbers with midpoint values, see Midpoint values and rounding conventions.

If the value of the `a` argument is `NaN`, the method returns `NaN`. If `a` is `PositiveInfinity` or `NegativeInfinity`, the method returns `PositiveInfinity` or `NegativeInfinity`, respectively.

Starting with Visual Basic 15.8, the performance of Double-to-integer conversion is optimized if you pass the value returned by the `Round` method to the any of the integral conversion functions, or if the Double value returned by `Round` is automatically converted to an integer with Option Strict set to Off. This optimization allows code to run faster -- up to twice as fast for code that does a large number of conversions to integer types. The following example illustrates such optimized conversions:

```vb
Dim d1 As Double = 1043.75133
Dim i1 As Integer = CInt(Math.Ceiling(d1))        ' Result: 1044

Dim d2 As Double = 7968.4136
Dim i2 As Integer = CInt(Math.Ceiling(d2))        ' Result: 7968
```

#### Example

The following example demonstrates rounding to the nearest integer value.

_Code sample not included: ~/snippets/csharp/System/Math/Round/source.cs._

## Math.Round(Decimal, Int32) method

```csharp
public static decimal Round (decimal d, int decimals);
```

Rounds a decimal value to a specified number of fractional digits, and rounds midpoint values to the nearest even number.

Parameters:

- `d`: A decimal number to be rounded.
- `decimals`: The number of decimal places in the return value.

Returns: The number nearest to `d` that contains a number of fractional digits equal to `decimals`.

Exceptions:

- `ArgumentOutOfRangeException`: `decimals` is less than 0 or greater than 28.
- `OverflowException`: The result is outside the range of a `Decimal`.

#### Remarks

The value of the `decimals` argument can range from 0 to 28.

This method uses the default rounding convention of `ToEven`. For information about rounding numbers with midpoint values, see Midpoint values and rounding conventions.

#### Example

The following example rounds decimal values with two fractional digits to values that have a single fractional digit.

_Code sample not included: ~/snippets/csharp/System/Decimal/Round/source.cs._

## Math.Round(Decimal, MidpointRounding) method

```csharp
public static decimal Round (decimal d, MidpointRounding mode);
```

Rounds a decimal value an integer using the specified rounding convention.

Parameters:

- `d`: A decimal number to be rounded.
- `mode`: One of the enumeration values that specifies which rounding strategy to use.

Returns: The integer that `d` is rounded to. This method returns a `Decimal` instead of an integral type.

Exceptions:

- `ArgumentException`: `mode` is not a valid value of `MidpointRounding`.
- `OverflowException`: The result is outside the range of a `Decimal`.

#### Remarks

For information about rounding numbers with midpoint values, see Midpoint values and rounding conventions.

#### Example

The following example displays values returned by the `Round` method with different `mode` values.

_Code sample not included: ~/snippets/csharp/System/Decimal/Round/midpoint1.cs._

## Math.Round(Double, Int32) method

```csharp
public static double Round (double value, int digits);
```

Rounds a double-precision floating-point value to a specified number of fractional digits, and rounds midpoint values to the nearest even number.

Parameters:

- `value`: A double-precision floating-point number to be rounded.
- `digits`: The number of fractional digits in the return value.

Returns: The number nearest to `value` that contains a number of fractional digits equal to `digits`.

Exceptions:

- `ArgumentOutOfRangeException`: `digits` is less than 0. In .NET 10 and earlier, it is greater than 15.

#### Remarks

Starting in .NET 11, the `digits` argument can be any non-negative value. Values of 17 or greater leave the `Double` value unchanged. In .NET 10 and earlier, `digits` must be between 0 and 15.

This method uses the default rounding convention of `ToEven`. See Midpoint values and rounding conventions for information about rounding numbers with midpoint values.

If the value of the `value` argument is `NaN`, the method returns `NaN`. If `value` is `PositiveInfinity` or `NegativeInfinity`, the method returns `PositiveInfinity` or `NegativeInfinity`, respectively.

#### Example

The following example rounds double values with two fractional digits to doubles that have a single fractional digit.

_Code sample not included: ~/snippets/csharp/System/Math/Round/source1.cs._

## Math.Round(Double, MidpointRounding) method

```csharp
public static double Round (double value, MidpointRounding mode);
```

Rounds a double-precision floating-point value to an integer using the specified rounding convention.

Parameters:

- `value`: A double-precision floating-point number to be rounded.
- `mode`: One of the enumeration values that specifies which rounding strategy to use.

Returns: The integer that `value` is rounded to. This method returns a `Double` instead of an integral type.

Exceptions:

- `ArgumentException`: `mode` is not a valid value of `MidpointRounding`.

#### Remarks

See Midpoint values and rounding conventions for information about rounding numbers with midpoint values.

If the value of the `value` argument is `NaN`, the method returns `NaN`. If `value` is `PositiveInfinity` or `NegativeInfinity`, the method returns `PositiveInfinity` or `NegativeInfinity`, respectively.

#### Example

The following example displays values returned by the `Round` method with different `mode` values.

_Code sample not included: ~/snippets/csharp/System/Decimal/Round/midpoint2.cs._

## Math.Round(Decimal, Int32, MidpointRounding) method

```csharp
public static decimal Round (decimal d, int decimals, MidpointRounding mode);
```

Rounds a decimal value to a specified number of fractional digits using the specified rounding convention.

Parameters:

- `d`: A decimal number to be rounded.
- `decimals`: The number of decimal places in the return value.
- `mode`: One of the enumeration values that specifies which rounding strategy to use.

Returns: The number with `decimals` fractional digits that `d` is rounded to. If `d` has fewer fractional digits than `decimals`, `d` is returned unchanged.

Exceptions:

- `ArgumentOutOfRangeException`: `decimals` is less than 0 or greater than 28.
- `ArgumentException`: `mode` is not a valid value of `MidpointRounding`.
- `OverflowException`: The result is outside the range of a `Decimal`.

#### Remarks

See Midpoint values and rounding conventions for information about rounding numbers with midpoint values.

The value of the `decimals` argument can range from 0 to 28.

#### Example

The following example demonstrates how to use the `Math.Round` method with the `MidpointRounding` enumeration.

_Code sample not included: ~/snippets/csharp/System/Decimal/Round/mpr.cs._
