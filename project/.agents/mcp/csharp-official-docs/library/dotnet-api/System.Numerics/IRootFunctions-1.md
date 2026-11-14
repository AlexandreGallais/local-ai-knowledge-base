---
title: "IRootFunctions<TSelf> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IRootFunctions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IRootFunctions<TSelf> interface

Namespace: `System.Numerics`

```csharp
public interface IRootFunctions<TSelf> : IEquatable<TSelf>, IParsable<TSelf>, ISpanParsable<TSelf>, IUtf8SpanParsable<TSelf>, System.Numerics.IAdditionOperators<TSelf,TSelf,TSelf>, System.Numerics.IAdditiveIdentity<TSelf,TSelf>, System.Numerics.IDecrementOperators<TSelf>, System.Numerics.IDivisionOperators<TSelf,TSelf,TSelf>, System.Numerics.IEqualityOperators<TSelf,TSelf,bool>, System.Numerics.IFloatingPointConstants<TSelf>, System.Numerics.IIncrementOperators<TSelf>, System.Numerics.IMultiplicativeIdentity<TSelf,TSelf>, System.Numerics.IMultiplyOperators<TSelf,TSelf,TSelf>, System.Numerics.INumberBase<TSelf>, System.Numerics.ISubtractionOperators<TSelf,TSelf,TSelf>, System.Numerics.IUnaryNegationOperators<TSelf,TSelf>, System.Numerics.IUnaryPlusOperators<TSelf,TSelf> where TSelf : IRootFunctions<TSelf>
```

Defines support for root functions.

Parameters:

- `TSelf`: The type that implements this interface.

To be added.

## IRootFunctions<TSelf>.Cbrt(TSelf) method

```csharp
public static abstract TSelf Cbrt (TSelf x);
```

Computes the cube-root of a value.

Parameters:

- `x`: The value whose cube-root is to be computed.

Returns: The cube-root of `x`.

To be added.

## IRootFunctions<TSelf>.Hypot(TSelf, TSelf) method

```csharp
public static abstract TSelf Hypot (TSelf x, TSelf y);
```

Computes the hypotenuse given two values representing the lengths of the shorter sides in a right-angled triangle.

Parameters:

- `x`: The value to square and add to `y`.
- `y`: The value to square and add to `x`.

Returns: The square root of `x`-squared plus `y`-squared.

To be added.

## IRootFunctions<TSelf>.RootN(TSelf, Int32) method

```csharp
public static abstract TSelf RootN (TSelf x, int n);
```

Computes the n-th root of a value.

Parameters:

- `x`: The value whose `n`-th root is to be computed.
- `n`: The degree of the root to be computed.

Returns: The `n`-th root of `x`.

To be added.

## IRootFunctions<TSelf>.Sqrt(TSelf) method

```csharp
public static abstract TSelf Sqrt (TSelf x);
```

Computes the square-root of a value.

Parameters:

- `x`: The value whose square-root is to be computed.

Returns: The square-root of `x`.

To be added.
