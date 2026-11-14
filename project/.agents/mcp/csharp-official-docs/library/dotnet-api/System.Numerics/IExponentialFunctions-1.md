---
title: "IExponentialFunctions<TSelf> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IExponentialFunctions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IExponentialFunctions<TSelf> interface

Namespace: `System.Numerics`

```csharp
public interface IExponentialFunctions<TSelf> : IEquatable<TSelf>, IParsable<TSelf>, ISpanParsable<TSelf>, IUtf8SpanParsable<TSelf>, System.Numerics.IAdditionOperators<TSelf,TSelf,TSelf>, System.Numerics.IAdditiveIdentity<TSelf,TSelf>, System.Numerics.IDecrementOperators<TSelf>, System.Numerics.IDivisionOperators<TSelf,TSelf,TSelf>, System.Numerics.IEqualityOperators<TSelf,TSelf,bool>, System.Numerics.IFloatingPointConstants<TSelf>, System.Numerics.IIncrementOperators<TSelf>, System.Numerics.IMultiplicativeIdentity<TSelf,TSelf>, System.Numerics.IMultiplyOperators<TSelf,TSelf,TSelf>, System.Numerics.INumberBase<TSelf>, System.Numerics.ISubtractionOperators<TSelf,TSelf,TSelf>, System.Numerics.IUnaryNegationOperators<TSelf,TSelf>, System.Numerics.IUnaryPlusOperators<TSelf,TSelf> where TSelf : IExponentialFunctions<TSelf>
```

Defines support for exponential functions.

Parameters:

- `TSelf`: The type that implements this interface.

To be added.

## IExponentialFunctions<TSelf>.Exp(TSelf) method

```csharp
public static abstract TSelf Exp (TSelf x);
```

Computes `E` raised to a given power.

Parameters:

- `x`: The power to which `E` is raised.

Returns: `E` raised to the power of `x`.

To be added.

## IExponentialFunctions<TSelf>.Exp10(TSelf) method

```csharp
public static abstract TSelf Exp10 (TSelf x);
```

Computes `10` raised to a given power.

Parameters:

- `x`: The power to which `10` is raised.

Returns: `10`x``

To be added.

## IExponentialFunctions<TSelf>.Exp10M1(TSelf) method

```csharp
public static virtual TSelf Exp10M1 (TSelf x);
```

Computes `10` raised to a given power and subtracts one.

Parameters:

- `x`: The power to which `10` is raised.

Returns: `10`x` - 1`

To be added.

## IExponentialFunctions<TSelf>.Exp2(TSelf) method

```csharp
public static abstract TSelf Exp2 (TSelf x);
```

Computes `2` raised to a given power.

Parameters:

- `x`: The power to which `2` is raised.

Returns: `2`x``

To be added.

## IExponentialFunctions<TSelf>.Exp2M1(TSelf) method

```csharp
public static virtual TSelf Exp2M1 (TSelf x);
```

Computes `2` raised to a given power and subtracts one.

Parameters:

- `x`: The power to which `2` is raised.

Returns: `2`x` - 1`

To be added.

## IExponentialFunctions<TSelf>.ExpM1(TSelf) method

```csharp
public static virtual TSelf ExpM1 (TSelf x);
```

Computes `E` raised to a given power and subtracts one.

Parameters:

- `x`: The power to which `E` is raised.

Returns: `E`x` - 1`

To be added.
