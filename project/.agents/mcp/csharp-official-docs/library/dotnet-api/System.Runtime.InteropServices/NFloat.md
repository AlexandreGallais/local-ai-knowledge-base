---
title: "NFloat struct (part 1 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/NFloat.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NFloat struct

Namespace: `System.Runtime.InteropServices`

```csharp
public readonly struct NFloat : IComparable<System.Runtime.InteropServices.NFloat>, IEquatable<System.Runtime.InteropServices.NFloat>, IParsable<System.Runtime.InteropServices.NFloat>, ISpanParsable<System.Runtime.InteropServices.NFloat>, IUtf8SpanParsable<System.Runtime.InteropServices.NFloat>, System.Numerics.IAdditionOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>, System.Numerics.IAdditiveIdentity<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>, System.Numerics.IBinaryFloatingPointIeee754<System.Runtime.InteropServices.NFloat>, System.Numerics.IBinaryNumber<System.Runtime.InteropServices.NFloat>, System.Numerics.IBitwiseOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>, System.Numerics.IComparisonOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat,bool>, System.Numerics.IDecrementOperators<System.Runtime.InteropServices.NFloat>, System.Numerics.IDivisionOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>, System.Numerics.IEqualityOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat,bool>, System.Numerics.IExponentialFunctions<System.Runtime.InteropServices.NFloat>, System.Numerics.IFloatingPoint<System.Runtime.InteropServices.NFloat>, System.Numerics.IFloatingPointConstants<System.Runtime.InteropServices.NFloat>, System.Numerics.IFloatingPointIeee754<System.Runtime.InteropServices.NFloat>, System.Numerics.IHyperbolicFunctions<System.Runtime.InteropServices.NFloat>, System.Numerics.IIncrementOperators<System.Runtime.InteropServices.NFloat>, System.Numerics.ILogarithmicFunctions<System.Runtime.InteropServices.NFloat>, System.Numerics.IMinMaxValue<System.Runtime.InteropServices.NFloat>, System.Numerics.IModulusOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>, System.Numerics.IMultiplicativeIdentity<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>, System.Numerics.IMultiplyOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>, System.Numerics.INumber<System.Runtime.InteropServices.NFloat>, System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>, System.Numerics.IPowerFunctions<System.Runtime.InteropServices.NFloat>, System.Numerics.IRootFunctions<System.Runtime.InteropServices.NFloat>, System.Numerics.ISignedNumber<System.Runtime.InteropServices.NFloat>, System.Numerics.ISubtractionOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>, System.Numerics.ITrigonometricFunctions<System.Runtime.InteropServices.NFloat>, System.Numerics.IUnaryNegationOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>, System.Numerics.IUnaryPlusOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>
```

`NFloat` is an immutable value type that represents a floating type that has the same size as the native integer size.
It is meant to be used as an exchange type at the managed/unmanaged boundary to accurately represent in managed code unmanaged APIs that use a type alias for C or C++'s `float` on 32-bit platforms or `double` on 64-bit platforms, such as the CGFloat type in libraries provided by Apple.

#### Remarks

It is meant to be used as an exchange type at the managed/unmanaged boundary to accurately represent in managed code unmanaged APIs that use a type alias for C or C++'s `float` on 32-bit platforms or `double` on 64-bit platforms, such as the `CGFloat` type in libraries provided by Apple.

## NFloat.NFloat(Double) constructor

```csharp
public NFloat (double value);
```

Constructs an instance from a 64-bit floating point value.

Parameters:

- `value`: The floating-point value.

To be added.

## NFloat.NFloat(Single) constructor

```csharp
public NFloat (float value);
```

Constructs an instance from a 32-bit floating point value.

Parameters:

- `value`: The floating-point value.

To be added.

## NFloat.E property

```csharp
public static System.Runtime.InteropServices.NFloat E { get; }
```

Gets the mathematical constant `e`.

Returns: To be added.

To be added.

## NFloat.Epsilon property

```csharp
public static System.Runtime.InteropServices.NFloat Epsilon { get; }
```

Represents the smallest positive NFloat value that is greater than zero.

Returns: To be added.

To be added.

## NFloat.MaxValue property

```csharp
public static System.Runtime.InteropServices.NFloat MaxValue { get; }
```

Represents the largest finite value of a NFloat.

Returns: To be added.

To be added.

## NFloat.MinValue property

```csharp
public static System.Runtime.InteropServices.NFloat MinValue { get; }
```

Represents the smallest finite value of a NFloat.

Returns: To be added.

To be added.

## NFloat.NaN property

```csharp
public static System.Runtime.InteropServices.NFloat NaN { get; }
```

Represents a value that is not a number (NaN).

Returns: To be added.

To be added.

## NFloat.NegativeInfinity property

```csharp
public static System.Runtime.InteropServices.NFloat NegativeInfinity { get; }
```

Represents negative infinity.

Returns: To be added.

To be added.

## NFloat.NegativeZero property

```csharp
public static System.Runtime.InteropServices.NFloat NegativeZero { get; }
```

Gets a value that represents negative `zero`.

Returns: To be added.

To be added.

## NFloat.Pi property

```csharp
public static System.Runtime.InteropServices.NFloat Pi { get; }
```

Gets the mathematical constant `pi`.

Returns: To be added.

To be added.

## NFloat.PositiveInfinity property

```csharp
public static System.Runtime.InteropServices.NFloat PositiveInfinity { get; }
```

Represents positive infinity.

Returns: To be added.

To be added.

## NFloat.Size property

```csharp
public static int Size { get; }
```

Gets the size, in bytes, of an NFloat.

Returns: To be added.

To be added.

## NFloat.System.Numerics.IAdditiveIdentity<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>.AdditiveIdentity property

```csharp
static System.Runtime.InteropServices.NFloat System.Numerics.IAdditiveIdentity<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## NFloat.System.Numerics.IBinaryNumber<System.Runtime.InteropServices.NFloat>.AllBitsSet property

```csharp
static System.Runtime.InteropServices.NFloat System.Numerics.IBinaryNumber<System.Runtime.InteropServices.NFloat>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## NFloat.System.Numerics.IMultiplicativeIdentity<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>.MultiplicativeIdentity property

```csharp
static System.Runtime.InteropServices.NFloat System.Numerics.IMultiplicativeIdentity<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## NFloat.System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>.One property

```csharp
static System.Runtime.InteropServices.NFloat System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>.One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## NFloat.System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>.Radix property

```csharp
static int System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## NFloat.System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>.Zero property

```csharp
static System.Runtime.InteropServices.NFloat System.Numerics.INumberBase<System.Runtime.InteropServices.NFloat>.Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## NFloat.System.Numerics.ISignedNumber<System.Runtime.InteropServices.NFloat>.NegativeOne property

```csharp
static System.Runtime.InteropServices.NFloat System.Numerics.ISignedNumber<System.Runtime.InteropServices.NFloat>.NegativeOne { get; }
```

Gets the value `-1` for the type.

Returns: To be added.

To be added.

## NFloat.Tau property

```csharp
public static System.Runtime.InteropServices.NFloat Tau { get; }
```

Gets the mathematical constant `tau`.

Returns: To be added.

To be added.

## NFloat.Value property

```csharp
public double Value { get; }
```

The underlying floating-point value of this instance.

Returns: To be added.

To be added.

## NFloat.Abs(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Abs (System.Runtime.InteropServices.NFloat value);
```

Computes the absolute of a value.

Parameters:

- `value`: The value for which to get its absolute.

Returns: The absolute of `value`.

To be added.

## NFloat.Acos(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Acos (System.Runtime.InteropServices.NFloat x);
```

Computes the arc-cosine of a value.

Parameters:

- `x`: The value, in radians, whose arc-cosine is to be computed.

Returns: The arc-cosine of `x`.

#### Remarks

This computes `arccos(x)` in the interval `[+0, +π]` radians.

## NFloat.Acosh(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Acosh (System.Runtime.InteropServices.NFloat x);
```

Computes the hyperbolic arc-cosine of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic arc-cosine is to be computed.

Returns: The hyperbolic arc-cosine of `x`.

To be added.

## NFloat.AcosPi(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat AcosPi (System.Runtime.InteropServices.NFloat x);
```

Computes the arc-cosine of a value and divides the result by `pi`.

Parameters:

- `x`: The value whose arc-cosine is to be computed.

Returns: The arc-cosine of `x`, divided by `pi`.

#### Remarks

This computes `arccos(x) / π` in the interval `[-0.5, +0.5]`.

## NFloat.Asin(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Asin (System.Runtime.InteropServices.NFloat x);
```

Computes the arc-sine of a value.

Parameters:

- `x`: The value, in radians, whose arc-sine is to be computed.

Returns: The arc-sine of `x`.

#### Remarks

This computes `arcsin(x)` in the interval `[-π / 2, +π / 2]` radians.

## NFloat.Asinh(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Asinh (System.Runtime.InteropServices.NFloat x);
```

Computes the hyperbolic arc-sine of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic arc-sine is to be computed.

Returns: The hyperbolic arc-sine of `x`.

To be added.

## NFloat.AsinPi(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat AsinPi (System.Runtime.InteropServices.NFloat x);
```

Computes the arc-sine of a value and divides the result by `pi`.

Parameters:

- `x`: The value whose arc-sine is to be computed.

Returns: The arc-sine of `x`, divided by `pi`.

#### Remarks

This computes `arcsin(x) / π` in the interval `[-0.5, +0.5]`.

## NFloat.Atan(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Atan (System.Runtime.InteropServices.NFloat x);
```

Computes the arc-tangent of a value.

Parameters:

- `x`: The value, in radians, whose arc-tangent is to be computed.

Returns: The arc-tangent of `x`.

#### Remarks

This computes `arctan(x)` in the interval `[-π / 2, +π / 2]` radians.

## NFloat.Atan2(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Atan2 (System.Runtime.InteropServices.NFloat y, System.Runtime.InteropServices.NFloat x);
```

Computes the arc-tangent of the quotient of two values.

Parameters:

- `y`: The y-coordinate of a point.
- `x`: The x-coordinate of a point.

Returns: The arc-tangent of `y` divided-by `x`.

#### Remarks

This computes `arctan(y / x)` in the interval `[-π, +π]` radians.

## NFloat.Atan2Pi(NFloat, NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Atan2Pi (System.Runtime.InteropServices.NFloat y, System.Runtime.InteropServices.NFloat x);
```

Computes the arc-tangent for the quotient of two values and divides the result by `pi`.

Parameters:

- `y`: The y-coordinate of a point.
- `x`: The x-coordinate of a point.

Returns: The arc-tangent of `y` divided-by `x`, divided by `pi`.

#### Remarks

This computes `arctan(y / x) / π` in the interval `[-1, +1]`.

## NFloat.Atanh(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Atanh (System.Runtime.InteropServices.NFloat x);
```

Computes the hyperbolic arc-tangent of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic arc-tangent is to be computed.

Returns: The hyperbolic arc-tangent of `x`.

To be added.

## NFloat.AtanPi(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat AtanPi (System.Runtime.InteropServices.NFloat x);
```

Computes the arc-tangent of a value and divides the result by pi.

Parameters:

- `x`: The value whose arc-tangent is to be computed.

Returns: The arc-tangent of `x`, divided by `pi`.

#### Remarks

This computes `arctan(x) / π` in the interval `[-0.5, +0.5]`.

## NFloat.BitDecrement(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat BitDecrement (System.Runtime.InteropServices.NFloat x);
```

Decrements a value to the smallest value that compares less than a given value.

Parameters:

- `x`: The value to be bitwise decremented.

Returns: The smallest value that compares less than `x`.

To be added.

## NFloat.BitIncrement(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat BitIncrement (System.Runtime.InteropServices.NFloat x);
```

Increments a value to the smallest value that compares greater than a given value.

Parameters:

- `x`: The value to be bitwise incremented.

Returns: The smallest value that compares greater than `x`.

To be added.

## NFloat.Cbrt(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Cbrt (System.Runtime.InteropServices.NFloat x);
```

Computes the cube-root of a value.

Parameters:

- `x`: The value whose cube-root is to be computed.

Returns: The cube-root of `x`.

To be added.
