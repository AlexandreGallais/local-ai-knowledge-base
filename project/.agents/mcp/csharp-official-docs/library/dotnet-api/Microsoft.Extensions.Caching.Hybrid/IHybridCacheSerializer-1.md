---
title: "IHybridCacheSerializer<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Hybrid/IHybridCacheSerializer`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHybridCacheSerializer<T> interface

Namespace: `Microsoft.Extensions.Caching.Hybrid`

```csharp
public interface IHybridCacheSerializer<T>
```

Provides per-type serialization and deserialization support for `HybridCache`.

Parameters:

- `T`: The type being serialized/deserialized.

To be added.

## IHybridCacheSerializer<T>.Deserialize(Byte>) method

```csharp
public T Deserialize (System.Buffers.ReadOnlySequence<byte> source);
```

Deserializes a `T` value from the provided `source`.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## IHybridCacheSerializer<T>.Serialize(T, Byte>) method

```csharp
public void Serialize (T value, System.Buffers.IBufferWriter<byte> target);
```

Serializes `value` to the provided `target`.

Parameters:

- `value`: To be added.
- `target`: To be added.

To be added.
