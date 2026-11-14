---
title: "HTTP.sys web server implementation in ASP.NET Core (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/servers/httpsys.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# HTTP.sys web server implementation in ASP.NET Core

By Tom Dykstra and Chris Ross

HTTP.sys is a web server for ASP.NET Core that only runs on Windows. HTTP.sys is an alternative to Kestrel server and offers some features that Kestrel doesn't provide. This article explains when to use HTTP.sys, how to configure it, and how to inspect request and TLS information.

> **Important:**
> HTTP.sys isn't compatible with the ASP.NET Core Module and can't be used with IIS or IIS Express.

HTTP.sys supports the following features:

* Windows Authentication
* Port sharing
* HTTPS with SNI
* HTTP/2 over TLS (Windows 10 or later)
* HTTP/3 over TLS (Windows 11 or later)
* Direct file transmission
* Response caching
* WebSockets (Windows 8 or later)
* Customizable security descriptors
* Automatic memory pool eviction

The operating system must be supported by the app's target version of .NET. For supported Windows versions, see Install .NET on Windows. The availability of HTTP.sys on older Windows versions doesn't imply support for those versions by current ASP.NET Core releases. Individual features can have additional Windows requirements, as described in the following sections.

View or download sample code (how to download)

## When to use HTTP.sys

HTTP.sys is useful for deployments where:

* There's a need to expose the server directly to the Internet without using IIS.

* An internal deployment requires a feature not available in Kestrel. For more information, see Kestrel vs. HTTP.sys

HTTP.sys is mature technology that protects against many types of attacks and provides the robustness, security, and scalability of a full-featured web server. IIS itself runs as an HTTP listener on top of HTTP.sys.

## HTTP/2 support

HTTP/2 is enabled for ASP.NET Core apps when the following base requirements are met:

* Windows Server 2016/Windows 10 or later
* Application-Layer Protocol Negotiation (ALPN) connection
* TLS 1.2 or later connection

If an HTTP/2 connection is established, HttpRequest.Protocol reports `HTTP/2`.

HTTP/2 is enabled by default. If an HTTP/2 connection isn't established, the connection falls back to HTTP/1.1. On Windows versions that support it, the `disablehttp2` option on a `netsh http` SSL certificate binding disables HTTP/2 for that binding. For available options, see netsh http.

## HTTP/3 support

HTTP/3 is enabled for ASP.NET Core apps when the following base requirements are met:

* Windows Server 2022/Windows 11 or later
* An `https` url binding is used.
* The EnableHttp3 registry key is set.

The preceding Windows 11 Build versions may require the use of a Windows Insider build.

HTTP/3 is discovered as an upgrade from HTTP/1.1 or HTTP/2 via the `alt-svc` header. That means the first request will normally use HTTP/1.1 or HTTP/2 before switching to HTTP/3. Http.Sys doesn't automatically add the `alt-svc` header, it must be added by the application. The following code is a middleware example that adds the `alt-svc` response header.

```csharp
app.Use((context, next) =>
{
    context.Response.Headers.AltSvc = "h3=\":443\"";
    return next(context);
});
```

Place the preceding code early in the request pipeline.

Http.Sys also supports sending an AltSvc HTTP/2 protocol message rather than a response header to notify the client that HTTP/3 is available. See the EnableAltSvc registry key.

> **Note:**
> This requires netsh sslcert bindings that use host names rather than IP addresses. Replace `ipport` with `hostnameport` in the `netsh http add sslcert` commands below, and replace the IP address with the hostname, for example, `www.example.com`. There's also a known issue where using `hostnameport` fails unless the `certstorename` parameter is specified. By default, use `certstorename=MY`.

## Kernel mode authentication with Kerberos

HTTP.sys delegates to kernel mode authentication with the Kerberos authentication protocol. User mode authentication isn'<example-value>'s obtained from Active Directory and forwarded by the client to the server to authenticate the user. Register the Service Principal Name (SPN) for the host, not the user of the app.

### Enable channel binding token (CBT) hardening

Channel binding tokens (CBT) tie Windows authentication to the underlying TLS channel, which helps mitigate NTLM relay and man-in-the-middle attacks.

Configure CBT hardening with `Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions.HttpAuthenticationHardeningLevel`. The available `Microsoft.AspNetCore.Server.HttpSys.HttpAuthenticationHardeningLevel` values are:

| Value | Behavior |
| --- | --- |
| `Legacy` | Doesn't enforce channel binding validation or expose CBT bytes to the app. |
| `Medium` (default) | Validates CBTs when clients supply them, but permits their absence. Exposes CBT bytes to the app. |
| `Strict` | Requires CBTs on authenticated requests and rejects requests without them. Exposes CBT bytes to the app. |

The following example opts in to `Strict` hardening:

```csharp
builder.WebHost.UseHttpSys(options =>
{
    options.HttpAuthenticationHardeningLevel =
        HttpAuthenticationHardeningLevel.Strict;
});
```
If HTTP.sys can't apply `Strict` hardening, server startup fails with a `HttpSysException`. With `Legacy` or `Medium`, a failure to apply the setting is logged, and startup continues. The configured value alone doesn't guarantee that the operating system applied the setting.

> **Warning:**
> `Strict` hardening can cause Windows authentication to fail for clients or proxies that don't supply a valid CBT. Test client compatibility and TLS termination in your environment before enabling it in production.

When attaching to an existing request queue, configure hardening on the listener that owns the URL group. The attaching app doesn't apply URL-group configuration.

For access to CBT bytes, see Get channel binding tokens.

### Support for kernel-mode response buffering

In some scenarios, high volumes of small writes with high latency can cause significant performance impact to `HTTP.sys`. This impact is due to the lack of a `System.IO.Pipelines.Pipe` buffer in the `HTTP.sys` implementation. To improve performance in these scenarios, support for response buffering is included in `HTTP.sys`. Enable buffering by setting `Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions.EnableKernelResponseBuffering` to `true`.
Response buffering should be enabled by an app that does synchronous I/O, or asynchronous I/O with no more than one outstanding write at a time. In these scenarios, response buffering can significantly improve throughput over high-latency connections.

Apps that use asynchronous I/O and that may have more than one write outstanding at a time should **_not_** use this flag. Enabling this flag can result in higher CPU and memory usage by HTTP.Sys.
