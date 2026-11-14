---
title: "Use ASP.NET Core with HTTP/3 on IIS"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/host-and-deploy/iis/http3.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Use ASP.NET Core with HTTP/3 on IIS

By Chris Ross

HTTP/3 is fully supported with ASP.NET Core in the following IIS scenarios:

* In-process
* Out-of-Process. In Out-of-Process, IIS responds to the client using HTTP/3, but the reverse proxy connection to the Kestrel server uses HTTP/1.1.

For more information on the in-process and out-of-process hosting models, see ASP.NET Core Module (ANCM) for IIS.

The following requirements also need to be met:

* Windows Server 2022 / Windows 11 or later
* An `https` url binding is used.
* The EnableHttp3 registry key is set.

For an in-process deployment when an HTTP/3 connection is established, `HttpRequest.Protocol` reports `HTTP/3`. For an out-of-process deployment when an HTTP/3 connection is established, `HttpRequest.Protocol` reports `HTTP/1.1` because that is how IIS proxies the requests to Kestrel.

## Alt-Svc

HTTP/3 is discovered as an upgrade from HTTP/1.1 or HTTP/2 via the `alt-svc` header. That means the first request will normally use HTTP/1.1 or HTTP/2 before switching to HTTP/3. IIS doesn't automatically add the `alt-svc` header, it must be added by the application. The following code is a middleware example that adds the `alt-svc` response header.

```csharp
app.Use((context, next) =>
{
    context.Response.Headers.AltSvc = "h3=\":443\"";
    return next(context);
});
```

Place the preceding code early in the request pipeline.

IIS also supports sending an AltSvc HTTP/2 protocol message rather than a response header to notify the client that HTTP/3 is available. See the EnableAltSvc registry key. Note this requires netsh sslcert bindings that use host names rather than IP addresses.
