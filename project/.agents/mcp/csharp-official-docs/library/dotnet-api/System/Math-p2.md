---
title: "Math class (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Math.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Math class (part 2 of 7)

## Math.BigMul(UInt64, UInt64) method

```csharp
public static UInt128 BigMul (ulong a, ulong b);
```

Produces the full product of two unsigned 64-bit numbers.

Parameters:

- `a`: The first number to multiply.
- `b`: The second number to multiply.

Returns: The full product of the specified numbers.

To be added.

## Math.BigMul(Int64, Int64, Int64) method

```csharp
public static long BigMul (long a, long b, out long low);
```

Produces the full product of two 64-bit numbers.

Parameters:

- `a`: The first number to multiply.
- `b`: The second number to multiply.
- `low`: When this method returns, contains the low 64-bit of the product of the specified numbers.

Returns: The high 64-bit of the product of the specified numbers.

To be added.

## Math.BigMul(UInt64, UInt64, UInt64) method

```csharp
public static ulong BigMul (ulong a, ulong b, out ulong low);
```

Produces the full product of two unsigned 64-bit numbers.

Parameters:

- `a`: The first number to multiply.
- `b`: The second number to multiply.
- `low`: When this method returns, contains the low 64-bit of the product of the specified numbers.

Returns: The high 64-bit of the product of the specified numbers.

To be added.

## Math.BitDecrement(Double) method

```csharp
public static double BitDecrement (double x);
```

Returns the largest value that compares less than a specified value.

Parameters:

- `x`: The value to decrement.

Returns: The largest value that compares less than `x`.

-or-

`Double.NegativeInfinity` if `x` equals `Double.NegativeInfinity`.

-or-

`Double.NaN` if `x` equals `Double.NaN`.

To be added.

## Math.BitIncrement(Double) method

```csharp
public static double BitIncrement (double x);
```

Returns the smallest value that compares greater than a specified value.

Parameters:

- `x`: The value to increment.

Returns: The smallest value that compares greater than `x`.

-or-

`Double.PositiveInfinity` if `x` equals `Double.PositiveInfinity`.

-or-

`Double.NaN` if `x` equals `Double.NaN`.

To be added.

## Math.Cbrt(Double) method

```csharp
public static double Cbrt (double d);
```

Returns the cube root of a specified number.

Parameters:

- `d`: The number whose cube root is to be found.

Returns: The cube root of `d`.

-or-

`Double.NaN` if `d` equals `Double.NaN`.

#### Remarks
This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## Math.Ceiling(Decimal) method

```csharp
public static decimal Ceiling (decimal d);
```

Returns the smallest integral value that is greater than or equal to the specified decimal number.

Parameters:

- `d`: A decimal number.

Returns: The smallest integral value that is greater than or equal to `d`. Note that this method returns a `Decimal` instead of an integral type.

#### Remarks
The behavior of this method follows IEEE Standard 754, section 4. This kind of rounding is sometimes called rounding toward positive infinity. In other words, if `d` is positive, the presence of any fractional component causes `d` to be rounded to the next highest integer. If `d` is negative, the rounding operation causes any fractional component of `d` to be discarded. The operation of this method differs from the `Floor` method, which supports rounding toward negative infinity.

#### Examples
The following example illustrates the `Ceiling` method and contrasts it with the `Floor` method.

_Code sample not included: ~/snippets/csharp/System/Math/Ceiling/Ceiling1.cs._

## Math.Ceiling(Double) method

```csharp
public static double Ceiling (double a);
```

Returns the smallest integral value that is greater than or equal to the specified double-precision floating-point number.

Parameters:

- `a`: A double-precision floating-point number.

Returns: The smallest integral value that is greater than or equal to `a`. If `a` is equal to `Double.NaN`, `Double.NegativeInfinity`, or `Double.PositiveInfinity`, that value is returned. Note that this method returns a `Double` instead of an integral type.

#### Remarks
The behavior of this method follows IEEE Standard 754, section 4. This kind of rounding is sometimes called rounding toward positive infinity. In other words, if `a` is positive, the presence of any fractional component causes `a` to be rounded to the next highest integer. If `a` is negative, the rounding operation causes any fractional component of `a` to be discarded. The operation of this method differs from the `Floor` method, which supports rounding toward negative infinity.

Starting with Visual Basic 15.8, the performance of Double-to-integer conversion is optimized if you pass the value returned by the `Ceiling` method to the any of the integral conversion functions, or if the Double value returned by `Ceiling` is automatically converted to an integer with Option Strict set to Off. This optimization allows code to run faster -- up to twice as fast for code that does a large number of conversions to integer types. The following example illustrates such optimized conversions:

```vb
Dim d1 As Double = 1043.75133
Dim i1 As Integer = CInt(Math.Ceiling(d1))        ' Result: 1044

Dim d2 As Double = 7968.4136
Dim i2 As Integer = CInt(Math.Ceiling(d2))        ' Result: 7969
```

#### Examples
The following example illustrates the `Ceiling` method and contrasts it with the `Floor` method.

_Code sample not included: ~/snippets/csharp/System/Math/Ceiling/Ceiling1.cs._

## Math.Clamp(Byte, Byte, Byte) method

```csharp
public static byte Clamp (byte value, byte min, byte max);
```

Returns `value` clamped to the inclusive range of `min` and `max`.

Parameters:

- `value`: The value to be clamped.
- `min`: The lower bound of the result.
- `max`: The upper bound of the result.

Returns: `value` if `min` ≤ `value` ≤ `max`.

-or-

`min` if `value` < `min`.

-or-

`max` if `max` < `value`.

Exceptions:

- `ArgumentException`: `max` is less than `min`.

To be added.

## Math.Clamp(Decimal, Decimal, Decimal) method

```csharp
public static decimal Clamp (decimal value, decimal min, decimal max);
```

Returns `value` clamped to the inclusive range of `min` and `max`.

Parameters:

- `value`: The value to be clamped.
- `min`: The lower bound of the result.
- `max`: The upper bound of the result.

Returns: `value` if `min` ≤ `value` ≤ `max`.

-or-

`min` if `value` <`min`.

-or-

`max` if `max` < `value`.

Exceptions:

- `ArgumentException`: `max` is less than `min`.

To be added.

## Math.Clamp(Double, Double, Double) method

```csharp
public static double Clamp (double value, double min, double max);
```

Returns `value` clamped to the inclusive range of `min` and `max`.

Parameters:

- `value`: The value to be clamped.
- `min`: The lower bound of the result.
- `max`: The upper bound of the result.

Returns: `value` if `min` ≤ `value` ≤ `max`.

-or-

`min` if `value` < `min`.

-or-

`max` if `max` < `value`.

-or-

`Double.NaN` if `value` equals `Double.NaN`.

Exceptions:

- `ArgumentException`: `max` is less than `min`.

To be added.

## Math.Clamp(Int16, Int16, Int16) method

```csharp
public static short Clamp (short value, short min, short max);
```

Returns `value` clamped to the inclusive range of `min` and `max`.

Parameters:

- `value`: The value to be clamped.
- `min`: The lower bound of the result.
- `max`: The upper bound of the result.

Returns: `value` if `min` ≤ `value` ≤ `max`.

-or-

`min` if `value` < `min`.

-or-

`max` if `max` < `value`.

Exceptions:

- `ArgumentException`: `max` is less than `min`.

To be added.

## Math.Clamp(Int32, Int32, Int32) method

```csharp
public static int Clamp (int value, int min, int max);
```

Returns `value` clamped to the inclusive range of `min` and `max`.

Parameters:

- `value`: The value to be clamped.
- `min`: The lower bound of the result.
- `max`: The upper bound of the result.

Returns: `value` if `min` ≤ `value` ≤ `max`.

-or-

`min` if `value` < `min`.

-or-

`max` if `max` < `value`.

Exceptions:

- `ArgumentException`: `max` is less than `min`.

To be added.

## Math.Clamp(Int64, Int64, Int64) method

```csharp
public static long Clamp (long value, long min, long max);
```

Returns `value` clamped to the inclusive range of `min` and `max`.

Parameters:

- `value`: The value to be clamped.
- `min`: The lower bound of the result.
- `max`: The upper bound of the result.

Returns: `value` if `min` ≤ `value` ≤ `max`.

-or-

`min` if `value` < `min`.

-or-

`max` if `max` < `value`.

Exceptions:

- `ArgumentException`: `max` is less than `min`.

To be added.

## Math.Clamp(IntPtr, IntPtr, IntPtr) method

```csharp
public static IntPtr Clamp (IntPtr value, IntPtr min, IntPtr max);
```

Returns `value` clamped to the inclusive range of `min` and `max`.

Parameters:

- `value`: The value to be clamped.
- `min`: The lower bound of the result.
- `max`: The upper bound of the result.

Returns: `value` if `min` ≤ `value` ≤ `max`.

-or-

`min` if `value` < `min`.

-or-

`max` if `max` < `value`.

Exceptions:

- `ArgumentException`: `max` is less than `min`.

To be added.

## Math.Clamp(SByte, SByte, SByte) method

```csharp
public static sbyte Clamp (sbyte value, sbyte min, sbyte max);
```

Returns `value` clamped to the inclusive range of `min` and `max`.

Parameters:

- `value`: The value to be clamped.
- `min`: The lower bound of the result.
- `max`: The upper bound of the result.

Returns: `value` if `min` ≤ `value` ≤ `max`.

-or-

`min` if `value` < `min`.

-or-

`max` if `max` < `value`.

Exceptions:

- `ArgumentException`: `max` is less than `min`.

To be added.

## Math.Clamp(Single, Single, Single) method

```csharp
public static float Clamp (float value, float min, float max);
```

Returns `value` clamped to the inclusive range of `min` and `max`.

Parameters:

- `value`: The value to be clamped.
- `min`: The lower bound of the result.
- `max`: The upper bound of the result.

Returns: `value` if `min` ≤ `value` ≤ `max`.

-or-

`min` if `value` < `min`.

-or-

`max` if `max` < `value`.

-or-

`Single.NaN` if `value` equals `Single.NaN`.

Exceptions:

- `ArgumentException`: `max` is less than `min`.

To be added.

## Math.Clamp(UInt16, UInt16, UInt16) method

```csharp
public static ushort Clamp (ushort value, ushort min, ushort max);
```

Returns `value` clamped to the inclusive range of `min` and `max`.

Parameters:

- `value`: The value to be clamped.
- `min`: The lower bound of the result.
- `max`: The upper bound of the result.

Returns: `value` if `min` ≤ `value` ≤ `max`.

-or-

`min` if `value` < `min`.

-or-

`max` if `max` < `value`.

Exceptions:

- `ArgumentException`: `max` is less than `min`.

To be added.

## Math.Clamp(UInt32, UInt32, UInt32) method

```csharp
public static uint Clamp (uint value, uint min, uint max);
```

Returns `value` clamped to the inclusive range of `min` and `max`.

Parameters:

- `value`: The value to be clamped.
- `min`: The lower bound of the result.
- `max`: The upper bound of the result.

Returns: `value` if `min` ≤ `value` ≤ `max`.

-or-

`min` if `value` < `min`.

-or-

`max` if `max` < `value`.

Exceptions:

- `ArgumentException`: `max` is less than `min`.

To be added.

## Math.Clamp(UInt64, UInt64, UInt64) method

```csharp
public static ulong Clamp (ulong value, ulong min, ulong max);
```

Returns `value` clamped to the inclusive range of `min` and `max`.

Parameters:

- `value`: The value to be clamped.
- `min`: The lower bound of the result.
- `max`: The upper bound of the result.

Returns: `value` if `min` ≤ `value` ≤ `max`.

-or-

`min` if `value` < `min`.

-or-

`max` if `max` < `value`.

Exceptions:

- `ArgumentException`: `max` is less than `min`.

To be added.

## Math.Clamp(UIntPtr, UIntPtr, UIntPtr) method

```csharp
public static UIntPtr Clamp (UIntPtr value, UIntPtr min, UIntPtr max);
```

Returns `value` clamped to the inclusive range of `min` and `max`.

Parameters:

- `value`: The value to be clamped.
- `min`: The lower bound of the result.
- `max`: The upper bound of the result.

Returns: `value` if `min` ≤ `value` ≤ `max`.

-or-

`min` if `value` < `min`.

-or-

`max` if `max` < `value`.

Exceptions:

- `ArgumentException`: `max` is less than `min`.

To be added.

## Math.CopySign(Double, Double) method

```csharp
public static double CopySign (double x, double y);
```

Returns a value with the magnitude of `x` and the sign of `y`.

Parameters:

- `x`: A number whose magnitude is used in the result.
- `y`: A number whose sign is the used in the result.

Returns: A value with the magnitude of `x` and the sign of `y`.

To be added.

## Math.Cos(Double) method

```csharp
public static double Cos (double d);
```

Returns the cosine of the specified angle.

Parameters:

- `d`: An angle, measured in radians.

Returns: The cosine of `d`. If `d` is equal to `Double.NaN`, `Double.NegativeInfinity`, or `Double.PositiveInfinity`, this method returns `Double.NaN`.

#### Remarks
The angle, `d`, must be in radians. Multiply by `PI`/180 to convert degrees to radians.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

#### Examples
The following example uses `Math.Cos` to evaluate certain trigonometric identities for selected angles.

_Code sample not included: ~/snippets/csharp/System/Math/Cos/sincos.cs._

## Math.Cosh(Double) method

```csharp
public static double Cosh (double value);
```

Returns the hyperbolic cosine of the specified angle.

Parameters:

- `value`: An angle, measured in radians.

Returns: The hyperbolic cosine of `value`. If `value` is equal to `Double.NegativeInfinity` or `Double.PositiveInfinity`, `Double.PositiveInfinity` is returned. If `value` is equal to `Double.NaN`, `Double.NaN` is returned.

#### Remarks
The angle, `value`, must be in radians. Multiply by `PI`/180 to convert degrees to radians.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

#### Examples
The following example uses `Math.Cosh` to evaluate certain hyperbolic identities for selected values.

_Code sample not included: ~/snippets/csharp/System/Math/Cosh/sinhcosh.cs._

## Math.DivRem(Byte, Byte) method

```csharp
public static (byte Quotient, byte Remainder) DivRem (byte left, byte right);
```

Produces the quotient and the remainder of two unsigned 8-bit numbers.

Parameters:

- `left`: The dividend.
- `right`: The divisor.

Returns: The quotient and the remainder of the specified numbers.

Exceptions:

- `DivideByZeroException`: `right` is zero.

To be added.
