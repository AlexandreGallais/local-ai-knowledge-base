---
title: "Rate limiting middleware in ASP.NET Core (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/performance/rate-limit.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Rate limiting middleware in ASP.NET Core (part 3 of 3)

## Rate limiting partitions

Rate limiting partitions divide the traffic into separate buckets that each get their own rate limit counters. This approach provides more granular control than a single global counter. Different keys, such as user ID, IP address, or API key, define the partition buckets.

### Benefits of partitioning

* **Fairness**: One user can't consume the entire rate limit for everyone.
* **Granularity**: Different limits for different users and resources.
* **Security**: Better protection against targeted abuse.
* **Tiered service**: Support for service tiers with different limits.

Partitioned rate limiting gives you fine-grained control over how you manage API traffic while ensuring fair resource allocation.

### By IP address

```csharp
options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
    RateLimitPartition.GetFixedWindowLimiter(
        partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
        factory: _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 50,
            Window = TimeSpan.FromMinutes(1)
        }));
```

### By user identity
```csharp
options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
    RateLimitPartition.GetFixedWindowLimiter(
        partitionKey: httpContext.User.Identity?.Name ?? "anonymous",
        factory: _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 100,
            Window = TimeSpan.FromMinutes(1)
        }));
```

### By API key
```csharp
options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
{
    string apiKey = httpContext.Request.Headers["<example-value>"].ToString() ?? "<example-value>";

    // Different limits based on key tier
    return apiKey <example-value>
    {
        "premium-key" => RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: <example-value>,
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 1000,
                Window = TimeSpan.FromMinutes(1)
            }),
        
        _ => RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: <example-value>,
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 100,
                Window = TimeSpan.FromMinutes(1)
            }),
    };
});
```

### By endpoint path

```csharp
options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
{
    string path = httpContext.Request.Path.ToString();

    // Different limits for different paths
    if (path.StartsWith("/api/public"))
    {
        return RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: $"{httpContext.Connection.RemoteIpAddress}-public",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 30,
                Window = TimeSpan.FromSeconds(10)
            });
    }

    return RateLimitPartition.GetFixedWindowLimiter(
        partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
        factory: _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 100,
            Window = TimeSpan.FromMinutes(1)
        });
});
```

### Create chained limiters

The `System.Threading.RateLimiting.PartitionedRateLimiter.CreateChained*` API accepts multiple `System.Threading.RateLimiting.PartitionedRateLimiter` instances and combines them into one `PartitionedRateLimiter`. The combined limiter runs all the input limiters in sequence. Because the result is a `PartitionedRateLimiter` assigned to `GlobalLimiter`, the chain applies to every endpoint. To chain limiters for a specific endpoint instead, use a named policy, as shown in Chain limiters in a named policy.

The following code uses `CreateChained`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRate2/Program.cs._
For more information, see the CreateChained source code.

### Chain limiters in a named policy

`System.Threading.RateLimiting.PartitionedRateLimiter.CreateChained*` chains *global* limiters that apply to every endpoint. To combine multiple limiter types and scope them to specific endpoints, chain the limiters inside a named policy with `System.Threading.RateLimiting.RateLimiter.CreateChained*`. This overload returns a single `System.Threading.RateLimiting.RateLimiter` that runs each limiter in sequence, which is the return type a named policy's partition factory requires.

The following `"<example-value>"` policy chains a token <example-value> limiter and a concurrency limiter with `RateLimiter.CreateChained`, then applies the policy to a single endpoint with `Microsoft.AspNetCore.Builder.RateLimiterEndpointConventionBuilderExtensions.RequireRateLimiting*`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRateLimiter(options =>
{
    options.AddPolicy("combined", httpContext =>
    {
        // Partition on the authenticated identity name when available. Each distinct key <example-value> and
        // caches its own limiter, so partitioning on unbounded user-controlled
        // input can exhaust memory (a DoS risk).
        string partitionKey = httpContext.User.Identity?.Name ?? "anonymous";

        return RateLimitPartition.Get(partitionKey, _ =>
            RateLimiter.CreateChained(
                new TokenBucketRateLimiter(new TokenBucketRateLimiterOptions
                {
                    TokenLimit = 100,
                    QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                    QueueLimit = 5,
                    ReplenishmentPeriod = TimeSpan.FromSeconds(10),
                    TokensPerPeriod = 10,
                    AutoReplenishment = true
                }),
                new ConcurrencyLimiter(new ConcurrencyLimiterOptions
                {
                    PermitLimit = 5,
                    QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                    QueueLimit = 2
                })));
    });
});

var app = builder.Build();

app.MapGet("/api/resource", () => "This endpoint uses multiple limiters")
   .RequireRateLimiting("combined");
```

A request must acquire a lease from every limiter in the chain to proceed, and the limiters run in the order passed to `RateLimiter.CreateChained`. If a limiter rejects the request, the request is rejected and the leases already acquired from earlier limiters in the chain are disposed in reverse order.

When chaining limiters in a named policy, keep the following in mind:

* Disposing a lease returns the permit for a concurrency limiter. The time-based limiters (token <example-value>, fixed window, and sliding window) don't return a permit that was already acquired when a later limiter in the chain rejects the request, so take this into account when ordering the limiters in the chain.
* Constructing a `TokenBucketRateLimiter` directly with `AutoReplenishment` set to `true` gives each limiter instance its own timer. The `AddTokenBucketLimiter` and `RateLimitPartition.GetTokenBucketLimiter` helpers instead set `AutoReplenishment` to `false` and replenish all of their limiters from a single shared timer.
* `RateLimiter.CreateChained` doesn't dispose the limiters passed to it. In the preceding example, the partition caches the chained limiter and the framework manages its lifetime. If you create chained limiters outside of a partition, dispose the inner limiters when they're no longer in use.
* Prefer the global `PartitionedRateLimiter.CreateChained` approach when the chain should apply to every endpoint. Use a named policy with `RateLimiter.CreateChained` only when the chain must be scoped to specific endpoints.

## Choosing what happens when a request is rate limited

For simple cases, you can just set the status code:

```csharp
builder.Services.AddRateLimiter(options =>
{
    // Set a custom status code for rejections
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    // Rate limiter configuration...
});
```

The most common approach is to register an `OnRejected` callback when configuring rate limiting:

```csharp
builder.Services.AddRateLimiter(options =>
{
    // Rate limiter configuration...
    
    options.OnRejected = async (context, cancellationToken) =>
    {
        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;

        if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter))
        {
            context.HttpContext.Response.Headers.RetryAfter =
                ((long)Math.Ceiling(retryAfter.TotalSeconds)).ToString(NumberFormatInfo.InvariantInfo);
        }

        await context.HttpContext.Response.WriteAsync("<example-value>", cancellationToken);

        // Optional logging
        logger.LogWarning("Rate limit exceeded for IP: {IpAddress}",
            context.HttpContext.Connection.RemoteIpAddress);
    };
});
```

The example requires `using System.Globalization;` and `using System.Threading.RateLimiting;`.

> **Note:**
> `System.Threading.RateLimiting.FixedWindowRateLimiter` reports `MetadataName.RetryAfter` based on the next fixed-window boundary. Apps that copy this metadata to the `Retry-After` response header in `OnRejected` return an accurate retry interval automatically. Limiters that can't estimate when permits are available, such as `System.Threading.RateLimiting.ConcurrencyLimiter`, don't provide `RetryAfter` metadata.

Another option is to queue the request:

### Request queuing

When you enable queuing, if a request exceeds the rate limit, the system places it in a queue. The request waits in the queue until a permit becomes available or a timeout occurs. The system processes requests according to a configurable queue order.

```csharp
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("api", options =>
    {
        options.PermitLimit = 10;           // Allow 10 requests
        options.Window = TimeSpan.FromSeconds(10);  // Per 10-second window
        options.QueueLimit = 5;             // Queue up to 5 additional requests
        options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst; // Process oldest requests first
        options.AutoReplenishment = true; // Default: automatically replenish permits
    });
});
```

## `EnableRateLimiting` and `DisableRateLimiting` attributes

Apply the `[EnableRateLimiting]` and `[DisableRateLimiting]` attributes to a controller, action method, or Razor Page. For Razor Pages, apply the attribute to the Razor Page and not the page handlers. For example, you can't apply `[EnableRateLimiting]` to `OnGet`, `OnPost`, or any other page handler.

The `[DisableRateLimiting]` attribute ***disables*** rate limiting for the controller, action method, or Razor Page, regardless of named rate limiters or global limiters applied. For example, consider the following code which calls `Microsoft.AspNetCore.Builder.RateLimiterEndpointConventionBuilderExtensions.RequireRateLimiting*` to apply the `fixedPolicy` rate limiting to all controller endpoints:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRate2/Program.cs._
In the following code, `[DisableRateLimiting]` disables rate limiting and overrides `[EnableRateLimiting("fixed")]` applied to the `Home2Controller` and `app.MapDefaultControllerRoute().RequireRateLimiting(fixedPolicy)` called in `Program.cs`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRate2/Controllers/Home2Controller.cs._
In the preceding code, the `[EnableRateLimiting("sliding")]` is ***not*** applied to the `Privacy` action method because `Program.cs` called `app.MapDefaultControllerRoute().RequireRateLimiting(fixedPolicy)`.

Consider the following code which doesn't call `RequireRateLimiting` on `MapRazorPages` or `MapDefaultControllerRoute`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRate2/Program.cs._
Consider the following controller:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRate2/Controllers/Home2Controller.cs._
In the preceding controller:

* The `"fixed"` policy rate limiter is applied to all action methods that don't have `EnableRateLimiting` and `DisableRateLimiting` attributes.
* The `"sliding"` policy rate limiter is applied to the `Privacy` action.
* Rate limiting is disabled on the `NoLimit` action method.

## Rate limiting metrics

The rate limiting middleware provides built-in metrics and monitoring capabilities to help you understand how rate limits affect app performance and user experience. For a list of metrics, see `Microsoft.AspNetCore.RateLimiting`.

## Testing endpoints with rate limiting

Before deploying an app that uses rate limiting to production, stress test the app to validate the rate limiters and options you used. For example, create a JMeter script by using a tool like BlazeMeter or Apache JMeter HTTP(S) Test Script Recorder and load the script to Azure Load Testing.

If you create partitions by using user input, your app becomes vulnerable to Denial of Service (DoS) attacks. For example, if you create partitions by using client IP addresses, your app becomes vulnerable to Denial of Service attacks that use IP Source Address Spoofing. For more information, see BCP 38 RFC 2827 Network Ingress Filtering: Defeating Denial of Service Attacks that employ IP Source Address Spoofing.

## Related content

* Rate limiting middleware by Maarten Balliauw provides an excellent introduction and overview to rate limiting.
* Rate limit an HTTP handler in .NET
