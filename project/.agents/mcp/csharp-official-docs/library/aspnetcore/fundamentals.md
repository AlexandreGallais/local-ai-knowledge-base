---
title: "ASP.NET Core fundamentals overview (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core fundamentals overview

This article provides an overview of the fundamentals for building ASP.NET Core apps, including dependency injection (DI), configuration, and middleware.

For Blazor fundamentals guidance, which adds to or supersedes the guidance in this article, see ASP.NET Core Blazor fundamentals.

## The `Program` file

ASP.NET Core apps created from the framework's project templates contain startup code in the `Program` file (`Program.cs`). The `Program` file is where:

* Services required by the app are configured.
* The app's request handling pipeline is defined as a series of middleware components.

The following app startup code supports two app types:

* Blazor Web Apps
* Minimal APIs

```csharp
// Initialize a new instance of the WebApplicationBuilder class 
// with preconfigured defaults
var builder = WebApplication.CreateBuilder(args);

// Add services for Blazor (Razor components)
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

// Build the app
var app = builder.Build();

// Use exception-handling middleware and HSTS middleware
// when in the Development environment
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseStatusCodePagesWithReExecute("/not-found", createScopeForStatusCodePages: true);

// Use HTTPS redirection middleware to automatically
// redirect requests from HTTP to HTTPS
app.UseHttpsRedirection();

// Map static assets endpoints
app.MapStaticAssets();

// Map a Minimal API endpoint for requests to '/hi'
app.MapGet("/hi", () => "Hello!");

// Add endpoints for Blazor
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

// Run the app
app.Run();
```

> **Note:**
> With additional configuration in the `Program` file, ASP.NET Core apps can support Razor Pages, MVC, and web API with controllers.

For more information, see App startup in ASP.NET Core and ASP.NET Core Blazor startup.

## Dependency injection (services)

ASP.NET Core features built-in dependency injection (DI) that makes configured services available throughout an app for Inversion of Control (IoC).

When the `Microsoft.AspNetCore.Builder.WebApplicationBuilder` is instantiated by calling `Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder*`, framework-provided services are automatically added, such as services for configuration and logging:

```csharp
var builder = WebApplication.CreateBuilder(args);
```

Additional services are added to the DI container with `Microsoft.AspNetCore.Builder.WebApplicationBuilder.Services`. The following example registers Blazor services:

```csharp
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
```

The DI framework provides instances of requested services at run time. In Blazor apps, services are often resolved from DI at run time using the `@inject` directive in a Razor component file (`.razor`). In the following example, the component uses the `Microsoft.AspNetCore.Components.NavigationManager` abstraction to get an instance of the navigation manager, which is used for querying and managing URI navigation, to navigate the user to a page of products at `/products` when the button is selected:

```razor
@inject NavigationManager Navigation

<button @onclick="NavigateToProductList">
    Products
</button>

@code {
    private void NavigateToProductList()
    {
        Navigation.NavigateTo("/products");
    }
}
```

Another way to resolve a service from DI is using constructor injection. In the following example, the primary constructor (C# 12 or later) takes parameters of the types `AppDbContext` and `ILogger<OrderProcessor>` and resolves them at run time into the `context` and `logger` variables (the instances of the database and logging abstractions). The database context instance is used to process all of the orders where the `IsProcessed` field is `false` in the database, and each processed order is logged as information with its order ID (`OrderId`) using the logger instance:

```csharp
public class OrderProcessor(AppDbContext context, ILogger<OrderProcessor> logger)
{
    public async Task ProcessPendingOrdersAsync()
    {
        var orders = await context.Orders
            .Where(o => !o.IsProcessed)
            .ToListAsync();

        foreach (var order in orders)
        {
            order.IsProcessed = true;
            logger.LogInformation("Processed order ID {OrderId}.", order.Id);
        }

        await context.SaveChangesAsync();
    }
}
```

You can also inject dependencies directly into the lambda parameters of Minimal API endpoints. In the following example, a list of todo items is returned from the `/todos` endpoint. A logger instance for `ILogger<Program>` logs information, and the database instance for `AppDbContext` is used to obtain the list of todo items from the database to include in the response:

```csharp
app.MapGet("/todos", async (AppDbContext context, ILogger<Program> logger) =>
{
    logger.LogInformation("Fetching todos using inline handler injection.");
    var todos = await context.Todos.ToListAsync();

    return Results.Ok(todos);
});
```

If the built-in DI container doesn't meet your needs, a third-party IoC container can be used instead.

For more information, see Dependency injection in ASP.NET Core and ASP.NET Core Blazor dependency injection.

## Environments

Execution environments are available in ASP.NET Core, such as:

* `Development`: When the app is in local development.
* `Staging`: When the app is staged for deployment.
* `Production`: When the live app is running for users.

Specify the environment an app is running in by setting the `ASPNETCORE_ENVIRONMENT` environment variable on the host where the app is running. ASP.NET Core reads the environment variable at app startup and stores the value to control code execution around the app.

Developer code can check for a given environment. In the following `Program` file example, the code in the execution block only runs when the app isn't running in the `Development` environment:

```csharp
if (!app.Environment.IsDevelopment())
{
    ...
}
```

For more information, see ASP.NET Core runtime environments and ASP.NET Core Blazor environments.

## Middleware

The request handling pipeline is composed as a series of middleware components. Each component performs operations on an `HttpContext` and either invokes the next middleware in the pipeline or terminates the request.

By convention, middleware components are added to the pipeline by invoking an extension method that starts with "`Use`." In the following example representing part of a request processing pipeline, middleware for exception handling (`Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler*`), HTTP Strict Transport Security (HSTS) protocol (`Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts*`), and HTTPS redirection (`Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection*`) are called. Two of the middlewares are only triggered when the app isn't under local development in the `Development` environment, such as when the app is staged for deployment (the `Staging` environment) or in production (the `Production` environment):

```csharp
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}

app.UseHttpsRedirection();
```

ASP.NET Core includes a rich set of built-in middleware. You can also create custom middleware components to meet an app's special request processing specifications. For more information, see ASP.NET Core middleware.

## Host

On startup, an ASP.NET Core app builds a *host*. The host encapsulates all of the app's resources, such as:

* An HTTP server implementation
* Middleware components
* Logging
* Dependency injection (DI) services
* Configuration

There are three different hosts capable of running an ASP.NET Core app:

* ASP.NET Core WebApplication (also known as the Minimal Host)
* .NET Generic Host
* ASP.NET Core WebHost

The ASP.NET Core `Microsoft.AspNetCore.Builder.WebApplication` and `Microsoft.AspNetCore.Builder.WebApplicationBuilder` types are recommended and are used in all of the ASP.NET Core project templates. `WebApplication` behaves similarly to the .NET Generic Host and exposes many of the same interfaces but requires fewer callbacks to configure. The ASP.NET Core `Microsoft.AspNetCore.WebHost` is only available for backward compatibility.

The following example instantiates a `Microsoft.AspNetCore.Builder.WebApplication` and assigns it to a variable named `app`:

```csharp
var builder = WebApplication.CreateBuilder(args);

...

var app = builder.Build();
```

The `Microsoft.AspNetCore.Builder.WebApplicationBuilder.Build*` method configures a host with a set of default options, such as:

* Using Kestrel as the web server and enabling IIS integration.
* Loading configuration from app settings files (for example, `appsettings.json`), environment variables, command line arguments, and other configuration sources.
* Setting up logging and directing logging output to the console and debug logging providers.

For more information, see the following resources:

* .NET Generic Host in ASP.NET Core (*Recommended*)
* ASP.NET Core Web Host (*For backwards compatibility*)

### Non-web scenarios

The Generic Host enables other types of apps to use cross-cutting framework extensions, such as logging, dependency injection (DI), configuration, and app lifetime management. For more information, see .NET Generic Host in ASP.NET Core and Background tasks with hosted services in ASP.NET Core.

## Servers

An ASP.NET Core app uses an HTTP server implementation to listen for HTTP requests. The server surfaces requests to the app as a set of request features composed into an `Microsoft.AspNetCore.Http.HttpContext`.

For more information, see Web server implementations in ASP.NET Core.

### Windows

ASP.NET Core provides the following server implementations:

* *Kestrel* is a cross-platform web server. Kestrel is often run in a reverse proxy configuration using IIS. In ASP.NET Core 2.0 or later, Kestrel can be run as a public-facing edge server exposed directly to the Internet.
* *IIS HTTP Server* is a server for Windows that uses IIS. With this server, the ASP.NET Core app and IIS run in the same process.
* *HTTP.sys* is a server for Windows that isn't used with IIS.

### macOS and Linux

ASP.NET Core provides the *Kestrel* cross-platform server implementation. In ASP.NET Core 2.0 or later, Kestrel can run as a public-facing edge server exposed directly to the Internet. Kestrel is often run in a reverse proxy configuration with Nginx or Apache.

## Configuration

ASP.NET Core provides a configuration framework that obtains settings as name-value pairs from an ordered set of configuration providers. Built-in configuration providers are available for a variety of sources, such as JSON files (`.json`), XML files (`.xml`), environment variables, and command-line arguments. You can create custom configuration providers to support other sources.

By default, ASP.NET Core apps are configured to read from app settings files (for example, `appsettings.json`), environment variables, and the command line.

When the app's configuration is loaded, values from environment variables override values from app settings files. The Options API is available for reading related configuration values.

For managing confidential configuration data such as passwords in the `Development` environment, .NET provides the Secret Manager. For production secrets, we recommend using Azure Key Vault.

For more information, see the following resources:

* Configuration in ASP.NET Core
* ASP.NET Core Blazor configuration
* Azure Key Vault (ASP.NET Core documentation)

## Logging

ASP.NET Core supports a logging API that works with a variety of logging providers:

* Console
* Debug
* Event Tracing on Windows
* Windows Event Log
* TraceSource
* Azure App Service
* Azure Application Insights
* Third-party providers

To create logs, resolve an `Microsoft.Extensions.Logging.ILogger`1` service from dependency injection (DI) and call logging methods, such as `Microsoft.Extensions.Logging.LoggerExtensions.LogInformation*`. A logger object and a console provider for the logger object are stored in the DI container automatically when the `Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder*` method is called.

The following example shows how to obtain a logging instance from DI and use it in a `Weather` component (`Weather.razor`) of a Blazor app that reports weather data:

```razor
@inject ILogger<Weather> Logger

...

@code {
    protected override async Task OnInitializedAsync()
    {
        Logger.LogInformation("OnInitializedAsync method called!");

        ...
    }
}
```

For more information, including routing guidance for Razor Pages and MVC apps, see Logging in .NET and ASP.NET Core and ASP.NET Core Blazor logging.

## Routing

Routing in ASP.NET Core is a mechanism that maps incoming requests to specific endpoints in an app. It enables you to define URL patterns that correspond to different components, such as Razor components, Razor pages, MVC controller actions, or middleware.

The `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*` method adds routing middleware to the request pipeline. This middleware processes the routing information and determines the appropriate endpoint for each request. In apps using the Minimal Host, `UseRouting` isn't explicitly called in developer code unless you want to change middleware processing order.

For more information, see the following resources:

* Routing in ASP.NET Core
* ASP.NET Core Blazor routing
* ASP.NET Core Blazor navigation

## Handle errors

ASP.NET Core has built-in features for handling errors, such as:

* A developer exception page
* Custom error pages
* Static status code pages
* Startup exception handling

For more information, see Handle errors in ASP.NET Core and Handle errors in ASP.NET Core Blazor apps.
