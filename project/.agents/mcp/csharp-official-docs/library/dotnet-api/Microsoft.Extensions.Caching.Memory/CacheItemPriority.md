---
title: "CacheItemPriority enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Memory/CacheItemPriority.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CacheItemPriority enum

Namespace: `Microsoft.Extensions.Caching.Memory`

```csharp
public enum CacheItemPriority
```

Specifies how items are prioritized for preservation during a memory pressure triggered cleanup.

To be added.

## CacheItemPriority.High field

```csharp
High
```

The cache entry should be removed only when there is no other low or normal priority cache entries during memory pressure triggered cleanup.

## CacheItemPriority.Low field

```csharp
Low
```

The cache entry should be removed as soon as possible during memory pressure triggered cleanup.

## CacheItemPriority.NeverRemove field

```csharp
NeverRemove
```

The cache entry should never be removed during memory pressure triggered cleanup.

## CacheItemPriority.Normal field

```csharp
Normal
```

The cache entry should be removed if there is no other low priority cache entries during memory pressure triggered cleanup.
