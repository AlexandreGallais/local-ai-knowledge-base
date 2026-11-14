---
title: "ImmutableArray<T>+Enumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableArray`1+Enumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableArray<T>+Enumerator struct

Namespace: `System.Collections.Immutable`

```csharp
public struct ImmutableArray<T>.Enumerator
```

Represents an array enumerator.

> **Important:**
> This enumerator should **not** implement `IDisposable`. The iterator should inline in a `foreach` loop and not result in a `try/finally` frame in the client.

## ImmutableArray<T>+Enumerator.Current property

```csharp
public T Current { get; }
```

Gets the current item.

Returns: The current item.

To be added.

## ImmutableArray<T>+Enumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances to the next value in the array.

Returns: `true` if another item exists in the array; otherwise, `false`.

To be added.
