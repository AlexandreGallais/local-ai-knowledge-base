---
title: "TokenBucketRateLimiterOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/TokenBucketRateLimiterOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TokenBucketRateLimiterOptions class

Namespace: `System.Threading.RateLimiting`

```csharp
public sealed class TokenBucketRateLimiterOptions
```

Options to control the behavior of a `TokenBucketRateLimiter`.

To be added.

## TokenBucketRateLimiterOptions.TokenBucketRateLimiterOptions() constructor

```csharp
public TokenBucketRateLimiterOptions ();
```

To be added.

To be added.

## TokenBucketRateLimiterOptions.AutoReplenishment property

```csharp
public bool AutoReplenishment { get; set; }
```

Specified whether the `TokenBucketRateLimiter` is automatically replenishing tokens or if someone else
will be calling `TokenBucketRateLimiter.TryReplenish` to replenish tokens.

Returns: `true` by default.

To be added.

## TokenBucketRateLimiterOptions.QueueLimit property

```csharp
public int QueueLimit { get; set; }
```

Maximum cumulative token count of queued acquisition requests.
Must be set to a value >= 0 by the time these options are passed to the constructor of `TokenBucketRateLimiter`.

Returns: To be added.

To be added.

## TokenBucketRateLimiterOptions.QueueProcessingOrder property

```csharp
public System.Threading.RateLimiting.QueueProcessingOrder QueueProcessingOrder { get; set; }
```

Determines the behaviour of `RateLimiter.AcquireAsync` when not enough resources can be leased.

Returns: `QueueProcessingOrder.OldestFirst` by default.

To be added.

## TokenBucketRateLimiterOptions.ReplenishmentPeriod property

```csharp
public TimeSpan ReplenishmentPeriod { get; set; }
```

Specifies the minimum period between replenishments.
Must be set to a value greater than `TimeSpan.Zero` by the time these options are passed to the constructor of `TokenBucketRateLimiter`.

Returns: To be added.

To be added.

## TokenBucketRateLimiterOptions.TokenLimit property

```csharp
public int TokenLimit { get; set; }
```

Maximum number of tokens that can be in the bucket at any time.
Must be set to a value > 0 by the time these options are passed to the constructor of `TokenBucketRateLimiter`.

Returns: To be added.

To be added.

## TokenBucketRateLimiterOptions.TokensPerPeriod property

```csharp
public int TokensPerPeriod { get; set; }
```

Specifies the maximum number of tokens to restore each replenishment.
Must be set to a value > 0 by the time these options are passed to the constructor of `TokenBucketRateLimiter`.

Returns: To be added.

To be added.
