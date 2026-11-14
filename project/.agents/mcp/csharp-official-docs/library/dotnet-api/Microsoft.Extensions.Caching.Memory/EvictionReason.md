---
title: "EvictionReason enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Memory/EvictionReason.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EvictionReason enum

Namespace: `Microsoft.Extensions.Caching.Memory`

```csharp
public enum EvictionReason
```

Specifies the reasons why an entry was evicted from the cache.

To be added.

## EvictionReason.Capacity field

```csharp
Capacity
```

The item was removed from the cache because it exceeded its capacity.

## EvictionReason.Expired field

```csharp
Expired
```

The item was removed from the cache because it timed out.

## EvictionReason.None field

```csharp
None
```

The item was not removed from the cache.

## EvictionReason.Removed field

```csharp
Removed
```

The item was removed from the cache manually.

## EvictionReason.Replaced field

```csharp
Replaced
```

The item was removed from the cache because it was overwritten.

## EvictionReason.TokenExpired field

```csharp
TokenExpired
```

The item was removed from the cache because its token expired.
