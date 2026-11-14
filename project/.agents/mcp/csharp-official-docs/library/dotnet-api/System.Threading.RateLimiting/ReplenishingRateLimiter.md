---
title: "ReplenishingRateLimiter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/ReplenishingRateLimiter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReplenishingRateLimiter class

Namespace: `System.Threading.RateLimiting`

```csharp
public abstract class ReplenishingRateLimiter : System.Threading.RateLimiting.RateLimiter
```

Abstraction that specifies that the `RateLimiter` implementation is capable of replenishing tokens.

To be added.

## ReplenishingRateLimiter.ReplenishingRateLimiter() constructor

```csharp
protected ReplenishingRateLimiter ();
```

To be added.

To be added.

## ReplenishingRateLimiter.IsAutoReplenishing property

```csharp
public abstract bool IsAutoReplenishing { get; }
```

Specifies if the `ReplenishingRateLimiter` is automatically replenishing
its tokens or if it expects an external source to regularly call `ReplenishingRateLimiter.TryReplenish`.

Returns: To be added.

To be added.

## ReplenishingRateLimiter.ReplenishmentPeriod property

```csharp
public abstract TimeSpan ReplenishmentPeriod { get; }
```

Specifies how often the `ReplenishingRateLimiter` will replenish tokens.
If `ReplenishingRateLimiter.IsAutoReplenishing` is `false` then this is how often `ReplenishingRateLimiter.TryReplenish` should be called.

Returns: To be added.

To be added.

## ReplenishingRateLimiter.TryReplenish() method

```csharp
public abstract bool TryReplenish ();
```

Attempts to replenish tokens.

Returns: Generally returns `false` if `ReplenishingRateLimiter.IsAutoReplenishing` is enabled
or if no tokens were replenished. Otherwise `true`.

To be added.
