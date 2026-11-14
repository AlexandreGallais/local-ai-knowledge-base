---
title: "PartitionedRateLimiter<TResource> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/PartitionedRateLimiter`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PartitionedRateLimiter<TResource> class

Namespace: `System.Threading.RateLimiting`

```csharp
public abstract class PartitionedRateLimiter<TResource> : IAsyncDisposable, IDisposable
```

Represents a limiter type that users interact with to determine if an operation can proceed given a specific `TResource`.

Parameters:

- `TResource`: The resource type that is being limited.

To be added.

## PartitionedRateLimiter<TResource>.PartitionedRateLimiter() constructor

```csharp
protected PartitionedRateLimiter ();
```

To be added.

To be added.

## PartitionedRateLimiter<TResource>.AcquireAsync(TResource, Int32, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<System.Threading.RateLimiting.RateLimitLease> AcquireAsync (TResource resource, int permitCount = 1, System.Threading.CancellationToken <example-value> = default);
```

Wait until the requested permits are available or permits can no longer be acquired.

Parameters:

- `resource`: The resource to limit.
- `permitCount`: Number of permits to try and acquire.
- `cancellationToken`: Optional token to allow canceling a queued request for permits.

Returns: A task that completes when the requested permits are acquired or when the requested permits are denied.

Set `permitCount` to 0 to wait until permits are replenished.

## PartitionedRateLimiter<TResource>.AcquireAsyncCore(TResource, Int32, CancellationToken) method

```csharp
protected abstract System.Threading.Tasks.ValueTask<System.Threading.RateLimiting.RateLimitLease> AcquireAsyncCore (TResource resource, int permitCount, System.Threading.CancellationToken <example-value>);
```

Method that `PartitionedRateLimiter<T>` implementations implement for `PartitionedRateLimiter<T>.AcquireAsync`.

Parameters:

- `resource`: The resource to limit.
- `permitCount`: Number of permits to try and acquire.
- `cancellationToken`: Optional token to allow canceling a queued request for permits.

Returns: A task that completes when the requested permits are acquired or when the requested permits are denied.

To be added.

## PartitionedRateLimiter<TResource>.AttemptAcquire(TResource, Int32) method

```csharp
public System.Threading.RateLimiting.RateLimitLease AttemptAcquire (TResource resource, int permitCount = 1);
```

Fast synchronous attempt to acquire permits.

Parameters:

- `resource`: The resource to limit.
- `permitCount`: Number of permits to try and acquire.

Returns: A successful or failed lease.

Set `permitCount` to 0 to get whether permits are exhausted.

## PartitionedRateLimiter<TResource>.AttemptAcquireCore(TResource, Int32) method

```csharp
protected abstract System.Threading.RateLimiting.RateLimitLease AttemptAcquireCore (TResource resource, int permitCount);
```

Method that `PartitionedRateLimiter<T>` implementations implement for `PartitionedRateLimiter<T>.AttemptAcquire`.

Parameters:

- `resource`: The resource to limit.
- `permitCount`: Number of permits to try and acquire.

To be added.

## PartitionedRateLimiter<TResource>.Dispose() method

```csharp
public void Dispose ();
```

Disposes the RateLimiter. This completes any queued acquires with a failed lease.

To be added.

## PartitionedRateLimiter<TResource>.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Dispose method for implementations to write.

To be added.

## PartitionedRateLimiter<TResource>.DisposeAsync() method

```csharp
public System.Threading.Tasks.ValueTask DisposeAsync ();
```

Disposes the RateLimiter asynchronously.

Returns: ValueTask representing the completion of the disposal.

To be added.

## PartitionedRateLimiter<TResource>.DisposeAsyncCore() method

```csharp
protected virtual System.Threading.Tasks.ValueTask DisposeAsyncCore ();
```

DisposeAsync method for implementations to write.

Returns: To be added.

To be added.

## PartitionedRateLimiter<TResource>.GetStatistics(TResource) method

```csharp
public abstract System.Threading.RateLimiting.RateLimiterStatistics? GetStatistics (TResource resource);
```

Gets a snapshot of the statistics for the `resource` if available.

Parameters:

- `resource`: To be added.

Returns: An instance of `RateLimiterStatistics` containing a snapshot of the statistics for a `resource`.

To be added.

## PartitionedRateLimiter<TResource>.WithTranslatedKey<TOuter>(Func<TOuter,TResource>, Boolean) method

```csharp
public System.Threading.RateLimiting.PartitionedRateLimiter<TOuter> WithTranslatedKey<TOuter> (Func<TOuter,TResource> keyAdapter, bool leaveOpen);
```

Translates PartitionedRateLimiter<TOuter> into the current `PartitionedRateLimiter<T>`
using the `keyAdapter` to translate `TOuter` to `TResource`.

Parameters:

- `TOuter`: The type to translate into `TResource`.
- `keyAdapter`: The function to be called every time a `TOuter` is passed to
PartitionedRateLimiter<TOuter>.Acquire(TOuter, int) or PartitionedRateLimiter<TOuter>.WaitAsync(TOuter, int, CancellationToken).
<remarks>`keyAdapter` should be implemented in a thread-safe way.</remarks>
- `leaveOpen`: Specifies whether the returned `PartitionedRateLimiter<T>` will dispose the wrapped `PartitionedRateLimiter<T>`.

Returns: A new PartitionedRateLimiter<TOuter> that translates `TOuter`
to `TResource` and calls the inner `PartitionedRateLimiter<T>`.

`keyAdapter` should be implemented in a thread-safe way.
