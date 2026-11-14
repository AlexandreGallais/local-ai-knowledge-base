---
title: "IUnaryPlusOperators<TSelf,TResult> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IUnaryPlusOperators`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IUnaryPlusOperators<TSelf,TResult> interface

Namespace: `System.Numerics`

```csharp
public interface IUnaryPlusOperators<TSelf,TResult> where TSelf : IUnaryPlusOperators<TSelf,TResult>
```

Defines a mechanism for computing the unary plus of a value.

Parameters:

- `TSelf`: The type that implements this interface.
- `TResult`: The type that contains the result of negating `TSelf`.

To be added.

## IUnaryPlusOperators<TSelf,TResult>.op_UnaryPlus(TSelf) method

```csharp
public static abstract TResult operator + (TSelf value);
```

Computes the unary plus of a value.

Parameters:

- `value`: The value for which to compute the unary plus.

Returns: The unary plus of `value`.

To be added.
