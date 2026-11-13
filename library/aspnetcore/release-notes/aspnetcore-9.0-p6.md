---
title: "What's new in ASP.NET Core in .NET 9 (part 6 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-9.0.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 9 (part 6 of 6)

### Customize Kestrel named pipe endpoints

Kestrel's named pipe support has been improved with advanced customization options. The new `CreateNamedPipeServerStream` method on the named pipe options allows pipes to be customized per-endpoint.

An example of where this is useful is a Kestrel app that requires two pipe endpoints with different access security. The `CreateNamedPipeServerStream` option can be used to create pipes with custom security settings, depending on the pipe name.

```csharp
var builder = WebApplication.CreateBuilder();

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenNamedPipe("pipe1");
    options.ListenNamedPipe("pipe2");
});

builder.WebHost.UseNamedPipes(options =>
{
    options.CreateNamedPipeServerStream = (context) =>
    {
        var pipeSecurity = CreatePipeSecurity(context.NamedPipeEndpoint.PipeName);

        return NamedPipeServerStreamAcl.Create(context.NamedPipeEndPoint.PipeName, PipeDirection.InOut,
            NamedPipeServerStream.MaxAllowedServerInstances, PipeTransmissionMode.Byte,
            context.PipeOptions, inBufferSize: 0, outBufferSize: 0, pipeSecurity);
    };
});
```

### `ExceptionHandlerMiddleware` option to choose the status code based on the exception type

A new option when configuring the `ExceptionHandlerMiddleware` enables app developers to choose what status code to return when an exception occurs during request handling. The new option changes the status code being set in the `ProblemDetails` response from the `ExceptionHandlerMiddleware`.

```csharp
app.UseExceptionHandler(new ExceptionHandlerOptions
{
    StatusCodeSelector = ex => ex is TimeoutException
        ? StatusCodes.Status503ServiceUnavailable
        : StatusCodes.Status500InternalServerError,
});
```

### Opt-out of HTTP metrics on certain endpoints and requests

.NET 9 introduces the ability to opt-out of HTTP metrics for specific endpoints and requests. Opting out of recording metrics is beneficial for endpoints frequently called by automated systems, such as health checks. Recording metrics for these requests is generally unnecessary.

HTTP requests to an endpoint can be excluded from metrics by adding metadata. Either:

* Add the `[DisableHttpMetrics]` attribute to the Web API controller, SignalR hub or gRPC service.
* Call `Microsoft.AspNetCore.Builder.HttpMetricsEndpointConventionBuilderExtensions.DisableHttpMetrics*` when mapping endpoints in app startup:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHealthChecks();

var app = builder.Build();
app.MapHealthChecks("/healthz").DisableHttpMetrics();
app.Run();
```
The `MetricsDisabled` property has been added to `IHttpMetricsTagsFeature` for:

* Advanced scenarios where a request doesn't map to an endpoint.
* Dynamically disabling metrics collection for specific HTTP requests.

```csharp
// Middleware that conditionally opts-out HTTP requests.
app.Use(async (context, next) =>
{
    var metricsFeature = context.Features.Get<IHttpMetricsTagsFeature>();
    if (metricsFeature != null &&
        context.Request.Headers.ContainsKey("x-disable-metrics"))
    {
        metricsFeature.MetricsDisabled = true;
    }

    await next(context);
});
```
### Data Protection support for deleting keys

Prior to .NET 9, data protection keys were ___not___ deletable by design, to prevent data loss. Deleting a key renders its protected data irretrievable. Given their small size, the accumulation of these keys generally posed minimal impact. However, to accommodate extremely long-running services, we have introduced the option to delete keys. Generally, only old keys should be deleted. Only delete keys when you can accept the risk of data loss in exchange for storage savings. We recommend data protection keys should ___not___ be deleted.

```csharp
﻿using Microsoft.AspNetCore.DataProtection.KeyManagement;

var services = new ServiceCollection();
services.AddDataProtection();

var serviceProvider = services.BuildServiceProvider();

var keyManager = serviceProvider.GetService<IKeyManager>();

if (keyManager is IDeletableKeyManager deletableKeyManager)
{
    var utcNow = DateTimeOffset.UtcNow;
    var yearAgo = utcNow.AddYears(-1);

    if (!deletableKeyManager.DeleteKeys(key => key.ExpirationDate < yearAgo))
    {
        Console.WriteLine("Failed to delete keys.");
    }
    else
    {
        Console.WriteLine("Old keys deleted successfully.");
    }
}
else
{
    Console.WriteLine("Key manager does not support deletion.");
}
```
### Middleware supports Keyed DI

Middleware now supports Keyed DI in both the constructor and the `Invoke`/`InvokeAsync` method:

_Code sample not included: ~/../AspNetCore.Docs.Samples/samples/KeyedServices9/Program.cs._
#### Trust the ASP.NET Core HTTPS development certificate on Linux

On Ubuntu and Fedora based Linux distros, `dotnet dev-certs https --trust` now configures ASP.NET Core HTTPS development certificate as a trusted certificate for:

* Chromium browsers, for example, Google Chrome, Microsoft Edge, and Chromium.
* Mozilla Firefox and Mozilla derived browsers.
* .NET APIs, for example, HttpClient

Previously, `--trust` only worked on Windows and macOS. Certificate trust is applied per-user.

To establish trust in OpenSSL, the `dev-certs` tool:

* Puts the certificate in `~/.aspnet/dev-certs/trust`
* Runs a simplified version of OpenSSL's c_rehash tool on the directory.
* Asks the user to update the `SSL_CERT_DIR` environment variable.

To establish trust in dotnet, the tool puts the certificate in the `My/Root` certificate store.

To establish trust in NSS databases, if any, the tool searches the home directory for Firefox profiles, `~/.pki/nssdb`, and `~/snap/chromium/current/.pki/nssdb`. For each directory found, the tool adds an entry to the `nssdb`.

### Templates updated to latest Bootstrap, jQuery, and jQuery Validation versions

The ASP.NET Core project templates and libraries have been updated to use the latest versions of Bootstrap, jQuery, and jQuery Validation, specifically:

* Bootstrap 5.3.3
* jQuery 3.7.1
* jQuery Validation 1.21.0

### Keep-Alive Timeout for WebSockets

The WebSockets middleware can now be configured for keep-alive timeouts.

The keep-alive timeout aborts the WebSocket connection and throws an exception from `WebSocket.ReceiveAsync` if both of the following conditions are met:

* The server sends a ping frame using the websocket protocol.
* The client doesn't reply with a pong frame within the specified timeout.

The server automatically sends the ping frame and configures it with `KeepAliveInterval`.

The keep-alive timeout setting is useful for detecting connections that might be slow or ungracefully disconnected.

The keep-alive timeout can be configured globally for the WebSocket middleware:

```csharp
app.UseWebSockets(new WebSocketOptions { KeepAliveTimeout = TimeSpan.FromSeconds(15) });
```

Alternatively, configure the timeout per accepted WebSocket:

```csharp
app.Run(async (context) =>
{
    using var webSocket = await context.WebSockets.AcceptWebSocketAsync(
        new WebSocketAcceptContext { KeepAliveTimeout = TimeSpan.FromSeconds(15) });

    // ...
});
```

For more information, see WebSockets support in ASP.NET Core.

## Breaking changes

Use the articles in Breaking changes in .NET to find breaking changes that might apply when upgrading an app to a newer version of .NET.
