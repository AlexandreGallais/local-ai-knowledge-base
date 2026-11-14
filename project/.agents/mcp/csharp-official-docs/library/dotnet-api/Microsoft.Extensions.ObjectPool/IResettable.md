---
title: "IResettable interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ObjectPool/IResettable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IResettable interface

Namespace: `Microsoft.Extensions.ObjectPool`

```csharp
public interface IResettable
```

Defines a method to reset an object to its initial state.

To be added.

## IResettable.TryReset() method

```csharp
public bool TryReset ();
```

Reset the object to a neutral state, semantically similar to when the object was first constructed.

Returns: `true` if the object was able to reset itself, otherwise `false`.

In general, this method is not expected to be thread-safe.
