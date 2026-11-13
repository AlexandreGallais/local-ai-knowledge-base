---
title: "Use connection middleware with the ASP.NET Core Kestrel web server"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/kestrel/connection-middleware.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Connection middleware

-->
-->

Kestrel supports connection middleware. Connection middleware is software that is assembled into a connection pipeline and runs when Kestrel receives a new connection. Each component:

* Chooses whether to pass the request to the next component in the pipeline.
* Can perform work before and after the next component in the pipeline.

Connection delegates are used to build the connection pipeline. Connection delegates are configured with the `Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions.Use*` method.

Connection middleware is different from ASP.NET Core middleware. Connection middleware runs per-connection instead of per-request.

## Connection logging

Connection logging is connection middleware that is included with ASP.NET Core. Call `Microsoft.AspNetCore.Hosting.ListenOptionsConnectionLoggingExtensions.UseConnectionLogging*` to emit Debug level logs for byte-level communication on a connection.

Connection logging is helpful for troubleshooting problems in low-level communication, such as during TLS encryption and behind proxies. If `UseConnectionLogging` is placed before `UseHttps`, encrypted traffic is logged. If `UseConnectionLogging` is placed after `UseHttps`, decrypted traffic is logged.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel((context, serverOptions) =>
{
    serverOptions.Listen(IPAddress.Any, 8000, listenOptions =>
    {
        listenOptions.UseConnectionLogging();
    });
});
```
## Create custom connection middleware

The following example shows a custom connection middleware that can filter TLS handshakes on a per-connection basis for specific ciphers if necessary. The middleware throws `System.NotSupportedException` for any cipher algorithm that the app doesn't support. Alternatively, define and compare `Microsoft.AspNetCore.Connections.Features.ITlsHandshakeFeature.CipherAlgorithm` to a list of acceptable cipher suites.

No encryption is used with a `System.Security.Authentication.CipherAlgorithmType.Null` cipher algorithm.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel((context, serverOptions) =>
{
    serverOptions.Listen(IPAddress.Any, 8000, listenOptions =>
    {
        listenOptions.UseHttps("testCert.pfx", "testPassword");

        listenOptions.Use((context, next) =>
        {
            var tlsFeature = context.Features.Get<ITlsHandshakeFeature>()!;

            if (tlsFeature.CipherAlgorithm == CipherAlgorithmType.Null)
            {
                throw new NotSupportedException(
                    $"Prohibited cipher: {tlsFeature.CipherAlgorithm}");
            }

            return next();
        });
    });
});
```
## See also

* Configure endpoints for Kestrel web server
