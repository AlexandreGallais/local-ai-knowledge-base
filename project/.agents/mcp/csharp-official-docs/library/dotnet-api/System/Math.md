---
title: "Math class (part 1 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Math.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Math class

Namespace: `System`

```csharp
public static class Math
```

Provides constants and static methods for trigonometric, logarithmic, and other common mathematical functions.

#### Examples
The following example uses several mathematical and trigonometric functions from the `Math` class to calculate the inner angles of a trapezoid.

_Code sample not included: ~/snippets/csharp/System/Math/Overview/mathsample.cs._

## Math.Abs(Decimal) method

```csharp
public static decimal Abs (decimal value);
```

Returns the absolute value of a `Decimal` number.

Parameters:

- `value`: A number that is greater than or equal to <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see>, but less than or equal to <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

Returns: A decimal number, x, such that 0 ≤ x ≤ <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
The absolute value of a `Decimal` is its numeric value without its sign. For example, the absolute value of both 1.2 and -1.2 is 1.2.

#### Examples
The following example uses the `Abs` method to get the absolute value of a number of `Decimal` values.

_Code sample not included: ~/snippets/csharp/System/Math/Abs/Abs1.cs._

## Math.Abs(Double) method

```csharp
public static double Abs (double value);
```

Returns the absolute value of a double-precision floating-point number.

Parameters:

- `value`: A number that is greater than or equal to <see cref="F:System.Double.MinValue">Double.MinValue</see>, but less than or equal to <see cref="F:System.Double.MaxValue">Double.MaxValue</see>.

Returns: A double-precision floating-point number, x, such that 0 ≤ x ≤ <see cref="F:System.Double.MaxValue">Double.MaxValue</see>.

#### Remarks
The absolute value of a `Double` is its numeric value without its sign. For example, the absolute value of both 1.2e03 and -1.2e03 is 1.2e03.

If `value` is equal to `NegativeInfinity` or `PositiveInfinity`, the return value is `PositiveInfinity`. If `value` is equal to `NaN`, the return value is `NaN`.

#### Examples
The following example uses the `Abs` method to get the absolute value of a number of `Double` values.

_Code sample not included: ~/snippets/csharp/System/Math/Abs/abs2.cs._

## Math.Abs(Int16) method

```csharp
public static short Abs (short value);
```

Returns the absolute value of a 16-bit signed integer.

Parameters:

- `value`: A number that is greater than <see cref="F:System.Int16.MinValue">Int16.MinValue</see>, but less than or equal to <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

Returns: A 16-bit signed integer, x, such that 0 ≤ x ≤ <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

Exceptions:

- `OverflowException`: `value` equals <see cref="F:System.Int16.MinValue">Int16.MinValue</see>.

#### Remarks
The absolute value of an `Int16` is its numeric value without its sign. For example, the absolute value of both 123 and -123 is 123.

#### Examples
The following example uses the `Abs` method to get the absolute value of a number of `Int16` values.

_Code sample not included: ~/snippets/csharp/System/Math/Abs/abs3.cs._

## Math.Abs(Int32) method

```csharp
public static int Abs (int value);
```

Returns the absolute value of a 32-bit signed integer.

Parameters:

- `value`: A number that is greater than <see cref="F:System.Int32.MinValue">Int32.MinValue</see>, but less than or equal to <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

Returns: A 32-bit signed integer, x, such that 0 ≤ x ≤ <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

Exceptions:

- `OverflowException`: `value` equals <see cref="F:System.Int32.MinValue">Int32.MinValue</see>.

#### Remarks
The absolute value of an `Int32` is its numeric value without its sign. For example, the absolute value of both 123 and -123 is 123.

#### Examples
The following example uses the `Abs` method to get the absolute value of a number of `Int32` values.

_Code sample not included: ~/snippets/csharp/System/Math/Abs/abs4.cs._

## Math.Abs(Int64) method

```csharp
public static long Abs (long value);
```

Returns the absolute value of a 64-bit signed integer.

Parameters:

- `value`: A number that is greater than <see cref="F:System.Int64.MinValue">Int64.MinValue</see>, but less than or equal to <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

Returns: A 64-bit signed integer, x, such that 0 ≤ x ≤ <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

Exceptions:

- `OverflowException`: `value` equals <see cref="F:System.Int64.MinValue">Int64.MinValue</see>.

#### Remarks
The absolute value of an `Int64` is its numeric value without its sign. For example, the absolute value of both 123 and -123 is 123.

#### Examples
The following example uses the `Abs` method to get the absolute value of a number of `Int64` values.

_Code sample not included: ~/snippets/csharp/System/Math/Abs/abs5.cs._

## Math.Abs(IntPtr) method

```csharp
public static IntPtr Abs (IntPtr value);
```

Returns the absolute value of a native signed integer.

Parameters:

- `value`: A number that is greater than `IntPtr.MinValue`, but less than or equal to `IntPtr.MaxValue`.

Returns: A native signed integer, x, such that 0 ≤ x ≤ `IntPtr.MaxValue`.

To be added.

## Math.Abs(SByte) method

```csharp
public static sbyte Abs (sbyte value);
```

Returns the absolute value of an 8-bit signed integer.

Parameters:

- `value`: A number that is greater than <see cref="F:System.SByte.MinValue">SByte.MinValue</see>, but less than or equal to <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

Returns: An 8-bit signed integer, x, such that 0 ≤ x ≤ <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

Exceptions:

- `OverflowException`: `value` equals <see cref="F:System.SByte.MinValue">SByte.MinValue</see>.

#### Remarks
The absolute value of a signed byte is its numeric value without its sign. For example, the absolute value of both 12 and -12 is 12.

#### Examples
The following example uses the `Abs` method to get the absolute value of a number of `SByte` values.

_Code sample not included: ~/snippets/csharp/System/Math/Abs/abs6.cs._

## Math.Abs(Single) method

```csharp
public static float Abs (float value);
```

Returns the absolute value of a single-precision floating-point number.

Parameters:

- `value`: A number that is greater than or equal to <see cref="F:System.Single.MinValue">Single.MinValue</see>, but less than or equal to <see cref="F:System.Single.MaxValue">Single.MaxValue</see>.

Returns: A single-precision floating-point number, x, such that 0 ≤ x ≤ <see cref="F:System.Single.MaxValue">Single.MaxValue</see>.

#### Remarks
The absolute value of a `Single` is its numeric value without its sign. For example, the absolute value of both 1.2e-03 and -1.2e03 is 1.2e03.

If `value` is equal to `NegativeInfinity` or `PositiveInfinity`, the return value is `PositiveInfinity`. If `value` is equal to `NaN`, the return value is `NaN`.

#### Examples
The following example uses the `Abs` method to get the absolute value of a number of `Single` values.

_Code sample not included: ~/snippets/csharp/System/Math/Abs/abs7.cs._

## Math.Acos(Double) method

```csharp
public static double Acos (double d);
```

Returns the angle whose cosine is the specified number.

Parameters:

- `d`: A number representing a cosine, where `d` must be greater than or equal to -1, but less than or equal to 1.

Returns: An angle, θ, measured in radians, such that 0 ≤ θ ≤ π.

-or-

`Double.NaN` if `d` < -1 or `d` > 1 or `d` equals `Double.NaN`.

#### Remarks
Multiply the return value by 180/`PI` to convert from radians to degrees.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

#### Examples
The following example uses the `Math.Acos` method to assist in the computation of the inner angles of a given trapezoid.

_Code sample not included: ~/snippets/csharp/System/Math/Overview/mathsample.cs._

## Math.Acosh(Double) method

```csharp
public static double Acosh (double d);
```

Returns the angle whose hyperbolic cosine is the specified number.

Parameters:

- `d`: A number representing a hyperbolic cosine, where `d` must be greater than or equal to 1, but less than or equal to `Double.PositiveInfinity`.

Returns: An angle, θ, measured in radians, such that 0 ≤ θ ≤ ∞.

-or-

`Double.NaN` if `d` < 1 or `d` equals `Double.NaN`.

#### Remarks
Multiply the return value by 180/`PI` to convert from radians to degrees.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## Math.Asin(Double) method

```csharp
public static double Asin (double d);
```

Returns the angle whose sine is the specified number.

Parameters:

- `d`: A number representing a sine, where `d` must be greater than or equal to -1, but less than or equal to 1.

Returns: An angle, θ, measured in radians, such that -π/2 ≤ θ ≤ π/2.

-or-

`Double.NaN` if `d` < -1 or `d` > 1 or `d` equals `Double.NaN`.

#### Remarks
A positive return value represents a counterclockwise angle from the x-axis; a negative return value represents a clockwise angle.

Multiply the return value by 180/`PI` to convert from radians to degrees.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

#### Examples
The following example uses `Math.Asin` to assist in the computation of the inner angles of a given trapezoid.

_Code sample not included: ~/snippets/csharp/System/Math/Overview/mathsample.cs._

## Math.Asinh(Double) method

```csharp
public static double Asinh (double d);
```

Returns the angle whose hyperbolic sine is the specified number.

Parameters:

- `d`: A number representing a hyperbolic sine, where `d` must be greater than or equal to `Double.NegativeInfinity`, but less than or equal to `Double.PositiveInfinity`.

Returns: An angle, θ, measured in radians.

-or-

`Double.NaN` if `d` equals `Double.NaN`.

#### Remarks
Multiply the return value by 180/`PI` to convert from radians to degrees.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## Math.Atan(Double) method

```csharp
public static double Atan (double d);
```

Returns the angle whose tangent is the specified number.

Parameters:

- `d`: A number representing a tangent.

Returns: An angle, θ, measured in radians, such that -π/2 ≤ θ ≤ π/2.

-or-

`Double.NaN` if `d` equals `Double.NaN`, -π/2 rounded to double precision (-1.5707963267949) if `d` equals `Double.NegativeInfinity`, or π/2 rounded to double precision (1.5707963267949) if `d` equals `Double.PositiveInfinity`.

#### Remarks
A positive return value represents a counterclockwise angle from the x-axis; a negative return value represents a clockwise angle.

Multiply the return value by 180/`PI` to convert from radians to degrees.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

#### Examples
The following example demonstrates how to calculate the arctangent of a value and display it to the console.

_Code sample not included: ~/snippets/csharp/System/Math/Atan/atan.cs._

## Math.Atan2(Double, Double) method

```csharp
public static double Atan2 (double y, double x);
```

Returns the angle whose tangent is the quotient of two specified numbers.

Parameters:

- `y`: The y coordinate of a point.
- `x`: The x coordinate of a point.

Returns: An angle, θ, measured in radians, such that tan(θ) = `y` / `x`, where (`x`, `y`) is a point in the Cartesian plane. Observe the following:

- For (`x`, `y`) in quadrant 1, 0 < θ < π/2.

- For (`x`, `y`) in quadrant 2, π/2 < θ ≤ π.

- For (`x`, `y`) in quadrant 3, -π ≤ θ < -π/2.

- For (`x`, `y`) in quadrant 4, -π/2 < θ < 0.

For points on the boundaries of the quadrants, the return value is the following:

- If y is 0 and x is not negative, θ = 0.

- If y is 0 and x is negative, θ = π.

- If y is positive and x is 0, θ = π/2.

- If y is negative and x is 0, θ = -π/2.

- If y is 0 and x is 0, θ = 0.

If `x` or `y` is `Double.NaN`, or if `x` and `y` are either `Double.PositiveInfinity` or `Double.NegativeInfinity`, the method returns `Double.NaN`.

#### Remarks
The return value is the angle in the Cartesian plane formed by the x-axis, and a vector starting from the origin, (0,0), and terminating at the point, (x,y).

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

#### Examples
The following example demonstrates how to calculate the arctangent of an angle and a vector. The resulting value is displayed in the console.

_Code sample not included: ~/snippets/csharp/System/Math/Atan/atan.cs._

## Math.Atanh(Double) method

```csharp
public static double Atanh (double d);
```

Returns the angle whose hyperbolic tangent is the specified number.

Parameters:

- `d`: A number representing a hyperbolic tangent, where `d` must be greater than or equal to -1, but less than or equal to 1.

Returns: An angle, θ, measured in radians, such that -∞ < θ < -1, or 1 < θ < ∞.

-or-

`Double.NaN` if `d` < -1 or `d` > 1 or `d` equals `Double.NaN`.

#### Remarks
Multiply the return value by 180/`PI` to convert from radians to degrees.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## Math.BigMul(Int32, Int32) method

```csharp
public static long BigMul (int a, int b);
```

Produces the full product of two 32-bit numbers.

Parameters:

- `a`: The first number to multiply.
- `b`: The second number to multiply.

Returns: The number containing the product of the specified numbers.

#### Examples
The following example demonstrates the use of the `Math.BigMul` method to calculate the product of two integer values.

_Code sample not included: ~/snippets/csharp/System/Math/BigMul/bigmul.cs._

## Math.BigMul(Int64, Int64) method

```csharp
public static Int128 BigMul (long a, long b);
```

Produces the full product of two 64-bit numbers.

Parameters:

- `a`: The first number to multiply.
- `b`: The second number to multiply.

Returns: The full product of the specified numbers.

To be added.

## Math.BigMul(UInt32, UInt32) method

```csharp
public static ulong BigMul (uint a, uint b);
```

Produces the full product of two unsigned 32-bit numbers.

Parameters:

- `a`: The first number to multiply.
- `b`: The second number to multiply.

Returns: The number containing the product of the specified numbers.

To be added.
