---
title: "Configure options for the ASP.NET Core Kestrel web server"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/kestrel/options.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configure options for the ASP.NET Core Kestrel web server

-->
-->

Kestrel provides configurable limits for connection counts, request sizes, and timeouts. Review the defaults and your app's requirements before changing them. To configure Kestrel options, call `Microsoft.AspNetCore.Hosting.WebHostBuilderKestrelExtensions.ConfigureKestrel*` in `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    // ...
});
```
Configure limits with the `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Limits` property. This property holds an instance of the `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits` class.

## General limits

### Keep-alive timeout

`Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.KeepAliveTimeout` gets or sets the keep-alive timeout:

```csharp
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.KeepAliveTimeout = TimeSpan.FromMinutes(2);
});
```
This timeout is not enforced when a debugger is attached to the Kestrel process.

### Maximum client connections

Both connection limits default to `null` (unlimited). Don't set a connection cap solely because an app is internet-facing. Monitor active and rejected connections and consider expected traffic before deciding whether a limit is appropriate. A limit that's too low or an unexpected traffic surge can cause legitimate connections to be rejected.

The value `100` in the following examples demonstrates configuration syntax, not a recommended production limit. Connection limits aren't a substitute for upstream DDoS protection. For more information, see Edge server guidance.

`Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxConcurrentConnections` gets or sets the maximum number of open connections:

```csharp
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.MaxConcurrentConnections = 100;
});
```
`Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxConcurrentUpgradedConnections` gets or sets the maximum number of open, upgraded connections:

```csharp
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.MaxConcurrentUpgradedConnections = 100;
});
```
An upgraded connection is one that has been switched from HTTP to another protocol, such as WebSockets. After a connection is upgraded, it isn't counted against the `MaxConcurrentConnections` limit.

### Maximum request body size

`Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxRequestBodySize` gets or sets the maximum allowed size of any request body in bytes.

The recommended approach to override the limit in an ASP.NET Core MVC app is to use the `Microsoft.AspNetCore.Mvc.RequestSizeLimitAttribute` attribute on an action method:

```csharp
[RequestSizeLimit(100_000_000)]
public IActionResult Get()
```
The following example configures `MaxRequestBodySize` for all requests:

```csharp
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.MaxRequestBodySize = 100_000_000;
});
```
The following example configures `MaxRequestBodySize` for a specific request using `Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature` in a custom middleware:

```csharp
app.Use(async (context, next) =>
{
    var httpMaxRequestBodySizeFeature = context.Features.Get<IHttpMaxRequestBodySizeFeature>();

    if (httpMaxRequestBodySizeFeature is not null)
        httpMaxRequestBodySizeFeature.MaxRequestBodySize = 10 * 1024;

    // ...

    await next(context);
});
```
If the app attempts to configure the limit on a request after it starts to read the request, an exception is thrown. Use the `Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature.IsReadOnly` property to check if it's safe to set the `MaxRequestBodySize` property.

When an app runs out-of-process behind the ASP.NET Core Module, IIS sets the limit and Kestrel's request body size limit is disabled.

### Minimum request body data rate

Kestrel checks every second if data is arriving at the specified rate in bytes/second. If the rate drops below the minimum, the connection is timed out. The grace period is the amount of time Kestrel allows the client to increase its send rate up to the minimum. The rate isn't checked during that time. The grace period helps avoid dropping connections that are initially sending data at a slow rate because of TCP slow-start. A minimum rate also applies to the response.

`Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MinRequestBodyDataRate` gets or sets the request body minimum data rate in bytes/second. `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MinResponseDataRate` gets or sets the response minimum data rate in bytes/second.

The following example configures `MinRequestBodyDataRate` and `MinResponseDataRate` for all requests:

```csharp
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.MinRequestBodyDataRate = new MinDataRate(
        bytesPerSecond: 100, gracePeriod: TimeSpan.FromSeconds(10));
    serverOptions.Limits.MinResponseDataRate = new MinDataRate(
        bytesPerSecond: 100, gracePeriod: TimeSpan.FromSeconds(10));
});
```
The following example configures `MinRequestBodyDataRate` and `MinResponseDataRate` for a specific request using `Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinRequestBodyDataRateFeature` and `Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinResponseDataRateFeature` in a custom middleware:

```csharp
app.Use(async (context, next) =>
{
    var httpMinRequestBodyDataRateFeature = context.Features
        .Get<IHttpMinRequestBodyDataRateFeature>();

    if (httpMinRequestBodyDataRateFeature is not null)
    {
        httpMinRequestBodyDataRateFeature.MinDataRate = new MinDataRate(
            bytesPerSecond: 100, gracePeriod: TimeSpan.FromSeconds(10));
    }

    var httpMinResponseDataRateFeature = context.Features
        .Get<IHttpMinResponseDataRateFeature>();

    if (httpMinResponseDataRateFeature is not null)
    {
        httpMinResponseDataRateFeature.MinDataRate = new MinDataRate(
            bytesPerSecond: 100, gracePeriod: TimeSpan.FromSeconds(10));
    }

    // ...

    await next(context);
});
```
`IHttpMinResponseDataRateFeature` isn't present in `Microsoft.AspNetCore.Http.HttpContext.Features` for HTTP/2 requests. Modifying rate limits on a per-request basis isn't generally supported for HTTP/2 because of the protocol's support for request multiplexing. However, `IHttpMinRequestBodyDataRateFeature` is still present in `HttpContext.Features` for HTTP/2 requests, because the read rate limit can still be *disabled entirely* on a per-request basis by setting `Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinResponseDataRateFeature.MinDataRate` to `null`, even for an HTTP/2 request. Attempts to read `IHttpMinRequestBodyDataRateFeature.MinDataRate` or attempts to set it to a value other than `null` result in a `System.NotSupportedException` for HTTP/2 requests.

Server-wide rate limits configured via `Microsoft.AspNetCore.Server.Kestrel.KestrelServerOptions.Limits` still apply to both HTTP/1.x and HTTP/2 connections.

### Request headers timeout

`Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.RequestHeadersTimeout` gets or sets the maximum amount of time the server spends receiving request headers:

```csharp
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.RequestHeadersTimeout = TimeSpan.FromMinutes(1);
});
```
This timeout is not enforced when a debugger is attached to the Kestrel process.

`Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.RequestHeadersTimeout` also applies while receiving HTTP/2 and HTTP/3 request trailers. It doesn't apply to HTTP/1.1 request trailers.

## HTTP/2 limits

The limits in this section are set on `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.Http2`.

### Maximum streams per connection

`Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.MaxStreamsPerConnection` limits the number of concurrent request streams per HTTP/2 connection. Excess streams are refused:

```csharp
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.Http2.MaxStreamsPerConnection = 100;
});
```
### Header table size

`Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.HeaderTableSize` limits the size of the header compression tables, in octets, the HPACK encoder and decoder on the server can use. The HPACK decoder decompresses HTTP headers for HTTP/2 connections:

```csharp
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.Http2.HeaderTableSize = 4096;
});
```
### Maximum frame size

`Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.MaxFrameSize` indicates the size of the largest frame payload that is allowed to be received, in octets:

```csharp
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.Http2.MaxFrameSize = 16_384;
});
```
### Maximum request header size

`Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.MaxRequestHeaderFieldSize` indicates the size of the maximum allowed size of a request header field sequence. This limit applies to both name and value sequences in their compressed and uncompressed representations:

```csharp
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.Http2.MaxRequestHeaderFieldSize = 8192;
});
```
### Initial connection window size

`Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.InitialConnectionWindowSize` indicates how much request body data the server is willing to receive and buffer at a time aggregated across all requests (streams) per connection:

```csharp
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.Http2.InitialConnectionWindowSize = 131_072;
});
```
Requests are also limited by `InitialStreamWindowSize`.

### Initial stream window size

`Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.InitialStreamWindowSize` indicates how much request body data the server is willing to receive and buffer at a time per stream:

```csharp
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.Http2.InitialStreamWindowSize = 98_304;
});
```
Requests are also limited by `InitialConnectionWindowSize`.

### HTTP/2 keep alive ping configuration

Kestrel can be configured to send HTTP/2 pings to connected clients. HTTP/2 pings serve multiple purposes:

* Keep idle connections alive. Some clients and proxy servers close connections that are idle. HTTP/2 pings are considered as activity on a connection and prevent the connection from being closed as idle.
* Close unhealthy connections. Connections where the client doesn't respond to the keep alive ping in the configured time are closed by the server.

There are two configuration options related to HTTP/2 keep alive pings:

* `Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.KeepAlivePingDelay` is a `System.TimeSpan` that configures the ping interval. The server sends a keep alive ping to the client if it doesn't receive any frames for this period of time. Keep alive pings are disabled when this option is set to `System.TimeSpan.MaxValue`.
* `Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.KeepAlivePingTimeout` is a `System.TimeSpan` that configures the ping timeout. If the server doesn't receive any frames, such as a response ping, during this timeout then the connection is closed. Keep alive timeout is disabled when this option is set to `System.TimeSpan.MaxValue`.

The following example sets `KeepAlivePingDelay` and `KeepAlivePingTimeout`:

```csharp
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.Http2.KeepAlivePingDelay = TimeSpan.FromSeconds(30);
    serverOptions.Limits.Http2.KeepAlivePingTimeout = TimeSpan.FromMinutes(1);
});
```
## Other options

### Synchronous I/O

`Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.AllowSynchronousIO` controls whether synchronous I/O is allowed for the request and response.

> **Warning:**
> A large number of blocking synchronous I/O operations can lead to thread pool starvation, which makes the app unresponsive. Only enable `AllowSynchronousIO` when using a library that doesn't support asynchronous I/O.

The following example enables synchronous I/O:

```csharp
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.AllowSynchronousIO = true;
});
```
For information about other Kestrel options and limits, see:

* `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions`
* `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits`
* `Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions`

## Behavior with debugger attached

The following timeout and rate limit options aren't enforced when a debugger is attached to a Kestrel process:

* `Microsoft.AspNetCore.Server.Kestrel.KestrelServerLimits.KeepAliveTimeout`
* `Microsoft.AspNetCore.Server.Kestrel.KestrelServerLimits.RequestHeadersTimeout`
* `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MinRequestBodyDataRate`
* `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MinResponseDataRate`
* `Microsoft.AspNetCore.Server.Kestrel.Core.Features.IConnectionTimeoutFeature`
* `Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinRequestBodyDataRateFeature`
* `Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinResponseDataRateFeature`
