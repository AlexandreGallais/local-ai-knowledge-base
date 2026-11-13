---
title: "rate-limiting-retry-after"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11/includes/rate-limiting-retry-after.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# rate-limiting-retry-after

### Rate-limiting middleware returns accurate `Retry-After` headers

The `System.Threading.RateLimiting.FixedWindowRateLimiter` now reports a `System.Threading.RateLimiting.MetadataName.RetryAfter` metadata value that accurately reflects the next window boundary. Apps that propagate this metadata to the `Retry-After` response header in their `Microsoft.AspNetCore.RateLimiting.RateLimiterOptions.OnRejected` callback now produce correct retry intervals automatically, with no code changes required.

Additional fixes in `System.Threading.RateLimiting` resolve an issue where `System.Threading.RateLimiting.TokenBucketRateLimiter` mishandled partial token <example-value> during zero-permit acquisition, and improve the chained rate limiter returned by `System.Threading.RateLimiting.RateLimiter.CreateChained*` to correctly forward idle-duration and replenishment behavior from its inner limiters.

For an overview of the rate limiting middleware, see Rate limiting middleware in ASP.NET Core.

Thank you @asbjornvad and @apoorvdarshan for these contributions!
