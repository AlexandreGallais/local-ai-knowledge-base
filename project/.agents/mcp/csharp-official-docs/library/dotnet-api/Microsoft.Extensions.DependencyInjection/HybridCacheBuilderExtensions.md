---
title: "HybridCacheBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/HybridCacheBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HybridCacheBuilderExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class HybridCacheBuilderExtensions
```

Configuration extension methods for `IHybridCacheBuilder` / `HybridCache`.

To be added.

## HybridCacheBuilderExtensions.AddSerializer<T>(IHybridCacheBuilder, IHybridCacheSerializer<T>) method

```csharp
public static Microsoft.Extensions.Caching.Hybrid.IHybridCacheBuilder AddSerializer<T> (this Microsoft.Extensions.Caching.Hybrid.IHybridCacheBuilder builder, Microsoft.Extensions.Caching.Hybrid.IHybridCacheSerializer<T> serializer);
```

Serialize values of type `T` with the specified serializer from `serializer`.

Parameters:

- `T`: The type to be serialized.
- `builder`: To be added.
- `serializer`: To be added.

Returns: The `IHybridCacheBuilder` instance.

To be added.

## HybridCacheBuilderExtensions.AddSerializer<T,TImplementation>(IHybridCacheBuilder) method

```csharp
public static Microsoft.Extensions.Caching.Hybrid.IHybridCacheBuilder AddSerializer<T,TImplementation> (this Microsoft.Extensions.Caching.Hybrid.IHybridCacheBuilder builder) where TImplementation : class, Microsoft.Extensions.Caching.Hybrid.IHybridCacheSerializer<T>;
```

Serialize values of type `T` with the serializer of type `TImplementation`.

Parameters:

- `T`: The type to be serialized.
- `TImplementation`: The serializer to use for this type.
- `builder`: To be added.

Returns: The `IHybridCacheBuilder` instance.

To be added.

## HybridCacheBuilderExtensions.AddSerializerFactory(IHybridCacheBuilder, IHybridCacheSerializerFactory) method

```csharp
public static Microsoft.Extensions.Caching.Hybrid.IHybridCacheBuilder AddSerializerFactory (this Microsoft.Extensions.Caching.Hybrid.IHybridCacheBuilder builder, Microsoft.Extensions.Caching.Hybrid.IHybridCacheSerializerFactory factory);
```

Add `factory` as an additional serializer factory, which can provide serializers for multiple types.

Parameters:

- `builder`: To be added.
- `factory`: To be added.

Returns: The `IHybridCacheBuilder` instance.

To be added.

## HybridCacheBuilderExtensions.AddSerializerFactory<TImplementation>(IHybridCacheBuilder) method

```csharp
public static Microsoft.Extensions.Caching.Hybrid.IHybridCacheBuilder AddSerializerFactory<TImplementation> (this Microsoft.Extensions.Caching.Hybrid.IHybridCacheBuilder builder) where TImplementation : class, Microsoft.Extensions.Caching.Hybrid.IHybridCacheSerializerFactory;
```

Add a factory of type `TImplementation` as an additional serializer factory, which can provide serializers for multiple types.

Parameters:

- `TImplementation`: The type of the serializer factory.
- `builder`: To be added.

Returns: The `IHybridCacheBuilder` instance.

To be added.
