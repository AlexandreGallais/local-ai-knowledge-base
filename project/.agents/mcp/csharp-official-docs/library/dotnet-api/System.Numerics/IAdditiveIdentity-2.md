---
title: "IAdditiveIdentity<TSelf,TResult> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IAdditiveIdentity`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IAdditiveIdentity<TSelf,TResult> interface

Namespace: `System.Numerics`

```csharp
public interface IAdditiveIdentity<TSelf,TResult> where TSelf : IAdditiveIdentity<TSelf,TResult>
```

Defines a mechanism for getting the additive identity of a given type.

Parameters:

- `TSelf`: The type that implements this interface.
- `TResult`: The type that contains the additive identity of `TSelf`.

To be added.

## IAdditiveIdentity<TSelf,TResult>.AdditiveIdentity property

```csharp
public static abstract TResult AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.
