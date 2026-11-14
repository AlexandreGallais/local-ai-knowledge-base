---
title: "HybridCacheEntryFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Hybrid/HybridCacheEntryFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HybridCacheEntryFlags enum

Namespace: `Microsoft.Extensions.Caching.Hybrid`

```csharp
public enum HybridCacheEntryFlags
```

Additional flags that apply to a `HybridCache` operation.

To be added.

## HybridCacheEntryFlags.DisableCompression field

```csharp
DisableCompression
```

Disables compression for this payload.

## HybridCacheEntryFlags.DisableDistributedCache field

```csharp
DisableDistributedCache
```

Disables both reading from and writing to the secondary distributed cache.

## HybridCacheEntryFlags.DisableDistributedCacheRead field

```csharp
DisableDistributedCacheRead
```

Disables reading from the secondary distributed cache.

## HybridCacheEntryFlags.DisableDistributedCacheWrite field

```csharp
DisableDistributedCacheWrite
```

Disables writing to the secondary distributed cache.

## HybridCacheEntryFlags.DisableLocalCache field

```csharp
DisableLocalCache
```

Disables both reading from and writing to the local in-process cache.

## HybridCacheEntryFlags.DisableLocalCacheRead field

```csharp
DisableLocalCacheRead
```

Disables reading from the local in-process cache.

## HybridCacheEntryFlags.DisableLocalCacheWrite field

```csharp
DisableLocalCacheWrite
```

Disables writing to the local in-process cache.

## HybridCacheEntryFlags.DisableUnderlyingData field

```csharp
DisableUnderlyingData
```

Only fetches the value from cache; does not attempt to access the underlying data store.

## HybridCacheEntryFlags.None field

```csharp
None
```

No additional flags.
