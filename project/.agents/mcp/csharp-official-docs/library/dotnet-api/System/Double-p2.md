---
title: "Double struct (part 2 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Double.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Double struct (part 2 of 14)

A loss of precision might result from converting a `Double` value to another numeric type. In the case of converting to any of the integral types, as the output from the example shows, the fractional component is lost when the `Double` value is either rounded (as in Visual Basic) or truncated (as in C#). For conversions to `Decimal` and `Single` values, the `Double` value might not have a precise representation in the target data type.

The following example converts a number of `Double` values to several other numeric types. The conversions occur in a checked context in Visual Basic (the default), in C# (because of the checked keyword), and in F# (because of the Checked module). The output from the example shows the result for conversions in both a checked an unchecked context. You can perform conversions in an unchecked context in Visual Basic by compiling with the `/removeintchecks+` compiler switch, in C# by commenting out the `checked` statement, and in F# by commenting out the `open Checked` statement.

_Code sample not included: ~/snippets/csharp/System/Double/Overview/convert2.cs._

For more information on the conversion of numeric types, see Type Conversion in .NET and Type Conversion Tables.

#### Floating-point functionality

The `Double` structure and related types provide methods to perform operations in the following areas:

- **Comparison of values**. You can call the `Double.Equals` method to determine whether two `Double` values are equal, or the `Double.CompareTo` method to determine the relationship between two values.

The `Double` structure also supports a complete set of comparison operators. For example, you can test for equality or inequality, or determine whether one value is greater than or equal to another. If one of the operands is a numeric type other than a `Double`, it is converted to a `Double` before performing the comparison.

> **Warning:**
> Because of differences in precision, two `Double` values that you expect to be equal might turn out to be unequal, which affects the result of the comparison. For information about comparing two `Double` values, see the Test for equality section.

You can also call the `Double.IsNaN`, `Double.IsInfinity`, `Double.IsPositiveInfinity`, and `Double.IsNegativeInfinity` methods to test for these special values.

- **Mathematical operations**. Common arithmetic operations, such as addition, subtraction, multiplication, and division, are implemented by language compilers and Common Intermediate Language (CIL) instructions, rather than by `Double` methods. If one of the operands in a mathematical operation is a numeric type other than a `Double`, it's converted to a `Double` before performing the operation. The result of the operation is also a `Double` value.

Other mathematical operations can be performed by calling `static` (`Shared` in Visual Basic) methods in the `Math` class. It includes additional methods commonly used for arithmetic (such as `Math.Abs`, `Math.Sign`, and `Math.Sqrt`), geometry (such as `Math.Cos` and `Math.Sin`), and calculus (such as `Math.Log`).

You can also manipulate the individual bits in a `Double` value. The `BitConverter.DoubleToInt64Bits` method preserves a `Double` value's bit pattern in a 64-bit integer. The `GetBytes` method returns its bit pattern in a byte array.

- **Rounding**. Rounding is often used as a technique for reducing the impact of differences between values caused by problems of floating-point representation and precision. You can round a `Double` value by calling the `Math.Round` method.

- **Formatting**. You can convert a `Double` value to its string representation by calling the `Double.ToString` method or by using the composite formatting feature. For information about how format strings control the string representation of floating-point values, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- **Parsing strings**. You can convert the string representation of a floating-point value to a `Double` value by calling either the `Double.Parse` or `Double.TryParse` method. If the parse operation fails, the `Double.Parse` method throws an exception, whereas the `Double.TryParse` method returns `false`.

- **Type conversion**. The `Double` structure provides an explicit interface implementation for the `IConvertible` interface, which supports conversion between any two standard .NET data types. Language compilers also support the implicit conversion of values of all other standard numeric types to `Double` values. Conversion of a value of any standard numeric type to a `Double` is a widening conversion and does not require the user of a casting operator or conversion method,

However, conversion of `Int64` and `Single` values can involve a loss of precision. The following table lists the differences in precision for each of these types:

| Type                 | Maximum precision | Internal precision |
|----------------------|-------------------|--------------------|
| `Double` | 15                | 17                 |
| `Int64`  | 19 decimal digits | 19 decimal digits  |
| `Single` | 7 decimal digits  | 9 decimal digits   |

The problem of precision most frequently affects `Single` values that are converted to `Double` values. In the following example, two values produced by identical division operations are unequal because one of the values is a single-precision floating point value converted to a `Double`.

_Code sample not included: ~/snippets/csharp/System/Double/Overview/representation1.cs._

#### Examples

The following code example illustrates the use of `Double`:

_Code sample not included: ~/snippets/csharp/System/Double/Overview/source.cs._

## Double.System.Numerics.IAdditiveIdentity<System.Double,System.Double>.AdditiveIdentity property

```csharp
static double System.Numerics.IAdditiveIdentity<System.Double,System.Double>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## Double.System.Numerics.IBinaryNumber<System.Double>.AllBitsSet property

```csharp
static double System.Numerics.IBinaryNumber<System.Double>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## Double.System.Numerics.IFloatingPointConstants<System.Double>.E property

```csharp
static double System.Numerics.IFloatingPointConstants<System.Double>.E { get; }
```

Gets the mathematical constant `e`.

Returns: To be added.

To be added.

## Double.System.Numerics.IFloatingPointConstants<System.Double>.Pi property

```csharp
static double System.Numerics.IFloatingPointConstants<System.Double>.Pi { get; }
```

Gets the mathematical constant `pi`.

Returns: To be added.

To be added.

## Double.System.Numerics.IFloatingPointConstants<System.Double>.Tau property

```csharp
static double System.Numerics.IFloatingPointConstants<System.Double>.Tau { get; }
```

Gets the mathematical constant `tau`.

Returns: To be added.

To be added.

## Double.System.Numerics.IFloatingPointIeee754<System.Double>.Epsilon property

```csharp
static double System.Numerics.IFloatingPointIeee754<System.Double>.Epsilon { get; }
```

Gets the smallest value such that can be added to `0` that does not result in `0`.

Returns: To be added.

To be added.

## Double.System.Numerics.IFloatingPointIeee754<System.Double>.NaN property

```csharp
static double System.Numerics.IFloatingPointIeee754<System.Double>.NaN { get; }
```

Gets a value that represents `NaN`.

Returns: To be added.

To be added.

## Double.System.Numerics.IFloatingPointIeee754<System.Double>.NegativeInfinity property

```csharp
static double System.Numerics.IFloatingPointIeee754<System.Double>.NegativeInfinity { get; }
```

Gets a value that represents negative `infinity`.

Returns: To be added.

To be added.

## Double.System.Numerics.IFloatingPointIeee754<System.Double>.NegativeZero property

```csharp
static double System.Numerics.IFloatingPointIeee754<System.Double>.NegativeZero { get; }
```

Gets a value that represents negative `zero`.

Returns: To be added.

To be added.

## Double.System.Numerics.IFloatingPointIeee754<System.Double>.PositiveInfinity property

```csharp
static double System.Numerics.IFloatingPointIeee754<System.Double>.PositiveInfinity { get; }
```

Gets a value that represents positive `infinity`.

Returns: To be added.

To be added.

## Double.System.Numerics.IMinMaxValue<System.Double>.MaxValue property

```csharp
static double System.Numerics.IMinMaxValue<System.Double>.MaxValue { get; }
```

Gets the maximum value of the current type.

Returns: To be added.

To be added.

## Double.System.Numerics.IMinMaxValue<System.Double>.MinValue property

```csharp
static double System.Numerics.IMinMaxValue<System.Double>.MinValue { get; }
```

Gets the minimum value of the current type.

Returns: To be added.

To be added.

## Double.System.Numerics.IMultiplicativeIdentity<System.Double,System.Double>.MultiplicativeIdentity property

```csharp
static double System.Numerics.IMultiplicativeIdentity<System.Double,System.Double>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## Double.System.Numerics.INumberBase<System.Double>.One property

```csharp
static double System.Numerics.INumberBase<System.Double>.One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## Double.System.Numerics.INumberBase<System.Double>.Radix property

```csharp
static int System.Numerics.INumberBase<System.Double>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## Double.System.Numerics.INumberBase<System.Double>.Zero property

```csharp
static double System.Numerics.INumberBase<System.Double>.Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## Double.System.Numerics.ISignedNumber<System.Double>.NegativeOne property

```csharp
static double System.Numerics.ISignedNumber<System.Double>.NegativeOne { get; }
```

Gets the value `-1` for the type.

Returns: To be added.

To be added.

## Double.Abs(Double) method

```csharp
public static double Abs (double value);
```

Computes the absolute of a value.

Parameters:

- `value`: The value for which to get its absolute.

Returns: The absolute of `value`.

To be added.

## Double.Acos(Double) method

```csharp
public static double Acos (double x);
```

Computes the arc-cosine of a value.

Parameters:

- `x`: The value, in radians, whose arc-cosine is to be computed.

Returns: The arc-cosine of `x`.

#### Remarks

This computes `arccos(x)` in the interval `[+0, +π]` radians.

## Double.Acosh(Double) method

```csharp
public static double Acosh (double x);
```

Computes the hyperbolic arc-cosine of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic arc-cosine is to be computed.

Returns: The hyperbolic arc-cosine of `x`.

To be added.

## Double.AcosPi(Double) method

```csharp
public static double AcosPi (double x);
```

Computes the arc-cosine of a value and divides the result by `pi`.

Parameters:

- `x`: The value whose arc-cosine is to be computed.

Returns: The arc-cosine of `x`, divided by `pi`.

#### Remarks

This computes `arccos(x) / π` in the interval `[-0.5, +0.5]`.

## Double.Asin(Double) method

```csharp
public static double Asin (double x);
```

Computes the arc-sine of a value.

Parameters:

- `x`: The value, in radians, whose arc-sine is to be computed.

Returns: The arc-sine of `x`.

#### Remarks

This computes `arcsin(x)` in the interval `[-π / 2, +π / 2]` radians.

## Double.Asinh(Double) method

```csharp
public static double Asinh (double x);
```

Computes the hyperbolic arc-sine of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic arc-sine is to be computed.

Returns: The hyperbolic arc-sine of `x`.

To be added.

## Double.AsinPi(Double) method

```csharp
public static double AsinPi (double x);
```

Computes the arc-sine of a value and divides the result by `pi`.

Parameters:

- `x`: The value whose arc-sine is to be computed.

Returns: The arc-sine of `x`, divided by `pi`.

#### Remarks

This computes `arcsin(x) / π` in the interval `[-0.5, +0.5]`.

## Double.Atan(Double) method

```csharp
public static double Atan (double x);
```

Computes the arc-tangent of a value.

Parameters:

- `x`: The value, in radians, whose arc-tangent is to be computed.

Returns: The arc-tangent of `x`.

#### Remarks

This computes `arctan(x)` in the interval `[-π / 2, +π / 2]` radians.

## Double.Atan2(Double, Double) method

```csharp
public static double Atan2 (double y, double x);
```

Computes the arc-tangent of the quotient of two values.

Parameters:

- `y`: The y-coordinate of a point.
- `x`: The x-coordinate of a point.

Returns: The arc-tangent of `y` divided-by `x`.

#### Remarks

This computes `arctan(y / x)` in the interval `[-π, +π]` radians.

## Double.Atan2Pi(Double, Double) method

```csharp
public static double Atan2Pi (double y, double x);
```

Computes the arc-tangent for the quotient of two values and divides the result by `pi`.

Parameters:

- `y`: The y-coordinate of a point.
- `x`: The x-coordinate of a point.

Returns: The arc-tangent of `y` divided-by `x`, divided by `pi`.

#### Remarks

This computes `arctan(y / x) / π` in the interval `[-1, +1]`.

## Double.Atanh(Double) method

```csharp
public static double Atanh (double x);
```

Computes the hyperbolic arc-tangent of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic arc-tangent is to be computed.

Returns: The hyperbolic arc-tangent of `x`.

To be added.

## Double.AtanPi(Double) method

```csharp
public static double AtanPi (double x);
```

Computes the arc-tangent of a value and divides the result by pi.

Parameters:

- `x`: The value whose arc-tangent is to be computed.

Returns: The arc-tangent of `x`, divided by `pi`.

#### Remarks

This computes `arctan(x) / π` in the interval `[-0.5, +0.5]`.

## Double.BitDecrement(Double) method

```csharp
public static double BitDecrement (double x);
```

Returns the largest value that compares less than a specified value.

Parameters:

- `x`: The value to be bitwise decremented.

Returns: The largest value that compares less than `x`.

To be added.

## Double.BitIncrement(Double) method

```csharp
public static double BitIncrement (double x);
```

Returns the smallest value that compares greater than a specified value.

Parameters:

- `x`: The value to be bitwise incremented.

Returns: The smallest value that compares greater than `x`.

To be added.

## Double.Cbrt(Double) method

```csharp
public static double Cbrt (double x);
```

Computes the cube-root of a value.

Parameters:

- `x`: The value whose cube-root is to be computed.

Returns: The cube-root of `x`.

To be added.
