---
title: "ISubtractionOperators<TSelf,TOther,TResult> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/ISubtractionOperators`3.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ISubtractionOperators<TSelf,TOther,TResult> interface

Namespace: `System.Numerics`

```csharp
public interface ISubtractionOperators<TSelf,TOther,TResult> where TSelf : ISubtractionOperators<TSelf,TOther,TResult>
```

Defines a mechanism for computing the difference of two values.

Parameters:

- `TSelf`: The type that implements this interface.
- `TOther`: The type that will be subtracted from `TSelf`.
- `TResult`: The type that contains the value of `TOther` subtracted from `TSelf`.

To be added.

## ISubtractionOperators<TSelf,TOther,TResult>.op_CheckedSubtraction(TSelf, TOther) method

```csharp
public static virtual TResult op_CheckedSubtraction (TSelf left, TOther right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that is subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

Exceptions:

- `OverflowException`: The value of `right` subtracted from `left` is not representable by `TResult`.

To be added.

## ISubtractionOperators<TSelf,TOther,TResult>.op_Subtraction(TSelf, TOther) method

```csharp
public static abstract TResult operator - (TSelf left, TOther right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that is subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

To be added.
