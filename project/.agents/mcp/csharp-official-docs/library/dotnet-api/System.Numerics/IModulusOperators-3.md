---
title: "IModulusOperators<TSelf,TOther,TResult> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IModulusOperators`3.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IModulusOperators<TSelf,TOther,TResult> interface

Namespace: `System.Numerics`

```csharp
public interface IModulusOperators<TSelf,TOther,TResult> where TSelf : IModulusOperators<TSelf,TOther,TResult>
```

Defines a mechanism for computing the modulus or remainder of two values.

Parameters:

- `TSelf`: The type that implements this interface.
- `TOther`: The type that will divide `TSelf`.
- `TResult`: The type that contains the modulus or remainder of `TSelf` and `TOther`.

#### Remarks

This type represents the `%` operator in C#, which is often used to compute the remainder. It may differ from an actual modulo operation depending on the type that implements the interface.

## IModulusOperators<TSelf,TOther,TResult>.op_Modulus(TSelf, TOther) method

```csharp
public static abstract TResult operator % (TSelf left, TOther right);
```

Divides two values together to compute their modulus or remainder.

Parameters:

- `left`: The value that `right` divides.
- `right`: The value that divides `left`.

Returns: The modulus or remainder of `left` divided by `right`.

To be added.
