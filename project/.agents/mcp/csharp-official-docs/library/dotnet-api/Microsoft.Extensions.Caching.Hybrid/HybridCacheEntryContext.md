---
title: "HybridCacheEntryContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Hybrid/HybridCacheEntryContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HybridCacheEntryContext class

Namespace: `Microsoft.Extensions.Caching.Hybrid`

```csharp
public sealed class HybridCacheEntryContext
```

Provides a mutable view of the cache entry options in effect for a single `HybridCache` operation,
supplied to a factory callback so that it can adjust those options based on the result of the data fetch.

When a `HybridCache` implementation constructs the context for a factory callback, it seeds the
properties from the effective options for the operation (composed from the per-call and any global options), so
the factory observes the current values and can change them to influence how the resulting value is cached.
A context constructed directly reflects only whatever `HybridCacheEntryOptions` were supplied to
its constructor. Implementations can use `HybridCacheEntryContext.Revision` to detect whether the factory changed any value.

## HybridCacheEntryContext.HybridCacheEntryContext(HybridCacheEntryOptions) constructor

```csharp
public HybridCacheEntryContext (Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions? options);
```

Initializes a new instance of the `HybridCacheEntryContext` class, seeding its values from
the supplied options.

Parameters:

- `options`: The options to seed the context from, or `null` to start with unset values. This is
typically the effective options for the operation, so that the factory callback observes the current values.

This is primarily intended for `HybridCache` implementations that need to construct a context
to pass to a factory callback.

## HybridCacheEntryContext.Expiration property

```csharp
public TimeSpan? Expiration { get; set; }
```

Gets or sets the overall cache duration of this entry, passed to the backend distributed cache.

Returns: To be added.

To be added.

## HybridCacheEntryContext.Flags property

```csharp
public Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryFlags? Flags { get; set; }
```

Gets or sets additional flags that apply to the requested operation.

Returns: To be added.

To be added.

## HybridCacheEntryContext.LocalCacheExpiration property

```csharp
public TimeSpan? LocalCacheExpiration { get; set; }
```

Gets or sets the expiration for the local (in-process) cache entry.

Returns: To be added.

When retrieving a cached value from an external cache store, this value will be used to calculate the local
cache expiration, not exceeding the remaining overall cache lifetime.

## HybridCacheEntryContext.LocalSize property

```csharp
public long? LocalSize { get; set; }
```

Gets or sets the size to assign to entries in the local (in-process) cache.

Returns: To be added.

The units are determined by the underlying local cache implementation. When the local cache
is an `IMemoryCache` configured with a size limit, this value corresponds to
`ICacheEntry.Size`.

When `null`, the implementation may compute a default size (for example, from
the serialized payload length).

## HybridCacheEntryContext.Revision property

```csharp
public int Revision { get; }
```

Gets a value that increments whenever a property on this instance is changed.

Returns: To be added.

Implementations of `HybridCache` can capture this value before invoking a factory
callback and compare it afterwards to determine whether the factory changed any value.
The value increments only when a setter assigns a different value than the current one.
