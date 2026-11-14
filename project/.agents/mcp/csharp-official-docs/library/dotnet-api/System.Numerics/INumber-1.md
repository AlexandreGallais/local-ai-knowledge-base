---
title: "INumber<TSelf> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/INumber`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# INumber<TSelf> interface

Namespace: `System.Numerics`

```csharp
public interface INumber<TSelf> : IComparable, IComparable<TSelf>, IEquatable<TSelf>, IParsable<TSelf>, ISpanParsable<TSelf>, IUtf8SpanParsable<TSelf>, System.Numerics.IAdditionOperators<TSelf,TSelf,TSelf>, System.Numerics.IAdditiveIdentity<TSelf,TSelf>, System.Numerics.IComparisonOperators<TSelf,TSelf,bool>, System.Numerics.IDecrementOperators<TSelf>, System.Numerics.IDivisionOperators<TSelf,TSelf,TSelf>, System.Numerics.IEqualityOperators<TSelf,TSelf,bool>, System.Numerics.IIncrementOperators<TSelf>, System.Numerics.IModulusOperators<TSelf,TSelf,TSelf>, System.Numerics.IMultiplicativeIdentity<TSelf,TSelf>, System.Numerics.IMultiplyOperators<TSelf,TSelf,TSelf>, System.Numerics.INumberBase<TSelf>, System.Numerics.ISubtractionOperators<TSelf,TSelf,TSelf>, System.Numerics.IUnaryNegationOperators<TSelf,TSelf>, System.Numerics.IUnaryPlusOperators<TSelf,TSelf> where TSelf : INumber<TSelf>
```

Defines a number type.

Parameters:

- `TSelf`: The type that implements the interface.

To be added.

## INumber<TSelf>.Clamp(TSelf, TSelf, TSelf) method

```csharp
public static virtual TSelf Clamp (TSelf value, TSelf min, TSelf max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

Exceptions:

- `ArgumentException`: `min` is greater than `max`.

To be added.

## INumber<TSelf>.ClampNative(TSelf, TSelf, TSelf) method

```csharp
public static virtual TSelf ClampNative (TSelf value, TSelf min, TSelf max);
```

Clamps a value to an inclusive minimum and maximum value using platform-specific behavior for `NaN` and `NegativeZero`.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

Exceptions:

- `ArgumentException`: `min` is greater than `max`.

To be added.

## INumber<TSelf>.CopySign(TSelf, TSelf) method

```csharp
public static virtual TSelf CopySign (TSelf value, TSelf sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## INumber<TSelf>.Max(TSelf, TSelf) method

```csharp
public static virtual TSelf Max (TSelf x, TSelf y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>`, this method matches the IEEE 754:2019 `maximum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## INumber<TSelf>.MaxNative(TSelf, TSelf) method

```csharp
public static virtual TSelf MaxNative (TSelf x, TSelf y);
```

Compares two values to compute which is greater using platform-specific behavior for `NaN` and `NegativeZero`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## INumber<TSelf>.MaxNumber(TSelf, TSelf) method

```csharp
public static virtual TSelf MaxNumber (TSelf x, TSelf y);
```

Compares two values to compute which is greater and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `maximumNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## INumber<TSelf>.Min(TSelf, TSelf) method

```csharp
public static virtual TSelf Min (TSelf x, TSelf y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>`, this method matches the IEEE 754:2019 `minimum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## INumber<TSelf>.MinNative(TSelf, TSelf) method

```csharp
public static virtual TSelf MinNative (TSelf x, TSelf y);
```

Compares two values to compute which is lesser using platform-specific behavior for `NaN` and `NegativeZero`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is lesser than `y`; otherwise, `y`.

To be added.

## INumber<TSelf>.MinNumber(TSelf, TSelf) method

```csharp
public static virtual TSelf MinNumber (TSelf x, TSelf y);
```

Compares two values to compute which is lesser and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `minimumNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## INumber<TSelf>.Sign(TSelf) method

```csharp
public static virtual int Sign (TSelf value);
```

Computes the sign of a value.

Parameters:

- `value`: The value whose sign is to be computed.

Returns: A positive value if `value` is positive, `0` if `value` is zero, and a negative value if `value` is negative.

#### Remarks

It is recommended that a function return `1`, `0`, and `-1`, respectively.
