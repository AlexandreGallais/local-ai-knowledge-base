---
title: "RateLimitPartition class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/RateLimitPartition.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RateLimitPartition class

Namespace: `System.Threading.RateLimiting`

```csharp
public static class RateLimitPartition
```

Contains methods used in `PartitionedRateLimiter.Create<T1,T2>` to assist in the creation of partitions for your rate limiter.

To be added.

## RateLimitPartition.Get<TKey>(TKey, RateLimiter>) method

```csharp
public static System.Threading.RateLimiting.RateLimitPartition<TKey> Get<TKey> (TKey <example-value>, Func<TKey,System.Threading.RateLimiting.RateLimiter> factory);
```

Defines a partition with the given rate limiter factory.

Parameters:

- `TKey`: The type to distinguish partitions with.
- `partitionKey`: The specific key for this partition. This will be used to check for an existing cached limiter before calling the `factory`.
- `factory`: The function called when a rate limiter for the given `partitionKey` is needed. This should be a new instance of a rate limiter every time it is called.

The `factory` should return a new instance of a rate limiter every time it is called.

## RateLimitPartition.GetConcurrencyLimiter<TKey>(TKey, ConcurrencyLimiterOptions>) method

```csharp
public static System.Threading.RateLimiting.RateLimitPartition<TKey> GetConcurrencyLimiter<TKey> (TKey <example-value>, Func<TKey,System.Threading.RateLimiting.ConcurrencyLimiterOptions> factory);
```

Defines a partition with a `ConcurrencyLimiter` with the given `ConcurrencyLimiterOptions`.

Parameters:

- `TKey`: The type to distinguish partitions with.
- `partitionKey`: The specific key for this partition. This will be used to check for an existing cached limiter before calling the `factory`.
- `factory`: The function called when a rate limiter for the given `partitionKey` is needed. This can return the same instance of `ConcurrencyLimiterOptions` across different calls.

To be added.

## RateLimitPartition.GetFixedWindowLimiter<TKey>(TKey, FixedWindowRateLimiterOptions>) method

```csharp
public static System.Threading.RateLimiting.RateLimitPartition<TKey> GetFixedWindowLimiter<TKey> (TKey <example-value>, Func<TKey,System.Threading.RateLimiting.FixedWindowRateLimiterOptions> factory);
```

Defines a partition with a `FixedWindowRateLimiter` with the given `FixedWindowRateLimiterOptions`.

Parameters:

- `TKey`: The type to distinguish partitions with.
- `partitionKey`: The specific key for this partition.
- `factory`: The function called when a rate limiter for the given `partitionKey` is needed. This can return the same instance of `FixedWindowRateLimiterOptions` across different calls.

Set `FixedWindowRateLimiterOptions.AutoReplenishment` to `false` to save an allocation. This method will create a new options type and set `FixedWindowRateLimiterOptions.AutoReplenishment` to `false` otherwise.

## RateLimitPartition.GetNoLimiter<TKey>(TKey) method

```csharp
public static System.Threading.RateLimiting.RateLimitPartition<TKey> GetNoLimiter<TKey> (TKey <example-value>);
```

Defines a partition that will not have a rate limiter.
This means any calls to `PartitionedRateLimiter<T>.AttemptAcquire` or `PartitionedRateLimiter<T>.AcquireAsync` will always succeed for the given `partitionKey`.

Parameters:

- `TKey`: The type to distinguish partitions with.
- `partitionKey`: The specific key for this partition.

To be added.

## RateLimitPartition.GetSlidingWindowLimiter<TKey>(TKey, SlidingWindowRateLimiterOptions>) method

```csharp
public static System.Threading.RateLimiting.RateLimitPartition<TKey> GetSlidingWindowLimiter<TKey> (TKey <example-value>, Func<TKey,System.Threading.RateLimiting.SlidingWindowRateLimiterOptions> factory);
```

Defines a partition with a `SlidingWindowRateLimiter` with the given `SlidingWindowRateLimiterOptions`.

Parameters:

- `TKey`: The type to distinguish partitions with.
- `partitionKey`: The specific key for this partition.
- `factory`: The function called when a rate limiter for the given `partitionKey` is needed. This can return the same instance of `SlidingWindowRateLimiterOptions` across different calls.

Set `SlidingWindowRateLimiterOptions.AutoReplenishment` to `false` to save an allocation. This method will create a new options type and set `SlidingWindowRateLimiterOptions.AutoReplenishment` to `false` otherwise.

## RateLimitPartition.GetTokenBucketLimiter<TKey>(TKey, TokenBucketRateLimiterOptions>) method

```csharp
public static System.Threading.RateLimiting.RateLimitPartition<TKey> GetTokenBucketLimiter<TKey> (TKey <example-value>, Func<TKey,System.Threading.RateLimiting.TokenBucketRateLimiterOptions> factory);
```

Defines a partition with a `TokenBucketRateLimiter` with the given `TokenBucketRateLimiterOptions`.

Parameters:

- `TKey`: The type to distinguish partitions with.
- `partitionKey`: The specific key for this partition.
- `factory`: The function called when a rate limiter for the given `partitionKey` is needed. This can return the same instance of `TokenBucketRateLimiterOptions` across different calls.

Set `TokenBucketRateLimiterOptions.AutoReplenishment` to `false` to save an allocation. This method will create a new options type and set `TokenBucketRateLimiterOptions.AutoReplenishment` to `false` otherwise.
