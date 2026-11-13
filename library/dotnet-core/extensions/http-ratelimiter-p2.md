---
title: "Rate limiting an HTTP handler in .NET (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/http-ratelimiter.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Rate limiting an HTTP handler in .NET (part 2 of 2)

## Emulate many concurrent requests

To put this custom `DelegatingHandler` subclass to the test, you'll create a console app that emulates many concurrent requests. This `Program` class creates an `System.Net.Http.HttpClient` with the custom `ClientSideRateLimitedHandler`:

```csharp
﻿var options = new TokenBucketRateLimiterOptions
{ 
    TokenLimit = 8, 
    QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
    QueueLimit = 3, 
    ReplenishmentPeriod = TimeSpan.FromMilliseconds(1), 
    TokensPerPeriod = 2, 
    AutoReplenishment = true
};

// Create an HTTP client with the client-side rate limited handler.
using HttpClient client = new(
    handler: new ClientSideRateLimitedHandler(
        limiter: new TokenBucketRateLimiter(options)));

// Create 100 urls with a unique query string.
var oneHundredUrls = Enumerable.Range(0, 100).Select(
    i => $"https://example.com?iteration={i:0#}");

// Flood the HTTP client with requests.
var floodOneThroughFortyNineTask = Parallel.ForEachAsync(
    source: oneHundredUrls.Take(0..49), 
    body: (url, cancellationToken) => GetAsync(client, url, cancellationToken));

var floodFiftyThroughOneHundredTask = Parallel.ForEachAsync(
    source: oneHundredUrls.Take(^50..),
    body: (url, cancellationToken) => GetAsync(client, url, cancellationToken));

await Task.WhenAll(
    floodOneThroughFortyNineTask,
    floodFiftyThroughOneHundredTask);

static async ValueTask GetAsync(
    HttpClient client, string url, CancellationToken <example-value>)
{
    using var response =
        await client.GetAsync(url, cancellationToken);

    Console.WriteLine(
        $"URL: {url}, HTTP status code: {response.StatusCode} ({(int)response.StatusCode})");
}
```
In the preceding console app:

- The `TokenBucketRateLimiterOptions` are configured with a token limit of `8`, and queue processing order of `OldestFirst`, a queue limit of `3`, and replenishment period of `1` millisecond, a tokens per period value of `2`, and an auto-replenish value of `true`.
- An `HttpClient` is created with the `ClientSideRateLimitedHandler` that is configured with the `TokenBucketRateLimiter`.
- To emulate 100 requests, `System.Linq.Enumerable.Range*` creates 100 URLs, each with a unique query string parameter.
- Two `System.Threading.Tasks.Task` objects are assigned from the `System.Threading.Tasks.Parallel.ForEachAsync*` method, splitting the URLs into two groups.
- The `HttpClient` is used to send a `GET` request to each URL, and the response is written to the console.
- `System.Threading.Tasks.Task.WhenAll*` waits for both tasks to complete.

Since the `HttpClient` is configured with the `ClientSideRateLimitedHandler`, not all requests will make it to the server resource. You can test this assertion by running the console app. You'll see that only a fraction of the total number of requests are sent to the server, and the rest are rejected with an HTTP status code of `429`. Try altering the `options` object used to create the `TokenBucketRateLimiter` to see how the number of requests that are sent to the server changes.

Consider the following example output:

```output
URL: https://example.com?iteration=06, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=60, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=55, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=59, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=57, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=11, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=63, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=13, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=62, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=65, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=64, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=67, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=14, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=68, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=16, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=69, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=70, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=71, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=17, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=18, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=72, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=73, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=74, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=19, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=75, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=76, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=79, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=77, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=21, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=78, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=81, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=22, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=80, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=20, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=82, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=83, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=23, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=84, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=24, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=85, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=86, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=25, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=87, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=26, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=88, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=89, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=27, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=90, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=28, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=91, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=94, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=29, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=93, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=96, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=92, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=95, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=31, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=30, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=97, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=98, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=99, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=32, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=33, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=34, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=35, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=36, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=37, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=38, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=39, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=40, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=41, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=42, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=43, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=44, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=45, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=46, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=47, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=48, HTTP status code: TooManyRequests (429)
URL: https://example.com?iteration=15, HTTP status code: OK (200)
URL: https://example.com?iteration=04, HTTP status code: OK (200)
URL: https://example.com?iteration=54, HTTP status code: OK (200)
URL: https://example.com?iteration=08, HTTP status code: OK (200)
URL: https://example.com?iteration=00, HTTP status code: OK (200)
URL: https://example.com?iteration=51, HTTP status code: OK (200)
URL: https://example.com?iteration=10, HTTP status code: OK (200)
URL: https://example.com?iteration=66, HTTP status code: OK (200)
URL: https://example.com?iteration=56, HTTP status code: OK (200)
URL: https://example.com?iteration=52, HTTP status code: OK (200)
URL: https://example.com?iteration=12, HTTP status code: OK (200)
URL: https://example.com?iteration=53, HTTP status code: OK (200)
URL: https://example.com?iteration=07, HTTP status code: OK (200)
URL: https://example.com?iteration=02, HTTP status code: OK (200)
URL: https://example.com?iteration=01, HTTP status code: OK (200)
URL: https://example.com?iteration=61, HTTP status code: OK (200)
URL: https://example.com?iteration=05, HTTP status code: OK (200)
URL: https://example.com?iteration=09, HTTP status code: OK (200)
URL: https://example.com?iteration=03, HTTP status code: OK (200)
URL: https://example.com?iteration=58, HTTP status code: OK (200)
URL: https://example.com?iteration=50, HTTP status code: OK (200)
```

You'll notice that the first logged entries are always the immediately returned 429 responses, and the last entries are always the 200 responses. This is because the rate limit is encountered client-side and avoids making an HTTP call to a server. This is a good thing because it means that the server isn't flooded with requests. It also means that the rate limit is enforced consistently across all clients.

Note also that each URL's query string is unique: examine the `iteration` parameter to see that it's incremented by one for each request. This parameter helps to illustrate that the 429 responses aren't from the first requests, but rather from the requests that are made after the rate limit is reached. The 200 responses arrive later but these requests were made earlier—before the limit was reached.

To have a better understanding of the various rate-limiting algorithms, try rewriting this code to accept a different `System.Threading.RateLimiting.RateLimiter` implementation. In addition to the `System.Threading.RateLimiting.TokenBucketRateLimiter` you could try:

- `System.Threading.RateLimiting.ConcurrencyLimiter`
- `System.Threading.RateLimiting.FixedWindowRateLimiter`
- `System.Threading.RateLimiting.PartitionedRateLimiter`
- `System.Threading.RateLimiting.SlidingWindowRateLimiter`

## Summary

In this article, you learned how to implement a custom `ClientSideRateLimitedHandler`. This pattern could be used to implement a rate-limited HTTP client for resources that you know have API limits. In this way, you're preventing your client app from making unnecessary requests to the server, and you're also preventing your app from being blocked by the server. Additionally, with the use of metadata to store retry timing values, you could also implement automatic retry logic.

## See also

- Announcing Rate Limiting for .NET
- Rate limiting middleware in ASP.NET Core
- Azure Architecture: Rate limiting pattern
- Automatic retry logic in .NET
