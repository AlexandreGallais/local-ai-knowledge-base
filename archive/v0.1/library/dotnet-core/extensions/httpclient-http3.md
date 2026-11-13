---
title: "Use HTTP/3 with HttpClient"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/httpclient-http3.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Use HTTP/3 with HttpClient

HTTP/3 is the third and recently standardized major version of HTTP. HTTP/3 uses the same semantics as HTTP/1.1 and HTTP/2: the same request methods, status codes, and message fields apply to all versions. The differences are in the underlying transport. Both HTTP/1.1 and HTTP/2 use TCP as their transport. HTTP/3 uses a transport technology developed alongside HTTP/3 called QUIC.

HTTP/3 and QUIC both have several benefits compared to HTTP/1.1 and HTTP/2:

- Faster response time for the first request. QUIC and HTTP/3 negotiate the connection in fewer round trips between the client and the server. The first request reaches the server faster.
- Improved experience when there's connection packet loss. HTTP/2 multiplexes multiple requests via one TCP connection. Packet loss on the connection affects all requests. This problem is called "head-of-line blocking". Because QUIC provides native multiplexing, lost packets only affect the requests where data has been lost.
- Supports transitioning between networks. This feature is useful for mobile devices where it's common to switch between WIFI and cellular networks as a mobile device changes location. Currently, HTTP/1.1 and HTTP/2 connections fail with an error when switching networks. An app or web browser must retry any failed HTTP requests. HTTP/3 allows the app or web browser to seamlessly continue when a network changes. `System.Net.Http.HttpClient` and Kestrel don't support network transitions in .NET 7. It may be available in a future release.

> **Important:**
> Apps configured to take advantage of HTTP/3 should be designed to also support HTTP/1.1 and HTTP/2. If issues are identified in HTTP/3, it's recommend disabling HTTP/3 until the issues are resolved in a future release of .NET.

## HttpClient settings

The HTTP version can be configured by setting `HttpRequestMessage.Version` to 3.0. However, because not all routers, firewalls, and proxies properly support HTTP/3, it's recommend configuring HTTP/3 together with HTTP/1.1 and HTTP/2. In `HttpClient`, this can be done by specifying:

- `System.Net.Http.HttpRequestMessage.Version` to 1.1.
- `System.Net.Http.HttpRequestMessage.VersionPolicy` to `System.Net.Http.HttpVersionPolicy.RequestVersionOrHigher`.

## Platform dependencies

HTTP/3 uses QUIC as its transport protocol. The .NET implementation of HTTP/3 uses MsQuic to provide QUIC functionality. As a result, .NET support of HTTP/3 depends on MsQuic platform requirements. For more information on how to install **MsQuic**, see QUIC Platform dependencies. If the platform that HttpClient is running on doesn't have all the requirements for HTTP/3, then it's disabled.

## Using HttpClient

The following code example uses top-level statements and demonstrates how to specify HTTP3 in the request:

```csharp
﻿// See https://aka.ms/new-console-template for more information
using System.Net;

using var client = new HttpClient
{
    DefaultRequestVersion =  HttpVersion.Version30,
    DefaultVersionPolicy = HttpVersionPolicy.RequestVersionExact
};

Console.WriteLine("--- localhost:5001 ---");

HttpResponseMessage resp = await client.GetAsync("https://localhost:5001/");
string body = await resp.Content.ReadAsStringAsync();

Console.WriteLine(
    $"status: {resp.StatusCode}, version: {resp.Version}, " +
    $"body: {body.Substring(0, Math.Min(100, body.Length))}");
```
## HTTP/3 Support in .NET 6

In .NET 6, HTTP/3 is available as a _preview feature_ because the HTTP/3 specification wasn't yet finalized. Behavioral or performance problems may exist in HTTP/3 with .NET 6. For more information on preview features, see the preview features specification.

To enable HTTP/3 support in .NET 6, include the `RuntimeHostConfigurationOption` node in the project file to enable HTTP/3 with `HttpClient`:

```xml
<ItemGroup>
    <RuntimeHostConfigurationOption Value="true"
        Include="System.Net.SocketsHttpHandler.Http3Support" />
</ItemGroup>
```

Alternatively, you can call `System.AppContext.SetSwitch*` from your app code, or set the `DOTNET_SYSTEM_NET_HTTP_SOCKETSHTTPHANDLER_HTTP3SUPPORT` environment variable to `true`. For more information, see .NET environment variables: DOTNET_SYSTEM_NET_HTTP_*.

The reason for requiring a configuration flag for HTTP/3 is to protect apps from future breakage when using version policy `RequestVersionOrHigher`. When calling a server that currently uses HTTP/1.1 and HTTP/2, if the server later upgrades to HTTP/3, the client would try to use HTTP/3 and potentially be incompatible as the standard isn't final and therefore may change after .NET 6 is released.

.NET 6 is only compatible with the 1.9.x versions of libmsquic. Libmsquic 2.x isn't compatible with .NET 6 due to breaking changes in the library. Libmsquic receives updates to 1.9.x when needed to incorporate security fixes.

## HTTP/3 Server

HTTP/3 is supported by ASP.NET with the Kestrel server in .NET 6 (as a preview) and .NET 7 (is fully supported). For more information, see use HTTP/3 with the ASP.NET Core Kestrel web server.

## Public test servers

Cloudflare hosts a site for HTTP/3 that can be used to test the client at <https://cloudflare-quic.com>.

## See also

- `System.Net.Http.HttpClient`
- HTTP/3 support in Kestrel
- QUIC support in .NET
