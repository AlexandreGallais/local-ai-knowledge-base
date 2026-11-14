---
title: "RateLimiter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/RateLimiter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RateLimiter class

Namespace: `System.Threading.RateLimiting`

```csharp
public abstract class RateLimiter : IAsyncDisposable, IDisposable
```

Represents a limiter type that users interact with to determine if an operation can proceed.

To be added.

## RateLimiter.RateLimiter() constructor

```csharp
protected RateLimiter ();
```

To be added.

To be added.

## RateLimiter.IdleDuration property

```csharp
public abstract TimeSpan? IdleDuration { get; }
```

Specifies how long the `RateLimiter` has had all permits available. Used by RateLimiter managers that may want to
clean up unused RateLimiters.

Returns: To be added.

Returns `null` when the `RateLimiter` is in use or is not ready to be idle.

## RateLimiter.AcquireAsync(Int32, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<System.Threading.RateLimiting.RateLimitLease> AcquireAsync (int permitCount = 1, System.Threading.CancellationToken <example-value> = default);
```

Wait until the requested permits are available or permits can no longer be acquired.

Parameters:

- `permitCount`: Number of permits to try and acquire.
- `cancellationToken`: Optional token to allow canceling a queued request for permits.

Returns: A task that completes when the requested permits are acquired or when the requested permits are denied.

Set `permitCount` to 0 to wait until permits are replenished.

## RateLimiter.AcquireAsyncCore(Int32, CancellationToken) method

```csharp
protected abstract System.Threading.Tasks.ValueTask<System.Threading.RateLimiting.RateLimitLease> AcquireAsyncCore (int permitCount, System.Threading.CancellationToken <example-value>);
```

Method that `RateLimiter` implementations implement for `RateLimiter.AcquireAsync`.

Parameters:

- `permitCount`: Number of permits to try and acquire.
- `cancellationToken`: Optional token to allow canceling a queued request for permits.

Returns: A task that completes when the requested permits are acquired or when the requested permits are denied.

To be added.

## RateLimiter.AttemptAcquire(Int32) method

```csharp
public System.Threading.RateLimiting.RateLimitLease AttemptAcquire (int permitCount = 1);
```

Fast synchronous attempt to acquire permits.

Parameters:

- `permitCount`: Number of permits to try and acquire.

Returns: A successful or failed lease.

Set `permitCount` to 0 to get whether permits are exhausted.

## RateLimiter.AttemptAcquireCore(Int32) method

```csharp
protected abstract System.Threading.RateLimiting.RateLimitLease AttemptAcquireCore (int permitCount);
```

Method that `RateLimiter` implementations implement for `RateLimiter.AttemptAcquire`.

Parameters:

- `permitCount`: Number of permits to try and acquire.

To be added.

## RateLimiter.CreateChained(RateLimiter[]) method

```csharp
public static System.Threading.RateLimiting.RateLimiter CreateChained (params System.Threading.RateLimiting.RateLimiter[] limiters);
```

Creates a single `RateLimiter` that wraps the passed in `RateLimiter`s.

Parameters:

- `limiters`: The `RateLimiter`s that will be called in order when acquiring resources.

Exceptions:

- `ArgumentNullException`: `limiters` is a null parameter.
- `ArgumentException`: `limiters` is an empty array.

Methods on the returned `RateLimiter` will iterate over the passed in `limiters` in the order given.

`RateLimiter.GetStatistics` will return the lowest value for `RateLimiterStatistics.CurrentAvailablePermits`,
the inner-most limiter's `RateLimiterStatistics.TotalSuccessfulLeases`,
and the aggregate values for the rest of the properties from the `limiters`.

`RateLimitLease`s returned will aggregate metadata and for duplicates use the value of the first lease with the same metadata name.

Disposing the returned `RateLimiter` does not dispose the inner `limiters`.
Callers are expected to dispose the inner limiters themselves once they are no longer in use.

## RateLimiter.Dispose() method

```csharp
public void Dispose ();
```

Disposes the RateLimiter. This completes any queued acquires with a failed lease.

To be added.

## RateLimiter.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Dispose method for implementations to write.

To be added.

## RateLimiter.DisposeAsync() method

```csharp
public System.Threading.Tasks.ValueTask DisposeAsync ();
```

Disposes the RateLimiter asynchronously.

Returns: ValueTask representing the completion of the disposal.

To be added.

## RateLimiter.DisposeAsyncCore() method

```csharp
protected virtual System.Threading.Tasks.ValueTask DisposeAsyncCore ();
```

DisposeAsync method for implementations to write.

Returns: To be added.

To be added.

## RateLimiter.GetStatistics() method

```csharp
public abstract System.Threading.RateLimiting.RateLimiterStatistics? GetStatistics ();
```

Gets a snapshot of the `RateLimiter` statistics if available.

Returns: An instance of `RateLimiterStatistics` containing a snapshot of the `RateLimiter` statistics.

To be added.
