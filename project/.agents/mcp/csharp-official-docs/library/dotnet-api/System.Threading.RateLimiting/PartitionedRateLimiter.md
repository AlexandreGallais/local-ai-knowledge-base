---
title: "PartitionedRateLimiter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/PartitionedRateLimiter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PartitionedRateLimiter class

Namespace: `System.Threading.RateLimiting`

```csharp
public static class PartitionedRateLimiter
```

Contains methods to assist with creating a `PartitionedRateLimiter<T>`.

To be added.

## PartitionedRateLimiter.Create<TResource,TPartitionKey>(RateLimitPartition<TPartitionKey>>, IEqualityComparer<TPartitionKey>) method

```csharp
public static System.Threading.RateLimiting.PartitionedRateLimiter<TResource> Create<TResource,TPartitionKey> (Func<TResource,System.Threading.RateLimiting.RateLimitPartition<TPartitionKey>> partitioner, System.Collections.Generic.IEqualityComparer<TPartitionKey>? equalityComparer = default);
```

Method used to create a default implementation of `PartitionedRateLimiter<T>`.

Parameters:

- `TResource`: The resource type that is being rate limited.
- `TPartitionKey`: The type to distinguish partitions with.
- `partitioner`: Method called every time an Acquire or WaitAsync call is made to figure out what rate limiter to apply to the request.
If the `RateLimitPartition<T>.PartitionKey` matches a cached entry then the rate limiter previously used for that key is used. Otherwise, the factory is called to get a new rate limiter.
- `equalityComparer`: Optional `IEqualityComparer<T>` to customize the comparison logic for `TPartitionKey`.

To be added.

## PartitionedRateLimiter.CreateChained<TResource>(PartitionedRateLimiter<TResource>[]) method

```csharp
public static System.Threading.RateLimiting.PartitionedRateLimiter<TResource> CreateChained<TResource> (params System.Threading.RateLimiting.PartitionedRateLimiter<TResource>[] limiters);
```

Creates a single `PartitionedRateLimiter<T>` that wraps the passed in `PartitionedRateLimiter<T>`s.

Parameters:

- `TResource`: The resource type that is being rate limited.
- `limiters`: The `PartitionedRateLimiter<T>`s that will be called in order when acquiring resources.

Exceptions:

- `ArgumentNullException`: `limiters` is a null parameter.
- `ArgumentException`: `limiters` is an empty array.

Methods on the returned `PartitionedRateLimiter<T>` will iterate over the passed in `limiters` in the order given.

`PartitionedRateLimiter<T>.GetStatistics` will return the lowest value for `RateLimiterStatistics.CurrentAvailablePermits`,
the inner-most limiter's `RateLimiterStatistics.TotalSuccessfulLeases`,
and the aggregate values for the rest of the properties from the `limiters`.

`RateLimitLease`s returned will aggregate metadata and for duplicates use the value of the first lease with the same metadata name.

Disposing the returned `PartitionedRateLimiter<T>` does not dispose the inner `limiters`.
Callers are expected to dispose the inner limiters themselves once they are no longer in use.
