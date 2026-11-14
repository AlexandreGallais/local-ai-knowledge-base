---
title: "MathF class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MathF.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MathF class

Namespace: `System`

```csharp
public static class MathF
```

Provides constants and static methods for trigonometric, logarithmic, and other common mathematical functions.

The static fields and methods of the `MathF` class correspond to those of the `Math` class, except that their parameters are of type `Single` rather than `Double`, and they return `Single` rather than `Double` values.

## MathF.Abs(Single) method

```csharp
public static float Abs (float x);
```

Returns the absolute value of a single-precision floating-point number.

Parameters:

- `x`: The number to take the absolute value of.

Returns: The absolute value of `x`

#### Remarks
The absolute value of a `Single` is its numeric value without its sign. For example, the absolute value of both 1.2e-03 and -1.2e03 is 1.2e03.

If `x` is equal to `NegativeInfinity` or `PositiveInfinity`, the return value is `PositiveInfinity`. If `x` is equal to `NaN`, the return value is `NaN`.

## MathF.Acos(Single) method

```csharp
public static float Acos (float x);
```

Returns the angle whose cosine is the specified number.

Parameters:

- `x`: The number to take the acos of.

Returns: The acos of `x`

#### Remarks
Multiply the return value by 180/`PI` to convert from radians to degrees.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Acosh(Single) method

```csharp
public static float Acosh (float x);
```

Returns the angle whose hyperbolic cosine is the specified number.

Parameters:

- `x`: A number representing a hyperbolic cosine, where `x` must be greater than or equal to 1, but less than or equal to `Single.PositiveInfinity`.

Returns: An angle, θ, measured in radians, such that 0 ≤ θ ≤ ∞.

-or-

`Single.NaN` if `x` < 1 or `x` equals `Single.NaN`.

#### Remarks
Multiply the return value by 180/`PI` to convert from radians to degrees.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Asin(Single) method

```csharp
public static float Asin (float x);
```

Returns the angle whose sine is the specified number.

Parameters:

- `x`: The number to take the asin of.

Returns: The asin of `x`

#### Remarks
A positive return value represents a counterclockwise angle from the x-axis; a negative return value represents a clockwise angle.

Multiply the return value by 180/`PI` to convert from radians to degrees.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Asinh(Single) method

```csharp
public static float Asinh (float x);
```

Returns the angle whose hyperbolic sine is the specified number.

Parameters:

- `x`: A number representing a hyperbolic sine, where `x` must be greater than or equal to `Single.NegativeInfinity`, but less than or equal to `Single.PositiveInfinity`.

Returns: An angle, θ, measured in radians.

-or-

`Single.NaN` if `x` equals `Single.NaN`.

#### Remarks
Multiply the return value by 180/`PI` to convert from radians to degrees.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Atan(Single) method

```csharp
public static float Atan (float x);
```

Returns the angle whose tangent is the specified number.

Parameters:

- `x`: The number to take the atan of.

Returns: The atan of `x`

#### Remarks
A positive return value represents a counterclockwise angle from the x-axis; a negative return value represents a clockwise angle.

Multiply the return value by 180/`PI` to convert from radians to degrees.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Atan2(Single, Single) method

```csharp
public static float Atan2 (float y, float x);
```

Returns the angle whose tangent is the quotient of two specified numbers.

Parameters:

- `y`: The first number.
- `x`: The second number.

Returns: The angle whose tangent is the quotient of `y` and `x`

#### Remarks
The return value is the angle in the Cartesian plane formed by the x-axis, and a vector starting from the origin, (0,0), and terminating at the point, (x,y).

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Atanh(Single) method

```csharp
public static float Atanh (float x);
```

Returns the angle whose hyperbolic tangent is the specified number.

Parameters:

- `x`: A number representing a hyperbolic tangent, where `x` must be greater than or equal to -1, but less than or equal to 1.

Returns: An angle, θ, measured in radians, such that -∞ < θ <-1, or 1 < θ < ∞.

-or-

`Single.NaN` if `x` < -1 or `x` > 1 or `x` equals `Single.NaN`.

#### Remarks
Multiply the return value by 180/`PI` to convert from radians to degrees.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.BitDecrement(Single) method

```csharp
public static float BitDecrement (float x);
```

Returns the largest value that compares less than a specified value.

Parameters:

- `x`: The value to decrement.

Returns: The largest value that compares less than `x`.

-or-

`Single.NegativeInfinity` if `x` is equals `Single.NegativeInfinity`.

-or-

`Single.NaN` if `x` equals `Single.NaN`.

To be added.

## MathF.BitIncrement(Single) method

```csharp
public static float BitIncrement (float x);
```

Returns the smallest value that compares greater than a specified value.

Parameters:

- `x`: The value to increment.

Returns: The smallest value that compares greater than `x`.

-or-

`Single.PositiveInfinity` if `x` equals `Single.PositiveInfinity`.

-or-

`Single.NaN` if `x` is equals `Single.NaN`.

To be added.

## MathF.Cbrt(Single) method

```csharp
public static float Cbrt (float x);
```

Returns the cube root of a specified number.

Parameters:

- `x`: The number whose cube root is to be found.

Returns: The cube root of `x`.

-or-

`Single.NaN` if `x` is equals `Single.NaN`.

#### Remarks
This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Ceiling(Single) method

```csharp
public static float Ceiling (float x);
```

Returns the smallest integral value that is greater than or equal to the specified single-precision floating-point number.

Parameters:

- `x`: The number to take the ceiling of.

Returns: The ceiling of `x`

#### Remarks
The behavior of this method follows IEEE Standard 754, section 4. This kind of rounding is sometimes called rounding toward positive infinity. In other words, if `x` is positive, the presence of any fractional component causes `x` to be rounded to the next highest integer. If `x` is negative, the rounding operation causes any fractional component of `x` to be discarded. The operation of this method differs from the `Floor` method, which supports rounding toward negative infinity.

## MathF.CopySign(Single, Single) method

```csharp
public static float CopySign (float x, float y);
```

Returns a value with the magnitude of `x` and the sign of `y`.

Parameters:

- `x`: A number whose magnitude is used in the result.
- `y`: A number whose sign is the used in the result.

Returns: A value with the magnitude of `x` and the sign of `y`.

To be added.

## MathF.Cos(Single) method

```csharp
public static float Cos (float x);
```

Returns the cosine of the specified angle.

Parameters:

- `x`: The angle to take the cosine of.

Returns: The cosine of `x`

#### Remarks
The angle, `x`, must be in radians. Multiply by `PI`/180 to convert degrees to radians.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Cosh(Single) method

```csharp
public static float Cosh (float x);
```

Returns the hyperbolic cosine of the specified angle.

Parameters:

- `x`: The angle to take the hyperbolic cosine of.

Returns: The hyperbolic cosine of `x`

#### Remarks
The angle, `x`, must be in radians. Multiply by `PI`/180 to convert degrees to radians.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Exp(Single) method

```csharp
public static float Exp (float x);
```

Returns e raised to the specified power.

Parameters:

- `x`: The number to raise e to.

Returns: e raised to the power of `x`

#### Remarks
`e` is a mathematical constant whose value is approximately 2.71828.

Use the `MathF.Pow` method to calculate powers of other bases.

`MathF.Exp` is the inverse of `MathF.Log`.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Floor(Single) method

```csharp
public static float Floor (float x);
```

Returns the largest integral value less than or equal to the specified single-precision floating-point number.

Parameters:

- `x`: The number to take the floor of.

Returns: The floor of `x`

#### Remarks
The behavior of this method follows IEEE Standard 754, section 4. This kind of rounding is sometimes called rounding toward negative infinity. In other words, if `x` is positive, any fractional component is truncated. If `x` is negative, the presence of any fractional component causes it to be rounded to the smaller integer. The operation of this method differs from the `MathF.Ceiling` method, which supports rounding toward positive infinity.

## MathF.FusedMultiplyAdd(Single, Single, Single) method

```csharp
public static float FusedMultiplyAdd (float x, float y, float z);
```

Returns (x * y) + z, rounded as one ternary operation.

Parameters:

- `x`: The number to be multiplied with `y`.
- `y`: The number to be multiplied with `x`.
- `z`: The number to be added to the result of `x` multiplied by `y`.

Returns: (x * y) + z, rounded as one ternary operation.

#### Remarks
This computes `(x * y)` as if to infinite precision, adds `z` to that result as if to infinite precision, and finally rounds to the nearest representable value.

This differs from the non-fused sequence, which would compute `(x * y)` as if to infinite preicision, round the result to the nearest representable value, add 'z' to the rounded result as if to infinite precision, and finally round to the nearest representable value.

## MathF.IEEERemainder(Single, Single) method

```csharp
public static float IEEERemainder (float x, float y);
```

Returns the remainder resulting from the division of a specified number by another specified number.

Parameters:

- `x`: The numerator
- `y`: The denominator

Returns: The result of dividing `x` by `y`

#### Remarks
This operation complies with the remainder operation defined in Section 5.1 of ANSI/IEEE Std 754-1985; IEEE Standard for Binary Floating-Point Arithmetic; Institute of Electrical and Electronics Engineers, Inc; 1985.

The `MathF.IEEERemainder` method is not the same as the remainder operator. Although both return the remainder after division, the formulas they use are different. The formula for the `MathF.IEEERemainder` method is:

```txt
IEEERemainder = dividend - (divisor * MathF.Round(dividend / divisor))
```

In contrast, the formula for the remainder operator is:

```txt
Remainder = (MathF.Abs(dividend) - (MathF.Abs(divisor) *
            (MathF.Floor(MathF.Abs(dividend) / MathF.Abs(divisor))))) *
            MathF.Sign(dividend)
```

## MathF.ILogB(Single) method

```csharp
public static int ILogB (float x);
```

Returns the base 2 integer logarithm of a specified number.

Parameters:

- `x`: The number whose logarithm is to be found.

Returns: One of the values in the following table.

-  Default

:  The base 2 integer log of `x`; that is, (int)log2(`x`).

-  Zero

: <see cref="F:System.Int32.MinValue">Int32.MinValue</see>
-  Equal to `Single.NaN` or `Single.PositiveInfinity` or `Single.NegativeInfinity`: <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>

#### Remarks
Parameter `x` is specified as a base 10 number.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Log(Single) method

```csharp
public static float Log (float x);
```

Returns the natural (base e) logarithm of a specified number.

Parameters:

- `x`: The number to take the natural log of.

Returns: The natural log of `x`

#### Remarks
Parameter `x` is specified as a base 10 number.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Log(Single, Single) method

```csharp
public static float Log (float x, float y);
```

Returns the logarithm of a specified number in a specified base.

Parameters:

- `x`: The number to take the log of.
- `y`: The base of the log

Returns: The log of `x` with base `y`

#### Remarks
This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Log10(Single) method

```csharp
public static float Log10 (float x);
```

Returns the base 10 logarithm of a specified number.

Parameters:

- `x`: The number to take the base 10 log of.

Returns: The base 10 log of `x`

#### Remarks
Parameter `x` is specified as a base 10 number.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## MathF.Log2(Single) method

```csharp
public static float Log2 (float x);
```

Returns the base 2 logarithm of a specified number.

Parameters:

- `x`: A number whose logarithm is to be found.

Returns: One of the values in the following table.

-  Positive

:  The base 2 log of `x`; that is, log 2`x`.

-  Zero

: `Single.NegativeInfinity`
-  Negative

: `Single.NaN`
-  Equal to `Single.NaN`: `Single.NaN`
-  Equal to `Single.PositiveInfinity`: `Single.PositiveInfinity`

#### Remarks
Parameter `x` is specified as a base 10 number.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.
