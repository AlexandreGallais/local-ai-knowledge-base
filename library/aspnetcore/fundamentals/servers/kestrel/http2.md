---
title: "Use HTTP/2 with the ASP.NET Core Kestrel web server"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/kestrel/http2.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Use HTTP/2 with the ASP.NET Core Kestrel web server

-->
-->

HTTP/2 is available for ASP.NET Core apps if the following base requirements are met:

* Operating system
  * Windows Server 2016/Windows 10 or later&Dagger;
  * Linux with OpenSSL 1.0.2 or later (for example, Ubuntu 16.04 or later)
  * macOS 10.15 or later
* Target framework: .NET Core 2.2 or later
* Application-Layer Protocol Negotiation (ALPN) connection
* TLS 1.2 or later connection

&Dagger;Kestrel has limited support for HTTP/2 on Windows Server 2012 R2 and Windows 8.1. Support is limited because the list of supported TLS cipher suites available on these operating systems is limited. A certificate generated using an Elliptic Curve Digital Signature Algorithm (ECDSA) may be required to secure TLS connections.

If an HTTP/2 connection is established, HttpRequest.Protocol reports `HTTP/2`.

Starting with .NET Core 3.0, HTTP/2 is enabled by default. For more information on configuration, see the Kestrel HTTP/2 limits and ListenOptions.Protocols sections.

## Advanced HTTP/2 features

Additional HTTP/2 features in Kestrel support gRPC, including support for response trailers and sending reset frames.

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
