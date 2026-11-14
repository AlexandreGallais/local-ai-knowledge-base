---
title: "ITrigonometricFunctions<TSelf> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/ITrigonometricFunctions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ITrigonometricFunctions<TSelf> interface

Namespace: `System.Numerics`

```csharp
public interface ITrigonometricFunctions<TSelf> : IEquatable<TSelf>, IParsable<TSelf>, ISpanParsable<TSelf>, IUtf8SpanParsable<TSelf>, System.Numerics.IAdditionOperators<TSelf,TSelf,TSelf>, System.Numerics.IAdditiveIdentity<TSelf,TSelf>, System.Numerics.IDecrementOperators<TSelf>, System.Numerics.IDivisionOperators<TSelf,TSelf,TSelf>, System.Numerics.IEqualityOperators<TSelf,TSelf,bool>, System.Numerics.IFloatingPointConstants<TSelf>, System.Numerics.IIncrementOperators<TSelf>, System.Numerics.IMultiplicativeIdentity<TSelf,TSelf>, System.Numerics.IMultiplyOperators<TSelf,TSelf,TSelf>, System.Numerics.INumberBase<TSelf>, System.Numerics.ISubtractionOperators<TSelf,TSelf,TSelf>, System.Numerics.IUnaryNegationOperators<TSelf,TSelf>, System.Numerics.IUnaryPlusOperators<TSelf,TSelf> where TSelf : ITrigonometricFunctions<TSelf>
```

Defines support for trigonometric functions.

Parameters:

- `TSelf`: The type that implements this interface.

To be added.

## ITrigonometricFunctions<TSelf>.Acos(TSelf) method

```csharp
public static abstract TSelf Acos (TSelf x);
```

Computes the arc-cosine of a value.

Parameters:

- `x`: The value, in radians, whose arc-cosine is to be computed.

Returns: The arc-cosine of `x`.

#### Remarks

This computes `arccos(x)` in the interval `[+0, +π]` radians.

## ITrigonometricFunctions<TSelf>.AcosPi(TSelf) method

```csharp
public static abstract TSelf AcosPi (TSelf x);
```

Computes the arc-cosine of a value and divides the result by `pi`.

Parameters:

- `x`: The value whose arc-cosine is to be computed.

Returns: The arc-cosine of `x`, divided by `pi`.

#### Remarks

This computes `arccos(x) / π` in the interval `[-0.5, +0.5]`.

## ITrigonometricFunctions<TSelf>.Asin(TSelf) method

```csharp
public static abstract TSelf Asin (TSelf x);
```

Computes the arc-sine of a value.

Parameters:

- `x`: The value, in radians, whose arc-sine is to be computed.

Returns: The arc-sine of `x`.

#### Remarks

This computes `arcsin(x)` in the interval `[-π / 2, +π / 2]` radians.

## ITrigonometricFunctions<TSelf>.AsinPi(TSelf) method

```csharp
public static abstract TSelf AsinPi (TSelf x);
```

Computes the arc-sine of a value and divides the result by `pi`.

Parameters:

- `x`: The value whose arc-sine is to be computed.

Returns: The arc-sine of `x`, divided by `pi`.

#### Remarks

This computes `arcsin(x) / π` in the interval `[-0.5, +0.5]`.

## ITrigonometricFunctions<TSelf>.Atan(TSelf) method

```csharp
public static abstract TSelf Atan (TSelf x);
```

Computes the arc-tangent of a value.

Parameters:

- `x`: The value, in radians, whose arc-tangent is to be computed.

Returns: The arc-tangent of `x`.

#### Remarks

This computes `arctan(x)` in the interval `[-π / 2, +π / 2]` radians.

## ITrigonometricFunctions<TSelf>.AtanPi(TSelf) method

```csharp
public static abstract TSelf AtanPi (TSelf x);
```

Computes the arc-tangent of a value and divides the result by pi.

Parameters:

- `x`: The value whose arc-tangent is to be computed.

Returns: The arc-tangent of `x`, divided by `pi`.

#### Remarks

This computes `arctan(x) / π` in the interval `[-0.5, +0.5]`.

## ITrigonometricFunctions<TSelf>.Cos(TSelf) method

```csharp
public static abstract TSelf Cos (TSelf x);
```

Computes the cosine of a value.

Parameters:

- `x`: The value, in radians, whose cosine is to be computed.

Returns: The cosine of `x`.

#### Remarks

This computes `cos(x)`.

## ITrigonometricFunctions<TSelf>.CosPi(TSelf) method

```csharp
public static abstract TSelf CosPi (TSelf x);
```

Computes the cosine of a value that has been multipled by `pi`.

Parameters:

- `x`: The value, in half-revolutions, whose cosine is to be computed.

Returns: The cosine of `x` multiplied-by `pi`.

#### Remarks

This computes `cos(x * π)`.

## ITrigonometricFunctions<TSelf>.DegreesToRadians(TSelf) method

```csharp
public static virtual TSelf DegreesToRadians (TSelf degrees);
```

Converts a given value from degrees to radians.

Parameters:

- `degrees`: The value to convert to radians.

Returns: The value of `degrees` converted to radians.

To be added.

## ITrigonometricFunctions<TSelf>.RadiansToDegrees(TSelf) method

```csharp
public static virtual TSelf RadiansToDegrees (TSelf radians);
```

Converts a given value from radians to degrees.

Parameters:

- `radians`: The value to convert to degrees.

Returns: The value of `radians` converted to degrees.

To be added.

## ITrigonometricFunctions<TSelf>.Sin(TSelf) method

```csharp
public static abstract TSelf Sin (TSelf x);
```

Computes the sine of a value.

Parameters:

- `x`: The value, in radians, whose sine is to be computed.

Returns: The sine of `x`.

#### Remarks

This computes `sin(x)`.

## ITrigonometricFunctions<TSelf>.SinCos(TSelf) method

```csharp
public static abstract (TSelf Sin, TSelf Cos) SinCos (TSelf x);
```

Computes the sine and cosine of a value.

Parameters:

- `x`: The value, in radians, whose sine and cosine are to be computed.

Returns: The sine and cosine of `x`.

#### Remarks

This computes `(sin(x), cos(x))`.

## ITrigonometricFunctions<TSelf>.SinCosPi(TSelf) method

```csharp
public static abstract (TSelf SinPi, TSelf CosPi) SinCosPi (TSelf x);
```

Computes the sine and cosine of a value that has been multiplied by `pi`.

Parameters:

- `x`: The value, in half-revolutions, that is multipled by `pi` before computing its sine and cosine.

Returns: The sine and cosine of`x` multiplied-by `pi`.

#### Remarks

This computes `(sin(x * π), cos(x * π))`.

## ITrigonometricFunctions<TSelf>.SinPi(TSelf) method

```csharp
public static abstract TSelf SinPi (TSelf x);
```

Computes the sine of a value that has been multiplied by `pi`.

Parameters:

- `x`: The value, in half-revolutions, that is multipled by `pi` before computing its sine.

Returns: The sine of `x` multiplied-by `pi`.

#### Remarks

This computes `sin(x * π)`.

## ITrigonometricFunctions<TSelf>.Tan(TSelf) method

```csharp
public static abstract TSelf Tan (TSelf x);
```

Computes the tangent of a value.

Parameters:

- `x`: The value, in radians, whose tangent is to be computed.

Returns: The tangent of `x`.

#### Remarks

This computes `tan(x)`.

## ITrigonometricFunctions<TSelf>.TanPi(TSelf) method

```csharp
public static abstract TSelf TanPi (TSelf x);
```

Computes the tangent of a value that has been multipled by `pi`.

Parameters:

- `x`: The value, in half-revolutions, that is multipled by `pi` before computing its tangent.

Returns: The tangent of `x` multiplied-by `pi`.

#### Remarks

This computes `tan(x * π)`.
