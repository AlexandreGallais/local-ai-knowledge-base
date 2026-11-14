---
title: "MathF class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MathF.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MathF class (part 2 of 2)

## MathF.Max(Single, Single) method

```csharp
public static float Max (float x, float y);
```

Returns the larger of two single-precision floating-point numbers.

Parameters:

- `x`: The first number to compare.
- `y`: The second number to compare.

Returns: The larger of `x` and `y`

To be added.

## MathF.MaxMagnitude(Single, Single) method

```csharp
public static float MaxMagnitude (float x, float y);
```

Returns the larger magnitude of two single-precision floating-point numbers.

Parameters:

- `x`: The first of two single-precision floating-point numbers to compare.
- `y`: The second of two single-precision floating-point numbers to compare.

Returns: Parameter `x` or `y`, whichever has the larger magnitude. If `x`, or `y`, or both `x` and `y` are equal to `Single.NaN`, `Single.NaN` is returned.

To be added.

## MathF.Min(Single, Single) method

```csharp
public static float Min (float x, float y);
```

Returns the smaller of two single-precision floating-point numbers.

Parameters:

- `x`: The first number to compare.
- `y`: The second number to compare.

Returns: The smaller of `x` and `y`

To be added.

## MathF.MinMagnitude(Single, Single) method

```csharp
public static float MinMagnitude (float x, float y);
```

Returns the smaller magnitude of two single-precision floating-point numbers.

Parameters:

- `x`: The first of two single-precision floating-point numbers to compare.
- `y`: The second of two single-precision floating-point numbers to compare.

Returns: Parameter `x` or `y`, whichever has the smaller magnitude. If `x`, or `y`, or both `x` and `y` are equal to `Single.NaN`, `Single.NaN` is returned.

To be added.

## MathF.Pow(Single, Single) method

```csharp
public static float Pow (float x, float y);
```

Returns a specified number raised to the specified power.

Parameters:

- `x`: The base number.
- `y`: The specified power.

Returns: `x` raised to the power of `y`

#### Remarks

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

## MathF.ReciprocalEstimate(Single) method

```csharp
public static float ReciprocalEstimate (float x);
```

Returns an estimate of the reciprocal of a specified number.

Parameters:

- `x`: The number whose reciprocal is to be estimated.

Returns: An estimate of the reciprocal of `x`.

#### Remarks

On x86/x64 hardware this may use the `RCPSS` instruction which has a maximum relative error of `1.5 * 2^-12`.

On ARM64 hardware this may use the `FRECPE` instruction which performs a single Newton-Raphson iteration.

On hardware without specialized support, this may just return `1.0 / x`.

## MathF.ReciprocalSqrtEstimate(Single) method

```csharp
public static float ReciprocalSqrtEstimate (float x);
```

Returns an estimate of the reciprocal square root of a specified number.

Parameters:

- `x`: The number whose reciprocal square root is to be estimated.

Returns: An estimate of the reciprocal square root `x`.

#### Remarks

On x86/x64 hardware this may use the `RSQRTSS` instruction which has a maximum relative error of `1.5 * 2^-12`.

On ARM64 hardware this may use the `FRSQRTE` instruction which performs a single Newton-Raphson iteration.

On hardware without specialized support, this may just return `1.0 / Sqrt(x)`.

## MathF.Round(Single) method

```csharp
public static float Round (float x);
```

Rounds a single-precision floating-point value to the nearest integral value, and rounds midpoint values to the nearest even number.

Parameters:

- `x`: The number to round.

Returns: The rounded representation of `x`

#### Remarks

This method uses the default rounding convention of `ToEven`.

If the value of the `x` argument is `NaN`, the method returns `NaN`. If `x` is `PositiveInfinity` or `NegativeInfinity`, the method returns `PositiveInfinity` or `NegativeInfinity`, respectively.

## MathF.Round(Single, Int32) method

```csharp
public static float Round (float x, int digits);
```

Rounds a single-precision floating-point value to a specified number of fractional digits, and rounds midpoint values to the nearest even number.

Parameters:

- `x`: The number to round.
- `digits`: How many fractional digits to keep.

Returns: The rounded representation of `x` with `digits` fractional digits

Exceptions:

- `ArgumentOutOfRangeException`: `digits` is less than 0. In .NET 10 and earlier, it is greater than 6.

#### Remarks

Starting in .NET 11, the `digits` argument can be any non-negative value. Values of 9 or greater leave the `Single` value unchanged. In .NET 10 and earlier, `digits` must be between 0 and 6.

This method uses the default rounding convention of `ToEven`.

If the value of the `x` argument is `NaN`, the method returns `NaN`. If `x` is `PositiveInfinity` or `NegativeInfinity`, the method returns `PositiveInfinity` or `NegativeInfinity`, respectively.

## MathF.Round(Single, MidpointRounding) method

```csharp
public static float Round (float x, MidpointRounding mode);
```

Rounds a single-precision floating-point value to an integer using the specified rounding convention.

Parameters:

- `x`: The number to round.
- `mode`: The rounding convention to use.

Returns: The rounded representation of `x` using `mode` rounding convention

Exceptions:

- `ArgumentException`: `mode` is not a valid value of `MidpointRounding`.

#### Remarks

If the value of the `x` argument is `NaN`, the method returns `NaN`. If `x` is `PositiveInfinity` or `NegativeInfinity`, the method returns `PositiveInfinity` or `NegativeInfinity`, respectively.

## MathF.Round(Single, Int32, MidpointRounding) method

```csharp
public static float Round (float x, int digits, MidpointRounding mode);
```

Rounds a single-precision floating-point value to a specified number of fractional digits using the specified rounding convention.

Parameters:

- `x`: The number to round.
- `digits`: How many fractional digits to keep.
- `mode`: The rounding convention to use.

Returns: The rounded representation of `x` with `digits` fractional digits using `mode` rounding convention

Exceptions:

- `ArgumentOutOfRangeException`: `digits` is less than 0. In .NET 10 and earlier, it is greater than 6.
- `ArgumentException`: `mode` is not a valid value of `MidpointRounding`.

#### Remarks

Starting in .NET 11, the `digits` argument can be any non-negative value. Values of 9 or greater leave the `Single` value unchanged. In .NET 10 and earlier, `digits` must be between 0 and 6.

If the value of the `x` argument is `NaN`, the method returns `NaN`. If `x` is `PositiveInfinity` or `NegativeInfinity`, the method returns `PositiveInfinity` or `NegativeInfinity`, respectively.

## MathF.ScaleB(Single, Int32) method

```csharp
public static float ScaleB (float x, int n);
```

Returns x * 2^n computed efficiently.

Parameters:

- `x`: A single-precision floating-point number that specifies the base value.
- `n`: A single-precision floating-point number that specifies the power.

Returns: x * 2^n computed efficiently.

To be added.

## MathF.Sign(Single) method

```csharp
public static int Sign (float x);
```

Returns an integer that indicates the sign of a single-precision floating-point number.

Parameters:

- `x`: The number check the sign of.

Returns: The sign of `x`

Exceptions:

- `ArithmeticException`: `x` is equal to `Single.NaN`.

#### Remarks
This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Sin(Single) method

```csharp
public static float Sin (float x);
```

Returns the sine of the specified angle.

Parameters:

- `x`: The angle to take the sine of.

Returns: The sine of `x`

#### Remarks
The angle, `x`, must be in radians. Multiply by `PI`/180 to convert degrees to radians.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.SinCos(Single) method

```csharp
public static (float Sin, float Cos) SinCos (float x);
```

Returns the sine and cosine of the specified angle.

Parameters:

- `x`: An angle, measured in radians.

Returns: The sine and cosine of `x`. If `x` is equal to `Single.NaN`, `Single.NegativeInfinity`, or `Single.PositiveInfinity`, this method returns `Single.NaN`.

#### Remarks
The angle, `x`, must be in radians. Multiply by `PI`/180 to convert degrees to radians.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Sinh(Single) method

```csharp
public static float Sinh (float x);
```

Returns the hyperbolic sine of the specified angle.

Parameters:

- `x`: The angle to take the hyperbolic sine of.

Returns: The hyperbolic sine of `x`

#### Remarks
The angle, `x`, must be in radians. Multiply by `PI`/180 to convert degrees to radians.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Sqrt(Single) method

```csharp
public static float Sqrt (float x);
```

Returns the square root of a specified number.

Parameters:

- `x`: The number to take the square root of.

Returns: The square root of `x`

To be added.

## MathF.Tan(Single) method

```csharp
public static float Tan (float x);
```

Returns the tangent of the specified angle.

Parameters:

- `x`: The angle to take the tangent of.

Returns: The tangent of `x`

#### Remarks
The angle, `x`, must be in radians. Multiply by `PI`/180 to convert degrees to radians.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Tanh(Single) method

```csharp
public static float Tanh (float x);
```

Returns the hyperbolic tangent of the specified angle.

Parameters:

- `x`: The angle to take the hyperbolic tangent of.

Returns: The hyperbolic tangent of `x`

#### Remarks
The angle, `x`, must be in radians. Multiply by `PI`/180 to convert degrees to radians.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Truncate(Single) method

```csharp
public static float Truncate (float x);
```

Calculates the integral part of a specified single-precision floating-point number.

Parameters:

- `x`: The number to truncate.

Returns: The truncated representation of `x`

#### Remarks

`MathF.Truncate` rounds `x` to the nearest integer towards zero.

## MathF.E field

```csharp
public const float E = 2.71828175;
```

Represents the natural logarithmic base, specified by the constant, e.

The value of this constant is 2.71828175.

## MathF.PI field

```csharp
public const float PI = 3.14159274;
```

Represents the ratio of the circumference of a circle to its diameter, specified by the constant, p.

The value of this field is 3.14159274.

## MathF.Tau field

```csharp
public const float Tau = 6.28318548;
```

Represents the number of radians in one turn, specified by the constant, τ.

To be added.
