---
title: "FixedWindowRateLimiter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/FixedWindowRateLimiter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FixedWindowRateLimiter class

Namespace: `System.Threading.RateLimiting`

```csharp
public sealed class FixedWindowRateLimiter : System.Threading.RateLimiting.ReplenishingRateLimiter
```

`RateLimiter` implementation that refreshes allowed permits in a window periodically.

To be added.

## FixedWindowRateLimiter.FixedWindowRateLimiter(FixedWindowRateLimiterOptions) constructor

```csharp
public FixedWindowRateLimiter (System.Threading.RateLimiting.FixedWindowRateLimiterOptions options);
```

Initializes the `FixedWindowRateLimiter`.

Parameters:

- `options`: Options to specify the behavior of the `FixedWindowRateLimiter`.

To be added.

## FixedWindowRateLimiter.IdleDuration property

```csharp
public override TimeSpan? IdleDuration { get; }
```

To be added.

Returns: To be added.

To be added.

## FixedWindowRateLimiter.IsAutoReplenishing property

```csharp
public override bool IsAutoReplenishing { get; }
```

To be added.

Returns: To be added.

To be added.

## FixedWindowRateLimiter.ReplenishmentPeriod property

```csharp
public override TimeSpan ReplenishmentPeriod { get; }
```

To be added.

Returns: To be added.

To be added.

## FixedWindowRateLimiter.AcquireAsyncCore(Int32, CancellationToken) method

```csharp
protected override System.Threading.Tasks.ValueTask<System.Threading.RateLimiting.RateLimitLease> AcquireAsyncCore (int permitCount, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `permitCount`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## FixedWindowRateLimiter.AttemptAcquireCore(Int32) method

```csharp
protected override System.Threading.RateLimiting.RateLimitLease AttemptAcquireCore (int permitCount);
```

To be added.

Parameters:

- `permitCount`: To be added.

Returns: To be added.

To be added.

## FixedWindowRateLimiter.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## FixedWindowRateLimiter.DisposeAsyncCore() method

```csharp
protected override System.Threading.Tasks.ValueTask DisposeAsyncCore ();
```

To be added.

Returns: To be added.

To be added.

## FixedWindowRateLimiter.GetStatistics() method

```csharp
public override System.Threading.RateLimiting.RateLimiterStatistics? GetStatistics ();
```

To be added.

Returns: To be added.

To be added.

## FixedWindowRateLimiter.TryReplenish() method

```csharp
public override bool TryReplenish ();
```

Attempts to replenish request counters in the window.

Returns: False if `FixedWindowRateLimiterOptions.AutoReplenishment` is enabled, otherwise true.
Does not reflect if counters were replenished.

To be added.
