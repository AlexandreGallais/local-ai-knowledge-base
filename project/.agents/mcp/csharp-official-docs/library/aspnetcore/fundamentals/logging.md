---
title: "Logging in .NET and ASP.NET Core (part 1 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/logging/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Logging in .NET and ASP.NET Core

This article describes logging in ASP.NET Core apps. For general guidance on logging in .NET, see Logging in C# and .NET. For Blazor logging guidance, which adds to or supersedes this guidance, see ASP.NET Core Blazor logging.

## Logging providers

ASP.NET Core supports high performance, structured logging via the `Microsoft.Extensions.Logging.ILogger` API to help you monitor app behavior and diagnose problems. Logs are written to different destinations by configuring *logging providers*. A set of logging providers are built into the framework, and there are many third-party providers available. Multiple providers can be enabled in an app.

Most logging providers write log messages to a data storage system. For example, the Azure Application Insights logging provider stores logs in Azure Application Insights. One provider, the `Console` provider, only displays log messages. The `Console` provider is useful when running an app locally for monitoring and debugging in real time.

Apps created from an ASP.NET Core web app project template call `Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder*` in the app's `Program` file, which adds the following default logging providers:

* `Console`
* `Debug`
* `EventSource`
* Windows `EventLog`

```csharp
var builder = WebApplication.CreateBuilder(args);
```

To override the default logging providers, call `Microsoft.Extensions.Logging.LoggingBuilderExtensions.ClearProviders*` on `Microsoft.AspNetCore.Builder.WebApplicationBuilder.Logging` and use logging provider extension methods to add logging providers. The following example only sets up the `Console` logging provider:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
```

Alternatively, the preceding code can be written as follows with `Microsoft.Extensions.Logging.ILoggingBuilder` of `Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.ConfigureLogging*`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Host.ConfigureLogging(logging =>
{
    logging.ClearProviders();
    logging.AddConsole();
});
```

Additional providers are covered in the Built-in logging providers and Third-party logging providers sections.

## Logging output

Logs created by the default logging providers are displayed:

* In Visual Studio
  * In the **Debug** output window when debugging.
  * In the **ASP.NET Core Web Server** window.
* In the command shell when the app is run with the `dotnet run` command.

.NET in general and ASP.NET Core use the same logging API and providers. More information can be found in Logging in C# and .NET, which covers general logging scenarios for C# and .NET. This article focuses on ASP.NET Core app logging.

## Create log messages

To create log messages, use an `Microsoft.Extensions.Logging.ILogger`1` object from dependency injection (DI).

The following examples:

* Create an `Microsoft.Extensions.Logging.ILogger` that specifies a log *category* based on the fully qualified name of the type. The log category is a string that is associated with each log, which is useful for identifying, sorting, and filtering log messages. More information on log categories is provided later in this article.
* Calls `Microsoft.Extensions.Logging.LoggerExtensions.LogInformation*` to log at the `Microsoft.Extensions.Logging.LogLevel.Information` level. The log *level* indicates the severity of the logged event. More information on log levels is provided later in this article.

In the following counter page (`Counter` Razor component) in a Blazor app, an `ILogger<Counter>` is injected with the `@inject` directive. The logger instance (`Logger`) is used to log information when the `IncrementCount` method is called.

`Pages/Counter.razor`:

```razor
@page "/counter"
@inject ILogger<Counter> Logger

<h1>Counter</h1>

<p>Current count: @currentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        Logger.LogInformation("Someone incremented the counter!");

        currentCount++;
    }
}
```

Log message:

> :::no-loc text="BlazorSample.Components.Pages.Counter: Information: Someone incremented the counter!":::

The log category is `BlazorSample.Components.Pages.Counter`, and the log level (severity) is `Information`. The message is `Someone incremented the counter!`.

In the following Razor Pages privacy page class file, an `ILogger<PrivacyModel>` is injected into the class's constructor to log when the page is visited. Note in this example that the message is a *template* that takes the current UTC date and time (`DateTime.UtcNow`) and writes it into the log message. Log message templates are covered in the Log message template section later in this article.

`Pages/Privacy.cshtml.cs`:

```csharp
public class PrivacyModel(ILogger<PrivacyModel> logger) : PageModel
{
    public void OnGet() => logger.LogInformation("Privacy page visited at {DT}", 
        DateTime.UtcNow);
}
```

## Log message template

The log message template can contain placeholders for provided arguments. Use names for the placeholders, not numbers.

In the following examples, `{Id}` is an identifier placeholder for an item ID, and `id` is the identifier parameter.

```csharp
Logger.LogInformation(LogEvent.GetItem, "Getting item {Id}", id);
```

```csharp
Logger.LogWarning(LogEvent.GetItemNotFound, "Get({Id}) NOT FOUND", id);
```

The *order of the parameters*, not their placeholder names, determines which parameters are used to provide placeholder values in log messages. In the following code, the parameter names are out of sequence in the placeholders of the message template:

```csharp
var apples = 1;
var pears = 2;
var bananas = 3;

Logger.LogInformation("{Pears}, {Bananas}, {Apples}", apples, pears, bananas);
```

However, the parameters are assigned to the placeholders in the order: `apples`, `pears`, `bananas`. The log message reflects the *order of the parameters*:

```text
1, 2, 3
```

This approach allows logging providers to implement semantic or structured logging. The arguments themselves are passed to the logging system, not just the formatted message template. This enables logging providers to store the parameter values as fields. For example, consider the following logger method:

```csharp
Logger.LogInformation("Getting item {Id} at {RequestTime}", id, DateTime.Now);
```

When logging to Azure Table Storage:

* Each Azure Table entity can have `ID` and `RequestTime` properties.
* Tables with properties simplify queries on logged data. For example, a query can find all logs within a particular `RequestTime` range without having to parse the time out of the text message.

## Log at app startup

The following example calls `Microsoft.AspNetCore.Builder.WebApplication.Logger` in the `Program` file to log informational messages:

```csharp
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.Logger.LogInformation("Adding Routes");

app.MapGet("/", () => "Hello World!");

app.Logger.LogInformation("Starting the app");

app.Run();
```

The following example calls `Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddConsole*` and logs at the `/Test` endpoint:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Logging.AddConsole();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGet("/Test", async (ILogger<Program> logger, HttpResponse response) =>
{
    logger.LogInformation("'Test' logging in the Program file");
    await response.WriteAsync("Testing");
});

app.Run();
```

The following example calls `Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddSimpleConsole*`, disables color output with a console formatter option, and logs at the `/Test` endpoint:

```csharp
using Microsoft.Extensions.Logging.Console;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.AddSimpleConsole(
    option => option.ColorBehavior = LoggerColorBehavior.Disabled);

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGet("/Test", async (ILogger<Program> logger, HttpResponse response) =>
{
    logger.LogInformation("'Test' logging in the Program file");
    await response.WriteAsync("Testing");
});

app.Run();
```
