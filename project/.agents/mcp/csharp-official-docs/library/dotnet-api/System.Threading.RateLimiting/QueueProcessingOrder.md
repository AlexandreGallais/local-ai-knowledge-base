---
title: "QueueProcessingOrder enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/QueueProcessingOrder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# QueueProcessingOrder enum

Namespace: `System.Threading.RateLimiting`

```csharp
public enum QueueProcessingOrder
```

Controls the behavior of `RateLimiter.AcquireAsync` when not enough resources can be leased.

To be added.

## QueueProcessingOrder.NewestFirst field

```csharp
NewestFirst
```

Lease the newest queued `RateLimiter.AcquireAsync` call.

## QueueProcessingOrder.OldestFirst field

```csharp
OldestFirst
```

Lease the oldest queued `RateLimiter.AcquireAsync` call.
