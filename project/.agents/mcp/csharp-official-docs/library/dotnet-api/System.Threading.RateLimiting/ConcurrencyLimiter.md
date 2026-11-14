---
title: "ConcurrencyLimiter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/ConcurrencyLimiter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConcurrencyLimiter class

Namespace: `System.Threading.RateLimiting`

```csharp
public sealed class ConcurrencyLimiter : System.Threading.RateLimiting.RateLimiter
```

`RateLimiter` implementation that helps manage concurrent access to a resource.

To be added.

## ConcurrencyLimiter.ConcurrencyLimiter(ConcurrencyLimiterOptions) constructor

```csharp
public ConcurrencyLimiter (System.Threading.RateLimiting.ConcurrencyLimiterOptions options);
```

Initializes the `ConcurrencyLimiter`.

Parameters:

- `options`: Options to specify the behavior of the `ConcurrencyLimiter`.

To be added.

## ConcurrencyLimiter.IdleDuration property

```csharp
public override TimeSpan? IdleDuration { get; }
```

To be added.

Returns: To be added.

To be added.

## ConcurrencyLimiter.AcquireAsyncCore(Int32, CancellationToken) method

```csharp
protected override System.Threading.Tasks.ValueTask<System.Threading.RateLimiting.RateLimitLease> AcquireAsyncCore (int permitCount, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `permitCount`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## ConcurrencyLimiter.AttemptAcquireCore(Int32) method

```csharp
protected override System.Threading.RateLimiting.RateLimitLease AttemptAcquireCore (int permitCount);
```

To be added.

Parameters:

- `permitCount`: To be added.

Returns: To be added.

To be added.

## ConcurrencyLimiter.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## ConcurrencyLimiter.DisposeAsyncCore() method

```csharp
protected override System.Threading.Tasks.ValueTask DisposeAsyncCore ();
```

To be added.

Returns: To be added.

To be added.

## ConcurrencyLimiter.GetStatistics() method

```csharp
public override System.Threading.RateLimiting.RateLimiterStatistics? GetStatistics ();
```

To be added.

Returns: To be added.

To be added.
