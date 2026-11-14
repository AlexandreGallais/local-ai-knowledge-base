---
title: "What's new in ASP.NET Core in .NET 8 (part 5 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-8.0.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 8 (part 5 of 6)

## Kestrel and HTTP.sys servers

There are several new features for Kestrel and HTTP.sys.

### Support for named pipes in Kestrel

Named pipes is a popular technology for building inter-process communication (IPC) between Windows apps. You can now build an IPC server using .NET, Kestrel, and named pipes.

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenNamedPipe("MyPipeName");
});
```

For more information about this feature and how to use .NET and gRPC to create an IPC server and client, see Inter-process communication with gRPC.

### Performance improvements to named pipes transport

We've improved named pipe connection performance. Kestrel's named pipe transport now accepts connections in parallel, and reuses `System.IO.Pipes.NamedPipeServerStream` instances.

Time to create 100,000 connections:

* Before : 5.916 seconds
* After   : 2.374 seconds

### HTTP/2 over TLS (HTTPS) support on macOS in Kestrel

.NET 8 adds support for Application-Layer Protocol Negotiation (ALPN) to macOS. ALPN is a TLS feature used to negotiate which HTTP protocol a connection will use. For example, ALPN allows browsers and other HTTP clients to request an HTTP/2 connection. This feature is especially useful for gRPC apps, which require HTTP/2. For more information, see Use HTTP/2 with the ASP.NET Core Kestrel web server.

### Certificate file watching in Kestrel

TLS certificates configured by path are now monitored for changes when `reloadOnChange` is passed to `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure`.  A change to the certificate file is treated the same way as a change to the configured path (that is, endpoints are reloaded).

Note that file deletions are specifically not tracked since they arise transiently and would crash the server if non-transient.

### Warning when specified HTTP protocols won't be used

If TLS is disabled and HTTP/1.x is available, HTTP/2 and HTTP/3 will be disabled, even if they've been specified. This can cause some nasty surprises, so we've added warning output to let you know when it happens.

### `HTTP_PORTS` and `HTTPS_PORTS` config keys

Most configurations for apps and containers define only a port for listening, like port 80, without specifying other constraints like the host or path. `HTTP_PORTS` and `HTTPS_PORTS` are config keys that specify the listening ports for the Kestrel and HTTP.sys servers. You can specify the keys as environment variables defined with the `DOTNET_` or `ASPNETCORE_` prefixes, or set them directly through any other config input, such as the `appsettings.json` file. Each configuration is a semicolon-delimited list of port values, as shown in the following example:

```json
ASPNETCORE_HTTP_PORTS=80;8080
ASPNETCORE_HTTPS_PORTS=443;8081
```

The configuration in the example is shorthand for the following specification, which defines the scheme (HTTP or HTTPS) and any host or IP:

```json
ASPNETCORE_URLS=http://*:80/;http://*:8080/;https://*:443/;https://*:8081/
```

The `HTTP_PORTS` and `HTTPS_PORTS` configuration keys are lower priority. If other URLs or values are set directly in code, they can override the configuration keys. Configure certificates separately using server-specific mechanics for HTTPS.

> **Note:**
> Don't confuse the `HTTPS_PORTS` configuration key and `ASPNETCORE_HTTPS_PORTS` environment variable, which set the ports for Kestrel/HTTP.sys endpoint configuration, with the `HTTPS_PORT` configuration key and `ASPNETCORE_HTTPS_PORT` environment variable, which set the port for HTTPS redirection middleware.

### SNI host name in ITlsHandshakeFeature

The Server Name Indication (SNI) host name is now exposed in the  HostName property of the `Microsoft.AspNetCore.Connections.Features.ITlsHandshakeFeature` interface.

SNI is part of the TLS handshake process. It allows clients to specify the host name they're attempting to connect to when the server hosts multiple virtual hosts or domains. To present the correct security certificate during the handshake process, the server needs to know the host name selected for each request.

Normally the host name is only handled within the TLS stack and is used to select the matching certificate. But by exposing it, other components in an app can use that information for purposes such as diagnostics, rate limiting, routing, and billing.

Exposing the host name is useful for large-scale services managing thousands of SNI bindings. This feature can significantly improve debugging efficiency during customer escalations. The increased transparency allows for faster problem resolution and enhanced service reliability.

For more information, see  ITlsHandshakeFeature.HostName.

### IHttpSysRequestTimingFeature

 IHttpSysRequestTimingFeature provides detailed timing information for requests when using the HTTP.sys server and In-process hosting with IIS:

* Timestamps are obtained using QueryPerformanceCounter.
* The timestamp frequency can be obtained via QueryPerformanceFrequency.
* The index of the timing can be cast to  HttpSysRequestTimingType to know what the timing represents.
* The value might be 0 if the timing isn't available for the current request.

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
For more information, see Get detailed timing information with IHttpSysRequestTimingFeature and Timing information and In-process hosting with IIS.

### HTTP.sys: opt-in support for kernel-mode response buffering

In some scenarios, high volumes of small writes with high latency can cause significant performance impact to `HTTP.sys`. This impact is due to the lack of a `System.IO.Pipelines.Pipe` buffer in the `HTTP.sys` implementation. To improve performance in these scenarios, support for response buffering has been added to `HTTP.sys`. Enable buffering by setting HttpSysOptions.EnableKernelResponseBuffering to `true`.

Response buffering should be enabled by an app that does synchronous I/O, or asynchronous I/O with no more than one outstanding write at a time. In these scenarios, response buffering can significantly improve throughput over high-latency connections.

Apps that use asynchronous I/O and that can have more than one write outstanding at a time should **_not_** use this flag. Enabling this flag can result in higher CPU and memory usage by HTTP.Sys.

## Authentication and authorization

.NET 8 adds new features to authentication and authorization.

### Identity API endpoints

`MapIdentityApi<TUser>` is a new extension method that adds two API endpoints (`/register` and `/login`). The main goal of the `MapIdentityApi` is to make it easy for developers to use ASP.NET Core Identity for authentication in JavaScript-based single page apps (SPA) or Blazor apps. Instead of using the default UI provided by ASP.NET Core Identity, which is based on Razor Pages, MapIdentityApi adds JSON API endpoints that are more suitable for SPA apps and nonbrowser apps. For more information, see Identity API endpoints.

### `IAuthorizationRequirementData`

Prior to the release of .NET 8, adding a parameterized authorization policy to an endpoint required implementing:

* `AuthorizeAttribute` for each policy.
* `AuthorizationPolicyProvider` to process a custom policy from a string-based contract.
* `AuthorizationRequirement` for the policy.
* `AuthorizationHandler` for each requirement.

For example, consider the following code written for .NET 7:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/OldStyleAuthRequirements/Program.cs._
_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/OldStyleAuthRequirements/Controllers/GreetingsController.cs._
_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/OldStyleAuthRequirements/Authorization/MinimumAgeAuthorizationHandler.cs._
The complete sample for .NET 7 or earlier is the OldStyleAuthRequirements sample app (`dotnet/AspNetCore.Docs.Samples` GitHub repository) (how to download).

.NET 8 introduces the `Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData` interface. The `IAuthorizationRequirementData` interface allows the attribute definition to specify the requirements associated with the authorization policy. Using `IAuthorizationRequirementData`, the preceding custom authorization policy code can be written with fewer lines of code. The updated `Program.cs` file:

```diff
using AuthRequirementsData.Authorization;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder();

builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();
builder.Services.AddControllers();
-builder.Services.AddSingleton<IAuthorizationPolicyProvider, MinimumAgePolicyProvider>();
builder.Services.AddSingleton<IAuthorizationHandler, MinimumAgeAuthorizationHandler>();

var app = builder.Build();

app.MapControllers();

app.Run();
```

The updated `MinimumAgeAuthorizationHandler`:

```diff
using Microsoft.AspNetCore.Authorization;
using System.Globalization;
using System.Security.Claims;

namespace AuthRequirementsData.Authorization;

class MinimumAgeAuthorizationHandler(ILogger<MinimumAgeAuthorizationHandler> logger)
-    : AuthorizationHandler<MinimumAgeRequirement>
+    : AuthorizationHandler<MinimumAgeAuthorizeAttribute>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
-       MinimumAgeRequirement requirement)
+       MinimumAgeAuthorizeAttribute requirement)
    {
        ...
    }
}
```

The updated sample is the AuthRequirementsData sample app (`dotnet/AspNetCore.Docs.Samples` GitHub repository) (how to download).

For more information, see Custom authorization policies with \`IAuthorizationRequirementData\`.

### Securing Swagger UI endpoints

Swagger UI endpoints can now be secured in production environments by calling `MapSwagger().RequireAuthorization`. For more information, see Securing Swagger UI endpoints
