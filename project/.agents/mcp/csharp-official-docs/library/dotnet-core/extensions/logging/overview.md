---
title: "Logging in C# (part 1 of 4)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/logging/overview.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Logging in C# and .NET

.NET supports high performance, structured logging via the `Microsoft.Extensions.Logging.ILogger` API to help monitor application behavior and diagnose issues. Configure different logging providers to write logs to different destinations. Basic <example-value> providers are built-in, and many third-party providers are available.

## Get started

This first example shows the basics, but it's only suitable for a trivial console app. This sample console app relies on the following NuGet packages:

- Microsoft.Extensions.Logging
- Microsoft.Extensions.Logging.Console

In the next section you see how to improve the code considering scale, performance, configuration, and typical programming patterns.

```csharp
﻿using Microsoft.Extensions.Logging;

using ILoggerFactory factory = LoggerFactory.Create(builder => builder.AddConsole());
ILogger logger = factory.CreateLogger("Program");
logger.LogInformation("Hello World! Logging is {Description}.", "fun");
```
The preceding example:

- Creates an `Microsoft.Extensions.Logging.ILoggerFactory`. The `ILoggerFactory` stores all the configuration that determines where log messages are sent. In this case, configure the console logging provider so that log messages are written to the console.
- Creates an `Microsoft.Extensions.Logging.ILogger` with a category named "Program". The category is a `string` that's associated with each message logged by the `ILogger` object. It groups log messages from the same class (or category) together when searching or filtering logs.
- Calls `Microsoft.Extensions.Logging.LoggerExtensions.LogInformation*` to log a message at the `Information` level. The log level indicates the severity of the logged event and filters out less important log messages. The log entry also includes a message template `"Hello World! Logging is {Description}."` and a key-value pair `Description = fun`. The key name (or placeholder) comes from the word inside the curly braces in the template, and the value comes from the remaining method argument.

This project file for this example includes two NuGet packages:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Logging" Version="10.0.13" />
    <PackageReference Include="Microsoft.Extensions.Logging.Console" Version="10.0.13" />
  </ItemGroup>

</Project>
```
> **Tip:**
> All of the logging example source code is available in the **Samples Browser** for download. For more information, see Browse code samples: Logging in .NET.

## Logging in a non-trivial app

Consider making these changes to the previous example when logging in a less trivial scenario:

- If your application uses Dependency Injection (DI) or a host such as ASP.NET's WebApplication or Generic Host, use `ILoggerFactory` and `ILogger` objects from their respective DI containers rather than creating them directly. For more information, see Integration with DI and Hosts.

- Compile-time source generation for logging is usually a better alternative to `ILogger` extension methods like `LogInformation`. Source-generated logging offers better performance and stronger typing, and avoids spreading `string` constants throughout your methods. The tradeoff is that using this technique requires a bit more code.

```csharp
﻿using Microsoft.Extensions.Logging;

internal partial class Program
{
    static void Main(string[] args)
    {
        using ILoggerFactory factory = LoggerFactory.Create(builder => builder.AddConsole());
        ILogger logger = factory.CreateLogger("Program");
        LogStartupMessage(logger, "fun");
    }

    [LoggerMessage(Level = LogLevel.Information, Message = "Hello World! Logging is {Description}.")]
    static partial void LogStartupMessage(ILogger logger, string description);
}
```
- The recommended practice for choosing a log category name is to use the fully qualified name of the class that's creating the log message. This helps relate log messages back to the code that produced them and offers a good level of control when filtering logs. Specify the class type in the type parameter of the `Microsoft.Extensions.Logging.LoggerFactoryExtensions.CreateLogger*` method.

```csharp
﻿using Microsoft.Extensions.Logging;

internal class Program
{
    static void Main(string[] args)
    {
        using ILoggerFactory factory = LoggerFactory.Create(builder => builder.AddConsole());
        ILogger logger = factory.CreateLogger<Program>();
        logger.LogInformation("Hello World! Logging is {Description}.", "fun");
    }
}
```
- If you don't use console logs as your sole production monitoring solution, add the logging providers you plan to use. For example, use OpenTelemetry to send logs over OTLP (OpenTelemetry protocol):

```csharp
﻿using Microsoft.Extensions.Logging;
using OpenTelemetry.Logs;

using ILoggerFactory factory = LoggerFactory.Create(builder =>
{
    builder.AddOpenTelemetry(logging =>
    {
        logging.AddOtlpExporter();
    });
});
ILogger logger = factory.CreateLogger("Program");
logger.LogInformation("Hello World! Logging is {Description}.", "fun");
```
## Integration with hosts and dependency injection

If your application uses Dependency Injection (DI) or a host such as ASP.NET's WebApplication or Generic Host, use `ILoggerFactory` and `ILogger` objects from the DI container rather than creating them directly.

### Get an ILogger from DI

This example gets an ILogger object in a hosted app using ASP.NET Minimal APIs:

```csharp
﻿var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ExampleHandler>();

var app = builder.Build();

var handler = app.Services.GetRequiredService<ExampleHandler>();
app.MapGet("/", handler.HandleRequest);

app.Run();

partial class ExampleHandler(ILogger<ExampleHandler> logger)
{
    public string HandleRequest()
    {
        LogHandleRequest(logger);
        return "Hello World";
    }

    [LoggerMessage(LogLevel.Information, "ExampleHandler.HandleRequest was called")]
    public static partial void LogHandleRequest(ILogger logger);
}
```
The preceding example:

- Created a singleton service called `ExampleHandler` and mapped incoming web requests to run the `ExampleHandler.HandleRequest` function.
- Line 12 defines a primary constructor for the ExampleHandler, a feature added in C# 12. Using the older style C# constructor works equally well but is a little more verbose.
- The constructor defines a parameter of type `ILogger<ExampleHandler>`. `Microsoft.Extensions.Logging.ILogger`1` derives from `Microsoft.Extensions.Logging.ILogger` and indicates which category the `ILogger` object has. The DI container locates an `ILogger` with the correct category and supplies it as the constructor argument. If no `ILogger` with that category exists yet, the DI container automatically creates it from the `ILoggerFactory` in the service provider.
- The `logger` parameter received in the constructor is used for logging in the `HandleRequest` function.

### Host-provided ILoggerFactory

Host builders initialize default configuration, then add a configured `ILoggerFactory` object to the host's DI container when the host is built. Before the host is built, adjust the logging configuration via `Microsoft.Extensions.Hosting.HostApplicationBuilder.Logging`, `Microsoft.AspNetCore.Builder.WebApplicationBuilder.Logging`, or similar APIs on other hosts. Hosts also apply logging configuration from default configuration sources like _appsettings.json_ and environment variables. For more information, see Configuration in .NET.

This example expands on the previous one to customize the `ILoggerFactory` provided by `WebApplicationBuilder`. It adds OpenTelemetry as a logging provider transmitting the logs over OTLP (OpenTelemetry protocol):

```csharp
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Logging.AddOpenTelemetry(logging => logging.AddOtlpExporter());
builder.Services.AddSingleton<ExampleHandler>();
WebApplication app = builder.Build();
```
### Create an ILoggerFactory with DI

If you're using a DI container without a host, use `Microsoft.Extensions.DependencyInjection.LoggingServiceCollectionExtensions.AddLogging*` to configure and add `ILoggerFactory` to the container.

```csharp
﻿using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

// Add services to the container including logging
var services = new ServiceCollection();
services.AddLogging(builder => builder.AddConsole());
services.AddSingleton<ExampleService>();
IServiceProvider serviceProvider = services.BuildServiceProvider();

// Get the ExampleService object from the container
ExampleService service = serviceProvider.GetRequiredService<ExampleService>();

// Do some pretend work
service.DoSomeWork(10, 20);

class ExampleService(ILogger<ExampleService> logger)
{
    public void DoSomeWork(int x, int y)
    {
        logger.LogInformation("DoSomeWork was called. x={X}, y={Y}", x, y);
    }
}
```
The preceding example:

- Created a DI service container containing an `ILoggerFactory` configured to write to the console
- Added a singleton `ExampleService` to the container
- Created an instance of the `ExampleService` from the DI container, which also automatically created an `ILogger<ExampleService>` to use as the constructor argument.
- Invoked `ExampleService.DoSomeWork`, which used the `ILogger<ExampleService>` to log a message to the console.
