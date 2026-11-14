---
title: "FixedWindowRateLimiterOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/FixedWindowRateLimiterOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FixedWindowRateLimiterOptions class

Namespace: `System.Threading.RateLimiting`

```csharp
public sealed class FixedWindowRateLimiterOptions
```

Options to specify the behavior of a `FixedWindowRateLimiter`.

To be added.

## FixedWindowRateLimiterOptions.FixedWindowRateLimiterOptions() constructor

```csharp
public FixedWindowRateLimiterOptions ();
```

To be added.

To be added.

## FixedWindowRateLimiterOptions.AutoReplenishment property

```csharp
public bool AutoReplenishment { get; set; }
```

Specified whether the `FixedWindowRateLimiter` is automatically refresh counters or if someone else
will be calling `FixedWindowRateLimiter.TryReplenish` to refresh counters.

Returns: `true` by default.

To be added.

## FixedWindowRateLimiterOptions.PermitLimit property

```csharp
public int PermitLimit { get; set; }
```

Maximum number of permit counters that can be allowed in a window.
Must be set to a value > 0 by the time these options are passed to the constructor of `FixedWindowRateLimiter`.

Returns: To be added.

To be added.

## FixedWindowRateLimiterOptions.QueueLimit property

```csharp
public int QueueLimit { get; set; }
```

Maximum cumulative permit count of queued acquisition requests.
Must be set to a value >= 0 by the time these options are passed to the constructor of `FixedWindowRateLimiter`.

Returns: To be added.

To be added.

## FixedWindowRateLimiterOptions.QueueProcessingOrder property

```csharp
public System.Threading.RateLimiting.QueueProcessingOrder QueueProcessingOrder { get; set; }
```

Determines the behaviour of `RateLimiter.AcquireAsync` when not enough resources can be leased.

Returns: `QueueProcessingOrder.OldestFirst` by default.

To be added.

## FixedWindowRateLimiterOptions.Window property

```csharp
public TimeSpan Window { get; set; }
```

Specifies the time window that takes in the requests.
Must be set to a value greater than `TimeSpan.Zero` by the time these options are passed to the constructor of `FixedWindowRateLimiter`.

Returns: To be added.

To be added.
