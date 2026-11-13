---
title: "Use HTTP/3 with the ASP.NET Core Kestrel web server"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/kestrel/http3.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Use HTTP/3 with the ASP.NET Core Kestrel web server

-->
-->

HTTP/3 is an approved standard and the third major version of HTTP. This article discusses the requirements for HTTP/3. HTTP/3 is fully supported in .NET 7 or later.

> **Important:**
> Apps configured to take advantage of HTTP/3 should be designed to also support HTTP/1.1 and HTTP/2.

## HTTP/3 benefits

`HTTP/3`:

* Is the latest version of the Hypertext Transfer Protocol.
* Builds on the strengths of `HTTP/2` while addressing some of its limitations, particularly in terms of performance, latency, reliability, and security.

| Feature      | `HTTP/2`                                                    | `HTTP/3`                                                 |
|--------------|-------------------------------------------------------------|----------------------------------------------------------|
| Transport    | Uses TCP | Uses QUIC |
| Connection   | Slower due to TCP + TLS                                     | Combines transport and encryption handshakes             |
| Setup        | handshake                                                   | handshakes                                               |
| Head-of-Line | Affected by TCP-level                                       | Eliminated with QUIC                                     |
| Blocking     | blocking                                                    | stream multiplexing                                      |
| Encryption   | TLS over TCP                                                | TLS is built into QUIC                                   |

The key differences from `HTTP/2` to `HTTP/3` are:

* **Transport Protocol**: `HTTP/3` uses QUIC instead of TCP. QUIC offers improved performance, lower latency, and better reliability, especially on mobile and lossy networks.
* **Head-of-Line Blocking**: `HTTP/2` can suffer from head-of-line blocking at the TCP level, where a delay in one stream can affect others. `HTTP/3`, with QUIC, provides independent streams, so packet loss in one stream doesn't stall others.
* **Connection Establishment**: `HTTP/3` with QUIC can establish connections faster, as it combines transport and encryption handshakes.
* **Encryption**: `HTTP/3` mandates TLS 1.3 encryption, providing enhanced security by default, whereas it's optional in `HTTP/2`.
* **Multiplexing**: While both support multiplexing, `HTTP/3`'s implementation with QUIC is more efficient and avoids the TCP-level head-of-line blocking issues.
* **Connection Migration**: QUIC in `HTTP/3` allows connections to persist even when a client's IP address changes (like switching from Wi-Fi to cellular), improving mobile user experience.

## Early request processing

Kestrel can process HTTP/3 requests without first waiting for the control stream and the initial SETTINGS frame. This optimization reduces first-request latency on new HTTP/3 connections.

In ASP.NET Core versions earlier than .NET 11, Kestrel waited to receive the QUIC control stream and its initial SETTINGS frame before processing any request streams. This requirement is no longer necessary, which means the first request on a new connection completes faster.

## HTTP/3 requirements

HTTP/3 uses QUIC as its transport protocol. The ASP.NET Core implementation of HTTP/3 depends on MsQuic to provide QUIC functionality. As a result, ASP.NET Core support of HTTP/3 depends on MsQuic platform requirements. For more information on how to install **MsQuic**, see QUIC Platform dependencies. If the platform that Kestrel is running on doesn't have all the requirements for HTTP/3, Kestrel disables HTTP/3 and falls back to other HTTP protocols.

## Getting started

HTTP/3 isn't enabled by default. Add configuration to `Program.cs` to enable HTTP/3.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel((context, options) =>
{
    options.ListenAnyIP(5001, listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3;
        listenOptions.UseHttps();
    });
});
```
The preceding code configures port 5001 to:

* Use HTTP/3 alongside HTTP/1.1 and HTTP/2 by specifying `HttpProtocols.Http1AndHttp2AndHttp3`.
* Enable HTTPS by using `UseHttps`. HTTP/3 requires HTTPS.

Because not all routers, firewalls, and proxies properly support HTTP/3, configure HTTP/3 together with HTTP/1.1 and HTTP/2. Specify `HttpProtocols.Http1AndHttp2AndHttp3` as an endpoint's supported protocols.

For more information, see Configure endpoints for Kestrel web server.

## Configure QuicTransportOptions

Configure QUIC transport options by calling the `Microsoft.AspNetCore.Hosting.WebHostBuilderQuicExtensions.UseQuic*` extension method on `Microsoft.AspNetCore.Hosting.IWebHostBuilder`.

```csharp
        var builder = WebApplication.CreateBuilder(args);

        builder.WebHost.UseQuic(options =>
        {
#pragma warning disable CA2252 // Using preview features
            options.MaxBidirectionalStreamCount = 200;
#pragma warning restore CA2252
        });

        builder.WebHost.ConfigureKestrel((context, serverOptions) =>
        {
            serverOptions.ListenAnyIP(5001, listenOptions =>
            {
                listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3;
                listenOptions.UseHttps();
            });
        });
```
The following table describes the available `Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions`.

| Option | Default | Description |
| ------ | ------- | ----------- |
| `Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.MaxBidirectionalStreamCount` | `100` | The maximum number of concurrent bidirectional streams per connection. |
| `Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.MaxUnidirectionalStreamCount` | `10` | The maximum number of concurrent inbound unidirectional streams per connection. |
| `Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.MaxReadBufferSize` | `1024 * 1024` (1 MB) | The maximum read buffer size in bytes. |
| `Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.MaxWriteBufferSize` | `64 * 1024` (64 KB) | The maximum write buffer size in bytes. |
| `Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.Backlog` | `512` | The maximum length of the pending connection queue. |
| `Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.DefaultStreamErrorCode` | `0x010c` (H3_REQUEST_CANCELLED) | Error code used when the stream should abort the read or write side of the stream internally. |
| `Microsoft.AspNetCore.Server.Kestrel.Transport.Quic.QuicTransportOptions.DefaultCloseErrorCode` | `0x100` (H3_NO_ERROR) | Error code used when an open connection is disposed. |

## Alt-svc

HTTP/3 is discovered as an upgrade from HTTP/1.1 or HTTP/2 via the `alt-svc` header. That means the first request will normally use HTTP/1.1 or HTTP/2 before switching to HTTP/3. Kestrel automatically adds the `alt-svc` header if HTTP/3 is enabled.

## Localhost testing

* Browsers don't support self-signed certificates on HTTP/3, such as the Kestrel development certificate.
* Use `HttpClient` for localhost or loopback testing in .NET 6 or later. When you use `HttpClient` to make an HTTP/3 request, you need extra configuration:

  * Set `HttpRequestMessage.Version` to 3.0, or
  * Set `HttpRequestMessage.VersionPolicy` to `HttpVersionPolicy.RequestVersionOrHigher`.

For more information about how to use HTTP/3 with `HttpClient`, see HTTP/3 with .NET.
