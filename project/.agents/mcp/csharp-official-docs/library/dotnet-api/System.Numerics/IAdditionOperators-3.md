---
title: "IAdditionOperators<TSelf,TOther,TResult> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IAdditionOperators`3.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IAdditionOperators<TSelf,TOther,TResult> interface

Namespace: `System.Numerics`

```csharp
public interface IAdditionOperators<TSelf,TOther,TResult> where TSelf : IAdditionOperators<TSelf,TOther,TResult>
```

Defines a mechanism for computing the sum of two values.

Parameters:

- `TSelf`: The type that implements this interface.
- `TOther`: The type that will be added to `TSelf`.
- `TResult`: The type that contains the sum of `TSelf` and `TOther`.

To be added.

## IAdditionOperators<TSelf,TOther,TResult>.op_Addition(TSelf, TOther) method

```csharp
public static abstract TResult operator + (TSelf left, TOther right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that is added to `left`.

Returns: The sum of `left` and `right`.

To be added.

## IAdditionOperators<TSelf,TOther,TResult>.op_CheckedAddition(TSelf, TOther) method

```csharp
public static virtual TResult op_CheckedAddition (TSelf left, TOther right);
```

Adds two values together to compute their sum.

Parameters:

- `left`: The value to which `right` is added.
- `right`: The value that is added to `left`.

Returns: The sum of `left` and `right`.

Exceptions:

- `OverflowException`: The sum of `left` and `right` is not representable by `TResult`.

To be added.
