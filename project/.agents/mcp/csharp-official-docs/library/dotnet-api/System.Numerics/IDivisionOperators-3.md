---
title: "IDivisionOperators<TSelf,TOther,TResult> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IDivisionOperators`3.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IDivisionOperators<TSelf,TOther,TResult> interface

Namespace: `System.Numerics`

```csharp
public interface IDivisionOperators<TSelf,TOther,TResult> where TSelf : IDivisionOperators<TSelf,TOther,TResult>
```

Defines a mechanism for computing the quotient of two values.

Parameters:

- `TSelf`: The type that implements this interface.
- `TOther`: The type that will divide `TSelf`.
- `TResult`: The type that contains the quotient of `TSelf` and `TOther`.

To be added.

## IDivisionOperators<TSelf,TOther,TResult>.op_CheckedDivision(TSelf, TOther) method

```csharp
public static virtual TResult op_CheckedDivision (TSelf left, TOther right);
```

Divides two values together to compute their quotient.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient of `left` divided by `right`.

Exceptions:

- `OverflowException`: The quotient of `left` divided by `right` is not representable by `TResult`.

To be added.

## IDivisionOperators<TSelf,TOther,TResult>.op_Division(TSelf, TOther) method

```csharp
public static abstract TResult operator / (TSelf left, TOther right);
```

Divides one value by another to compute their quotient.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The quotient of `left` divided by `right`.

To be added.
