---
title: "Rate limiting middleware in ASP.NET Core (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/performance/rate-limit.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Rate limiting middleware in ASP.NET Core (part 2 of 3)

## Rate limiter algorithms

The `RateLimiterOptionsExtensions` class provides the following extension methods for rate limiting:

* Fixed window
* Sliding window
* Token <example-value>
* Concurrency

The fixed, sliding, and token <example-value> all limit the maximum number of requests in a time period. The concurrency limiter limits only the number of concurrent requests and doesn't cap the number of requests in a time period. Consider the cost of an endpoint when you select a limiter. The cost of an endpoint includes the resources used, such as time, data access, CPU, and I/O.

### Fixed window limiter

The `AddFixedWindowLimiter` method uses a fixed time window to limit requests. When the time window expires, a new time window starts and the request limit resets.

Consider the following code:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRateLimitAuth/Program.cs._
The preceding code:

* Calls `Microsoft.AspNetCore.Builder.RateLimiterServiceCollectionExtensions.AddRateLimiter*` to add a rate limiting service to the service collection.
* Calls `AddFixedWindowLimiter` to create a fixed window limiter with a policy name of `"fixed"` and sets:
* `System.Threading.RateLimiting.FixedWindowRateLimiterOptions.PermitLimit` to 4 and the time `System.Threading.RateLimiting.FixedWindowRateLimiterOptions.Window` to 12. A maximum of 4 requests per each 12-second window are allowed.
* `System.Threading.RateLimiting.FixedWindowRateLimiterOptions.QueueProcessingOrder` to `System.Threading.RateLimiting.QueueProcessingOrder.OldestFirst`.
* `System.Threading.RateLimiting.FixedWindowRateLimiterOptions.QueueLimit` to 2 (set this to 0 to disable the queueing mechanism).
* Calls UseRateLimiter to enable rate limiting.

Apps should use Configuration to set limiter options. The following code updates the preceding code using `MyRateLimitOptions` for configuration:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRateLimitAuth/Program.cs._
`Microsoft.AspNetCore.Builder.RateLimiterApplicationBuilderExtensions.UseRateLimiter*` must be called after `UseRouting` when rate limiting endpoint specific APIs are used. For example, if the `[EnableRateLimiting]` attribute is used, `UseRateLimiter` must be called after `UseRouting`. When calling only global limiters, `UseRateLimiter` can be called before `UseRouting`.

If the app calls `Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute*`, call it before `UseRouting` and `UseRateLimiter`. When the status code pages middleware re-executes a request, only the middleware registered after it runs again. If `UseRateLimiter` is called before `UseStatusCodePagesWithReExecute`, the rate limiter doesn't run for the re-executed endpoint, so that endpoint's rate limiting policy isn't applied, even when the policy has no permits remaining. The following order lets the rate limiter evaluate the re-executed endpoint:

```csharp
app.UseStatusCodePagesWithReExecute("/StatusCode/{0}");
app.UseRouting();
app.UseRateLimiter();
```

For more information, see the `UseStatusCodePagesWithReExecute` section of the error handling article.

### Sliding window limiter

A sliding window algorithm:

* Is similar to the fixed window limiter but adds segments per window. The window slides one segment each segment interval. The segment interval is (window time)/(segments per window).
* Limits the requests for a window to `permitLimit` requests.
* Each time window is divided in `n` segments per window.
* Requests taken from the expired time segment one window back (`n` segments prior to the current segment) are added to the current segment. We refer to the most expired time segment one window back as the expired segment.

Consider the following table that shows a sliding window limiter with a 30-second window, three segments per window, and a limit of 100 requests:

* The top row and first column shows the time segment.
* The second row shows the remaining requests available. The remaining requests are calculated as the available requests minus the processed requests plus the recycled requests.
* Requests at each time moves along the diagonal blue line.
* From time 30 on, the request taken from the expired time segment are added back to the request limit, as shown in the red lines.

The following table shows the data in the previous graph in a different format. The **Available** column shows the requests available from the previous segment (The **Carry over** from the previous row). The first row shows 100 available requests because there's no previous segment.

| Time | Available | Taken | Recycled from expired | Carry over |
| :--: | :-------: | :---: | :-------------------: | :--------: |
| 0    | 100       | 20    | 0                     | 80         |
| 10   | 80        | 30    | 0                     | 50         |
| 20   | 50        | 40    | 0                     | 10         |
| 30   | 10        | 30    | 20                    | 0          |
| 40   | 0         | 10    | 30                    | 20         |
| 50   | 20        | 10    | 40                    | 50         |
| 60   | 50        | 35    | 30                    | 45         |

The following code uses the sliding window rate limiter:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRateLimitAuth/Program.cs._

### Token <example-value> limiter

The token <example-value> limiter is similar to the sliding window limiter, but rather than adding back the requests taken from the expired segment, a fixed number of tokens are added each replenishment period. The tokens added each segment can't increase the available tokens to a number higher than the token <example-value> limit. The following table shows a token <example-value> limiter with a limit of 100 tokens and a 10-second replenishment period.

| Time | Available | Taken | Added | Carry over |
| :--: | :-------: | :---: | :---: | :--------: |
| 0    | 100       | 20    | 0     | 80         |
| 10   | 80        | 10    | 20    | 90         |
| 20   | 90        | 5     | 15    | 100        |
| 30   | 100       | 30    | 20    | 90         |
| 40   | 90        | 6     | 16    | 100        |
| 50   | 100       | 40    | 20    | 80         |
| 60   | 80        | 50    | 20    | 50         |

The following code uses the token <example-value> limiter:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRateLimitAuth/Program.cs._
When `System.Threading.RateLimiting.TokenBucketRateLimiterOptions.AutoReplenishment` is set to `true`, an internal timer replenishes the tokens every `System.Threading.RateLimiting.TokenBucketRateLimiter.ReplenishmentPeriod`; when set to `false`, the app must call `System.Threading.RateLimiting.TokenBucketRateLimiter.TryReplenish*` on the limiter.

### Concurrency limiter

The concurrency limiter limits the number of concurrent requests. Each request reduces the concurrency limit by one. When a request completes, the limit is increased by one. Unlike the other requests limiters that limit the total number of requests for a specified period, the concurrency limiter limits only the number of concurrent requests and doesn't cap the number of requests in a time period.

The following code uses the concurrency limiter:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRateLimitAuth/Program.cs._
