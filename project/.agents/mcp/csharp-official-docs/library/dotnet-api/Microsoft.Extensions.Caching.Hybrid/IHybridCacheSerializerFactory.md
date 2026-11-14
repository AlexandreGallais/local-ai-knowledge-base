---
title: "IHybridCacheSerializerFactory interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Hybrid/IHybridCacheSerializerFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHybridCacheSerializerFactory interface

Namespace: `Microsoft.Extensions.Caching.Hybrid`

```csharp
public interface IHybridCacheSerializerFactory
```

Factory provider for per-type `IHybridCacheSerializer<T>` instances.

To be added.

## IHybridCacheSerializerFactory.TryCreateSerializer<T>(IHybridCacheSerializer<T>) method

```csharp
public bool TryCreateSerializer<T> (out Microsoft.Extensions.Caching.Hybrid.IHybridCacheSerializer<T>? serializer);
```

Requests a serializer for the provided type, if possible.

Parameters:

- `T`: The type being serialized or deserialized.
- `serializer`: The serializer.

Returns: `true` if the factory supports this type, `false` otherwise.

To be added.
