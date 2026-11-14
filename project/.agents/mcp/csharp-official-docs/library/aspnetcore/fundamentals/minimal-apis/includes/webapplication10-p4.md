---
title: "webapplication10 (part 4 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/minimal-apis/includes/webapplication10.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# webapplication10 (part 4 of 4)

## `WebApplicationBuilder`

This section contains sample code using `Microsoft.AspNetCore.Builder.WebApplicationBuilder`.

### Change the content root, application name, and environment

The following code sets the content root, application name, and environment:

```csharp
var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    ApplicationName = typeof(Program).Assembly.FullName,
    ContentRootPath = Directory.GetCurrentDirectory(),
    EnvironmentName = Environments.Staging,
    WebRootPath = "customwwwroot"
});

Console.WriteLine($"Application Name: {builder.Environment.ApplicationName}");
Console.WriteLine($"Environment Name: {builder.Environment.EnvironmentName}");
Console.WriteLine($"ContentRoot Path: {builder.Environment.ContentRootPath}");
Console.WriteLine($"WebRootPath: {builder.Environment.WebRootPath}");

var app = builder.Build();
```

`Microsoft.AspNetCore.Builder.WebApplication.Create*` initializes a new instance of the `Microsoft.AspNetCore.Builder.WebApplication` class with preconfigured defaults.

For more information, see ASP.NET Core fundamentals overview

### Change the content root, app name, and environment by using environment variables or command line

The following table shows the environment variable and command-line argument used to change the content root, app name, and environment.

| Feature | Environment variable | Command-line argument |
| --- | --- | --- |
| Application name | `ASPNETCORE_APPLICATIONNAME` | `--applicationName` |
| Environment name | `ASPNETCORE_ENVIRONMENT` | `--environment` |
| Content root  | `ASPNETCORE_CONTENTROOT` | `--contentRoot` |

### Add configuration providers

The following sample adds the INI configuration provider:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddIniFile("appsettings.ini");

var app = builder.Build();
```

For detailed information, see File configuration providers in Configuration in ASP.NET Core.

### Read configuration

By default the `Microsoft.AspNetCore.Builder.WebApplicationBuilder` reads configuration from multiple sources, including:

* `appSettings.json` and `appSettings.{environment}.json`
* Environment variables
* The command line

For a complete list of configuration sources read, see Default configuration in Configuration in ASP.NET Core.

The following code reads `HelloKey` from configuration and displays the value at the `/` endpoint. If the configuration value is null, "Hello" is assigned to `message`:

```csharp
var builder = WebApplication.CreateBuilder(args);

var message = builder.Configuration["HelloKey"] ?? "Hello";

var app = builder.Build();

app.MapGet("/", () => message);

app.Run();
```

### Read the environment

```csharp
var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    Console.WriteLine($"Running in development.");
}

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Add logging providers

```csharp
var builder = WebApplication.CreateBuilder(args);

// Configure JSON logging to the console.
builder.Logging.AddJsonConsole();

var app = builder.Build();

app.MapGet("/", () => "Hello JSON console!");

app.Run();
```

### Add services

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add the memory cache services.
builder.Services.AddMemoryCache();

// Add a custom scoped service.
builder.Services.AddScoped<ITodoRepository, TodoRepository>();
var app = builder.Build();
```

### Customize the `IHostBuilder`

Existing extension methods on `Microsoft.Extensions.Hosting.IHostBuilder` can be accessed using the Host property:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Wait 30 seconds for graceful shutdown.
builder.Host.ConfigureHostOptions(o => o.ShutdownTimeout = TimeSpan.FromSeconds(30));

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Customize the `IWebHostBuilder`

Extension methods on `Microsoft.AspNetCore.Hosting.IWebHostBuilder` can be accessed using the `Microsoft.AspNetCore.Builder.WebApplicationBuilder.WebHost` property.

```csharp
var builder = WebApplication.CreateBuilder(args);

// Change the HTTP server implemenation to be HTTP.sys based
builder.WebHost.UseHttpSys();

var app = builder.Build();

app.MapGet("/", () => "Hello HTTP.sys");

app.Run();
```

### Change the web root

By default, the web root is relative to the content root in the `wwwroot` folder. Web root is where the static file middleware looks for static files. Web root can be changed with `WebHostOptions`, the command line, or with the `Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseWebRoot*` method:

```csharp
var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    // Look for static files in webroot
    WebRootPath = "webroot"
});

var app = builder.Build();

app.Run();
```

### Custom dependency injection (DI) container

The following example uses Autofac:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

// Register services directly with Autofac here. Don't
// call builder.Populate(), that happens in AutofacServiceProviderFactory.
builder.Host.ConfigureContainer<ContainerBuilder>(builder => builder.RegisterModule(new MyApplicationModule()));

var app = builder.Build();
```

### Add middleware

Any existing ASP.NET Core middleware can be configured on the `WebApplication`:

```csharp
var app = WebApplication.Create(args);

// Setup the file server to serve static files.
app.UseFileServer();

app.MapGet("/", () => "Hello World!");

app.Run();
```

For more information, see ASP.NET Core middleware.

### Developer exception page

`Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder*` initializes a new instance of the `Microsoft.AspNetCore.Builder.WebApplicationBuilder` class with preconfigured defaults. The developer exception page is enabled in the  preconfigured defaults. When the following code is run in the development environment, navigating to `/` renders a friendly page that shows the exception.

```csharp
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/", () =>
{
    throw new InvalidOperationException("Oops, the '/' route has thrown an exception.");
});

app.Run();
```
