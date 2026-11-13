---
title: "Configure ASP.NET Core to work with proxy servers and load balancers (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/host-and-deploy/proxy-load-balancer.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configure ASP.NET Core to work with proxy servers and load balancers

-->
-->

By Chris Ross

In the recommended configuration for ASP.NET Core, the app is hosted using ASP.NET Core Module (ANCM) for IIS, Nginx, or Apache. Proxy servers, load balancers, and other network appliances often obscure information about the request before it reaches the app:

* When HTTPS requests are proxied over HTTP, the original scheme (HTTPS) is lost and must be forwarded in a header.
* Because an app receives a request from the proxy and not its true source on the Internet or corporate network, the originating client IP address must also be forwarded in a header.

This information might be important in request processing, for example in redirects, authentication, link generation, policy evaluation, and client geolocation.

Apps intended to run on web farm should read Host ASP.NET Core in a web farm.

## Forwarded headers

By convention, proxies forward information in HTTP headers.

| Header | Description |
| ------ | ----------- |
| `X-Forwarded-For` (XFF) | Holds information about the client that initiated the request and subsequent proxies in a chain of proxies. This parameter might contain IP addresses and, optionally, port numbers. In a chain of proxy servers, the first parameter indicates the client where the request was first made. Subsequent proxy identifiers follow. The last proxy in the chain isn't in the list of parameters. The last proxy's IP address, and optionally a port number, are available as the remote IP address at the transport layer. |
| `X-Forwarded-Proto` (XFP) | The value of the originating scheme, HTTP or HTTPS. The value might also be a list of schemes if the request has traversed multiple proxies. |
| `X-Forwarded-Host` (XFH) | The original value of the Host header field. Usually, proxies don't modify the Host header. See Microsoft Security Advisory CVE-2018-0787 for information on an elevation-of-privileges vulnerability that affects systems where the proxy doesn't validate or restrict Host headers to known good values. |
| `X-Forwarded-Prefix` | The original base path requested by the client. This header can be useful for applications to correctly generate URLs, redirects, or links back to the client. |

The forwarded headers middleware, `Microsoft.AspNetCore.HttpOverrides.ForwardedHeadersMiddleware`, reads these headers and fills in the associated fields on `Microsoft.AspNetCore.Http.HttpContext`.

The middleware updates:

* `HttpContext.Connection.RemoteIpAddress`: Set using the `X-Forwarded-For` header value. Additional settings influence how the middleware sets `RemoteIpAddress`. For details, see the forwarded headers middleware options. The consumed values are removed from `X-Forwarded-For`, and the old value of `HttpContext.Connection.RemoteIpAddress` is persisted in `X-Original-For`. Note: This process might be repeated several times if there are multiple values in `X-Forwarded-For/Proto/Host/Prefix`, resulting in several values moved to `X-Original-*`, including the original `RemoteIpAddress/Host/Scheme/PathBase`.
* `HttpContext.Request.Scheme`: Set using the `X-Forwarded-Proto` header value. The consumed value is removed from `X-Forwarded-Proto`, and the old value of `HttpContext.Request.Scheme` is persisted in `X-Original-Proto`.
* `HttpContext.Request.Host`: Set using the `X-Forwarded-Host` header value. The consumed value is removed from `X-Forwarded-Host`, and the old value of `HttpContext.Request.Host` is persisted in `X-Original-Host`.
* `HttpContext.Request.PathBase`: Set using the `X-Forwarded-Prefix` header value. The consumed value is removed from `X-Forwarded-Prefix`, and the old value of `HttpContext.Request.PathBase` is persisted in `X-Original-Prefix`.

For more information on the preceding, see this GitHub issue.

Forwarded headers middleware default settings can be configured. For the default settings:

* There's only ***one proxy*** between the app and the source of the requests.
* Only loopback addresses are configured for known proxies and known networks.
* The forwarded headers are named `X-Forwarded-For`, `X-Forwarded-Proto`, `X-Forwarded-Host` and `X-Forwarded-Prefix`.
* The `ForwardedHeaders` value is `ForwardedHeaders.None`. The desired forwarders must be set here to enable the middleware.

Not all network appliances add the `X-Forwarded-For` and `X-Forwarded-Proto` headers without additional configuration. Consult your appliance manufacturer's guidance if proxied requests don't contain these headers when they reach the app. If the appliance uses different header names than `X-Forwarded-For` and `X-Forwarded-Proto`, set the `Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.ForwardedForHeaderName` and `Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.ForwardedProtoHeaderName` options to match the header names used by the appliance. For more information, see forwarded headers middleware options and Configuration for a proxy that uses different header names.

## IIS/IIS Express and ASP.NET Core Module

IIS integration middleware enables forwarded headers middleware by default when the app is hosted out-of-process behind IIS and the ASP.NET Core Module (ANCM) for IIS. Forwarded headers middleware is activated to run first in the middleware pipeline with a restricted configuration specific to the ASP.NET Core Module. The restricted configuration is due to trust concerns with forwarded headers, for example, IP spoofing. The middleware is configured to forward the `X-Forwarded-For` and `X-Forwarded-Proto` headers and is restricted to a single localhost proxy. If additional configuration is required, see the forwarded headers middleware options.

## Other proxy server and load balancer scenarios

Outside of using IIS Integration when hosting out-of-process, forwarded headers middleware isn't enabled by default. Forwarded headers middleware must be enabled for an app to process forwarded headers with `Microsoft.AspNetCore.Builder.ForwardedHeadersExtensions.UseForwardedHeaders*`. After enabling the middleware if no `Microsoft.AspNetCore.Builder.ForwardedHeadersOptions` are specified to the middleware, the default ForwardedHeadersOptions.ForwardedHeaders are ForwardedHeaders.None.

Configure the middleware with `Microsoft.AspNetCore.Builder.ForwardedHeadersOptions` to forward the `X-Forwarded-For` and `X-Forwarded-Proto` headers.

### Forwarded headers middleware order

Forwarded headers middleware should run before other middleware. This ordering ensures that the middleware relying on forwarded headers information can consume the header values for processing. Forwarded headers middleware can run after diagnostics and error handling, but it must be run before calling `Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts*`:

```csharp
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseForwardedHeaders();
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
    app.UseForwardedHeaders();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

Alternatively, call `UseForwardedHeaders` before diagnostics:

```csharp
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

var app = builder.Build();

app.UseForwardedHeaders();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

> **Note:**
> If no `Microsoft.AspNetCore.Builder.ForwardedHeadersOptions` are specified or applied directly to the extension method with `Microsoft.AspNetCore.Builder.ForwardedHeadersExtensions.UseForwardedHeaders*`, the default headers to forward are ForwardedHeaders.None. The `Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.ForwardedHeaders` property must be configured with the headers to forward.

## Nginx configuration

To forward the `X-Forwarded-For` and `X-Forwarded-Proto` headers, see Host ASP.NET Core on Linux with Nginx.

## Apache configuration

`X-Forwarded-For` is added automatically. For more information, see Apache Module mod_proxy: Reverse Proxy Request Headers.
