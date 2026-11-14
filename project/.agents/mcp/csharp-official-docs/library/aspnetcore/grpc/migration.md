---
title: "Migrate gRPC from C-core to gRPC for .NET"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/grpc/migration.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Migrate gRPC from C-core to gRPC for .NET

Due to the implementation of the underlying stack, not all features work in the same way between C-core-based gRPC apps and gRPC for .NET. This document highlights the key <example-value> for migrating between the two stacks.

> **Important:**
> gRPC C-core is in maintenance mode and will be deprecated in favor of gRPC for .NET. gRPC C-core is not recommended for new apps.

## Platform support

gRPC C-core and gRPC for .NET have different platform support:

* **gRPC C-core**: A C++ gRPC implementation with its own TLS and HTTP/2 stacks. The `Grpc.Core` package is a .NET wrapper around gRPC C-core and contains a gRPC client and server. It supports .NET Framework, .NET Core, and .NET 5 or later.
* **gRPC for .NET**: Designed for .NET Core 3.x and .NET 5 or later. It uses TLS and HTTP/2 stacks built into modern .NET releases. The `Grpc.AspNetCore` package contains a gRPC server that is hosted in ASP.NET Core and requires .NET Core 3.x or .NET 5 or later. The `Grpc.Net.Client` package contains a gRPC client. The client in `Grpc.Net.Client` has limited support for .NET Framework using `System.Net.Http.WinHttpHandler`.

For more information, see gRPC on .NET supported platforms.

## Configure server and channel

NuGet packages, configuration, and startup code must be modified when migrating from gRPC C-Core to gRPC for .NET.

gRPC for .NET has separate NuGet packages for its client and server. The packages added depend upon whether an app is hosting gRPC services or calling them:

* **`Grpc.AspNetCore`**: Services are hosted by ASP.NET Core. For server configuration information, see gRPC services with ASP.NET Core.
* **`Grpc.Net.Client`**: Clients use `GrpcChannel`, which internally uses networking functionality built into .NET. For client configuration information, see Call gRPC services with the .NET client.

When migration is complete, the `Grpc.Core` package should be removed from the app. `Grpc.Core` contains large native binaries, and removing the package reduces NuGet restore time and app size.

## Code generated services and clients

gRPC C-Core and gRPC for .NET share many APIs, and code generated from `.proto` files is compatible with both gRPC implementations. Most clients and service can be migrated from C-Core to gRPC for .NET without changes.

## gRPC service implementation lifetime

In the ASP.NET Core stack, gRPC services, by default, are created with a scoped lifetime. In contrast, gRPC C-core by default binds to a service with a singleton lifetime.

A scoped lifetime allows the service implementation to resolve other services with scoped lifetimes. For example, a scoped lifetime can also resolve `DbContext` from the DI container through constructor injection. Using scoped lifetime:

* A new instance of the service implementation is constructed for each request.
* It isn't possible to share state between requests via instance members on the implementation type.
* The expectation is to store shared states in a singleton service in the DI container. The stored shared states are resolved in the constructor of the gRPC service implementation.

For more information on service lifetimes, see Dependency injection in ASP.NET Core.

### Add a singleton service

To facilitate the transition from a gRPC C-core implementation to ASP.NET Core, it's possible to change the service lifetime of the service implementation from scoped to singleton. This involves adding an instance of the service implementation to the DI container:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddGrpc();
    services.AddSingleton(new GreeterService());
}
```

However, a service implementation with a singleton lifetime is no longer able to resolve scoped services through constructor injection.

## Configure gRPC services options

In C-core-based apps, settings such as `grpc.max_receive_message_length` and `grpc.max_send_message_length` are configured with `ChannelOption` when constructing the Server instance.

In ASP.NET Core, gRPC provides configuration through the `GrpcServiceOptions` type. For example, a gRPC service's the maximum incoming message size can be configured via `AddGrpc`. The following example changes the default `MaxReceiveMessageSize` of 4 MB to 16 MB:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddGrpc(options =>
    {
        options.MaxReceiveMessageSize = 16 * 1024 * 1024; // 16 MB
    });
}
```

For more information on configuration, see gRPC for .NET configuration.

## Logging

C-core-based apps rely on the `GrpcEnvironment` to configure the logger for debugging purposes. The ASP.NET Core stack provides this functionality through the Logging API. For example, a logger can be added to the gRPC service.

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

For more information on gRPC logging and diagnostics, see Logging and diagnostics in gRPC on .NET.

## HTTPS

C-core-based apps configure HTTPS through the Server.Ports property. A similar concept is used to configure servers in ASP.NET Core. For example, Kestrel uses endpoint configuration for this functionality.

## gRPC Interceptors

ASP.NET Core middleware offers similar functionalities compared to interceptors in C-core-based gRPC apps. Both are supported by ASP.NET Core gRPC apps, so there's no need to rewrite interceptors.

For more information on how these features compare to each other, see gRPC Interceptors versus middleware.

## Host gRPC in non-ASP.NET Core projects

A C-core-based server can be added to any project type. gRPC for .NET server requires ASP.NET Core. ASP.NET Core is usually available because the project file specifies `Microsoft.NET.SDK.Web` as the SDK.

A gRPC server can be hosted to non-ASP.NET Core projects by adding `<FrameworkReference Include="Microsoft.AspNetCore.App" />` to a project. The framework reference makes ASP.NET Core APIs available and they can be used to start an ASP.NET Core server.

For more information, see Host gRPC in non-ASP.NET Core projects.

## Related content

* Overview for gRPC on .NET
* gRPC Services with C#
* gRPC services with ASP.NET Core
* Create a .NET gRPC client and server in ASP.NET Core
