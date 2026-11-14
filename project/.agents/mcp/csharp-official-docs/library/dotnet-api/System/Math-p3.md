---
title: "Math class (part 3 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Math.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Math class (part 3 of 7)

## Math.DivRem(Int16, Int16) method

```csharp
public static (short Quotient, short Remainder) DivRem (short left, short right);
```

Produces the quotient and the remainder of two signed 16-bit numbers.

Parameters:

- `left`: The dividend.
- `right`: The divisor.

Returns: The quotient and the remainder of the specified numbers.

To be added.

## Math.DivRem(Int32, Int32) method

```csharp
public static (int Quotient, int Remainder) DivRem (int left, int right);
```

Produces the quotient and the remainder of two signed 32-bit numbers.

Parameters:

- `left`: The dividend.
- `right`: The divisor.

Returns: The quotient and the remainder of the specified numbers.

Exceptions:

- `DivideByZeroException`: `right` is zero.
- `OverflowException`: `left` is <see cref="F:System.Int32.MinValue">Int32.MinValue</see> and `right` is -1.

To be added.

## Math.DivRem(Int64, Int64) method

```csharp
public static (long Quotient, long Remainder) DivRem (long left, long right);
```

Produces the quotient and the remainder of two signed 64-bit numbers.

Parameters:

- `left`: The dividend.
- `right`: The divisor.

Returns: The quotient and the remainder of the specified numbers.

Exceptions:

- `DivideByZeroException`: `right` is zero.
- `OverflowException`: `left` is <see cref="F:System.Int64.MinValue">Int64.MinValue</see> and `right` is -1.

To be added.

## Math.DivRem(IntPtr, IntPtr) method

```csharp
public static (IntPtr Quotient, IntPtr Remainder) DivRem (IntPtr left, IntPtr right);
```

Produces the quotient and the remainder of two signed native-size numbers.

Parameters:

- `left`: The dividend.
- `right`: The divisor.

Returns: The quotient and the remainder of the specified numbers.

Exceptions:

- `DivideByZeroException`: `right` is zero.
- `OverflowException`: `left` is <see cref="F:System.IntPtr.MinValue">IntPtr.MinValue</see> and `right` is -1.

To be added.

## Math.DivRem(SByte, SByte) method

```csharp
public static (sbyte Quotient, sbyte Remainder) DivRem (sbyte left, sbyte right);
```

Produces the quotient and the remainder of two signed 8-bit numbers.

Parameters:

- `left`: The dividend.
- `right`: The divisor.

Returns: The quotient and the remainder of the specified numbers.

Exceptions:

- `DivideByZeroException`: `right` is zero.

To be added.

## Math.DivRem(UInt16, UInt16) method

```csharp
public static (ushort Quotient, ushort Remainder) DivRem (ushort left, ushort right);
```

Produces the quotient and the remainder of two unsigned 16-bit numbers.

Parameters:

- `left`: The dividend.
- `right`: The divisor.

Returns: The quotient and the remainder of the specified numbers.

Exceptions:

- `DivideByZeroException`: `right` is zero.

To be added.

## Math.DivRem(UInt32, UInt32) method

```csharp
public static (uint Quotient, uint Remainder) DivRem (uint left, uint right);
```

Produces the quotient and the remainder of two unsigned 32-bit numbers.

Parameters:

- `left`: The dividend.
- `right`: The divisor.

Returns: The quotient and the remainder of the specified numbers.

Exceptions:

- `DivideByZeroException`: `right` is zero.

To be added.

## Math.DivRem(UInt64, UInt64) method

```csharp
public static (ulong Quotient, ulong Remainder) DivRem (ulong left, ulong right);
```

Produces the quotient and the remainder of two unsigned 64-bit numbers.

Parameters:

- `left`: The dividend.
- `right`: The divisor.

Returns: The quotient and the remainder of the specified numbers.

Exceptions:

- `DivideByZeroException`: `right` is zero.

To be added.

## Math.DivRem(UIntPtr, UIntPtr) method

```csharp
public static (UIntPtr Quotient, UIntPtr Remainder) DivRem (UIntPtr left, UIntPtr right);
```

Produces the quotient and the remainder of two unsigned native-size numbers.

Parameters:

- `left`: The dividend.
- `right`: The divisor.

Returns: The quotient and the remainder of the specified numbers.

Exceptions:

- `DivideByZeroException`: `right` is zero.

To be added.

## Math.DivRem(Int32, Int32, Int32) method

```csharp
public static int DivRem (int a, int b, out int result);
```

Calculates the quotient of two 32-bit signed integers and also returns the remainder in an output parameter.

Parameters:

- `a`: The dividend.
- `b`: The divisor.
- `result`: When this method returns, contains the remainder.

Returns: The quotient of the specified numbers.

Exceptions:

- `DivideByZeroException`: `b` is zero.
- `OverflowException`: `a` is <see cref="F:System.Int32.MinValue">Int32.MinValue</see> and `b` is -1.

#### Remarks
The remainder value equals the result of the remainder operator.

#### Examples
The following example demonstrates the `DivRem` method.

_Code sample not included: ~/snippets/csharp/System/Math/DivRem/divrem1.cs._

## Math.DivRem(Int64, Int64, Int64) method

```csharp
public static long DivRem (long a, long b, out long result);
```

Calculates the quotient of two 64-bit signed integers and also returns the remainder in an output parameter.

Parameters:

- `a`: The dividend.
- `b`: The divisor.
- `result`: When this method returns, contains the remainder.

Returns: The quotient of the specified numbers.

Exceptions:

- `DivideByZeroException`: `b` is zero.
- `OverflowException`: `a` is <see cref="F:System.Int64.MinValue">Int64.MinValue</see> and `b` is -1.

#### Remarks
The remainder value equals the result of the remainder operator.

#### Examples
The following example demonstrates the `DivRem` method.

_Code sample not included: ~/snippets/csharp/System/Math/DivRem/divrem2.cs._

## Math.Exp(Double) method

```csharp
public static double Exp (double d);
```

Returns `e` raised to the specified power.

Parameters:

- `d`: A number specifying a power.

Returns: The number `e` raised to the power `d`. If `d` equals `Double.NaN` or `Double.PositiveInfinity`, that value is returned. If `d` equals `Double.NegativeInfinity`, 0 is returned.

#### Remarks
`e` is a mathematical constant whose value is approximately 2.71828.

Use the `Math.Pow` method to calculate powers of other bases.

`Math.Exp` is the inverse of `Math.Log`.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

#### Examples
The following example uses `Math.Exp` to evaluate certain exponential and logarithmic identities for selected values.

_Code sample not included: ~/snippets/csharp/System/Math/Exp/exp.cs._

## Math.Floor(Decimal) method

```csharp
public static decimal Floor (decimal d);
```

Returns the largest integral value less than or equal to the specified decimal number.

Parameters:

- `d`: A decimal number.

Returns: The largest integral value less than or equal to `d`.  Note that the method returns an integral value of type `Decimal`.

#### Remarks
The behavior of this method follows IEEE Standard 754, section 4. This kind of rounding is sometimes called rounding toward negative infinity. In other words, if `d` is positive, any fractional component is truncated. If `d` is negative, the presence of any fractional component causes it to be rounded to the smaller integer. The operation of this method differs from the `Math.Ceiling` method, which supports rounding toward positive infinity.

#### Examples
The following example illustrates the `Floor` method and contrasts it with the `Ceiling` method.

_Code sample not included: ~/snippets/csharp/System/Math/Ceiling/Ceiling1.cs._

## Math.Floor(Double) method

```csharp
public static double Floor (double d);
```

Returns the largest integral value less than or equal to the specified double-precision floating-point number.

Parameters:

- `d`: A double-precision floating-point number.

Returns: The largest integral value less than or equal to `d`. If `d` is equal to `Double.NaN`, `Double.NegativeInfinity`, or `Double.PositiveInfinity`, that value is returned.

#### Remarks
The behavior of this method follows IEEE Standard 754, section 4. This kind of rounding is sometimes called rounding toward negative infinity. In other words, if `d` is positive, any fractional component is truncated. If `d` is negative, the presence of any fractional component causes it to be rounded to the smaller integer. The operation of this method differs from the `Math.Ceiling` method, which supports rounding toward positive infinity.

Starting with Visual Basic 15.8, the performance of Double-to-integer conversion is optimized if you pass the value returned by the `Floor` method to the any of the integral conversion functions, or if the Double value returned by `Floor` is automatically converted to an integer with Option Strict set to Off. This optimization allows code to run faster -- up to twice as fast for code that does a large number of conversions to integer types. The following example illustrates such optimized conversions:

```vb
Dim d1 As Double = 1043.75133
Dim i1 As Integer = CInt(Math.Floor(d1))        ' Result: 1043

Dim d2 As Double = 7968.4136
Dim i2 As Integer = CInt(Math.Floor(d2))        ' Result: 7968
```

#### Examples
The following example illustrates the `Floor` method and contrasts it with the `Ceiling` method.

_Code sample not included: ~/snippets/csharp/System/Math/Ceiling/Ceiling1.cs._

## Math.FusedMultiplyAdd(Double, Double, Double) method

```csharp
public static double FusedMultiplyAdd (double x, double y, double z);
```

Returns (x * y) + z, rounded as one ternary operation.

Parameters:

- `x`: The number to be multiplied with `y`.
- `y`: The number to be multiplied with `x`.
- `z`: The number to be added to the result of `x` multiplied by `y`.

Returns: (x * y) + z, rounded as one ternary operation.

#### Remarks
This computes `(x * y)` as if to infinite precision, adds `z` to that result as if to infinite precision, and finally rounds to the nearest representable value.

This differs from the non-fused sequence, which would compute `(x * y)` as if to infinite precision, round the result to the nearest representable value, add `z` to the rounded result as if to infinite precision, and finally round to the nearest representable value.

## Math.IEEERemainder(Double, Double) method

```csharp
public static double IEEERemainder (double x, double y);
```

Returns the remainder resulting from the division of a specified number by another specified number.

Parameters:

- `x`: A dividend.
- `y`: A divisor.

Returns: A number equal to `x` - (`y` Q), where Q is the quotient of `x` / `y` rounded to the nearest integer (if `x` / `y` falls halfway between two integers, the even integer is returned).

If `x` - (`y` Q) is zero, the value +0 is returned if `x` is positive, or -0 if `x` is negative.

If `y` = 0, `Double.NaN` is returned.

#### Remarks
This operation complies with the remainder operation defined in Section 5.1 of ANSI/IEEE Std 754-1985; IEEE Standard for Binary Floating-Point Arithmetic; Institute of Electrical and Electronics Engineers, Inc; 1985.

The `Math.IEEERemainder` method is not the same as the remainder operator. Although both return the remainder after division, the formulas they use are different. The formula for the `Math.IEEERemainder` method is:

```txt
IEEERemainder = dividend - (divisor * Math.Round(dividend / divisor))
```

In contrast, the formula for the remainder operator is:

```txt
Remainder = (Math.Abs(dividend) - (Math.Abs(divisor) *
            (Math.Floor(Math.Abs(dividend) / Math.Abs(divisor))))) *
            Math.Sign(dividend)
```

#### Examples
The following example contrasts the remainder returned by the `Math.IEEERemainder` method with the remainder returned by the remainder operator.

_Code sample not included: ~/snippets/csharp/System/Math/IEEERemainder/ieeeremainder1.cs._

## Math.ILogB(Double) method

```csharp
public static int ILogB (double x);
```

Returns the base 2 integer logarithm of a specified number.

Parameters:

- `x`: The number whose logarithm is to be found.

Returns: One of the values in the following table.

-  Default

:  The base 2 integer log of `x`; that is, (int)log2(`x`).

-  Zero

: <see cref="F:System.Int32.MinValue">Int32.MinValue</see>
-  Equal to `Double.NaN` or `Double.PositiveInfinity` or `Double.NegativeInfinity`: <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>

#### Remarks
Parameter `x` is specified as a base 10 number.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## Math.Log(Double) method

```csharp
public static double Log (double d);
```

Returns the natural (base `e`) logarithm of a specified number.

Parameters:

- `d`: The number whose logarithm is to be found.

Returns: One of the values in the following table.

-  Positive

:  The natural logarithm of `d`; that is, ln `d`, or log e `d`
-  Zero

: `Double.NegativeInfinity`
-  Negative

: `Double.NaN`
-  Equal to `Double.NaN`: `Double.NaN`
-  Equal to `Double.PositiveInfinity`: `Double.PositiveInfinity`

#### Remarks
Parameter `d` is specified as a base 10 number.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

#### Examples
The following example illustrates the `Math.Log` method.

_Code sample not included: ~/snippets/csharp/System/Math/LogMethod/log1.cs._

## Math.Log(Double, Double) method

```csharp
public static double Log (double a, double newBase);
```

Returns the logarithm of a specified number in a specified base.

Parameters:

- `a`: The number whose logarithm is to be found.
- `newBase`: The base of the logarithm.

Returns: One of the values in the following table. (+Infinity denotes `Double.PositiveInfinity`, -Infinity denotes `Double.NegativeInfinity`, and NaN denotes `Double.NaN`.)

- `a`> 0

:  (0 <`newBase`< 1) -or- (`newBase`> 1)

lognewBase(a)

- `a`< 0

:  (any value)

NaN

-  (any value)

: `newBase`< 0

NaN

- `a` != 1

: `newBase` = 0

NaN

- `a` != 1

: `newBase` = +Infinity

NaN

- `a` = NaN

:  (any value)

NaN

-  (any value)

: `newBase` = NaN

NaN

-  (any value)

: `newBase` = 1

NaN

- `a` = 0

:  0 <`newBase`< 1

+Infinity

- `a` = 0

: `newBase`> 1

-Infinity

- `a` =  +Infinity

:  0 <`newBase`< 1

-Infinity

- `a` =  +Infinity

: `newBase`> 1

+Infinity

- `a` = 1

: `newBase` = 0

0

- `a` = 1

: `newBase` = +Infinity

0

#### Remarks
This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

#### Examples
The following example uses `Math.Log` to evaluate certain logarithmic identities for selected values.

_Code sample not included: ~/snippets/csharp/System/Math/LogMethod/loggen.cs._
