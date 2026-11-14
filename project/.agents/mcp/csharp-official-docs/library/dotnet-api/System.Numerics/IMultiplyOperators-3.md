---
title: "IMultiplyOperators<TSelf,TOther,TResult> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IMultiplyOperators`3.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IMultiplyOperators<TSelf,TOther,TResult> interface

Namespace: `System.Numerics`

```csharp
public interface IMultiplyOperators<TSelf,TOther,TResult> where TSelf : IMultiplyOperators<TSelf,TOther,TResult>
```

Defines a mechanism for computing the product of two values.

Parameters:

- `TSelf`: The type that implements this interface.
- `TOther`: The type that will multiply `TSelf`.
- `TResult`: The type that contains the product of `TSelf` and `TOther`.

To be added.

## IMultiplyOperators<TSelf,TOther,TResult>.op_CheckedMultiply(TSelf, TOther) method

```csharp
public static virtual TResult op_CheckedMultiply (TSelf left, TOther right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

Exceptions:

- `OverflowException`: The product of `left` multiplied by `right` is not representable by `TResult`.

To be added.

## IMultiplyOperators<TSelf,TOther,TResult>.op_Multiply(TSelf, TOther) method

```csharp
public static abstract TResult operator * (TSelf left, TOther right);
```

Multiplies two values together to compute their product.

Parameters:

- `left`: The value that `right` multiplies.
- `right`: The value that multiplies `left`.

Returns: The product of `left` multiplied by `right`.

To be added.
