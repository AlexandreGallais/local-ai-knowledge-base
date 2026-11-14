---
title: "Math class (part 4 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Math.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Math class (part 4 of 7)

## Math.Log10(Double) method

```csharp
public static double Log10 (double d);
```

Returns the base 10 logarithm of a specified number.

Parameters:

- `d`: A number whose logarithm is to be found.

Returns: One of the values in the following table.

-  Positive

:  The base 10 log of `d`; that is, log 10`d`.

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
The following example uses the `Math.Log10` method to return the base 10 logarithm for selected values.

_Code sample not included: ~/snippets/csharp/System/Math/Log10/log10.cs._

## Math.Log2(Double) method

```csharp
public static double Log2 (double x);
```

Returns the base 2 logarithm of a specified number.

Parameters:

- `x`: A number whose logarithm is to be found.

Returns: One of the values in the following table.

-  Positive

:  The base 2 log of `x`; that is, log 2`x`.

-  Zero

: `Double.NegativeInfinity`
-  Negative

: `Double.NaN`
-  Equal to `Double.NaN`: `Double.NaN`
-  Equal to `Double.PositiveInfinity`: `Double.PositiveInfinity`

#### Remarks
Parameter `x` is specified as a base 10 number.

This method calls into the underlying C runtime, and the exact result or valid input range may differ between different operating systems or architectures.

## Math.Max(Byte, Byte) method

```csharp
public static byte Max (byte val1, byte val2);
```

Returns the larger of two 8-bit unsigned integers.

Parameters:

- `val1`: The first of two 8-bit unsigned integers to compare.
- `val2`: The second of two 8-bit unsigned integers to compare.

Returns: Parameter `val1` or `val2`, whichever is larger.

To be added.

## Math.Max(Decimal, Decimal) method

```csharp
public static decimal Max (decimal val1, decimal val2);
```

Returns the larger of two decimal numbers.

Parameters:

- `val1`: The first of two decimal numbers to compare.
- `val2`: The second of two decimal numbers to compare.

Returns: Parameter `val1` or `val2`, whichever is larger.

To be added.

## Math.Max(Double, Double) method

```csharp
public static double Max (double val1, double val2);
```

Returns the larger of two double-precision floating-point numbers.

Parameters:

- `val1`: The first of two double-precision floating-point numbers to compare.
- `val2`: The second of two double-precision floating-point numbers to compare.

Returns: Parameter `val1` or `val2`, whichever is larger. If `val1`, `val2`, or both `val1` and `val2` are equal to `Double.NaN`, `Double.NaN` is returned.

To be added.

## Math.Max(Int16, Int16) method

```csharp
public static short Max (short val1, short val2);
```

Returns the larger of two 16-bit signed integers.

Parameters:

- `val1`: The first of two 16-bit signed integers to compare.
- `val2`: The second of two 16-bit signed integers to compare.

Returns: Parameter `val1` or `val2`, whichever is larger.

To be added.

## Math.Max(Int32, Int32) method

```csharp
public static int Max (int val1, int val2);
```

Returns the larger of two 32-bit signed integers.

Parameters:

- `val1`: The first of two 32-bit signed integers to compare.
- `val2`: The second of two 32-bit signed integers to compare.

Returns: Parameter `val1` or `val2`, whichever is larger.

To be added.

## Math.Max(Int64, Int64) method

```csharp
public static long Max (long val1, long val2);
```

Returns the larger of two 64-bit signed integers.

Parameters:

- `val1`: The first of two 64-bit signed integers to compare.
- `val2`: The second of two 64-bit signed integers to compare.

Returns: Parameter `val1` or `val2`, whichever is larger.

To be added.

## Math.Max(IntPtr, IntPtr) method

```csharp
public static IntPtr Max (IntPtr val1, IntPtr val2);
```

Returns the larger of two native signed integers.

Parameters:

- `val1`: The first of two native signed integers to compare.
- `val2`: The second of two native signed integers to compare.

Returns: Parameter `val1` or `val2`, whichever is larger.

To be added.

## Math.Max(SByte, SByte) method

```csharp
public static sbyte Max (sbyte val1, sbyte val2);
```

Returns the larger of two 8-bit signed integers.

Parameters:

- `val1`: The first of two 8-bit signed integers to compare.
- `val2`: The second of two 8-bit signed integers to compare.

Returns: Parameter `val1` or `val2`, whichever is larger.

To be added.

## Math.Max(Single, Single) method

```csharp
public static float Max (float val1, float val2);
```

Returns the larger of two single-precision floating-point numbers.

Parameters:

- `val1`: The first of two single-precision floating-point numbers to compare.
- `val2`: The second of two single-precision floating-point numbers to compare.

Returns: Parameter `val1` or `val2`, whichever is larger. If `val1`, or `val2`, or both `val1` and `val2` are equal to `Single.NaN`, `Single.NaN` is returned.

To be added.

## Math.Max(UInt16, UInt16) method

```csharp
public static ushort Max (ushort val1, ushort val2);
```

Returns the larger of two 16-bit unsigned integers.

Parameters:

- `val1`: The first of two 16-bit unsigned integers to compare.
- `val2`: The second of two 16-bit unsigned integers to compare.

Returns: Parameter `val1` or `val2`, whichever is larger.

To be added.

## Math.Max(UInt32, UInt32) method

```csharp
public static uint Max (uint val1, uint val2);
```

Returns the larger of two 32-bit unsigned integers.

Parameters:

- `val1`: The first of two 32-bit unsigned integers to compare.
- `val2`: The second of two 32-bit unsigned integers to compare.

Returns: Parameter `val1` or `val2`, whichever is larger.

To be added.

## Math.Max(UInt64, UInt64) method

```csharp
public static ulong Max (ulong val1, ulong val2);
```

Returns the larger of two 64-bit unsigned integers.

Parameters:

- `val1`: The first of two 64-bit unsigned integers to compare.
- `val2`: The second of two 64-bit unsigned integers to compare.

Returns: Parameter `val1` or `val2`, whichever is larger.

To be added.

## Math.Max(UIntPtr, UIntPtr) method

```csharp
public static UIntPtr Max (UIntPtr val1, UIntPtr val2);
```

Returns the larger of two native unsigned integers.

Parameters:

- `val1`: The first of two native unsigned integers to compare.
- `val2`: The second of two native unsigned integers to compare.

Returns: Parameter `val1` or `val2`, whichever is larger.

To be added.

## Math.MaxMagnitude(Double, Double) method

```csharp
public static double MaxMagnitude (double x, double y);
```

Returns the larger magnitude of two double-precision floating-point numbers.

Parameters:

- `x`: The first of two double-precision floating-point numbers to compare.
- `y`: The second of two double-precision floating-point numbers to compare.

Returns: Parameter `x` or `y`, whichever has the larger magnitude. If `x`, or `y`, or both `x` and `y` are equal to `Double.NaN`, `Double.NaN` is returned.

To be added.

## Math.Min(Byte, Byte) method

```csharp
public static byte Min (byte val1, byte val2);
```

Returns the smaller of two 8-bit unsigned integers.

Parameters:

- `val1`: The first of two 8-bit unsigned integers to compare.
- `val2`: The second of two 8-bit unsigned integers to compare.

Returns: Parameter `val1` or `val2`, whichever is smaller.

To be added.

## Math.Min(Decimal, Decimal) method

```csharp
public static decimal Min (decimal val1, decimal val2);
```

Returns the smaller of two decimal numbers.

Parameters:

- `val1`: The first of two decimal numbers to compare.
- `val2`: The second of two decimal numbers to compare.

Returns: Parameter `val1` or `val2`, whichever is smaller.

To be added.

## Math.Min(Double, Double) method

```csharp
public static double Min (double val1, double val2);
```

Returns the smaller of two double-precision floating-point numbers.

Parameters:

- `val1`: The first of two double-precision floating-point numbers to compare.
- `val2`: The second of two double-precision floating-point numbers to compare.

Returns: Parameter `val1` or `val2`, whichever is smaller. If `val1`, `val2`, or both `val1` and `val2` are equal to `Double.NaN`, `Double.NaN` is returned.

To be added.

## Math.Min(Int16, Int16) method

```csharp
public static short Min (short val1, short val2);
```

Returns the smaller of two 16-bit signed integers.

Parameters:

- `val1`: The first of two 16-bit signed integers to compare.
- `val2`: The second of two 16-bit signed integers to compare.

Returns: Parameter `val1` or `val2`, whichever is smaller.

To be added.

## Math.Min(Int32, Int32) method

```csharp
public static int Min (int val1, int val2);
```

Returns the smaller of two 32-bit signed integers.

Parameters:

- `val1`: The first of two 32-bit signed integers to compare.
- `val2`: The second of two 32-bit signed integers to compare.

Returns: Parameter `val1` or `val2`, whichever is smaller.

To be added.

## Math.Min(Int64, Int64) method

```csharp
public static long Min (long val1, long val2);
```

Returns the smaller of two 64-bit signed integers.

Parameters:

- `val1`: The first of two 64-bit signed integers to compare.
- `val2`: The second of two 64-bit signed integers to compare.

Returns: Parameter `val1` or `val2`, whichever is smaller.

To be added.

## Math.Min(IntPtr, IntPtr) method

```csharp
public static IntPtr Min (IntPtr val1, IntPtr val2);
```

Returns the smaller of two native signed integers.

Parameters:

- `val1`: The first of two native signed integers to compare.
- `val2`: The second of two native signed integers to compare.

Returns: Parameter `val1` or `val2`, whichever is smaller.

To be added.

## Math.Min(SByte, SByte) method

```csharp
public static sbyte Min (sbyte val1, sbyte val2);
```

Returns the smaller of two 8-bit signed integers.

Parameters:

- `val1`: The first of two 8-bit signed integers to compare.
- `val2`: The second of two 8-bit signed integers to compare.

Returns: Parameter `val1` or `val2`, whichever is smaller.

To be added.

## Math.Min(Single, Single) method

```csharp
public static float Min (float val1, float val2);
```

Returns the smaller of two single-precision floating-point numbers.

Parameters:

- `val1`: The first of two single-precision floating-point numbers to compare.
- `val2`: The second of two single-precision floating-point numbers to compare.

Returns: Parameter `val1` or `val2`, whichever is smaller. If `val1`, `val2`, or both `val1` and `val2` are equal to `Single.NaN`, `Single.NaN` is returned.

To be added.

## Math.Min(UInt16, UInt16) method

```csharp
public static ushort Min (ushort val1, ushort val2);
```

Returns the smaller of two 16-bit unsigned integers.

Parameters:

- `val1`: The first of two 16-bit unsigned integers to compare.
- `val2`: The second of two 16-bit unsigned integers to compare.

Returns: Parameter `val1` or `val2`, whichever is smaller.

To be added.

## Math.Min(UInt32, UInt32) method

```csharp
public static uint Min (uint val1, uint val2);
```

Returns the smaller of two 32-bit unsigned integers.

Parameters:

- `val1`: The first of two 32-bit unsigned integers to compare.
- `val2`: The second of two 32-bit unsigned integers to compare.

Returns: Parameter `val1` or `val2`, whichever is smaller.

To be added.

## Math.Min(UInt64, UInt64) method

```csharp
public static ulong Min (ulong val1, ulong val2);
```

Returns the smaller of two 64-bit unsigned integers.

Parameters:

- `val1`: The first of two 64-bit unsigned integers to compare.
- `val2`: The second of two 64-bit unsigned integers to compare.

Returns: Parameter `val1` or `val2`, whichever is smaller.

To be added.

## Math.Min(UIntPtr, UIntPtr) method

```csharp
public static UIntPtr Min (UIntPtr val1, UIntPtr val2);
```

Returns the smaller of two native unsigned integers.

Parameters:

- `val1`: The first of two native unsigned integers to compare.
- `val2`: The second of two native unsigned integers to compare.

Returns: Parameter `val1` or `val2`, whichever is smaller.

To be added.

## Math.MinMagnitude(Double, Double) method

```csharp
public static double MinMagnitude (double x, double y);
```

Returns the smaller magnitude of two double-precision floating-point numbers.

Parameters:

- `x`: The first of two double-precision floating-point numbers to compare.
- `y`: The second of two double-precision floating-point numbers to compare.

Returns: Parameter `x` or `y`, whichever has the smaller magnitude. If `x`, or `y`, or both `x` and `y` are equal to `Double.NaN`, `Double.NaN` is returned.

To be added.
