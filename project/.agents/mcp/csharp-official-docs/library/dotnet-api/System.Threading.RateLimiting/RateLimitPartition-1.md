---
title: "RateLimitPartition<TKey> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/RateLimitPartition`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RateLimitPartition<TKey> struct

Namespace: `System.Threading.RateLimiting`

```csharp
public struct RateLimitPartition<TKey>
```

Type returned by `RateLimitPartition.Get<T>` methods to be used by `PartitionedRateLimiter.Create<T1,T2>` to know what partitions are configured.

Parameters:

- `TKey`: The type to distinguish partitions with.

To be added.

## RateLimitPartition<TKey>.RateLimitPartition(TKey, RateLimiter>) constructor

```csharp
public RateLimitPartition (TKey <example-value>, Func<TKey,System.Threading.RateLimiting.RateLimiter> factory);
```

Constructs the `RateLimitPartition<T>` for use in `PartitionedRateLimiter.Create<T1,T2>`.

Parameters:

- `partitionKey`: The specific key for this partition.
- `factory`: The function called when a rate limiter for the given `partitionKey` is needed.

To be added.

## RateLimitPartition<TKey>.Factory property

```csharp
public Func<TKey,System.Threading.RateLimiting.RateLimiter> Factory { get; }
```

The function called when a rate limiter for the given partitionKey is needed.

Returns: To be added.

To be added.

## RateLimitPartition<TKey>.PartitionKey <example-value>

```csharp
public TKey <example-value> { get; }
```

The specific key for this partition.

Returns: To be added.

To be added.
