---
title: "SlidingWindowRateLimiter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/SlidingWindowRateLimiter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SlidingWindowRateLimiter class

Namespace: `System.Threading.RateLimiting`

```csharp
public sealed class SlidingWindowRateLimiter : System.Threading.RateLimiting.ReplenishingRateLimiter
```

`RateLimiter` implementation that replenishes permit counters periodically instead of via a release mechanism.

To be added.

## SlidingWindowRateLimiter.SlidingWindowRateLimiter(SlidingWindowRateLimiterOptions) constructor

```csharp
public SlidingWindowRateLimiter (System.Threading.RateLimiting.SlidingWindowRateLimiterOptions options);
```

Initializes the `SlidingWindowRateLimiter`.

Parameters:

- `options`: Options to specify the behavior of the `SlidingWindowRateLimiter`.

To be added.

## SlidingWindowRateLimiter.IdleDuration property

```csharp
public override TimeSpan? IdleDuration { get; }
```

To be added.

Returns: To be added.

To be added.

## SlidingWindowRateLimiter.IsAutoReplenishing property

```csharp
public override bool IsAutoReplenishing { get; }
```

To be added.

Returns: To be added.

To be added.

## SlidingWindowRateLimiter.ReplenishmentPeriod property

```csharp
public override TimeSpan ReplenishmentPeriod { get; }
```

To be added.

Returns: To be added.

To be added.

## SlidingWindowRateLimiter.AcquireAsyncCore(Int32, CancellationToken) method

```csharp
protected override System.Threading.Tasks.ValueTask<System.Threading.RateLimiting.RateLimitLease> AcquireAsyncCore (int permitCount, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `permitCount`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## SlidingWindowRateLimiter.AttemptAcquireCore(Int32) method

```csharp
protected override System.Threading.RateLimiting.RateLimitLease AttemptAcquireCore (int permitCount);
```

To be added.

Parameters:

- `permitCount`: To be added.

Returns: To be added.

To be added.

## SlidingWindowRateLimiter.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## SlidingWindowRateLimiter.DisposeAsyncCore() method

```csharp
protected override System.Threading.Tasks.ValueTask DisposeAsyncCore ();
```

To be added.

Returns: To be added.

To be added.

## SlidingWindowRateLimiter.GetStatistics() method

```csharp
public override System.Threading.RateLimiting.RateLimiterStatistics? GetStatistics ();
```

To be added.

Returns: To be added.

To be added.

## SlidingWindowRateLimiter.TryReplenish() method

```csharp
public override bool TryReplenish ();
```

Attempts to replenish request counters in a window.

Returns: False if `SlidingWindowRateLimiterOptions.AutoReplenishment` is enabled, otherwise true.
Does not reflect if permits were replenished.

To be added.
