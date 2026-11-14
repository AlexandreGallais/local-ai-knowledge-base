---
title: "SlidingWindowRateLimiterOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/SlidingWindowRateLimiterOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SlidingWindowRateLimiterOptions class

Namespace: `System.Threading.RateLimiting`

```csharp
public sealed class SlidingWindowRateLimiterOptions
```

Options to specify the behavior of a `SlidingWindowRateLimiter`.

To be added.

## SlidingWindowRateLimiterOptions.SlidingWindowRateLimiterOptions() constructor

```csharp
public SlidingWindowRateLimiterOptions ();
```

To be added.

To be added.

## SlidingWindowRateLimiterOptions.AutoReplenishment property

```csharp
public bool AutoReplenishment { get; set; }
```

Specified whether the `SlidingWindowRateLimiter` is automatically replenishing request counters or if someone else
will be calling `SlidingWindowRateLimiter.TryReplenish` to replenish tokens.

Returns: `true` by default.

To be added.

## SlidingWindowRateLimiterOptions.PermitLimit property

```csharp
public int PermitLimit { get; set; }
```

Maximum number of requests that can be served in a window.
Must be set to a value > 0 by the time these options are passed to the constructor of `SlidingWindowRateLimiter`.

Returns: To be added.

To be added.

## SlidingWindowRateLimiterOptions.QueueLimit property

```csharp
public int QueueLimit { get; set; }
```

Maximum cumulative permit count of queued acquisition requests.
Must be set to a value >= 0 by the time these options are passed to the constructor of `SlidingWindowRateLimiter`.

Returns: To be added.

To be added.

## SlidingWindowRateLimiterOptions.QueueProcessingOrder property

```csharp
public System.Threading.RateLimiting.QueueProcessingOrder QueueProcessingOrder { get; set; }
```

Determines the behaviour of `RateLimiter.AcquireAsync` when not enough resources can be leased.

Returns: `QueueProcessingOrder.OldestFirst` by default.

To be added.

## SlidingWindowRateLimiterOptions.SegmentsPerWindow property

```csharp
public int SegmentsPerWindow { get; set; }
```

Specifies the maximum number of segments a window is divided into.
Must be set to a value > 0 by the time these options are passed to the constructor of `SlidingWindowRateLimiter`.

Returns: To be added.

To be added.

## SlidingWindowRateLimiterOptions.Window property

```csharp
public TimeSpan Window { get; set; }
```

Specifies the minimum period between replenishments.
Must be set to a value greater than `TimeSpan.Zero` by the time these options are passed to the constructor of `SlidingWindowRateLimiter`.

Returns: To be added.

To be added.
