---
title: "IEqualityOperators<TSelf,TOther,TResult> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IEqualityOperators`3.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IEqualityOperators<TSelf,TOther,TResult> interface

Namespace: `System.Numerics`

```csharp
public interface IEqualityOperators<TSelf,TOther,TResult> where TSelf : IEqualityOperators<TSelf,TOther,TResult>
```

Defines a mechanism for comparing two values to determine equality.

Parameters:

- `TSelf`: The type that implements this interface.
- `TOther`: The type that will be compared with `TSelf`.
- `TResult`: The type that is returned as a result of the comparison.

To be added.

## IEqualityOperators<TSelf,TOther,TResult>.op_Equality(TSelf, TOther) method

```csharp
public static abstract TResult operator == (TSelf? left, TOther? right);
```

Compares two values to determine equality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## IEqualityOperators<TSelf,TOther,TResult>.op_Inequality(TSelf, TOther) method

```csharp
public static abstract TResult operator != (TSelf? left, TOther? right);
```

Compares two values to determine inequality.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.
