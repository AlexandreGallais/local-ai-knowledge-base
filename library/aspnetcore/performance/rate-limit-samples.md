---
title: "Rate limiting middleware samples"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/performance/rate-limit-samples.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Rate limiter samples

The following samples aren't production quality, they're examples on how to use the limiters.

## Limiter with `OnRejected`, `RetryAfter`, and `GlobalLimiter`

The following sample:

* Creates a `Microsoft.AspNetCore.RateLimiting.RateLimiterOptions.OnRejected` callback that's called when a request exceeds the specified limit. `retryAfter` can be used with the `System.Threading.RateLimiting.TokenBucketRateLimiter`, Fixed Window Limiter, and Sliding Window Limiter because these algorithms are able to estimate when more permits are added. The `System.Threading.RateLimiting.ConcurrencyLimiter` has no way of calculating when permits are available.
* Adds the following limiters:

  * A `SampleRateLimiterPolicy` that implements the `Microsoft.AspNetCore.RateLimiting.IRateLimiterPolicy`1` interface. The `SampleRateLimiterPolicy` class is shown later in this article.
  * A `SlidingWindowLimiter`:
    * With a partition for each authenticated user.
    * One shared partition for all anonymous users.
  * A `Microsoft.AspNetCore.RateLimiting.RateLimiterOptions.GlobalLimiter` that's applied to all requests. The global limiter is executed first, followed by the endpoint-specific limiter, if one exists. The `GlobalLimiter` creates a partition for each `System.Net.IPAddress`.

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRateLimitAuth/Program.cs._
> **Warning:**
> Creating partitions on client IP addresses makes the app vulnerable to Denial of Service Attacks which employ IP Source Address Spoofing. For more information, see BCP 38 RFC 2827 Network Ingress Filtering: Defeating Denial of Service Attacks which employ IP Source Address Spoofing.

For the complete `Program.cs` file, see the samples repository.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

The `SampleRateLimiterPolicy` class

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRateLimitAuth/SampleRateLimiterPolicy.cs._
In the preceding code, `Microsoft.AspNetCore.RateLimiting.RateLimiterOptions.OnRejected` uses `Microsoft.AspNetCore.RateLimiting.OnRejectedContext` to set the response status to 429 Too Many Requests. The default rejected status is 503 Service Unavailable.

## Limiter with authorization

The following sample uses JSON Web Tokens (JWT) and creates a partition with the JWT access token. In a production app, the JWT would typically be provided by a server acting as a Security token service (STS). For local development, the dotnet user-jwts command line tool can be used to create and manage app-specific local JWTs.

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRateLimitAuth/Program.cs._
## Limiter with `ConcurrencyLimiter`, `TokenBucketRateLimiter`, and authorization

The following sample:

* Adds a `ConcurrencyLimiter` with a policy name of `"get"` that is used on the Razor Pages.
* Adds a `TokenBucketRateLimiter` with a partition for each authorized user and a partition for all anonymous users.
* Sets RateLimiterOptions.RejectionStatusCode to 429 Too Many Requests.

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRateLimitAuth/Program.cs._
See the samples repository for the complete `Program.cs` file.
