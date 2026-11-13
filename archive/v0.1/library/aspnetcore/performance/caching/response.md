---
title: "Response caching in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/performance/caching/response.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Response caching in ASP.NET Core

By Rick Anderson and Kirk Larkin

Response caching reduces the number of requests a client or proxy makes to a web server. Response caching also reduces the amount of work the web server performs to generate a response. Response caching is set in headers.

The ResponseCache attribute sets response caching headers. Clients and intermediate proxies should honor the headers for caching responses under the RFC 9111: HTTP Caching specification.

For server-side caching that follows the HTTP 1.1 Caching specification, use response caching middleware. The middleware can use the `Microsoft.AspNetCore.Mvc.ResponseCacheAttribute` properties to influence server-side caching behavior.

The response caching middleware enables the caching of server responses based on HTTP Cache-Control headers.

* Caching behavior implements standard HTTP caching semantics.

* Caching is based on HTTP cache headers similar to the method used by proxies.

* This form of caching is useful for public GET or HEAD API requests from clients where the conditions for caching are satisfied.

* For UI apps like Razor Pages, response caching isn't typically beneficial. Browsers commonly set request headers that prevent caching.

  Output caching (available in .NET 7 and later) is a better approach for UI apps. In this scenario, the configuration determines what to cache independent of HTTP headers.

To test response caching, use Fiddler or another tool that can explicitly set request headers. Setting headers explicitly is preferred for testing caching. For more information, see Response caching middleware > Troubleshooting.

View or download sample code (how to download)

## HTTP-based response caching

The RFC 9111: HTTP Caching specification describes how internet caches should behave. The primary HTTP header used for caching is Cache-Control, which is used to specify cache directives. The directives control caching behavior as requests make their way from clients to servers and responses make their way from servers back to clients. Requests and responses move through proxy servers, and proxy servers must also conform to the HTTP 1.1 Caching specification.

Common `Cache-Control` directives are shown in the following table.

| Directive                                                                            | Action |
| ------------------------------------------------------------------------------------ | ------ |
| public     | A cache can store the response. |
| private   | A shared cache must not store the response. A private cache can store and reuse the response. |
| max-age   | The client doesn't accept a response whose age is greater than the specified number of seconds. Examples: `max-age=60` (60 seconds), `max-age=2592000` (one month) |
| no-cache | **On requests**: A cache must not use a stored response to satisfy the request. The origin server regenerates the response for the client, and the middleware updates the stored response in its cache.**On responses**: The response must not be used for a subsequent request without validation on the origin server. |
| no-store | **On requests**: A cache must not store the request.**On responses**: A cache must not store any part of the response. |

Other cache headers that play a role in caching are shown in the following table.

| Header                                                          | Function |
| --------------------------------------------------------------- | -------- |
| Age         | Provides an estimate of the amount of time in seconds since the response was generated or successfully validated at the origin server. |
| Expires | Specifies the time after which the response is considered stale. |
| Pragma   | Exists for backwards compatibility with HTTP 1.0 caches for setting `no-cache` behavior. If the `Cache-Control` header is present, the `Pragma` header is ignored. |
| Vary       | Specifies that a cached response must not be sent unless all of the `Vary` header fields match in both the cached response's original request and the new request. |

## HTTP-based caching respects request Cache-Control directives

The RFC 9111: HTTP Caching (Section 5.2. Cache-Control) specification requires a cache to honor a valid `Cache-Control` header sent by the client. A client can make requests with a `no-cache` header value and force the server to generate a new response for every request.

Always honoring client `Cache-Control` request headers makes sense if you consider the goal of HTTP caching. Under the official specification, caching is meant to reduce the latency and network overhead of satisfying requests across a network of clients, proxies, and servers. It isn't necessarily a way to control the load on an origin server.

There's no developer control over this caching behavior when using the response caching middleware because the middleware adheres to the official caching specification. .NET 7 and later includes support for *output caching* to better control server load. For more information, see Output caching.
