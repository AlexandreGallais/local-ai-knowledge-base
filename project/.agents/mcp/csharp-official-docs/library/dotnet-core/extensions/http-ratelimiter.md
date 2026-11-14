---
title: "Rate limiting an HTTP handler in .NET (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/http-ratelimiter.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Rate limit an HTTP handler in .NET

In this article, you'll learn how to create a client-side HTTP handler that rate limits the number of requests it sends. You'll see an `System.Net.Http.HttpClient` that accesses the `"www.example.com"` resource. Resources are consumed by apps that rely on them, and when an app makes too many requests for a single resource, it can lead to *resource contention*. Resource contention occurs when a resource is consumed by too many apps, and the resource is unable to serve all of the apps that are requesting it. This can result in a poor user experience, and in some cases, it can even lead to a denial of service (DoS) attack. For more information on DoS, see OWASP: Denial of Service.

## What is rate limiting?

Rate limiting is the concept of limiting how much a resource can be accessed. For example, you may know that a database your app accesses can safely handle 1,000 requests per minute, but it may not handle much more than that. You can put a rate limiter in your app that only allows 1,000 requests every minute and rejects any more requests before they can access the database. Thus, rate limiting your database and allowing your app to handle a safe number of requests. This is a common pattern in distributed systems, where you may have multiple instances of an app running, and you want to ensure that they don't all try to access the database at the same time. There are multiple different rate-limiting algorithms to control the flow of requests.

To use rate limiting in .NET, you'll reference the System.Threading.RateLimiting NuGet package.

## Implement a `DelegatingHandler` subclass

To control the flow of requests, you implement a custom `System.Net.Http.DelegatingHandler` subclass. This is a type of `System.Net.Http.HttpMessageHandler` that allows you to intercept and handle requests before they're sent to the server. You can also intercept and handle responses before they're returned to the caller. In this example, you'll implement a custom `DelegatingHandler` subclass that limits the number of requests that can be sent to a single resource. Consider the following custom `ClientSideRateLimitedHandler` class:

```csharp
﻿internal sealed class ClientSideRateLimitedHandler(
    RateLimiter limiter)
    : DelegatingHandler(new HttpClientHandler()), IAsyncDisposable
{
    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken <example-value>)
    {
        using RateLimitLease lease = await limiter.AcquireAsync(
            permitCount: 1, cancellationToken);

        if (lease.IsAcquired)
        {
            return await base.SendAsync(request, cancellationToken);
        }

        var response = new HttpResponseMessage(HttpStatusCode.TooManyRequests);
        if (lease.TryGetMetadata(
                MetadataName.RetryAfter, out TimeSpan retryAfter))
        {
            response.Headers.Add(
                "Retry-After",
                ((int)retryAfter.TotalSeconds).ToString(
                    NumberFormatInfo.InvariantInfo));
        }

        return response;
    }

    async ValueTask IAsyncDisposable.DisposeAsync()
    { 
        await limiter.DisposeAsync().ConfigureAwait(false);

        Dispose(disposing: false);
        GC.SuppressFinalize(this);
    }

    protected override void Dispose(bool disposing)
    {
        base.Dispose(disposing);

        if (disposing)
        {
            limiter.Dispose();
        }
    }
}
```
The preceding C# code:

- Inherits the `DelegatingHandler` type.
- Implements the `System.IAsyncDisposable` interface.
- Defines a `RateLimiter` field that is assigned from the constructor.
- Overrides the `SendAsync` method to intercept and handle requests before they're sent to the server.
- Overrides the `System.IAsyncDisposable.DisposeAsync` method to dispose of the `RateLimiter` instance.

Looking a bit closer at the `SendAsync` method, you'll see that it:

- Relies on the `RateLimiter` instance to acquire a `RateLimitLease` from the `AcquireAsync`.
- When the `lease.IsAcquired` property is `true`, the request is sent to the server.
- Otherwise, an `System.Net.Http.HttpResponseMessage` is returned with a `429` status code, and if the `lease` contains a `RetryAfter` value, the `Retry-After` header is set to that value.
