---
title: "Single struct (part 2 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Single.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Single struct (part 2 of 14)

| Target type           | Result                                        |
|-----------------------|-----------------------------------------------|
| Any integral type     | An `OverflowException` exception if the conversion occurs in a checked context.If the conversion occurs in an unchecked context (the default in C#), the conversion operation succeeds but the value overflows. |
| `Decimal` | An `OverflowException` exception. |

In addition, `NaN`, `PositiveInfinity`, and `NegativeInfinity` throw an `OverflowException` for conversions to integers in a checked context, but these values overflow when converted to integers in an unchecked context. For conversions to `Decimal`, they always throw an `OverflowException`. For conversions to `Double`, they convert to `NaN`, `PositiveInfinity`, and `NegativeInfinity`, respectively.

Note that a loss of precision may result from converting a `Single` value to another numeric type. In the case of converting non-integral `Single` values, as the output from the example shows, the fractional component is lost when the `Single` value is either rounded (as in Visual Basic) or truncated (as in C# and F#). For conversions to `Decimal` values, the `Single` value may not have a precise representation in the target data type.

The following example converts a number of `Single` values to several other numeric types. The conversions occur in a checked context in Visual Basic (the default), in C# (because of the checked keyword), and in F# (because of the `open Checked` statement). The output from the example shows the result for conversions in both a checked an unchecked context. You can perform conversions in an unchecked context in Visual Basic by compiling with the `/removeintchecks+` compiler switch, in C# by commenting out the `checked` statement, and in F# by commenting out the `open Checked` statement.

_Code sample not included: ~/snippets/csharp/System/Single/Overview/convert2.cs._

For more information on the conversion of numeric types, see Type Conversion in .NET and Type Conversion Tables.

#### Floating-point functionality

The `Single` structure and related types provide methods to perform the following categories of operations:

- **Comparison of values**. You can call the `Single.Equals` method to determine whether two `Single` values are equal, or the `Single.CompareTo` method to determine the relationship between two values.

The `Single` structure also supports a complete set of comparison operators. For example, you can test for equality or inequality, or determine whether one value is greater than or equal to another value. If one of the operands is a `Double`, the `Single` value is converted to a `Double` before performing the comparison. If one of the operands is an integral type, it is converted to a `Single` before performing the comparison. Although these are widening conversions, they may involve a loss of precision.

> **Warning:**
> Because of differences in precision, two `Single` values that you expect to be equal may turn out to be unequal, which affects the result of the comparison. See the Test for equality section for more information about comparing two `Single` values.

You can also call the `Single.IsNaN`, `Single.IsInfinity`, `Single.IsPositiveInfinity`, and `Single.IsNegativeInfinity` methods to test for these special values.

- **Mathematical operations**. Common arithmetic operations such as addition, subtraction, multiplication, and division are implemented by language compilers and Common Intermediate Language (CIL) instructions rather than by `Single` methods. If the other operand in a mathematical operation is a `Double`, the `Single` is converted to a `Double` before performing the operation, and the result of the operation is also a `Double` value. If the other operand is an integral type, it is converted to a `Single` before performing the operation, and the result of the operation is also a `Single` value.

You can perform other mathematical operations by calling `static` (`Shared` in Visual Basic) methods in the `Math` class. These include additional methods commonly used for arithmetic (such as `Math.Abs`, `Math.Sign`, and `Math.Sqrt`), geometry (such as `Math.Cos` and `Math.Sin`), and calculus (such as `Math.Log`). In all cases, the `Single` value is converted to a `Double`.

You can also manipulate the individual bits in a `Single` value. The `GetBytes` method returns its bit pattern in a byte array. By passing that byte array to the `BitConverter.ToInt32` method, you can also preserve the `Single` value's bit pattern in a 32-bit integer.

- **Rounding**. Rounding is often used as a technique for reducing the impact of differences between values caused by problems of floating-point representation and precision. You can round a `Single` value by calling the `Math.Round` method. However, note that the `Single` value is converted to a `Double` before the method is called, and the conversion can involve a loss of precision.

- **Formatting**. You can convert a `Single` value to its string representation by calling the `Single.ToString` method or by using the composite formatting feature. For information about how format strings control the string representation of floating-point values, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- **Parsing strings**. You can convert the string representation of a floating-point value to a `Single` value by calling the `Single.Parse` or `Single.TryParse` method. If the parse operation fails, the `Single.Parse` method throws an exception, whereas the `Single.TryParse` method returns `false`.

- **Type conversion**. The `Single` structure provides an explicit interface implementation for the `IConvertible` interface, which supports conversion between any two standard .NET data types. Language compilers also support the implicit conversion of values for all other standard numeric types except for the conversion of `Double` to `Single` values. Conversion of a value of any standard numeric type other than a `Double` to a `Single` is a widening conversion and does not require the use of a casting operator or conversion method.

However, conversion of 32-bit and 64-bit integer values can involve a loss of precision. The following table lists the differences in precision for 32-bit, 64-bit, and `Double` types:

| Type                 | Maximum precision (decimal digits) | Internal precision (decimal digits) |
|----------------------|------------------------------------|-------------------------------------|
| `Double` | 15                                 | 17                                  |
| `Int32` and `UInt32` | 10         | 10                                  |
| `Int64` and `UInt64` | 19         | 19                                  |
| `Single` | 7                                  | 9                                   |

The problem of precision most frequently affects `Single` values that are converted to `Double` values. In the following example, two values produced by identical division operations are unequal, because one of the values is a single-precision floating point value that is converted to a `Double`.

_Code sample not included: ~/snippets/csharp/System/Single/Overview/precisionlist1.cs._

## Single.System.Numerics.IAdditiveIdentity<System.Single,System.Single>.AdditiveIdentity property

```csharp
static float System.Numerics.IAdditiveIdentity<System.Single,System.Single>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## Single.System.Numerics.IBinaryNumber<System.Single>.AllBitsSet property

```csharp
static float System.Numerics.IBinaryNumber<System.Single>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## Single.System.Numerics.IFloatingPointConstants<System.Single>.E property

```csharp
static float System.Numerics.IFloatingPointConstants<System.Single>.E { get; }
```

Gets the mathematical constant `e`.

Returns: To be added.

To be added.

## Single.System.Numerics.IFloatingPointConstants<System.Single>.Pi property

```csharp
static float System.Numerics.IFloatingPointConstants<System.Single>.Pi { get; }
```

Gets the mathematical constant `pi`.

Returns: To be added.

To be added.

## Single.System.Numerics.IFloatingPointConstants<System.Single>.Tau property

```csharp
static float System.Numerics.IFloatingPointConstants<System.Single>.Tau { get; }
```

Gets the mathematical constant `tau`.

Returns: To be added.

To be added.

## Single.System.Numerics.IFloatingPointIeee754<System.Single>.Epsilon property

```csharp
static float System.Numerics.IFloatingPointIeee754<System.Single>.Epsilon { get; }
```

Gets the smallest value such that can be added to `0` that does not result in `0`.

Returns: To be added.

To be added.

## Single.System.Numerics.IFloatingPointIeee754<System.Single>.NaN property

```csharp
static float System.Numerics.IFloatingPointIeee754<System.Single>.NaN { get; }
```

Gets a value that represents `NaN`.

Returns: To be added.

To be added.

## Single.System.Numerics.IFloatingPointIeee754<System.Single>.NegativeInfinity property

```csharp
static float System.Numerics.IFloatingPointIeee754<System.Single>.NegativeInfinity { get; }
```

Gets a value that represents negative `infinity`.

Returns: To be added.

To be added.

## Single.System.Numerics.IFloatingPointIeee754<System.Single>.NegativeZero property

```csharp
static float System.Numerics.IFloatingPointIeee754<System.Single>.NegativeZero { get; }
```

Gets a value that represents negative `zero`.

Returns: To be added.

To be added.

## Single.System.Numerics.IFloatingPointIeee754<System.Single>.PositiveInfinity property

```csharp
static float System.Numerics.IFloatingPointIeee754<System.Single>.PositiveInfinity { get; }
```

Gets a value that represents positive `infinity`.

Returns: To be added.

To be added.

## Single.System.Numerics.IMinMaxValue<System.Single>.MaxValue property

```csharp
static float System.Numerics.IMinMaxValue<System.Single>.MaxValue { get; }
```

Gets the maximum value of the current type.

Returns: To be added.

To be added.

## Single.System.Numerics.IMinMaxValue<System.Single>.MinValue property

```csharp
static float System.Numerics.IMinMaxValue<System.Single>.MinValue { get; }
```

Gets the minimum value of the current type.

Returns: To be added.

To be added.

## Single.System.Numerics.IMultiplicativeIdentity<System.Single,System.Single>.MultiplicativeIdentity property

```csharp
static float System.Numerics.IMultiplicativeIdentity<System.Single,System.Single>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## Single.System.Numerics.INumberBase<System.Single>.One property

```csharp
static float System.Numerics.INumberBase<System.Single>.One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## Single.System.Numerics.INumberBase<System.Single>.Radix property

```csharp
static int System.Numerics.INumberBase<System.Single>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## Single.System.Numerics.INumberBase<System.Single>.Zero property

```csharp
static float System.Numerics.INumberBase<System.Single>.Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## Single.System.Numerics.ISignedNumber<System.Single>.NegativeOne property

```csharp
static float System.Numerics.ISignedNumber<System.Single>.NegativeOne { get; }
```

Gets the value `-1` for the type.

Returns: To be added.

To be added.

## Single.Abs(Single) method

```csharp
public static float Abs (float value);
```

Computes the absolute of a value.

Parameters:

- `value`: The value for which to get its absolute.

Returns: The absolute of `value`.

To be added.

## Single.Acos(Single) method

```csharp
public static float Acos (float x);
```

Computes the arc-cosine of a value.

Parameters:

- `x`: The value, in radians, whose arc-cosine is to be computed.

Returns: The arc-cosine of `x`.

#### Remarks

This computes `arccos(x)` in the interval `[+0, +π]` radians.

## Single.Acosh(Single) method

```csharp
public static float Acosh (float x);
```

Computes the hyperbolic arc-cosine of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic arc-cosine is to be computed.

Returns: The hyperbolic arc-cosine of `x`.

To be added.

## Single.AcosPi(Single) method

```csharp
public static float AcosPi (float x);
```

Computes the arc-cosine of a value and divides the result by `pi`.

Parameters:

- `x`: The value whose arc-cosine is to be computed.

Returns: The arc-cosine of `x`, divided by `pi`.

#### Remarks

This computes `arccos(x) / π` in the interval `[-0.5, +0.5]`.

## Single.Asin(Single) method

```csharp
public static float Asin (float x);
```

Computes the arc-sine of a value.

Parameters:

- `x`: The value, in radians, whose arc-sine is to be computed.

Returns: The arc-sine of `x`.

#### Remarks

This computes `arcsin(x)` in the interval `[-π / 2, +π / 2]` radians.

## Single.Asinh(Single) method

```csharp
public static float Asinh (float x);
```

Computes the hyperbolic arc-sine of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic arc-sine is to be computed.

Returns: The hyperbolic arc-sine of `x`.

To be added.

## Single.AsinPi(Single) method

```csharp
public static float AsinPi (float x);
```

Computes the arc-sine of a value and divides the result by `pi`.

Parameters:

- `x`: The value whose arc-sine is to be computed.

Returns: The arc-sine of `x`, divided by `pi`.

#### Remarks

This computes `arcsin(x) / π` in the interval `[-0.5, +0.5]`.

## Single.Atan(Single) method

```csharp
public static float Atan (float x);
```

Computes the arc-tangent of a value.

Parameters:

- `x`: The value, in radians, whose arc-tangent is to be computed.

Returns: The arc-tangent of `x`.

#### Remarks

This computes `arctan(x)` in the interval `[-π / 2, +π / 2]` radians.

## Single.Atan2(Single, Single) method

```csharp
public static float Atan2 (float y, float x);
```

Computes the arc-tangent of the quotient of two values.

Parameters:

- `y`: The y-coordinate of a point.
- `x`: The x-coordinate of a point.

Returns: The arc-tangent of `y` divided-by `x`.

#### Remarks

This computes `arctan(y / x)` in the interval `[-π, +π]` radians.

## Single.Atan2Pi(Single, Single) method

```csharp
public static float Atan2Pi (float y, float x);
```

Computes the arc-tangent for the quotient of two values and divides the result by `pi`.

Parameters:

- `y`: The y-coordinate of a point.
- `x`: The x-coordinate of a point.

Returns: The arc-tangent of `y` divided-by `x`, divided by `pi`.

#### Remarks

This computes `arctan(y / x) / π` in the interval `[-1, +1]`.
