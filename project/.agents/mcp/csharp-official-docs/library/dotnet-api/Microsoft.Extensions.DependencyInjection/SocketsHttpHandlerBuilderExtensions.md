---
title: "SocketsHttpHandlerBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/SocketsHttpHandlerBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketsHttpHandlerBuilderExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class SocketsHttpHandlerBuilderExtensions
```

Extension methods to configure `SocketsHttpHandler` for a named
`HttpClient` instances returned by `IHttpClientFactory`.

To be added.

## SocketsHttpHandlerBuilderExtensions.Configure(ISocketsHttpHandlerBuilder, IConfiguration) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ISocketsHttpHandlerBuilder Configure (this Microsoft.Extensions.DependencyInjection.ISocketsHttpHandlerBuilder builder, Microsoft.Extensions.Configuration.IConfiguration configuration);
```

Uses `IConfiguration` to configure the primary `SocketsHttpHandler` for a
named `HttpClient`.

Parameters:

- `builder`: The `ISocketsHttpHandlerBuilder`.
- `configuration`: Configuration containing properties of `SocketsHttpHandler`.

Returns: An `ISocketsHttpHandlerBuilder` that can be used to configure the handler.

Only simple (of type `bool`, `int`, `Enum` or `TimeSpan`) properties of `SocketsHttpHandler` will be parsed.

All unmatched properties in `IConfiguration` will be ignored.

## SocketsHttpHandlerBuilderExtensions.Configure(ISocketsHttpHandlerBuilder, IServiceProvider>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ISocketsHttpHandlerBuilder Configure (this Microsoft.Extensions.DependencyInjection.ISocketsHttpHandlerBuilder builder, Action<System.Net.Http.SocketsHttpHandler,IServiceProvider> configure);
```

Adds a delegate that will be used to configure the primary `SocketsHttpHandler` for a
named `HttpClient`.

Parameters:

- `builder`: The `ISocketsHttpHandlerBuilder`.
- `configure`: A delegate that is used to modify a `SocketsHttpHandler`.

Returns: An `ISocketsHttpHandlerBuilder` that can be used to configure the handler.

To be added.
