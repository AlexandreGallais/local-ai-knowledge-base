---
title: "Half struct (part 1 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Half.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Half struct

Namespace: `System`

```csharp
public readonly struct Half : IComparable<Half>, IEquatable<Half>, IParsable<Half>, ISpanParsable<Half>, IUtf8SpanParsable<Half>, System.Numerics.IAdditionOperators<Half,Half,Half>, System.Numerics.IAdditiveIdentity<Half,Half>, System.Numerics.IBinaryFloatingPointIeee754<Half>, System.Numerics.IBinaryNumber<Half>, System.Numerics.IBitwiseOperators<Half,Half,Half>, System.Numerics.IComparisonOperators<Half,Half,bool>, System.Numerics.IDecrementOperators<Half>, System.Numerics.IDivisionOperators<Half,Half,Half>, System.Numerics.IEqualityOperators<Half,Half,bool>, System.Numerics.IExponentialFunctions<Half>, System.Numerics.IFloatingPoint<Half>, System.Numerics.IFloatingPointConstants<Half>, System.Numerics.IFloatingPointIeee754<Half>, System.Numerics.IHyperbolicFunctions<Half>, System.Numerics.IIncrementOperators<Half>, System.Numerics.ILogarithmicFunctions<Half>, System.Numerics.IMinMaxValue<Half>, System.Numerics.IModulusOperators<Half,Half,Half>, System.Numerics.IMultiplicativeIdentity<Half,Half>, System.Numerics.IMultiplyOperators<Half,Half,Half>, System.Numerics.INumber<Half>, System.Numerics.INumberBase<Half>, System.Numerics.IPowerFunctions<Half>, System.Numerics.IRootFunctions<Half>, System.Numerics.ISignedNumber<Half>, System.Numerics.ISubtractionOperators<Half,Half,Half>, System.Numerics.ITrigonometricFunctions<Half>, System.Numerics.IUnaryNegationOperators<Half,Half>, System.Numerics.IUnaryPlusOperators<Half,Half>
```

Represents a half-precision floating-point number.

#### Remarks

The `Half` value type represents a half-precision 16-bit number with values ranging from negative 65,504 to positive 65,504, as well as positive or negative zero, `PositiveInfinity`, `NegativeInfinity`, and not a number (`NaN`).

This is an IEEE 754-compliant `float16` type.

## Half.E property

```csharp
public static Half E { get; }
```

Gets the mathematical constant `e`.

Returns: To be added.

To be added.

## Half.Epsilon property

```csharp
public static Half Epsilon { get; }
```

Represents the smallest positive `Half` value that is greater than zero.

Returns: 5.9604645E-08

To be added.

## Half.MaxValue property

```csharp
public static Half MaxValue { get; }
```

Represents the largest possible value of `Half`.

Returns: 65504

To be added.

## Half.MinValue property

```csharp
public static Half MinValue { get; }
```

Represents the smallest possible value of `Half`.

Returns: -65504

To be added.

## Half.MultiplicativeIdentity property

```csharp
public static Half MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## Half.NaN property

```csharp
public static Half NaN { get; }
```

Represents not a number.

Returns: NaN.

To be added.

## Half.NegativeInfinity property

```csharp
public static Half NegativeInfinity { get; }
```

Represents negative infinity.

Returns: -Infinity.

To be added.

## Half.NegativeOne property

```csharp
public static Half NegativeOne { get; }
```

Gets the value `-1` for the type.

Returns: To be added.

To be added.

## Half.NegativeZero property

```csharp
public static Half NegativeZero { get; }
```

Gets a value that represents negative `zero`.

Returns: To be added.

To be added.

## Half.One property

```csharp
public static Half One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## Half.Pi property

```csharp
public static Half Pi { get; }
```

Gets the mathematical constant `pi`.

Returns: To be added.

To be added.

## Half.PositiveInfinity property

```csharp
public static Half PositiveInfinity { get; }
```

Represents positive infinity.

Returns: Infinity.

To be added.

## Half.System.Numerics.IAdditiveIdentity<System.Half,System.Half>.AdditiveIdentity property

```csharp
static Half System.Numerics.IAdditiveIdentity<System.Half,System.Half>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## Half.System.Numerics.IBinaryNumber<System.Half>.AllBitsSet property

```csharp
static Half System.Numerics.IBinaryNumber<System.Half>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## Half.System.Numerics.INumberBase<System.Half>.Radix property

```csharp
static int System.Numerics.INumberBase<System.Half>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## Half.Tau property

```csharp
public static Half Tau { get; }
```

Gets the mathematical constant `tau`.

Returns: To be added.

To be added.

## Half.Zero property

```csharp
public static Half Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## Half.Abs(Half) method

```csharp
public static Half Abs (Half value);
```

Computes the absolute of a value.

Parameters:

- `value`: The value for which to get its absolute.

Returns: The absolute of `value`.

To be added.

## Half.Acos(Half) method

```csharp
public static Half Acos (Half x);
```

Computes the arc-cosine of a value.

Parameters:

- `x`: The value, in radians, whose arc-cosine is to be computed.

Returns: The arc-cosine of `x`.

#### Remarks

This computes `arccos(x)` in the interval `[+0, +π]` radians.

## Half.Acosh(Half) method

```csharp
public static Half Acosh (Half x);
```

Computes the hyperbolic arc-cosine of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic arc-cosine is to be computed.

Returns: The hyperbolic arc-cosine of `x`.

To be added.

## Half.AcosPi(Half) method

```csharp
public static Half AcosPi (Half x);
```

Computes the arc-cosine of a value and divides the result by `pi`.

Parameters:

- `x`: The value whose arc-cosine is to be computed.

Returns: The arc-cosine of `x`, divided by `pi`.

#### Remarks

This computes `arccos(x) / π` in the interval `[-0.5, +0.5]`.

## Half.Asin(Half) method

```csharp
public static Half Asin (Half x);
```

Computes the arc-sine of a value.

Parameters:

- `x`: The value, in radians, whose arc-sine is to be computed.

Returns: The arc-sine of `x`.

#### Remarks

This computes `arcsin(x)` in the interval `[-π / 2, +π / 2]` radians.

## Half.Asinh(Half) method

```csharp
public static Half Asinh (Half x);
```

Computes the hyperbolic arc-sine of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic arc-sine is to be computed.

Returns: The hyperbolic arc-sine of `x`.

To be added.

## Half.AsinPi(Half) method

```csharp
public static Half AsinPi (Half x);
```

Computes the arc-sine of a value and divides the result by `pi`.

Parameters:

- `x`: The value whose arc-sine is to be computed.

Returns: The arc-sine of `x`, divided by `pi`.

#### Remarks

This computes `arcsin(x) / π` in the interval `[-0.5, +0.5]`.

## Half.Atan(Half) method

```csharp
public static Half Atan (Half x);
```

Computes the arc-tangent of a value.

Parameters:

- `x`: The value, in radians, whose arc-tangent is to be computed.

Returns: The arc-tangent of `x`.

#### Remarks

This computes `arctan(x)` in the interval `[-π / 2, +π / 2]` radians.

## Half.Atan2(Half, Half) method

```csharp
public static Half Atan2 (Half y, Half x);
```

Computes the arc-tangent of the quotient of two values.

Parameters:

- `y`: The y-coordinate of a point.
- `x`: The x-coordinate of a point.

Returns: The arc-tangent of `y` divided-by `x`.

#### Remarks

This computes `arctan(y / x)` in the interval `[-π, +π]` radians.

## Half.Atan2Pi(Half, Half) method

```csharp
public static Half Atan2Pi (Half y, Half x);
```

Computes the arc-tangent for the quotient of two values and divides the result by `pi`.

Parameters:

- `y`: The y-coordinate of a point.
- `x`: The x-coordinate of a point.

Returns: The arc-tangent of `y` divided-by `x`, divided by `pi`.

#### Remarks

This computes `arctan(y / x) / π` in the interval `[-1, +1]`.

## Half.Atanh(Half) method

```csharp
public static Half Atanh (Half x);
```

Computes the hyperbolic arc-tangent of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic arc-tangent is to be computed.

Returns: The hyperbolic arc-tangent of `x`.

To be added.

## Half.AtanPi(Half) method

```csharp
public static Half AtanPi (Half x);
```

Computes the arc-tangent of a value and divides the result by pi.

Parameters:

- `x`: The value whose arc-tangent is to be computed.

Returns: The arc-tangent of `x`, divided by `pi`.

#### Remarks

This computes `arctan(x) / π` in the interval `[-0.5, +0.5]`.

## Half.BitDecrement(Half) method

```csharp
public static Half BitDecrement (Half x);
```

Decrements a value to the smallest value that compares less than a given value.

Parameters:

- `x`: The value to be bitwise decremented.

Returns: The smallest value that compares less than `x`.

To be added.

## Half.BitIncrement(Half) method

```csharp
public static Half BitIncrement (Half x);
```

Increments a value to the smallest value that compares greater than a given value.

Parameters:

- `x`: The value to be bitwise incremented.

Returns: The smallest value that compares greater than `x`.

To be added.

## Half.Cbrt(Half) method

```csharp
public static Half Cbrt (Half x);
```

Computes the cube-root of a value.

Parameters:

- `x`: The value whose cube-root is to be computed.

Returns: The cube-root of `x`.

To be added.

## Half.Ceiling(Half) method

```csharp
public static Half Ceiling (Half x);
```

Computes the ceiling of a value.

Parameters:

- `x`: The value whose ceiling is to be computed.

Returns: The ceiling of `x`.

To be added.

## Half.Clamp(Half, Half, Half) method

```csharp
public static Half Clamp (Half value, Half min, Half max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## Half.ClampNative(Half, Half, Half) method

```csharp
public static Half ClampNative (Half value, Half min, Half max);
```

To be added.

Parameters:

- `value`: To be added.
- `min`: To be added.
- `max`: To be added.

Returns: To be added.

To be added.

## Half.CompareTo(Half) method

```csharp
public int CompareTo (Half other);
```

Compares this instance to a specified half-precision floating-point number and returns an integer that indicates whether the value of this instance is less than, equal to, or greater than the value of the specified half-precision floating-point number.

Parameters:

- `other`: A half-precision floating-point number to compare.

Returns: A value less than zero if this is less than `other`, zero if this is equal to `other`, or a value greater than zero if this is greater than `other`.

To be added.

## Half.CompareTo(Object) method

```csharp
public int CompareTo (object? obj);
```

Compares this instance to a specified object and returns an integer that indicates whether the value of this instance is less than, equal to, or greater than the value of the specified object.

Parameters:

- `obj`: An object to compare, or `null`.

Returns: A value less than zero if this instance is less than `obj`, or this instance is not a number (NaN) and `obj` is a number.

-or-

Zero if this instance is equal to `obj`, or this instance and `obj` are both not a number (NaN), `Half.PositiveInfinity`, or `Half.NegativeInfinity`.

-or-

A value greater than zero if this instance is greater than `obj`, or this instance is a number and `obj` is not a number (NaN), or `obj` is `null`.

Exceptions:

- `ArgumentException`: `obj` is not of type `Half`.

To be added.

## Half.ConvertToInteger<TInteger>(Half) method

```csharp
public static TInteger ConvertToInteger<TInteger> (Half value) where TInteger : System.Numerics.IBinaryInteger<TInteger>;
```

To be added.

Parameters:

- `TInteger`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Half.ConvertToIntegerNative<TInteger>(Half) method

```csharp
public static TInteger ConvertToIntegerNative<TInteger> (Half value) where TInteger : System.Numerics.IBinaryInteger<TInteger>;
```

To be added.

Parameters:

- `TInteger`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Half.CopySign(Half, Half) method

```csharp
public static Half CopySign (Half value, Half sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## Half.Cos(Half) method

```csharp
public static Half Cos (Half x);
```

Computes the cosine of a value.

Parameters:

- `x`: The value, in radians, whose cosine is to be computed.

Returns: The cosine of `x`.

#### Remarks

This computes `cos(x)`.

## Half.Cosh(Half) method

```csharp
public static Half Cosh (Half x);
```

Computes the hyperbolic cosine of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic cosine is to be computed.

Returns: The hyperbolic cosine of `x`.

To be added.

## Half.CosPi(Half) method

```csharp
public static Half CosPi (Half x);
```

Computes the cosine of a value that has been multipled by `pi`.

Parameters:

- `x`: The value, in half-revolutions, whose cosine is to be computed.

Returns: The cosine of `x` multiplied-by `pi`.

#### Remarks

This computes `cos(x * π)`.

## Half.CreateChecked<TOther>(TOther) method

```csharp
public static Half CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## Half.CreateSaturating<TOther>(TOther) method

```csharp
public static Half CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that is used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.
