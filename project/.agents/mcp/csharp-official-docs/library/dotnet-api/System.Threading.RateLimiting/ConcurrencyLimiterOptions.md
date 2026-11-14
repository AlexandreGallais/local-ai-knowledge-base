---
title: "ConcurrencyLimiterOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/ConcurrencyLimiterOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConcurrencyLimiterOptions class

Namespace: `System.Threading.RateLimiting`

```csharp
public sealed class ConcurrencyLimiterOptions
```

Options to specify the behavior of a `ConcurrencyLimiter`.

To be added.

## ConcurrencyLimiterOptions.ConcurrencyLimiterOptions() constructor

```csharp
public ConcurrencyLimiterOptions ();
```

To be added.

To be added.

## ConcurrencyLimiterOptions.PermitLimit property

```csharp
public int PermitLimit { get; set; }
```

Maximum number of permits that can be leased concurrently.
Must be set to a value > 0 by the time these options are passed to the constructor of `ConcurrencyLimiter`.

Returns: To be added.

To be added.

## ConcurrencyLimiterOptions.QueueLimit property

```csharp
public int QueueLimit { get; set; }
```

Maximum number of permits that can be queued concurrently.
Must be set to a value >= 0 by the time these options are passed to the constructor of `ConcurrencyLimiter`.

Returns: To be added.

To be added.

## ConcurrencyLimiterOptions.QueueProcessingOrder property

```csharp
public System.Threading.RateLimiting.QueueProcessingOrder QueueProcessingOrder { get; set; }
```

Determines the behaviour of `RateLimiter.AcquireAsync` when not enough resources can be leased.

Returns: `QueueProcessingOrder.OldestFirst` by default.

To be added.
