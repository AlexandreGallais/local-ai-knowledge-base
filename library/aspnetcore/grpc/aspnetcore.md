---
title: "gRPC services with ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/grpc/aspnetcore.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# gRPC services with ASP.NET Core

-->
-->

This document shows how to get started with gRPC services using ASP.NET Core.

# Visual Studio

* Visual Studio 2022 with the **ASP.NET and web development** workload.

# Visual Studio Code

* Visual Studio Code
* C# for Visual Studio Code (latest version)
* .NET 8 SDK

The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.

---

## Get started with gRPC service in ASP.NET Core

View or download sample code (how to download).

# Visual Studio

See Get started with gRPC services for detailed instructions on how to create a gRPC project.

# Visual Studio Code

Run `dotnet new grpc -o GrpcGreeter` from the command line.

---

## Add gRPC services to an ASP.NET Core app

gRPC requires the Grpc.AspNetCore package.

### Configure gRPC

In `Program.cs`:

* gRPC is enabled with the `AddGrpc` method.
* Each gRPC service is added to the routing pipeline through the `MapGrpcService` method.

```csharp
using GrpcGreeter.Services;

var builder = WebApplication.CreateBuilder(args);

// Additional configuration is required to successfully run gRPC on macOS.
// For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682

// Add services to the container.
builder.Services.AddGrpc();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<GreeterService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
```

ASP.NET Core middleware and features share the routing pipeline, therefore an app can be configured to serve additional request handlers. The additional request handlers, such as MVC controllers, work in parallel with the configured gRPC services.

## Server options

gRPC services can be hosted by all built-in ASP.NET Core servers.

>
> * Kestrel
> * TestServer
> * IIS&dagger;
> * HTTP.sys&dagger;

&dagger;Requires .NET 5 and Windows 11 Build 22000 or Windows Server 2022 Build 20348 or later.

For more information about choosing the right server for an ASP.NET Core app, see Web server implementations in ASP.NET Core.

## Kestrel

Kestrel is a cross-platform web server for ASP.NET Core. Kestrel focuses on high performance and memory utilization, but it doesn't have some of the advanced features in HTTP.sys such as port sharing.

Kestrel gRPC endpoints:

* Require HTTP/2.
* Should be secured with Transport Layer Security (TLS).

### HTTP/2

gRPC requires HTTP/2. gRPC for ASP.NET Core validates HttpRequest.Protocol is `HTTP/2`.

Kestrel supports HTTP/2 on most modern operating systems. Kestrel endpoints are configured to support HTTP/1.1 and HTTP/2 connections by default.

### TLS

Kestrel endpoints used for gRPC should be secured with TLS. In development, an endpoint secured with TLS is automatically created at `https://localhost:5001` when the ASP.NET Core development certificate is present. No configuration is required. An `https` prefix verifies the Kestrel endpoint is using TLS.

In production, TLS must be explicitly configured. In the following `appsettings.json` example, an HTTP/2 endpoint secured with TLS is provided:

```json
{
  "Kestrel": {
    "Endpoints": {
      "HttpsInlineCertFile": {
        "Url": "https://localhost:5001",
        "Protocols": "Http2",
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "<certificate password>"
        }
      }
    }
  }
}
```

Alternatively, Kestrel endpoints can be configured in `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.Listen(IPAddress.Any, 5001, listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http2;
        listenOptions.UseHttps("<path to .pfx file>",
            "<certificate password>");
    });
});
```

For more information on enabling TLS with Kestrel, see Kestrel HTTPS endpoint configuration.

### Protocol negotiation

TLS is used for more than securing communication. The TLS Application-Layer Protocol Negotiation (ALPN) handshake is used to negotiate the connection protocol between the client and the server when an endpoint supports multiple protocols. This negotiation determines whether the connection uses HTTP/1.1 or HTTP/2.

If an HTTP/2 endpoint is configured without TLS, the endpoint's ListenOptions.Protocols must be set to `HttpProtocols.Http2`. An endpoint with multiple protocols, such as `HttpProtocols.Http1AndHttp2` for example, can't be used without TLS because there's no negotiation. All connections to the unsecured endpoint default to HTTP/1.1, and gRPC calls fail.

For more information on enabling HTTP/2 and TLS with Kestrel, see Kestrel endpoint configuration.

> **Note:**
> macOS doesn't support ASP.NET Core gRPC with TLS before .NET 8. Additional configuration is required to successfully run gRPC services on macOS when using .NET 7 or earlier. For more information, see Unable to start ASP.NET Core gRPC app on macOS.

## IIS

Internet Information Services (IIS) is a flexible, secure and manageable Web Server for hosting web apps, including ASP.NET Core. .NET 5 and Windows 11 Build 22000 or Windows Server 2022 Build 20348 or later are required to host gRPC services with IIS.

IIS must be configured to use TLS and HTTP/2. For more information, see Use ASP.NET Core with HTTP/2 on IIS.

## HTTP.sys

HTTP.sys is a web server for ASP.NET Core that only runs on Windows. .NET 5 and Windows 11 Build 22000 or Windows Server 2022 Build 20348 or later are required to host gRPC services with HTTP.sys.

HTTP.sys must be configured to use TLS and HTTP/2. For more information, see  HTTP.sys web server HTTP/2 support.

## Host gRPC in non-ASP.NET Core projects

An ASP.NET Core gRPC server is typically created from the gRPC template. The project file created by the template uses `Microsoft.NET.SDK.Web` as the SDK:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <ItemGroup>
    <PackageReference Include="Grpc.AspNetCore" Version="2.47.0" />
    <Protobuf Include="Protos\greet.proto" GrpcServices="Server" />
  </ItemGroup>

</Project>
```

The `Microsoft.NET.SDK.Web` SDK value automatically adds a reference to the ASP.NET Core framework. The reference allows the app to use ASP.NET Core types required to host a server.

You can add a gRPC server to non-ASP.NET Core projects with the following project file settings:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <ItemGroup>
    <PackageReference Include="Grpc.AspNetCore" Version="2.47.0" />
    <Protobuf Include="Protos\greet.proto" GrpcServices="Server" />
    
    <FrameworkReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>

</Project>
```

The preceding project file:

* Doesn't use `Microsoft.NET.SDK.Web` as the SDK.
* Adds a framework reference to `Microsoft.AspNetCore.App`.
  * The framework reference allows non-ASP.NET Core apps, such as Windows Services, WPF apps, or WinForms apps to use ASP.NET Core APIs.
  * The app can now use ASP.NET Core APIs to start an ASP.NET Core server.
* Adds gRPC requirements:
  * NuGet package reference to `Grpc.AspNetCore`.
  * `.proto` file.

For more information about using the `Microsoft.AspNetCore.App` framework reference, see Use the ASP.NET Core shared framework.

## Integration with ASP.NET Core APIs

gRPC services have full access to the ASP.NET Core features such as dependency injection (DI) and logging. For example, the service implementation can resolve a logger service from the DI container.

Constructor injection:

```csharp
public class GreeterService : Greeter.GreeterBase
{
    private readonly ILogger<GreeterService> _logger;

    public GreeterService(ILogger<GreeterService> logger)
    {
        _logger = logger;
    }
}
```

Primary constructor injection (.NET 8 or later):

```csharp
public class GreeterService(ILogger<GreeterService> logger) : Greeter.GreeterBase
{
    ...
}
```

By default, the gRPC service implementation can resolve other DI services with any lifetime (Singleton, Scoped, or Transient).

### Resolve HttpContext in gRPC methods

The gRPC API provides access to some HTTP/2 message data, such as the method, host, header, and trailers. Access is through the `ServerCallContext` argument passed to each gRPC method:

```csharp
public class GreeterService : Greeter.GreeterBase
{
    public override Task<HelloReply> SayHello(
        HelloRequest request, ServerCallContext context)
    {
        return Task.FromResult(new HelloReply
        {
            Message = "Hello " + request.Name
        });
    }
}
```

`ServerCallContext` doesn't provide full access to `HttpContext` in all ASP.NET APIs. The `GetHttpContext` extension method provides full access to the `HttpContext` representing the underlying HTTP/2 message in ASP.NET APIs:

```csharp
public class GreeterService : Greeter.GreeterBase
{
    public override Task<HelloReply> SayHello(
        HelloRequest request, ServerCallContext context)
    {
        var httpContext = context.GetHttpContext();
        var clientCertificate = httpContext.Connection.ClientCertificate;

        return Task.FromResult(new HelloReply
        {
            Message = "Hello " + request.Name + " from " + clientCertificate.Issuer
        });
    }
}
```

## Related content

* Create a .NET gRPC client and server in ASP.NET Core
* Overview for gRPC on .NET
* gRPC Services with C#
* Kestrel web server in ASP.NET Core
