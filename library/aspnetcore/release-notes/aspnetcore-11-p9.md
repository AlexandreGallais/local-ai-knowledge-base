---
title: "What's new in ASP.NET Core in .NET 11 (part 9 of 9)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 11 (part 9 of 9)

## Miscellaneous

This section describes miscellaneous new features in .NET 11.

### `IOutputCachePolicyProvider` interface

ASP.NET Core in .NET 11 provides the `Microsoft.AspNetCore.OutputCaching.IOutputCachePolicyProvider` interface for implementing custom output caching policy selection logic. By using this interface, apps can determine the default base caching policy, check for the existence of named policies, and support advanced scenarios where policies must be resolved dynamically. Examples include loading policies from external configuration sources, databases, or applying tenant-specific caching rules.

The following code shows the `IOutputCachePolicyProvider` interface:

```csharp
public interface IOutputCachePolicyProvider
{
    IReadOnlyList<IOutputCachePolicy> GetBasePolicies();
    ValueTask<IOutputCachePolicy?> GetPolicyAsync(string policyName);
}
```

Thank you @lqlive for this contribution!

### Auto-trust development certificates in WSL

The development certificate setup now automatically trusts certificates in WSL (Windows Subsystem for Linux) environments. When you run `dotnet dev-certs https --trust` in WSL, the certificate is automatically installed and trusted in both the WSL environment and Windows, eliminating manual trust configuration.

```bash
# Automatically trusts certificates in both WSL and Windows
dotnet dev-certs https --trust
```

This improvement streamlines the development experience when using WSL, removing a common friction point for developers working in Linux environments on Windows.

Thank you @StickFun for this contribution!

### Native OpenTelemetry tracing for ASP.NET Core

ASP.NET Core now natively adds OpenTelemetry semantic convention attributes to the HTTP server activity, aligning with the OpenTelemetry HTTP server span specification. All required attributes are included by default, matching the metadata previously only available through the `OpenTelemetry.Instrumentation.AspNetCore` library.

To collect the built-in tracing data, subscribe to the `Microsoft.AspNetCore` activity source in your OpenTelemetry configuration:

```csharp
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing
        .AddSource("Microsoft.AspNetCore")
        .AddConsoleExporter());
```

No additional instrumentation library (such as `OpenTelemetry.Instrumentation.AspNetCore`) is needed. The framework now directly populates semantic convention attributes on the request activity, such as `http.request.method`, `url.path`, `http.response.status_code`, and `server.address`.

If you don't want OpenTelemetry attributes added to the activity, you can turn it off by setting the `Microsoft.AspNetCore.Hosting.SuppressActivityOpenTelemetryData` AppContext switch to `true`.

### Performance improvements

Kestrel's HTTP/1.1 request parser now uses a non-throwing code path for handling malformed requests. Instead of throwing `Microsoft.AspNetCore.Http.BadHttpRequestException` on every parse failure, the parser returns a result struct indicating success, incomplete, or error states. In scenarios with many malformed requests — such as port scanning, malicious traffic, or misconfigured clients — this eliminates expensive exception handling overhead and improves throughput by up to 20-40%. There's no impact on valid request processing.

The HTTP logging middleware now pools its `ResponseBufferingStream` instances, reducing per-request allocations when response body logging or interceptors are enabled.

### Zstandard response compression and request decompression

ASP.NET Core now supports Zstandard (zstd) for both response compression and request decompression. This adds zstd support to the existing response-compression and request-decompression middleware and enables zstd by default.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddResponseCompression();
builder.Services.AddRequestDecompression();
builder.Services.Configure<ZstandardCompressionProviderOptions>(options =>
{
    options.CompressionOptions = new ZstandardCompressionOptions
    {
        Quality = 6 // 1-22, higher = better compression, slower
    };
});
```

Thank you @manandre for this contribution!

### HTTP/3 starts processing requests earlier

Kestrel now starts processing HTTP/3 requests without waiting for the control stream and SETTINGS frame first, which reduces first-request latency on new connections.

### MCP Server template ships with the .NET SDK

The Model Context Protocol (MCP) is an open standard that AI applications and agents, such as those in Visual Studio, Visual Studio Code, and GitHub Copilot, use to discover and call external tools, data, and services through a consistent interface. An *MCP server* exposes your own functionality, such as custom tools or access to a data source, so an AI host can invoke it on the user's behalf.

Use the `mcpserver` template when you want to build a C# MCP server that integrates your code or services with AI-powered tools. The generated project uses the official C# SDK for MCP and includes a working sample tool, so you have a runnable starting point to extend with your own tools.

The `mcpserver` project template, previously available only by installing `Microsoft.McpServer.ProjectTemplates`, now ships as a bundled template in the .NET SDK:

```dotnetcli
dotnet new mcpserver -o MyMcpServer
```

Moving the template into ASP.NET Core makes it discoverable from `dotnet new list` without a separate install step, and aligns its servicing with the rest of the web stack.

For more information, see Build a Model Context Protocol (MCP) server in C#.

### TLS handshake observability in Kestrel

Two related changes make it easier to diagnose and customize TLS connections in Kestrel.

`ITlsHandshakeFeature` now exposes an `Exception` property containing the exception thrown during a failed TLS handshake, so middleware and logging can record why a connection failed instead of seeing a bare `IOException` further up the stack. The feature continues to work after the handshake fails — Kestrel snapshots the relevant fields off the underlying `SslStream` before it is disposed.

The `TlsClientHelloBytesCallback` option on `HttpsConnectionAdapterOptions` was reworked as a connection middleware. The previous callback shape is now obsolete; configure ClientHello inspection via the new `ListenOptions.UseTlsClientHelloListener` extension instead. The example below uses both features together — connection middleware reads `ITlsHandshakeFeature.Exception` after the handshake, and `UseTlsClientHelloListener` inspects the ClientHello before TLS:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5001, listenOptions =>
    {
        listenOptions.Use(next => async context =>
        {
            await next(context);

            var tlsHandshakeFeature = context.Features.Get<ITlsHandshakeFeature>();
            if (tlsHandshakeFeature?.Exception is { } ex)
            {
                Console.WriteLine($"[TLS Handshake Failed] ConnectionId={context.ConnectionId}, Exception={ex.GetType().Name}: {ex.Message}");
            }
        });

        // UseTlsClientHelloListener must be called before UseHttps()
        listenOptions.UseTlsClientHelloListener((connection, clientHelloBytes) =>
        {
            Console.WriteLine($"TLS Client Hello received on {connection.ConnectionId}, {clientHelloBytes.Length} bytes");
        });
        listenOptions.UseHttps();
    });
});
```

### Response compression always emits `Vary: Accept-Encoding`

The response-compression middleware now adds `Vary: Accept-Encoding` to every response when compression is enabled, even when the response itself isn't compressed. This prevents shared caches and CDNs from serving a compressed payload to a client that didn't ask for one (or vice versa).

Thank you @pedrobsaila for this contribution!

### Runtime-async enabled for shared framework libraries

ASP.NET Core's shared-framework-only libraries are now compiled with the `runtime-async` feature on `net11.0+`. Runtime-async lets the runtime, rather than the C# compiler, generate the state machine for `async`/`await`, which can reduce per-await allocations and improve diagnostics. This is an internal codegen change with no public API impact — apps targeting `net11.0` automatically benefit when they call into the affected ASP.NET Core libraries.

Libraries that ship as both shared-framework members and standalone NuGet packages are excluded, because runtime-async is incompatible with WebAssembly and would otherwise break Wasm consumers of those packages.

Because runtime-async changes how `async`/`await` is generated for a large portion of the ASP.NET Core stack, try your apps against this preview and file an issue if you hit unexpected behavior, particularly around exception stacks, `ExecutionContext`/`AsyncLocal` flow, or anything that looks like a regression from .NET 10.

### Rate-limiting middleware returns accurate `Retry-After` headers

The `System.Threading.RateLimiting.FixedWindowRateLimiter` now reports a `System.Threading.RateLimiting.MetadataName.RetryAfter` metadata value that accurately reflects the next window boundary. Apps that propagate this metadata to the `Retry-After` response header in their `Microsoft.AspNetCore.RateLimiting.RateLimiterOptions.OnRejected` callback now produce correct retry intervals automatically, with no code changes required.

Additional fixes in `System.Threading.RateLimiting` resolve an issue where `System.Threading.RateLimiting.TokenBucketRateLimiter` mishandled partial token refills during zero-permit acquisition, and improve the chained rate limiter returned by `System.Threading.RateLimiting.RateLimiter.CreateChained*` to correctly forward idle-duration and replenishment behavior from its inner limiters.

For an overview of the rate limiting middleware, see Rate limiting middleware in ASP.NET Core.

Thank you @asbjornvad and @apoorvdarshan for these contributions!

### Kestrel applies trailer header timeouts

Kestrel now applies `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.RequestHeadersTimeout` to fragmented HTTP/2 and HTTP/3 trailer headers that don't finish sending the header block. The same timeout that protects initial request headers now also prevents connections from staying open indefinitely while Kestrel waits for trailer `HEADERS` frames to complete.

```csharp
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.RequestHeadersTimeout = TimeSpan.FromSeconds(10);
});
```

### TLS channel-binding token access from `ITlsConnectionFeature`

Applications using TLS can read the connection's channel binding token to defend against relay attacks:

```csharp
using System.Security.Authentication.ExtendedProtection;

app.Use(async (context, next) =>
{
    var tls = context.Features.Get<ITlsConnectionFeature>();
    if (tls is not null && tls.TryGetChannelBindingBytes(
            ChannelBindingKind.Endpoint,
            out ReadOnlyMemory<byte> cbt))
    {
        // Compare cbt against the token the client presented during authentication.
    }

    await next(context);
});
```

Kestrel returns the binding from `SslStream.TransportContext.GetChannelBinding`. IIS and HTTP.sys return it from the request. On HTTP.sys, `HttpSysOptions.HttpAuthenticationHardeningLevel` controls Extended Protection and channel-binding token exposure:

* `Legacy` disables channel-binding validation and doesn't expose the token.
* `Medium`, the default, exposes the token and validates it when supplied, but tolerates its absence.
* `Strict` requires the token for authenticated requests and rejects requests without one. It also fails startup if the OS can't apply the configuration, while `Legacy` and `Medium` log the configuration failure and continue.

## Breaking changes

Use the articles in Breaking changes in .NET to find breaking changes that might apply when upgrading an app to a newer version of .NET.
