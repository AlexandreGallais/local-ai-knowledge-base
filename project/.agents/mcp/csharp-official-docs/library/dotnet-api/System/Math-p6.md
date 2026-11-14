---
title: "Math class (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Math.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Math class (part 6 of 7)

## Math.Round(Double, Int32, MidpointRounding) method

```csharp
public static double Round (double value, int digits, MidpointRounding mode);
```

Rounds a double-precision floating-point value to a specified number of fractional digits using the specified rounding convention.

Parameters:

- `value`: A double-precision floating-point number to be rounded.
- `digits`: The number of fractional digits in the return value.
- `mode`: One of the enumeration values that specifies which rounding strategy to use.

Returns: The number that has `digits` fractional digits that `value` is rounded to. If `value` has fewer fractional digits than `digits`, `value` is returned unchanged.

Exceptions:

- `ArgumentOutOfRangeException`: `digits` is less than 0. In .NET 10 and earlier, it is greater than 15.
- `ArgumentException`: `mode` is not a valid value of `MidpointRounding`.

#### Remarks

Starting in .NET 11, the `digits` argument can be any non-negative value. Values of 17 or greater leave the `Double` value unchanged. In .NET 10 and earlier, `digits` must be between 0 and 15.

See Midpoint values and rounding conventions for information about rounding numbers with midpoint values.

If the value of the `value` argument is `NaN`, the method returns `NaN`. If `value` is `PositiveInfinity` or `NegativeInfinity`, the method returns `PositiveInfinity` or `NegativeInfinity`, respectively.

#### Example

The following example demonstrates how to use the `Round` method with the `MidpointRounding` enumeration.

_Code sample not included: ~/snippets/csharp/System/Decimal/Round/mpr.cs._

## Math.ScaleB(Double, Int32) method

```csharp
public static double ScaleB (double x, int n);
```

Returns x * 2^n computed efficiently.

Parameters:

- `x`: A double-precision floating-point number that specifies the base value.
- `n`: A 32-bit integer that specifies the power.

Returns: x * 2^n computed efficiently.

#### Remarks
This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## Math.Sign(Decimal) method

```csharp
public static int Sign (decimal value);
```

Returns an integer that indicates the sign of a decimal number.

Parameters:

- `value`: A signed decimal number.

Returns: A number that indicates the sign of `value`, as shown in the following table.

-  -1

: `value` is less than zero.

-  0

: `value` is equal to zero.

-  1

: `value` is greater than zero.

#### Examples
The following example demonstrates how to use the `Sign` method to determine the sign of a `Decimal` value and display it to the console.

_Code sample not included: ~/snippets/csharp/System/Math/Sign/sign.cs._

## Math.Sign(Double) method

```csharp
public static int Sign (double value);
```

Returns an integer that indicates the sign of a double-precision floating-point number.

Parameters:

- `value`: A signed number.

Returns: A number that indicates the sign of `value`, as shown in the following table.

-  -1

: `value` is less than zero.

-  0

: `value` is equal to zero.

-  1

: `value` is greater than zero.

Exceptions:

- `ArithmeticException`: `value` is equal to `Double.NaN`.

#### Examples
The following example demonstrates how to use the `Sign` method to determine the sign of a `Double` value and display it to the console.

_Code sample not included: ~/snippets/csharp/System/Math/Sign/sign.cs._

## Math.Sign(Int16) method

```csharp
public static int Sign (short value);
```

Returns an integer that indicates the sign of a 16-bit signed integer.

Parameters:

- `value`: A signed number.

Returns: A number that indicates the sign of `value`, as shown in the following table.

-  -1

: `value` is less than zero.

-  0

: `value` is equal to zero.

-  1

: `value` is greater than zero.

#### Examples
The following example demonstrates how to use the `Sign` method to determine the sign of an `Int16` value and display it to the console.

_Code sample not included: ~/snippets/csharp/System/Math/Sign/sign.cs._

## Math.Sign(Int32) method

```csharp
public static int Sign (int value);
```

Returns an integer that indicates the sign of a 32-bit signed integer.

Parameters:

- `value`: A signed number.

Returns: A number that indicates the sign of `value`, as shown in the following table.

-  -1

: `value` is less than zero.

-  0

: `value` is equal to zero.

-  1

: `value` is greater than zero.

#### Examples
The following example demonstrates how to use the `Sign` method to determine the sign of an `Int32` value and display it to the console.

_Code sample not included: ~/snippets/csharp/System/Math/Sign/sign.cs._

## Math.Sign(Int64) method

```csharp
public static int Sign (long value);
```

Returns an integer that indicates the sign of a 64-bit signed integer.

Parameters:

- `value`: A signed number.

Returns: A number that indicates the sign of `value`, as shown in the following table.

-  -1

: `value` is less than zero.

-  0

: `value` is equal to zero.

-  1

: `value` is greater than zero.

#### Examples
The following example demonstrates how to use the `Sign` method to determine the sign of an `Int64` value and display it to the console.

_Code sample not included: ~/snippets/csharp/System/Math/Sign/sign.cs._

## Math.Sign(IntPtr) method

```csharp
public static int Sign (IntPtr value);
```

Returns an integer that indicates the sign of a native-sized signed integer.

Parameters:

- `value`: A signed number.

Returns: A number that indicates the sign of `value`, as shown in the following table.

-  -1

: `value` is less than zero.

-  0

: `value` is equal to zero.

-  1

: `value` is greater than zero.

#### Examples
The following example demonstrates how to use the `Sign` method to determine the sign of an `IntPtr` value and display it to the console.

_Code sample not included: ~/snippets/csharp/System/Math/Sign/sign.cs._

## Math.Sign(SByte) method

```csharp
public static int Sign (sbyte value);
```

Returns an integer that indicates the sign of an 8-bit signed integer.

Parameters:

- `value`: A signed number.

Returns: A number that indicates the sign of `value`, as shown in the following table.

-  -1

: `value` is less than zero.

-  0

: `value` is equal to zero.

-  1

: `value` is greater than zero.

#### Examples
The following example demonstrates how to use the `Sign` method to determine the sign of an `SByte` value and display it to the console.

_Code sample not included: ~/snippets/csharp/System/Math/Sign/sign.cs._

## Math.Sign(Single) method

```csharp
public static int Sign (float value);
```

Returns an integer that indicates the sign of a single-precision floating-point number.

Parameters:

- `value`: A signed number.

Returns: A number that indicates the sign of `value`, as shown in the following table.

-  -1

: `value` is less than zero.

-  0

: `value` is equal to zero.

-  1

: `value` is greater than zero.

Exceptions:

- `ArithmeticException`: `value` is equal to `Single.NaN`.

#### Examples
The following example demonstrates how to use the `Sign` method to determine the sign of a `Single` value and display it to the console.

_Code sample not included: ~/snippets/csharp/System/Math/Sign/sign.cs._

## Math.Sin(Double) method

```csharp
public static double Sin (double a);
```

Returns the sine of the specified angle.

Parameters:

- `a`: An angle, measured in radians.

Returns: The sine of `a`. If `a` is equal to `Double.NaN`, `Double.NegativeInfinity`, or `Double.PositiveInfinity`, this method returns `Double.NaN`.

#### Remarks
The angle, `a`, must be in radians. Multiply by `PI`/180 to convert degrees to radians.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

#### Examples
The following example uses `Math.Sin` to evaluate certain trigonometric identities for selected angles.

_Code sample not included: ~/snippets/csharp/System/Math/Cos/sincos.cs._

## Math.SinCos(Double) method

```csharp
public static (double Sin, double Cos) SinCos (double x);
```

Returns the sine and cosine of the specified angle.

Parameters:

- `x`: An angle, measured in radians.

Returns: The sine and cosine of `x`. If `x` is equal to `Double.NaN`, `Double.NegativeInfinity`, or `Double.PositiveInfinity`, this method returns `Double.NaN`.

#### Remarks
The angle, `x`, must be in radians. Multiply by `PI`/180 to convert degrees to radians.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

#### Examples
The following example uses `Math.SinCos` to evaluate certain trigonometric identities for selected angles.

_Code sample not included: ~/snippets/csharp/System/Math/Cos/sincos.cs._

## Math.Sinh(Double) method

```csharp
public static double Sinh (double value);
```

Returns the hyperbolic sine of the specified angle.

Parameters:

- `value`: An angle, measured in radians.

Returns: The hyperbolic sine of `value`. If `value` is equal to `Double.NegativeInfinity`, `Double.PositiveInfinity`, or `Double.NaN`, this method returns a `Double` equal to `value`.

#### Remarks
The angle, `value`, must be in radians. Multiply by `PI`/180 to convert degrees to radians.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

#### Examples
The following example uses `Math.Sinh` to evaluate certain hyperbolic identities for selected values.

_Code sample not included: ~/snippets/csharp/System/Math/Cosh/sinhcosh.cs._

## Math.Sqrt(Double) method

```csharp
public static double Sqrt (double d);
```

Returns the square root of a specified number.

Parameters:

- `d`: The number whose square root is to be found.

Returns: One of the values in the following table.

-  Zero or positive

:  The positive square root of `d`.

-  Negative

: `Double.NaN`
-  Equals `Double.NaN`: `Double.NaN`
-  Equals `Double.PositiveInfinity`: `Double.PositiveInfinity`

#### Examples

The square root of the area of a square represents the length of any side of the square. The following example displays the area of some cities in the United States and gives an impression of each city's size if it were represented by a square.

_Code sample not included: ~/snippets/csharp/System/Math/Sqrt/sqrt1.cs._

## Math.Tan(Double) method

```csharp
public static double Tan (double a);
```

Returns the tangent of the specified angle.

Parameters:

- `a`: An angle, measured in radians.

Returns: The tangent of `a`. If `a` is equal to `Double.NaN`, `Double.NegativeInfinity`, or `Double.PositiveInfinity`, this method returns `Double.NaN`.

#### Remarks
The angle, `a`, must be in radians. Multiply by `PI`/180 to convert degrees to radians.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

#### Examples
The following example demonstrates how to calculate the tangent of an angle and display it to the console.

_Code sample not included: ~/snippets/csharp/System/Math/Atan/atan.cs._

## Math.Tanh(Double) method

```csharp
public static double Tanh (double value);
```

Returns the hyperbolic tangent of the specified angle.

Parameters:

- `value`: An angle, measured in radians.

Returns: The hyperbolic tangent of `value`. If `value` is equal to `Double.NegativeInfinity`, this method returns -1. If value is equal to `Double.PositiveInfinity`, this method returns 1. If `value` is equal to `Double.NaN`, this method returns `Double.NaN`.

#### Remarks
The angle, `value`, must be in radians. Multiply by `PI`/180 to convert degrees to radians.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

#### Examples
The following example uses `Math.Tanh` to evaluate certain hyperbolic tangent identities for selected values.

_Code sample not included: ~/snippets/csharp/System/Math/Tanh/tanh.cs._

## Math.Truncate(Decimal) method

```csharp
public static decimal Truncate (decimal d);
```

Calculates the integral part of a specified decimal number.

Parameters:

- `d`: A number to truncate.

Returns: The integral part of `d`; that is, the number that remains after any fractional digits have been discarded.

#### Remarks
`Math.Truncate` rounds `d` to the nearest integer towards zero.

#### Examples
The following example calls the `Truncate` method to truncate both a positive and a negative `Decimal` value.

_Code sample not included: ~/snippets/csharp/System/Math/Truncate/Truncate1.cs._

## Math.Truncate(Double) method

```csharp
public static double Truncate (double d);
```

Calculates the integral part of a specified double-precision floating-point number.

Parameters:

- `d`: A number to truncate.

Returns: The integral part of `d`; that is, the number that remains after any fractional digits have been discarded, or one of the values listed in the following table.

- `Double.NaN`: `Double.NaN`
- `Double.NegativeInfinity`: `Double.NegativeInfinity`
- `Double.PositiveInfinity`: `Double.PositiveInfinity`

#### Remarks

`Math.Truncate` rounds `d` to the nearest integer towards zero.

Starting with Visual Basic 15.8, the performance of Double-to-integer conversion is optimized if you pass the value returned by the `Truncate` method to the any of the integral conversion functions, or if the Double value returned by `Truncate` is automatically converted to an integer with Option Strict set to Off. This optimization allows code to run faster -- up to twice as fast for code that does a large number of conversions to integer types. The following example illustrates such an optimized conversion:

```vb
Dim d As Double = 164.7194
Dim i As Integer = CInt(Math.Truncate(d))     ' Result: 164
```

#### Examples
The following example calls the `Truncate` method to truncate both a positive and a negative `Double` value.

_Code sample not included: ~/snippets/csharp/System/Math/Truncate/Truncate1.cs._

## Math.E field

```csharp
public const double E = 2.<example-card-number>;
```

Represents the natural logarithmic base, specified by the constant, `e`.

#### Remarks
The value of this field is 2.<example-card-number>.

#### Examples
The following example compares `E` with the value calculated from a power series.

_Code sample not included: ~/snippets/csharp/System/Math/E/efield.cs._
