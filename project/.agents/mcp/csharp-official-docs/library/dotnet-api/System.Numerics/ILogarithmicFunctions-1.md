---
title: "ILogarithmicFunctions<TSelf> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/ILogarithmicFunctions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ILogarithmicFunctions<TSelf> interface

Namespace: `System.Numerics`

```csharp
public interface ILogarithmicFunctions<TSelf> : IEquatable<TSelf>, IParsable<TSelf>, ISpanParsable<TSelf>, IUtf8SpanParsable<TSelf>, System.Numerics.IAdditionOperators<TSelf,TSelf,TSelf>, System.Numerics.IAdditiveIdentity<TSelf,TSelf>, System.Numerics.IDecrementOperators<TSelf>, System.Numerics.IDivisionOperators<TSelf,TSelf,TSelf>, System.Numerics.IEqualityOperators<TSelf,TSelf,bool>, System.Numerics.IFloatingPointConstants<TSelf>, System.Numerics.IIncrementOperators<TSelf>, System.Numerics.IMultiplicativeIdentity<TSelf,TSelf>, System.Numerics.IMultiplyOperators<TSelf,TSelf,TSelf>, System.Numerics.INumberBase<TSelf>, System.Numerics.ISubtractionOperators<TSelf,TSelf,TSelf>, System.Numerics.IUnaryNegationOperators<TSelf,TSelf>, System.Numerics.IUnaryPlusOperators<TSelf,TSelf> where TSelf : ILogarithmicFunctions<TSelf>
```

Defines support for logarithmic functions.

Parameters:

- `TSelf`: The type that implements this interface.

To be added.

## ILogarithmicFunctions<TSelf>.Log(TSelf) method

```csharp
public static abstract TSelf Log (TSelf x);
```

Computes the natural (`base-E` logarithm of a value.

Parameters:

- `x`: The value whose natural logarithm is to be computed.

Returns: The natural logarithm of `x`.

To be added.

## ILogarithmicFunctions<TSelf>.Log(TSelf, TSelf) method

```csharp
public static abstract TSelf Log (TSelf x, TSelf newBase);
```

Computes the logarithm of a value in the specified base.

Parameters:

- `x`: The value whose logarithm is to be computed.
- `newBase`: The base in which the logarithm is to be computed.

Returns: The base-`newBase` logarithm of `x`.

To be added.

## ILogarithmicFunctions<TSelf>.Log10(TSelf) method

```csharp
public static abstract TSelf Log10 (TSelf x);
```

Computes the base-10 logarithm of a value.

Parameters:

- `x`: The value whose base-10 logarithm is to be computed.

Returns: The base-10 logarithm of `x`.

To be added.

## ILogarithmicFunctions<TSelf>.Log10P1(TSelf) method

```csharp
public static virtual TSelf Log10P1 (TSelf x);
```

Computes the base-10 logarithm of a value plus one.

Parameters:

- `x`: The value to which one is added before computing the base-10 logarithm.

Returns: `log10(`x` + 1)`

To be added.

## ILogarithmicFunctions<TSelf>.Log2(TSelf) method

```csharp
public static abstract TSelf Log2 (TSelf x);
```

Computes the base-2 logarithm of a value.

Parameters:

- `x`: The value whose base-2 logarithm is to be computed.

Returns: The base-2 logarithm of `x`.

To be added.

## ILogarithmicFunctions<TSelf>.Log2P1(TSelf) method

```csharp
public static virtual TSelf Log2P1 (TSelf x);
```

Computes the base-2 logarithm of a value plus one.

Parameters:

- `x`: The value to which one is added before computing the base-2 logarithm.

Returns: `log2(`x` + 1)`

To be added.

## ILogarithmicFunctions<TSelf>.LogP1(TSelf) method

```csharp
public static virtual TSelf LogP1 (TSelf x);
```

Computes the natural (`base-E`) logarithm of a value plus one.

Parameters:

- `x`: The value to which one is added before computing the natural logarithm.

Returns: `loge(`x` + 1)`

To be added.
