---
title: "HTTP.sys web server implementation in ASP.NET Core (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/httpsys.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# HTTP.sys web server implementation in ASP.NET Core (part 3 of 3)

## Inspect TLS and request properties

HTTP.sys exposes request features for inspecting TLS information. Availability depends on the request, the Windows version, and the HTTP.sys configuration.

### Get the negotiated TLS cipher suite

`Microsoft.AspNetCore.Connections.Features.ITlsHandshakeFeature` exposes the negotiated cipher suite through its `NegotiatedCipherSuite` property for HTTP.sys. The feature isn't available for a non-TLS request. The property can be `null` if Windows doesn't support the query or the query fails.

```csharp
var handshake = context.Features.Get<ITlsHandshakeFeature>();
if (handshake?.NegotiatedCipherSuite is { } cipherSuite)
{
    logger.LogInformation("Negotiated TLS cipher suite: {CipherSuite}", cipherSuite);
}
else
{
    logger.LogInformation("The negotiated TLS cipher suite isn't available.");
}
```
### Read the TLS ClientHello

Use `Microsoft.AspNetCore.Server.HttpSys.IHttpSysRequestPropertyFeature.TryGetTlsClientHello*` to retrieve the raw TLS ClientHello bytes on demand. The HTTPS service configuration must enable `HTTP_SERVICE_CONFIG_SSL_FLAG_ENABLE_CACHE_CLIENT_HELLO`. Configuring ASP.NET Core to use HTTP.sys doesn't enable this native flag. See `HttpSetServiceConfiguration` and `HTTP_SERVICE_CONFIG_ID`.

First call the method with an empty span to obtain the required buffer size, then allocate a buffer and retry:

```csharp
var feature = context.Features.GetRequiredFeature<IHttpSysRequestPropertyFeature>();
_ = feature.TryGetTlsClientHello(Span<byte>.Empty, out var requiredSize);

var pooled = requiredSize <= 1024 ? ArrayPool<byte>.Shared.Rent(requiredSize) : null;
var buffer = pooled ?? new byte[requiredSize];
try
{
    if (!feature.TryGetTlsClientHello(buffer, out var bytesReturned))
    {
        throw new InvalidOperationException(
            $"The TLS ClientHello buffer must be resized to {bytesReturned} bytes.");
    }

    logger.LogInformation("Retrieved {ByteCount} TLS ClientHello bytes.", bytesReturned);
}
finally
{
    if (pooled is not null)
    {
        ArrayPool<byte>.Shared.Return(pooled);
    }
}
```
### Query other native request properties

`Microsoft.AspNetCore.Server.HttpSys.IHttpSysRequestPropertyFeature.TryGetRequestProperty*` exposes `HttpQueryRequestProperty` for arbitrary native request properties.

* `propertyId` identifies a value from the native `HTTP_REQUEST_PROPERTY` enumeration.
* `qualifier` contains optional property-specific bytes. An empty span is passed to Windows as a null pointer.
* `output` receives the native bytes. The caller must interpret them using the corresponding native data structure.
* `bytesReturned` contains the bytes written on success. On an insufficient-buffer failure, required-size reporting depends on the native property. For fixed-size properties, allocate a buffer sized for the corresponding native structure instead of assuming that an empty-buffer query reports the required size.

The following example queries the TLS ClientHello property through the general-purpose API. It requires the same native ClientHello caching configuration as `TryGetTlsClientHello`:

```csharp
const int HttpRequestPropertyTlsClientHello = 11;
var feature = context.Features.GetRequiredFeature<IHttpSysRequestPropertyFeature>();
_ = feature.TryGetRequestProperty(
    HttpRequestPropertyTlsClientHello, qualifier: default, output: default,
    out var requiredSize);
var buffer = new byte[requiredSize];

if (!feature.TryGetRequestProperty(
    HttpRequestPropertyTlsClientHello, qualifier: default, output: buffer,
    out var bytesReturned))
{
    throw new InvalidOperationException(
        $"The request property buffer must be resized to {bytesReturned} bytes.");
}

logger.LogInformation("Retrieved {ByteCount} native request property bytes.", bytesReturned);
```
### Get channel binding tokens

`Microsoft.AspNetCore.Http.Features.ITlsConnectionFeature.TryGetChannelBindingBytes*` provides access to TLS channel binding bytes:

```csharp
var tls = context.Features.Get<ITlsConnectionFeature>();
if (tls is not null &&
    tls.TryGetChannelBindingBytes(ChannelBindingKind.Endpoint, out var token))
{
    logger.LogInformation("<example-value>", token.Length);
}
else
{
    logger.LogInformation("TLS endpoint channel binding isn't available.");
}
```
HTTP.sys supports `ChannelBindingKind.Endpoint`, corresponding to the `tls-server-end-point` binding defined by RFC 5929. Other binding kinds return `false`. An unavailable token also returns `false`. CBT exposure requires `Medium` or `Strict` authentication hardening to be applied by HTTP.sys.

Retrieving CBT bytes doesn't by itself authenticate a request or enforce `Strict` hardening. The returned bytes contain the Windows `SEC_CHANNEL_BINDINGS` structure and its binding data, not just a certificate hash.

## Get detailed timing information with IHttpSysRequestTimingFeature

IHttpSysRequestTimingFeature  provides detailed timing information for requests:

* Timestamps are obtained using QueryPerformanceCounter.
* The timestamp frequency can be obtained via QueryPerformanceFrequency.
* The index of the timing can be cast to HttpSysRequestTimingType to know what the timing represents.
* The value may be 0 if the timing isn't available for the current request.
* Requires Windows 10 version 2004, Windows Server 2022, or later.

```csharp
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Server.HttpSys;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseHttpSys();

var app = builder.Build();

app.Use((context, next) =>
{
    var feature = context.Features.GetRequiredFeature<IHttpSysRequestTimingFeature>();
    
    var loggerFactory = context.RequestServices.GetRequiredService<ILoggerFactory>();
    var logger = loggerFactory.CreateLogger("Sample");

    var timestamps = feature.Timestamps;

    for (var i = 0; i < timestamps.Length; i++)
    {
        var timestamp = timestamps[i];
        var timingType = (HttpSysRequestTimingType)i;

        logger.LogInformation("Timestamp {timingType}: {timestamp}",
                                          timingType, timestamp);
    }

    return next(context);
});

app.MapGet("/", () => Results.Ok());

app.Run();
```
IHttpSysRequestTimingFeature.TryGetTimestamp retrieves the timestamp for the provided timing type:

```csharp
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Server.HttpSys;
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseHttpSys();

var app = builder.Build();

app.Use((context, next) =>
{
    var feature = context.Features.GetRequiredFeature<IHttpSysRequestTimingFeature>();

    var loggerFactory = context.RequestServices.GetRequiredService<ILoggerFactory>();
    var logger = loggerFactory.CreateLogger("Sample");

    var timingType = HttpSysRequestTimingType.RequestRoutingEnd;

    if (feature.TryGetTimestamp(timingType, out var timestamp))
    {
        logger.LogInformation("Timestamp {timingType}: {timestamp}",
                                          timingType, timestamp);
    }
    else
    {
        logger.LogInformation("Timestamp {timingType}: not available for the "
                                           + "current request",    timingType);
    }

    return next(context);
});

app.MapGet("/", () => Results.Ok());

app.Run();
```
`Microsoft.AspNetCore.Server.HttpSys.IHttpSysRequestTimingFeature.TryGetElapsedTime*` yields the elapsed time between two specified timings:

```csharp
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Server.HttpSys;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseHttpSys();

var app = builder.Build();

app.Use((context, next) =>
{
    var feature = context.Features.GetRequiredFeature<IHttpSysRequestTimingFeature>();

    var loggerFactory = context.RequestServices.GetRequiredService<ILoggerFactory>();
    var logger = loggerFactory.CreateLogger("Sample");

    var startingTimingType = HttpSysRequestTimingType.RequestRoutingStart;
    var endingTimingType = HttpSysRequestTimingType.RequestRoutingEnd;

    if (feature.TryGetElapsedTime(startingTimingType, endingTimingType, out var elapsed))
    {
        logger.LogInformation(
            "Elapsed time {startingTimingType} to {endingTimingType}: {elapsed}",
            startingTimingType,
            endingTimingType,
            elapsed);
    }
    else
    {
        logger.LogInformation(
            "Elapsed time {startingTimingType} to {endingTimingType}:"
            + " not available for the current request.",
            startingTimingType,
            endingTimingType);
    }

    return next(context);
});

app.MapGet("/", () => Results.Ok());

app.Run();
```
## Advanced HTTP/2 features to support gRPC

Additional HTTP/2 features in HTTP.sys support gRPC, including support for response trailers and sending reset frames.

Requirements to run gRPC with HTTP.sys:

* Windows 11 Build 22000 or later, Windows Server 2022 Build 20348 or later.
* TLS 1.2 or later connection.

### Trailers

HTTP Trailers are similar to HTTP Headers, except they are sent after the response body is sent. For IIS and HTTP.sys, only HTTP/2 response trailers are supported.

```csharp
if (httpContext.Response.SupportsTrailers())
{
    httpContext.Response.DeclareTrailer("trailername");	

    // Write body
    httpContext.Response.WriteAsync("Hello world");

    httpContext.Response.AppendTrailer("trailername", "TrailerValue");
}
```

In the preceding example code:

* `SupportsTrailers` ensures that trailers are supported for the response.
* `DeclareTrailer` adds the given trailer name to the `Trailer` response header. Declaring a response's trailers is optional, but recommended. If `DeclareTrailer` is called, it must be before the response headers are sent.
* `AppendTrailer` appends the trailer.

### Reset

Reset allows for the server to reset a HTTP/2 request with a specified error code. A reset request is considered aborted.

```csharp
var resetFeature = httpContext.Features.Get<IHttpResetFeature>();
resetFeature.Reset(errorCode: 2);
```

`Reset` in the preceding code example specifies the `INTERNAL_ERROR` error code. For more information about HTTP/2 error codes, visit the HTTP/2 specification error code section.

## Tracing

For information about how to get traces from HTTP.sys, see HTTP.sys Manageability Scenarios.

## Automatic eviction from memory pool

The memory pools used by Kestrel, IIS, and HTTP.sys automatically evict memory blocks when the application is idle or under low load. The feature runs automatically and doesn't need to be enabled or configured manually.

In versions of .NET earlier than 10, memory allocated by the pool remains reserved, even when not in use. This automatic eviction feature reduces overall memory usage and helps applications stay responsive under varying workloads.

### Use memory pool metrics

The default memory pool used by the ASP.NET Core server implementations includes metrics, which can be used to monitor and analyze memory usage patterns. The metrics are under the name `"Microsoft.AspNetCore.MemoryPool"`.

For information about metrics and how to use them, see ASP.NET Core metrics.

## Manage memory pools

Besides using memory pools efficiently by evicting unneeded memory blocks, ASP.NET Core provides a built-in IMemoryPoolFactory and an implementation. It makes the implementation available to your application through dependency injection.

The following code example shows a simple background service that uses the built-in memory pool factory implementation to create memory pools. These pools benefit from the automatic eviction feature:

```csharp
public class MyBackgroundService : BackgroundService
{
    private readonly MemoryPool<byte> _memoryPool;

    public MyBackgroundService(IMemoryPoolFactory<byte> factory)
    {
        _memoryPool = factory.Create();
    }

    protected override async Task ExecuteAsync(CancellationToken <example-value>)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await Task.Delay(20, stoppingToken);
                // do work that needs memory
                // consider checking _memoryPool.MaxBufferSize
                var rented = _memoryPool.Rent(100);
                rented.Dispose();
            }
            catch (OperationCanceledException)
            {
                return;
            }
        }
    }
}
```
To use a custom memory pool factory, make a class that implements `IMemoryPoolFactory` and register it with dependency injection, as the following example does. Memory pools created this way do not benefit from the automatic eviction feature unless you implement similar eviction logic in your custom factory:

```csharp
services.AddSingleton<IMemoryPoolFactory<byte>,
CustomMemoryPoolFactory>();

public class CustomMemoryPoolFactory : IMemoryPoolFactory<byte>
{
    public MemoryPool<byte> Create()
    {
        // Return a custom MemoryPool implementation
        // or the default, as is shown here.
        return MemoryPool<byte>.Shared;
    }
}
```
When you're using a memory pool, be aware of the pool's `System.Buffers.MemoryPool`1.MaxBufferSize`.

## Related content

* Enable Windows Authentication with HTTP.sys
* HTTP Server API
* HTTP.sys implementation in the ASP.NET Core repository (source code)
* The host
* Troubleshoot and debug ASP.NET Core projects

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.
