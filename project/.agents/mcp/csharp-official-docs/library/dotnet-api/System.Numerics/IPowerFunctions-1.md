---
title: "IPowerFunctions<TSelf> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IPowerFunctions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPowerFunctions<TSelf> interface

Namespace: `System.Numerics`

```csharp
public interface IPowerFunctions<TSelf> : IEquatable<TSelf>, IParsable<TSelf>, ISpanParsable<TSelf>, IUtf8SpanParsable<TSelf>, System.Numerics.IAdditionOperators<TSelf,TSelf,TSelf>, System.Numerics.IAdditiveIdentity<TSelf,TSelf>, System.Numerics.IDecrementOperators<TSelf>, System.Numerics.IDivisionOperators<TSelf,TSelf,TSelf>, System.Numerics.IEqualityOperators<TSelf,TSelf,bool>, System.Numerics.IIncrementOperators<TSelf>, System.Numerics.IMultiplicativeIdentity<TSelf,TSelf>, System.Numerics.IMultiplyOperators<TSelf,TSelf,TSelf>, System.Numerics.INumberBase<TSelf>, System.Numerics.ISubtractionOperators<TSelf,TSelf,TSelf>, System.Numerics.IUnaryNegationOperators<TSelf,TSelf>, System.Numerics.IUnaryPlusOperators<TSelf,TSelf> where TSelf : IPowerFunctions<TSelf>
```

Defines support for power functions.

Parameters:

- `TSelf`: The type that implements this interface.

To be added.

## IPowerFunctions<TSelf>.Pow(TSelf, TSelf) method

```csharp
public static abstract TSelf Pow (TSelf x, TSelf y);
```

Computes a value raised to a given power.

Parameters:

- `x`: The value that is raised to the power of `x`.
- `y`: The power to which `x` is raised.

Returns: `x` raised to the power of `y`.

To be added.
