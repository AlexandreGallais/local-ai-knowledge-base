---
title: "IUnaryNegationOperators<TSelf,TResult> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IUnaryNegationOperators`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IUnaryNegationOperators<TSelf,TResult> interface

Namespace: `System.Numerics`

```csharp
public interface IUnaryNegationOperators<TSelf,TResult> where TSelf : IUnaryNegationOperators<TSelf,TResult>
```

Defines a mechanism for computing the unary negation of a value.

Parameters:

- `TSelf`: The type that implements this interface.
- `TResult`: The type that contains the result of negating `TSelf`.

To be added.

## IUnaryNegationOperators<TSelf,TResult>.op_CheckedUnaryNegation(TSelf) method

```csharp
public static virtual TResult op_CheckedUnaryNegation (TSelf value);
```

Computes the checked unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

Exceptions:

- `OverflowException`: The unary negation of `value` is not representable by `TResult`.

To be added.

## IUnaryNegationOperators<TSelf,TResult>.op_UnaryNegation(TSelf) method

```csharp
public static abstract TResult operator - (TSelf value);
```

Computes the unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.
