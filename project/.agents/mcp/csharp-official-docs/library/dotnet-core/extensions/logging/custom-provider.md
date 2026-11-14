---
title: "Implement a custom logging provider"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/logging/custom-provider.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Implement a custom logging provider in .NET

There are many logging providers available for common logging needs. But you might need to implement a custom `Microsoft.Extensions.Logging.ILoggerProvider` when one of the available providers doesn't suit your application needs. In this article, you learn how to implement a custom logging provider that can be used to colorize logs in the console.

> **Tip:**
> The custom logging provider example source code is available in the docs GitHub repo.

## Sample custom logger configuration

The sample logger creates different color console entries per log level and event ID using the following configuration type:

```csharp
﻿using Microsoft.Extensions.Logging;

public sealed class ColorConsoleLoggerConfiguration
{
    public int EventId { get; set; }

    public Dictionary<LogLevel, ConsoleColor> LogLevelToColorMap { get; set; } = new()
    {
        [LogLevel.Information] = ConsoleColor.Green
    };
}
```
The preceding code sets the default color for the `Information` level to `Green`. The `EventId` is implicitly 0.

## Create the custom logger

The following code snippet shows the `ILogger` implementation:

```csharp
﻿using Microsoft.Extensions.Logging;

public sealed class ColorConsoleLogger(
    string name,
    Func<ColorConsoleLoggerConfiguration> getCurrentConfig) : ILogger
{
    public IDisposable? BeginScope<TState>(TState state)
        where TState : notnull => default!;

    public bool IsEnabled(LogLevel logLevel) =>
        getCurrentConfig().LogLevelToColorMap.ContainsKey(logLevel);

    public void Log<TState>(
        LogLevel logLevel,
        EventId eventId,
        TState state,
        Exception? exception,
        Func<TState, Exception?, string> formatter)
    {
        if (!IsEnabled(logLevel))
        {
            return;
        }

        ColorConsoleLoggerConfiguration config = getCurrentConfig();
        if (config.EventId == 0 || config.EventId == eventId.Id)
        {
            ConsoleColor originalColor = Console.ForegroundColor;

            Console.ForegroundColor = config.LogLevelToColorMap[logLevel];
            Console.WriteLine($"[{eventId.Id,2}: {logLevel,-12}]");
            
            Console.ForegroundColor = originalColor;
            Console.Write($"     {name} - ");

            Console.ForegroundColor = config.LogLevelToColorMap[logLevel];
            Console.Write($"{formatter(state, exception)}");
            
            Console.ForegroundColor = originalColor;
            Console.WriteLine();
        }
    }
}
```
Each logger instance is instantiated by passing a category name, which is typically the type where the logger is created. The `IsEnabled` method checks `getCurrentConfig().LogLevelToColorMap.ContainsKey(logLevel)` to see if the requested log level is enabled (that is, in the configuration's dictionary of log levels).

It's a good practice to call `Microsoft.Extensions.Logging.ILogger.IsEnabled*` within `Microsoft.Extensions.Logging.ILogger.Log*` implementations since `Log` can be called by any consumer, and there are no guarantees that it was previously checked. The `IsEnabled` method should be very fast in most implementations.

```csharp
if (!IsEnabled(logLevel))
{
    return;
}
```
The logger is instantiated with the `name` and a `Func<ColorConsoleLoggerConfiguration>` that returns the current configuration.

> **Important:**
> The `Microsoft.Extensions.Logging.ILogger.Log*` implementation checks if the `config.EventId` value is set. When `config.EventId` is not set or when it matches the exact `logEntry.EventId`, the logger logs in color.

## Custom logger provider

The `ILoggerProvider` object is responsible for creating logger instances. It's not necessary to create a logger instance per category, but it makes sense for some loggers, like NLog or log4net. This strategy allows you to choose different logging output targets per category, as in the following example:

```csharp
﻿using System.Collections.Concurrent;
using System.Runtime.Versioning;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

[UnsupportedOSPlatform("browser")]
[ProviderAlias("ColorConsole")]
public sealed class ColorConsoleLoggerProvider : ILoggerProvider
{
    private readonly IDisposable? _onChangeToken;
    private ColorConsoleLoggerConfiguration _currentConfig;
    private readonly ConcurrentDictionary<string, ColorConsoleLogger> _loggers =
        new(StringComparer.OrdinalIgnoreCase);

    public ColorConsoleLoggerProvider(
        IOptionsMonitor<ColorConsoleLoggerConfiguration> config)
    {
        _currentConfig = config.CurrentValue;
        _onChangeToken = config.OnChange(updatedConfig => _currentConfig = updatedConfig);
    }

    public ILogger CreateLogger(string categoryName) =>
        _loggers.GetOrAdd(categoryName, name => new ColorConsoleLogger(name, GetCurrentConfig));

    private ColorConsoleLoggerConfiguration GetCurrentConfig() => _currentConfig;

    public void Dispose()
    {
        _loggers.Clear();
        _onChangeToken?.Dispose();
    }
}
```
In the preceding code, `Microsoft.Extensions.Logging.ILoggerProvider.CreateLogger(System.String)` creates a single instance of the `ColorConsoleLogger` per category name and stores it in the `ConcurrentDictionary<TKey,TValue>`.

The `ColorConsoleLoggerProvider` class is decorated with two attributes:

```csharp
[UnsupportedOSPlatform("browser")]
[ProviderAlias("ColorConsole")]
public sealed class ColorConsoleLoggerProvider : ILoggerProvider
```
- `System.Runtime.Versioning.UnsupportedOSPlatformAttribute`: The `ColorConsoleLogger` type is _not supported_ in the `"browser"`.
- `Microsoft.Extensions.Logging.ProviderAliasAttribute`: Configuration sections can define options using the `"ColorConsole"` key.

The configuration can be specified with any valid configuration provider. Consider the following _appsettings.json_ file:

```json
{
    "Logging": {
        "ColorConsole": {
            "LogLevelToColorMap": {
                "Information": "DarkGreen",
                "Warning": "Cyan",
                "Error": "Red"
            }
        }
    }
}
```
The _appsettings.json_ file specifies that the color for the `Microsoft.Extensions.Logging.LogLevel.Information` log level is `System.ConsoleColor.DarkGreen`, which overrides the default value set in the `ColorConsoleLoggerConfiguration` object.

## Usage and registration of the custom logger

By convention, services are registered for dependency injection as part of the startup routine of an application. In this example, the logging service is registered directly from the _Program.cs_ file.

To add the custom logging provider and corresponding logger, add an `Microsoft.Extensions.Logging.ILoggerProvider` by calling a custom extension method, `AddColorConsoleLogger`, on the `Microsoft.Extensions.Logging.ILoggingBuilder` from the `Microsoft.Extensions.Hosting.IHostApplicationBuilder.Logging` property:

```csharp
﻿using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddColorConsoleLogger(configuration =>
{
    // Replace value of "Cyan" from appsettings.json.
    configuration.LogLevelToColorMap[LogLevel.Warning]
        = ConsoleColor.DarkCyan;
    // Replace value of "Red" from appsettings.json.
    configuration.LogLevelToColorMap[LogLevel.Error]
        = ConsoleColor.DarkRed;
});

using IHost host = builder.Build();

ILogger<Program> logger = host.Services.GetRequiredService<ILogger<Program>>();

logger.LogDebug(1, "Does this line get hit?");    // Not logged
logger.LogInformation(3, "Nothing to see here."); // Logs in ConsoleColor.DarkGreen
logger.LogWarning(5, "Warning... that was odd."); // Logs in ConsoleColor.DarkCyan
logger.LogError(7, "Oops, there was an error.");  // Logs in ConsoleColor.DarkRed
logger.LogTrace(5, "== 120.");                    // Not logged

await host.RunAsync();
```
By convention, extension methods on `ILoggingBuilder` are used to register the custom provider:

```csharp
﻿using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Configuration;

public static class ColorConsoleLoggerExtensions
{
    public static ILoggingBuilder AddColorConsoleLogger(
        this ILoggingBuilder builder)
    {
        builder.AddConfiguration();

        builder.Services.TryAddEnumerable(
            ServiceDescriptor.Singleton<ILoggerProvider, ColorConsoleLoggerProvider>());

        LoggerProviderOptions.RegisterProviderOptions
            <ColorConsoleLoggerConfiguration, ColorConsoleLoggerProvider>(builder.Services);

        return builder;
    }

    public static ILoggingBuilder AddColorConsoleLogger(
        this ILoggingBuilder builder,
        Action<ColorConsoleLoggerConfiguration> configure)
    {
        builder.AddColorConsoleLogger();
        builder.Services.Configure(configure);

        return builder;
    }
}
```
The `ILoggingBuilder` creates one or more `ILogger` instances. The `ILogger` instances are used by the framework to log the information.

The instantiation code overrides the color values from the _appsettings.json_ file for `Microsoft.Extensions.Logging.LogLevel.Warning` and `Microsoft.Extensions.Logging.LogLevel.Error`.

When you run this simple app, it renders color output to the console window similar to the following image:

## See also

- Logging in .NET
- Logging providers in .NET
- Dependency injection in .NET
- High-performance logging in .NET
