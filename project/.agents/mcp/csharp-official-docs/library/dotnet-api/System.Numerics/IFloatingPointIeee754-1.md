---
title: "IFloatingPointIeee754<TSelf> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IFloatingPointIeee754`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IFloatingPointIeee754<TSelf> interface

Namespace: `System.Numerics`

```csharp
public interface IFloatingPointIeee754<TSelf> : IComparable<TSelf>, IEquatable<TSelf>, IParsable<TSelf>, ISpanParsable<TSelf>, IUtf8SpanParsable<TSelf>, System.Numerics.IAdditionOperators<TSelf,TSelf,TSelf>, System.Numerics.IAdditiveIdentity<TSelf,TSelf>, System.Numerics.IComparisonOperators<TSelf,TSelf,bool>, System.Numerics.IDecrementOperators<TSelf>, System.Numerics.IDivisionOperators<TSelf,TSelf,TSelf>, System.Numerics.IEqualityOperators<TSelf,TSelf,bool>, System.Numerics.IExponentialFunctions<TSelf>, System.Numerics.IFloatingPoint<TSelf>, System.Numerics.IFloatingPointConstants<TSelf>, System.Numerics.IHyperbolicFunctions<TSelf>, System.Numerics.IIncrementOperators<TSelf>, System.Numerics.ILogarithmicFunctions<TSelf>, System.Numerics.IModulusOperators<TSelf,TSelf,TSelf>, System.Numerics.IMultiplicativeIdentity<TSelf,TSelf>, System.Numerics.IMultiplyOperators<TSelf,TSelf,TSelf>, System.Numerics.INumber<TSelf>, System.Numerics.INumberBase<TSelf>, System.Numerics.IPowerFunctions<TSelf>, System.Numerics.IRootFunctions<TSelf>, System.Numerics.ISignedNumber<TSelf>, System.Numerics.ISubtractionOperators<TSelf,TSelf,TSelf>, System.Numerics.ITrigonometricFunctions<TSelf>, System.Numerics.IUnaryNegationOperators<TSelf,TSelf>, System.Numerics.IUnaryPlusOperators<TSelf,TSelf> where TSelf : IFloatingPointIeee754<TSelf>
```

Defines an IEEE 754 floating-point type.

Parameters:

- `TSelf`: The type that implements the interface.

To be added.

## IFloatingPointIeee754<TSelf>.Epsilon property

```csharp
public static abstract TSelf Epsilon { get; }
```

Gets the smallest value such that can be added to `0` that does not result in `0`.

Returns: To be added.

To be added.

## IFloatingPointIeee754<TSelf>.NaN property

```csharp
public static abstract TSelf NaN { get; }
```

Gets a value that represents `NaN`.

Returns: To be added.

To be added.

## IFloatingPointIeee754<TSelf>.NegativeInfinity property

```csharp
public static abstract TSelf NegativeInfinity { get; }
```

Gets a value that represents negative `infinity`.

Returns: To be added.

To be added.

## IFloatingPointIeee754<TSelf>.NegativeZero property

```csharp
public static abstract TSelf NegativeZero { get; }
```

Gets a value that represents negative `zero`.

Returns: To be added.

To be added.

## IFloatingPointIeee754<TSelf>.PositiveInfinity property

```csharp
public static abstract TSelf PositiveInfinity { get; }
```

Gets a value that represents positive `infinity`.

Returns: To be added.

To be added.

## IFloatingPointIeee754<TSelf>.Atan2(TSelf, TSelf) method

```csharp
public static abstract TSelf Atan2 (TSelf y, TSelf x);
```

Computes the arc-tangent for the quotient of two values.

Parameters:

- `y`: The y-coordinate of a point.
- `x`: The x-coordinate of a point.

Returns: The arc-tangent of `y` divided-by `x`.

#### Remarks

This computes `arctan(y / x)` in the interval `[-π, +π]` radians.

## IFloatingPointIeee754<TSelf>.Atan2Pi(TSelf, TSelf) method

```csharp
public static abstract TSelf Atan2Pi (TSelf y, TSelf x);
```

Computes the arc-tangent for the quotient of two values and divides the result by `pi`.

Parameters:

- `y`: The y-coordinate of a point.
- `x`: The x-coordinate of a point.

Returns: The arc-tangent of `y` divided-by `x`, divided by `pi`.

#### Remarks

This computes `arctan(y / x) / π` in the interval `[-1, +1]`.

## IFloatingPointIeee754<TSelf>.BitDecrement(TSelf) method

```csharp
public static abstract TSelf BitDecrement (TSelf x);
```

Returns the largest value that compares less than a specified value.

Parameters:

- `x`: The value to be bitwise decremented.

Returns: The largest value that compares less than `x`.

To be added.

## IFloatingPointIeee754<TSelf>.BitIncrement(TSelf) method

```csharp
public static abstract TSelf BitIncrement (TSelf x);
```

Returns the smallest value that compares greater than a specified value.

Parameters:

- `x`: The value to be bitwise incremented.

Returns: The smallest value that compares greater than `x`.

To be added.

## IFloatingPointIeee754<TSelf>.FusedMultiplyAdd(TSelf, TSelf, TSelf) method

```csharp
public static abstract TSelf FusedMultiplyAdd (TSelf left, TSelf right, TSelf addend);
```

Computes the fused multiply-add of three values.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.
- `addend`: The value that is added to the product of `left` and `right`.

Returns: The result of `left` times `right` plus `addend` computed as one ternary operation.

To be added.

## IFloatingPointIeee754<TSelf>.Ieee754Remainder(TSelf, TSelf) method

```csharp
public static abstract TSelf Ieee754Remainder (TSelf left, TSelf right);
```

Computes the remainder of two values as specified by IEEE 754.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The remainder of `left` divided by `right` as specified by IEEE 754.

To be added.

## IFloatingPointIeee754<TSelf>.ILogB(TSelf) method

```csharp
public static abstract int ILogB (TSelf x);
```

Computes the integer logarithm of a value.

Parameters:

- `x`: The value whose integer logarithm is to be computed.

Returns: The integer logarithm of `x`.

To be added.

## IFloatingPointIeee754<TSelf>.Lerp(TSelf, TSelf, TSelf) method

```csharp
public static virtual TSelf Lerp (TSelf value1, TSelf value2, TSelf amount);
```

Performs a linear interpolation between two values based on the given weight.

Parameters:

- `value1`: The first value, which is intended to be the lower bound.
- `value2`: The second value, which is intended to be the upper bound.
- `amount`: A value, intended to be between 0 and 1, that indicates the weight of the interpolation.

Returns: The interpolated value.

This method presumes inputs are well formed and does not validate that `value1 < value2` nor that `0 <= amount <= 1`.

## IFloatingPointIeee754<TSelf>.ReciprocalEstimate(TSelf) method

```csharp
public static virtual TSelf ReciprocalEstimate (TSelf x);
```

Computes an estimate of the reciprocal of a value.

Parameters:

- `x`: The value whose estimate of the reciprocal is to be computed.

Returns: An estimate of the reciprocal of `x`.

To be added.

## IFloatingPointIeee754<TSelf>.ReciprocalSqrtEstimate(TSelf) method

```csharp
public static virtual TSelf ReciprocalSqrtEstimate (TSelf x);
```

Computes an estimate of the reciprocal square root of a value.

Parameters:

- `x`: The value whose estimate of the reciprocal square root is to be computed.

Returns: An estimate of the reciprocal square root of `x`.

To be added.

## IFloatingPointIeee754<TSelf>.ScaleB(TSelf, Int32) method

```csharp
public static abstract TSelf ScaleB (TSelf x, int n);
```

Computes the product of a value and its base-radix raised to the specified power.

Parameters:

- `x`: The value that base-radix raised to the power of `n` multiplies.
- `n`: The value to which base-radix is raised before multipliying `x`.

Returns: The product of `x` and base-radix raised to the power of `n`.

To be added.
