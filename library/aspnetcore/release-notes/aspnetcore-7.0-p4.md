---
title: "What's new in ASP.NET Core in .NET 7 (part 4 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-7.0.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 7 (part 4 of 4)

## Performance

### Output caching middleware

Output caching is a new middleware that stores responses from a web app and serves them from a cache rather than computing them every time. Output caching differs from response caching in the following ways:

* The caching behavior is configurable on the server.
* Cache entries can be programmatically invalidated.
* Resource locking mitigates the risk of cache stampede and thundering herd.
* Cache revalidation means the server can return a `304 Not Modified` HTTP status code instead of a cached response body.
* The cache storage medium is extensible.

For more information, see Overview of caching and Output caching middleware.

### HTTP/3 improvements

This release:

* Makes HTTP/3 fully supported by ASP.NET Core, it's no longer experimental.
* Improves Kestrel's support for HTTP/3. The two main areas of improvement are feature parity with HTTP/1.1 and HTTP/2, and performance.
* Provides full support for `Microsoft.AspNetCore.Hosting.ListenOptionsHttpsExtensions.UseHttps(Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions,System.Security.Cryptography.X509Certificates.X509Certificate2)` with HTTP/3. Kestrel offers advanced options for configuring connection certificates, such as hooking into Server Name Indication (SNI).
* Adds support for HTTP/3 on HTTP.sys and IIS.

The following example shows how to use an SNI callback to resolve TLS options:

```csharp
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.AspNetCore.Server.Kestrel.Https;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(8080, listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3;
        listenOptions.UseHttps(new TlsHandshakeCallbackOptions
        {
            OnConnection = context =>
            {
                var options = new SslServerAuthenticationOptions
                {
                    ServerCertificate = 
                         MyResolveCertForHost(context.ClientHelloInfo.ServerName)
                };
                return new ValueTask<SslServerAuthenticationOptions>(options);
            },
        });
    });
});
```
Significant work was done in .NET 7 to reduce HTTP/3 allocations. You can see some of those improvements in the following GitHub PR's:

* HTTP/3: Avoid per-request cancellation token allocations
* HTTP/3: Avoid ConnectionAbortedException allocations
* HTTP/3: ValueTask pooling

### HTTP/2 Performance improvements

.NET 7 introduces a significant re-architecture of how Kestrel processes HTTP/2 requests. ASP.NET Core apps with busy HTTP/2 connections will experience reduced CPU usage and higher throughput.

Previously, the HTTP/2 multiplexing implementation relied on a lock controlling which request can write to the underlying TCP connection. A thread-safe queue replaces the write lock. Now, rather than fighting over which thread gets to use the write lock, requests now queue up and a dedicated consumer processes them. Previously wasted CPU resources are available to the rest of the app.

One place where these improvements can be noticed is in gRPC, a popular RPC framework that uses HTTP/2. Kestrel + gRPC benchmarks show a dramatic improvement:

Changes were made in the HTTP/2 frame writing code that improves performance when there are multiple streams trying to write data on a single HTTP/2 connection. We now dispatch TLS work to the thread pool and more quickly release a write lock that other streams can acquire to write their data. The reduction in wait times can yield significant performance improvements in cases where there is contention for this write lock. A gRPC benchmark with 70 streams on a single connection (with TLS) showed a ~15% improvement in requests per second (RPS) with this change.

### Http/2 WebSockets support

.NET 7 introduces WebSockets over HTTP/2 support for Kestrel, the SignalR JavaScript client, and SignalR with Blazor WebAssembly.

Using WebSockets over HTTP/2 takes advantage of new features such as:

* Header compression.
* Multiplexing, which reduces the time and resources needed when making multiple requests to the server.

These supported features are available in Kestrel on all HTTP/2 enabled platforms. The version negotiation is automatic in browsers and Kestrel, so no new APIs are needed.

For more information, see Http/2 WebSockets support.

### Kestrel performance improvements on high core machines

Kestrel uses `System.Collections.Concurrent.ConcurrentQueue`1` for many purposes. One purpose is scheduling I/O operations in Kestrel's default Socket transport. Partitioning the `ConcurrentQueue` based on the associated socket reduces contention and increases throughput on machines with many CPU cores.

Profiling on high core machines on .NET 6 showed significant contention in one of Kestrel's other `ConcurrentQueue` instances, the `PinnedMemoryPool` that Kestrel uses to cache byte buffers.

In .NET 7, Kestrel's memory pool is partitioned the same way as its I/O queue, which leads to much lower contention and higher throughput on high core machines. On the 80 core ARM64 VMs, we're seeing over 500% improvement in responses per second (RPS) in the TechEmpower plaintext benchmark.  On 48 Core AMD VMs, the improvement is nearly 100% in our HTTPS JSON benchmark.

### `ServerReady` event to measure startup time

Apps using  EventSource can measure the startup time to understand and optimize startup performance. The new `ServerReady` event in `Microsoft.AspNetCore.Hosting` represents the point where the server is ready to respond to requests.

## Server

### New ServerReady event for measuring startup time

The `ServerReady` event has been added to measure startup time of ASP.NET Core apps.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

## IIS

### Shadow copying in IIS

Shadow copying app assemblies to the ASP.NET Core Module (ANCM) for IIS can provide a better end user experience than stopping the app by deploying an app offline file.

For more information, see Shadow copying in IIS.

## Miscellaneous

### Kestrel full certificate chain improvements

HttpsConnectionAdapterOptions has a new ServerCertificateChain property of type X509Certificate2Collection, which makes it easier to validate certificate chains by allowing a full chain including intermediate certificates to be specified. See dotnet/aspnetcore#21513 for more details.

### dotnet watch

#### Improved console output for dotnet watch

The console output from dotnet watch has been improved to better align with the logging of ASP.NET Core and to stand out with 😮emojis😍.

Here's an example of what the new output looks like:

For more information, see this GitHub pull request.

### Configure dotnet watch to always restart for rude edits

Rude edits are edits that  can't be hot reloaded. To configure dotnet watch to always restart without a prompt for rude edits, set the `DOTNET_WATCH_RESTART_ON_RUDE_EDIT` environment variable to `true`.

### Developer exception page dark mode

Dark mode support has been added to the developer exception page, thanks to a contribution by Patrick Westerhoff. To test dark mode in a browser, from the developer tools page, set the mode to dark. For example, in Firefox:

In Chrome:

### Project template option to use Program.Main method instead of top-level statements

The .NET 7 templates include an option to not use top-level statements and generate a `namespace` and a `Main` method declared on a `Program` class.

Using the .NET CLI, use the `--use-program-main` option:

```dotnetcli
dotnet new web --use-program-main
```

With Visual Studio, select the new **Do not use top-level statements** checkbox during project creation:

### Updated Angular and React templates

The Angular project template has been updated to Angular 14. The React project template has been updated to React 18.2.

### Manage JSON Web Tokens in development with dotnet user-jwts

The new `dotnet user-jwts` command line tool can create and manage app specific local JSON Web Tokens (JWTs). For more information, see Manage JSON Web Tokens in development with dotnet user-jwts.

### Support for additional request headers in W3CLogger

You can now specify additional request headers to log when using the W3C logger by calling `AdditionalRequestHeaders()` on `Microsoft.AspNetCore.HttpLogging.W3CLoggerOptions`:

```csharp
services.AddW3CLogging(logging =>
{
    logging.AdditionalRequestHeaders.Add("x-forwarded-for");
    logging.AdditionalRequestHeaders.Add("x-client-ssl-protocol");
});
```

For more information, see W3CLogger options.

### Request decompression

The new Request decompression middleware:

* Enables API endpoints to accept requests with compressed content.
* Uses the `Content-Encoding` HTTP header to automatically identify and decompress requests which contain compressed content.
* Eliminates the need to write code to handle compressed requests.

For more information, see Request decompression middleware.

## Breaking changes

Use the articles in Breaking changes in .NET to find breaking changes that might apply when upgrading an app to a newer version of .NET.
