---
title: "TokenBucketRateLimiter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/TokenBucketRateLimiter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TokenBucketRateLimiter class

Namespace: `System.Threading.RateLimiting`

```csharp
public sealed class TokenBucketRateLimiter : System.Threading.RateLimiting.ReplenishingRateLimiter
```

`RateLimiter` implementation that replenishes tokens periodically instead of via a release mechanism.

To be added.

## TokenBucketRateLimiter.TokenBucketRateLimiter(TokenBucketRateLimiterOptions) constructor

```csharp
public TokenBucketRateLimiter (System.Threading.RateLimiting.TokenBucketRateLimiterOptions options);
```

Initializes the `TokenBucketRateLimiter`.

Parameters:

- `options`: Options to specify the behavior of the `TokenBucketRateLimiter`.

To be added.

## TokenBucketRateLimiter.IdleDuration property

```csharp
public override TimeSpan? IdleDuration { get; }
```

To be added.

Returns: To be added.

To be added.

## TokenBucketRateLimiter.IsAutoReplenishing property

```csharp
public override bool IsAutoReplenishing { get; }
```

To be added.

Returns: To be added.

To be added.

## TokenBucketRateLimiter.ReplenishmentPeriod property

```csharp
public override TimeSpan ReplenishmentPeriod { get; }
```

To be added.

Returns: To be added.

To be added.

## TokenBucketRateLimiter.AcquireAsyncCore(Int32, CancellationToken) method

```csharp
protected override System.Threading.Tasks.ValueTask<System.Threading.RateLimiting.RateLimitLease> AcquireAsyncCore (int tokenCount, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `tokenCount`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## TokenBucketRateLimiter.AttemptAcquireCore(Int32) method

```csharp
protected override System.Threading.RateLimiting.RateLimitLease AttemptAcquireCore (int tokenCount);
```

To be added.

Parameters:

- `tokenCount`: To be added.

Returns: To be added.

To be added.

## TokenBucketRateLimiter.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## TokenBucketRateLimiter.DisposeAsyncCore() method

```csharp
protected override System.Threading.Tasks.ValueTask DisposeAsyncCore ();
```

To be added.

Returns: To be added.

To be added.

## TokenBucketRateLimiter.GetStatistics() method

```csharp
public override System.Threading.RateLimiting.RateLimiterStatistics? GetStatistics ();
```

To be added.

Returns: To be added.

To be added.

## TokenBucketRateLimiter.TryReplenish() method

```csharp
public override bool TryReplenish ();
```

Attempts to replenish the bucket.

Returns: `false` if `TokenBucketRateLimiterOptions.AutoReplenishment` is enabled, otherwise `true`.
Does not reflect if tokens were replenished.

To be added.
