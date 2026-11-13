---
title: "App startup in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/startup.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# App startup in ASP.NET Core

-->
-->

This article describes how ASP.NET Core apps start up and how to configure services and the app's request pipeline.

For Blazor startup guidance, which adds to or supersedes the guidance in this article, see ASP.NET Core Blazor startup.

## The `Program` file

ASP.NET Core apps initialize and configure startup in the app's `Program` file (`Program.cs`).

The first part of the `Program` file focuses on building the app. This phase utilizes `Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder*` to initialize a new instance of the `Microsoft.AspNetCore.Builder.WebApplicationBuilder` class with preconfigured defaults before the app is started. The ASP.NET Core project templates assign the web application builder to a variable named `builder`:

```csharp
var builder = WebApplication.CreateBuilder(args);
```

Properties of the web application builder include:

* `builder.Configuration` is a `Microsoft.Extensions.Configuration.IConfigurationBuilder` and `Microsoft.Extensions.Configuration.IConfigurationRoot` for managing configuration sources and providers. For more information, see Configuration in ASP.NET Core.
* `builder.Environment` is an `Microsoft.AspNetCore.Hosting.IWebHostEnvironment` that provides information about the app's web hosting environment. For more information, see ASP.NET Core runtime environments.
* `builder.Host` is an `Microsoft.Extensions.Hosting.IHostBuilder` for configuring host-specific properties. For more information, see .NET Generic Host in ASP.NET Core.
* `builder.Logging` is an `Microsoft.Extensions.Logging.ILoggingBuilder` with extension methods that add and manage logging providers. For more information, see Logging in .NET and ASP.NET Core.
* `builder.Metrics` (.NET 8 or later) allows enabling metrics and directing their output. For more information, see ASP.NET Core metrics.
* `builder.Services` is a collection of dependency injection (DI) services (`Microsoft.Extensions.DependencyInjection.IServiceCollection`) for the app to compose for Inversion of Control (IoC). For more information, see Dependency injection in ASP.NET Core.
* `builder.WebHost` is an `Microsoft.AspNetCore.Hosting.IWebHostBuilder` for configuring server specific properties.

The app is built by calling `Microsoft.AspNetCore.Builder.WebApplicationBuilder.Build*`, which returns the built `Microsoft.AspNetCore.Builder.WebApplication`. The ASP.NET Core project templates assign the built web application to a variable named `app`:

```csharp
var app = builder.Build();
```

The next part of the `Program` file focuses on establishing the HTTP request handling pipeline as a series of middleware components. Each middleware performs operations on an `HttpContext` and either invokes the next middleware in the pipeline or terminates the request. By convention, middleware components are added to the pipeline by invoking an extension method that starts with "`Use`." For more information, see ASP.NET Core middleware.

The `Microsoft.AspNetCore.Builder.WebApplication.Run*` method starts the app and blocks the calling thread until the host is shut down:

```csharp
app.Run();
```

When `Microsoft.AspNetCore.Builder.WebApplication.Run*` executes, the app transitions to an active, running process:

1. Hosted services start.

   The host loops through all registered hosted services (`Microsoft.Extensions.Hosting.IHostedService` instances) and calls their `Microsoft.Extensions.Hosting.IHostedService.StartAsync*` methods. Unless the app opts into concurrent hosted service startup (.NET 8 or later), hosted services start sequentially in the order of their DI container registrations. For more information, see Background tasks with hosted services in ASP.NET Core.

1. The middleware pipeline is built.

   When `builder.Build` is called, dependencies are resolved, but the actual processing pipeline isn't completely set. When `app.Run` executes, the framework finalizes the HTTP middleware pipeline. The declared middleware methods and endpoint mappings are compiled into a single, high-performance execution delegate sequence. For more information, see ASP.NET Core middleware.

1. The web server (Kestrel by default) is started.

   The host looks inside its dependency container, locates the registered server implementation (usually Kestrel), and triggers its startup cycle. Kestrel then:

   * Looks up the defined hosting URLs and ports from configuration, environment variables, or command-line arguments.
   * Opens and allocates physical network sockets.
   * Binds ports and begins listening for incoming traffic.

   For more information, see .NET Generic Host in ASP.NET Core, Web server implementations in ASP.NET Core, and Kestrel web server in ASP.NET Core.

1. Application started lifetime events are triggered.

   The `Microsoft.Extensions.Hosting.IHostApplicationLifetime` service fires its `Microsoft.Extensions.Hosting.IHostApplicationLifetime.ApplicationStarted` token, which invokes callbacks registered on the token. Any callbacks, database seeders, or other custom event listeners that are wired up to wait for the token to fire are triggered to start processing.

1. The main execution thread is blocked while the app runs.

   `Microsoft.AspNetCore.Builder.WebApplication.Run*` (`app.Run()`) synchronously waits until shutdown.

1. The app is ready to process requests.

   At this point, the command shell logs hosting diagnostics:

   ```text
   info: Microsoft.Hosting.Lifetime[14]
         Now listening on: https://localhost:7123
   info: Microsoft.Hosting.Lifetime[14]
         Now listening on: http://localhost:5123
   info: Microsoft.Hosting.Lifetime[0]
         Application started. Press Ctrl+C to shut down.
   ```

  The app remains in this state indefinitely, passing incoming web traffic down the middleware pipeline and sending responses.

When shutdown is signaled, for example when `Ctrl`+`c` is detected in the command shell running the app or a container orchestration tool sends a SIGTERM event, `Microsoft.AspNetCore.Builder.WebApplication.Run*` unblocks and the following actions take place:

1. `Microsoft.Extensions.Hosting.IHostApplicationLifetime.ApplicationStopping` tokens are triggered, which allows the app to run logic before the shutdown process begins.

1. The Kestrel server is shut down, which disables new connections. The server waits for requests on existing connections to complete for as long as the shutdown timeout allows. The server sends the connection close header for further requests on existing connections.

1. The host shuts down registered hosted services. Unless the app opts into stopping hosted services concurrently (.NET 8 or later), hosted services stop sequentially in the reverse order of their DI container registrations. For more information, see Background tasks with hosted services in ASP.NET Core.

1. `Microsoft.Extensions.Hosting.IHostApplicationLifetime.ApplicationStopped` event handlers are triggered, which allows the app to run logic after the app has shut down.

1. Console execution gracefully exits with an exit code of 0.

## Startup filters

While an app typically creates an explicit middleware execution pipeline, a startup filter (`Microsoft.AspNetCore.Hosting.IStartupFilter`) is useful for:

* Creating a shared library/NuGet package that automatically loads custom middleware without requiring the app to explicitly call the middleware's "`Use`" method. For example, the library's consumer isn't required to make an `app.UseImageProcessingMiddleware` call for an image-processing middleware in the app's request processing pipeline.
* Guaranteeing a piece of middleware executes before or after other middleware, regardless of how a developer modifies the app's request processing pipeline.

A startup filter implementation provides an `Microsoft.AspNetCore.Hosting.IStartupFilter.Configure*` method that receives and returns an `Action<IApplicationBuilder>`. The `Microsoft.AspNetCore.Builder.IApplicationBuilder` interface is used to configure the app's request pipeline. For more information, see Create a middleware pipeline with `IApplicationBuilder`.

Each startup filter implementation can add one or more middlewares to the request pipeline. The filters are invoked in the order they're added to the service container. Filters can add middleware before or after passing control to the next filter, thus they append to the beginning or end of the pipeline.

The following example demonstrates how to register a middleware with `Microsoft.AspNetCore.Hosting.IStartupFilter`. The `CustomResponseHeaderFilter` startup filter uses middleware to append a custom header (`X-Custom-Header`) to all of the app's responses before other middlewares execute.

`CustomResponseHeaderFilter.cs`:

```csharp
using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

public class CustomResponseHeaderFilter : IStartupFilter
{
    public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next)
    {
        return builder =>
        {
            // 1. Add middleware that runs BEFORE subsequent middlewares
            builder.Use(async (context, nextMiddleware) =>
            {
                context.Response.Headers.Append("X-Custom-Header", "VALUE");
                await nextMiddleware();
            });

            // 2. Call the rest of the application's configuration pipeline
            next(builder);

            // 3. (Optional) Add middleware that runs AFTER the rest of the pipeline
        };
    }
}
```

The startup filter implementation is registered in the `Program` file:

```csharp
builder.Services.AddTransient<IStartupFilter, CustomResponseHeaderFilter>();
```

Middleware execution order is set by the order of startup filter registrations:

* Multiple implementations might interact with the same objects. If ordering is important, order their service registrations to match the order that their middlewares should run.
* Libraries can add middleware with one or more implementations that run before or after other app middleware registered with `Microsoft.AspNetCore.Hosting.IStartupFilter`. To invoke a startup filter middleware before a middleware added by a library's startup filter:
  * Position the startup filter service registration before the library is added to the service container.
  * To invoke afterward, position the service registration after the library is added.

> **Note:**
> You can't extend the ASP.NET Core app with startup filters when you override the `Configure` delegate. For more information, see WebApplicationFactory Client returns NotFound for all requests with Overriding Configure method (`dotnet/aspnetcore` #45372).

## Add configuration at startup from an external assembly

An `Microsoft.AspNetCore.Hosting.IHostingStartup` implementation allows adding enhancements to an app at startup from an external assembly outside of the app's `Program` file or `Startup` class. For more information, see Use hosting startup assemblies in ASP.NET Core.

## The `Startup` class (`ConfigureServices` and `Configure` methods)

*Although supported in ASP.NET Core apps that target .NET 6 or later, using a `Startup` class isn't recommended. For more information, see Migrate from ASP.NET Core in .NET 5 to .NET 6.*

For information on using the `Microsoft.AspNetCore.Hosting.StartupBase.ConfigureServices*` and `Microsoft.AspNetCore.Hosting.StartupBase.Configure*` methods with the minimal hosting model, see the following:

* Use a `Startup` class with the minimal hosting model
* The `Startup` class (.NET 5 version of this article)

## Measure startup performance

The ASP.NET Core hosting `System.Diagnostics.Tracing.EventSource` emits the `ServerReady` event, which represents the point where the server is ready to respond to requests and can be used to measure startup time. For more information, see Logging in .NET and ASP.NET Core.

## Related content

* Host guidance
* Startup exception handling
