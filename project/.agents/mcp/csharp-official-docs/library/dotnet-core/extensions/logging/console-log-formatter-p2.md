---
title: "Console log formatting (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/logging/console-log-formatter.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Console log formatting (part 2 of 3)

## Implement a custom formatter

To implement a custom formatter, you need to:

- Create a subclass of `Microsoft.Extensions.Logging.Console.ConsoleFormatter` that represents your custom formatter.
- Register your custom formatter with:
  - `Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddConsole*`
  - `Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddConsoleFormatter``2(Microsoft.Extensions.Logging.ILoggingBuilder,System.Action{``1})`

Create an extension method to handle this for you:

```csharp
﻿using Microsoft.Extensions.Logging;

namespace Console.ExampleFormatters.Custom;

public static class ConsoleLoggerExtensions
{
    public static ILoggingBuilder AddCustomFormatter(
        this ILoggingBuilder builder,
        Action<CustomOptions> configure) =>
        builder.AddConsole(options => options.FormatterName = "customName")
            .AddConsoleFormatter<CustomFormatter, CustomOptions>(configure);
}
```
The `CustomOptions` are defined as follows:

```csharp
﻿using Microsoft.Extensions.Logging.Console;

namespace Console.ExampleFormatters.Custom;

public sealed class CustomOptions : ConsoleFormatterOptions
{
    public string? CustomPrefix { get; set; }
}
```
In the preceding code, the options are a subclass of `Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions`.

The `AddConsoleFormatter` API:

- Registers a subclass of `ConsoleFormatter`.
- Handles configuration. It uses a change token to synchronize updates, based on the options pattern, and the IOptionsMonitor interface.

```csharp
﻿using Console.ExampleFormatters.Custom;
using Microsoft.Extensions.Logging;

using ILoggerFactory loggerFactory =
    LoggerFactory.Create(builder =>
        builder.AddCustomFormatter(options =>
            options.CustomPrefix = " ~~~~~ "));

ILogger<Program> logger = loggerFactory.CreateLogger<Program>();
using (logger.BeginScope("TODO: Add logic to enable scopes"))
{
    logger.LogInformation("Hello World!");
    logger.LogInformation("TODO: Add logic to enable timestamp and log level info.");
}
```
Define a `CustomFormatter` subclass of `ConsoleFormatter`:

```csharp
﻿using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Logging.Console;
using Microsoft.Extensions.Options;

namespace Console.ExampleFormatters.Custom;

public sealed class CustomFormatter : ConsoleFormatter, IDisposable
{
    private readonly IDisposable? _optionsReloadToken;
    private CustomOptions _formatterOptions;

    public CustomFormatter(IOptionsMonitor<CustomOptions> options)
        // Case insensitive
        : base("customName") =>
        (_optionsReloadToken, _formatterOptions) =
            (options.OnChange(ReloadLoggerOptions), options.CurrentValue);

    private void ReloadLoggerOptions(CustomOptions options) =>
        _formatterOptions = options;

    public override void Write<TState>(
        in LogEntry<TState> logEntry,
        IExternalScopeProvider? scopeProvider,
        TextWriter textWriter)
    {
        string? message =
            logEntry.Formatter?.Invoke(
                logEntry.State, logEntry.Exception);

        if (message is null)
        {
            return;
        }

        CustomLogicGoesHere(textWriter);
        textWriter.WriteLine(message);
    }

    private void CustomLogicGoesHere(TextWriter textWriter)
    {
        textWriter.Write(_formatterOptions.CustomPrefix);
    }

    public void Dispose() => _optionsReloadToken?.Dispose();
}
```
The preceding `CustomFormatter.Write<TState>` API dictates what text gets wrapped around each log message. A standard `ConsoleFormatter` should be able to wrap around scopes, time stamps, and severity level of logs at a minimum. Additionally, you can encode ANSI colors in the log messages, and provide desired indentations as well. The implementation of the `CustomFormatter.Write<TState>` lacks these capabilities.

For inspiration on further customizing formatting, see the existing implementations in the `Microsoft.Extensions.Logging.Console` namespace:

- SimpleConsoleFormatter.
- SystemdConsoleFormatter
- JsonConsoleFormatter

### Custom configuration options

To further customize the logging extensibility, your derived `Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions` class can be configured from any configuration provider. For example, you could use the JSON configuration provider to define your custom options. First define your `Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions` subclass.

```csharp
﻿using Microsoft.Extensions.Logging.Console;

namespace Console.ExampleFormatters.CustomWithConfig;

public sealed class CustomWrappingConsoleFormatterOptions : ConsoleFormatterOptions
{
    public string? CustomPrefix { get; set; }

    public string? CustomSuffix { get; set; }
}
```
The preceding console formatter options class defines two custom properties, representing a prefix and suffix. Next, define the *appsettings.json* file that will configure your console formatter options.

```json
{
    "Logging": {
        "LogLevel": {
            "Default": "Information",
            "Microsoft": "Warning",
            "Microsoft.Hosting.Lifetime": "Information"
        },
        "Console": {
            "LogLevel": {
                "Default": "Information",
                "Microsoft": "Warning",
                "Microsoft.Hosting.Lifetime": "Information"
            },
            "FormatterName": "CustomTimePrefixingFormatter",
            "FormatterOptions": {
                "CustomPrefix": "|-<[",
                "CustomSuffix": "]>-|",
                "SingleLine": true,
                "IncludeScopes": true,
                "TimestampFormat": "HH:mm:ss.ffff ",
                "UseUtcTimestamp": true,
                "JsonWriterOptions": {
                    "Indented": true
                }
            }
        }
    },
    "AllowedHosts": "*"
}
```
In the preceding JSON config file:

- The `"Logging"` node defines a `"Console"`.
- The `"Console"` node specifies a `"FormatterName"` of `"CustomTimePrefixingFormatter"`, which maps to a custom formatter.
- The `"FormatterOptions"` node defines a `"CustomPrefix"`, and `"CustomSuffix"`, as well as a few other derived options.

> **Tip:**
> The `$.Logging.Console.FormatterOptions` JSON path is reserved, and will map to a custom `Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions` when added using the `Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddConsoleFormatter*` extension method. This provides the ability to define custom properties, in addition to the ones available.

Consider the following `CustomDatePrefixingFormatter`:

```csharp
﻿using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Logging.Console;
using Microsoft.Extensions.Options;

namespace Console.ExampleFormatters.CustomWithConfig;

public sealed class CustomTimePrefixingFormatter : ConsoleFormatter, IDisposable
{
    private readonly IDisposable? _optionsReloadToken;
    private CustomWrappingConsoleFormatterOptions _formatterOptions;

    public CustomTimePrefixingFormatter(
        IOptionsMonitor<CustomWrappingConsoleFormatterOptions> options)
        // Case insensitive
        : base(nameof(CustomTimePrefixingFormatter))
    {
        _optionsReloadToken = options.OnChange(ReloadLoggerOptions);
        _formatterOptions = options.CurrentValue;
    }

    private void ReloadLoggerOptions(CustomWrappingConsoleFormatterOptions options) =>
        _formatterOptions = options;

    public override void Write<TState>(
        in LogEntry<TState> logEntry,
        IExternalScopeProvider? scopeProvider,
        TextWriter textWriter)
    {
        string message =
            logEntry.Formatter(
                logEntry.State, logEntry.Exception);

        if (message == null)
        {
            return;
        }

        WritePrefix(textWriter);
        textWriter.Write(message);
        WriteSuffix(textWriter);
    }

    private void WritePrefix(TextWriter textWriter)
    {
        DateTime now = _formatterOptions.UseUtcTimestamp
            ? DateTime.UtcNow
            : DateTime.Now;

        textWriter.Write($"""
            {_formatterOptions.CustomPrefix} {now.ToString(_formatterOptions.TimestampFormat)}
            """);
    }

    private void WriteSuffix(TextWriter textWriter) =>
        textWriter.WriteLine($" {_formatterOptions.CustomSuffix}");

    public void Dispose() => _optionsReloadToken?.Dispose();
}
```
In the preceding formatter implementation:

- The `CustomWrappingConsoleFormatterOptions` are monitored for change, and updated accordingly.
- Messages that are written are wrapped with the configured prefix, and suffix.
- A timestamp is added after the prefix, but before the message using the configured `Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions.UseUtcTimestamp` and `Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions.TimestampFormat*` values.

To use custom configuration options, with custom formatter implementations, add when calling `Microsoft.Extensions.Hosting.HostingHostBuilderExtensions.ConfigureLogging(Microsoft.Extensions.Hosting.IHostBuilder,System.Action{Microsoft.Extensions.Hosting.HostBuilderContext,Microsoft.Extensions.Logging.ILoggingBuilder})`.

```csharp
﻿using Console.ExampleFormatters.CustomWithConfig;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Logging.AddConsole()
    .AddConsoleFormatter<
        CustomTimePrefixingFormatter, CustomWrappingConsoleFormatterOptions>();

using IHost host = builder.Build();

ILoggerFactory loggerFactory = host.Services.GetRequiredService<ILoggerFactory>();
ILogger<Program> logger = loggerFactory.CreateLogger<Program>();

using (logger.BeginScope("Logging scope"))
{
    logger.LogInformation("Hello World!");
    logger.LogInformation("The .NET developer community happily welcomes you.");
}
```
The following console output is similar to what you might expect to see from using this `CustomTimePrefixingFormatter`.

```console
|-<[ 15:03:15.6179 Hello World! ]>-|
|-<[ 15:03:15.6347 The .NET developer community happily welcomes you. ]>-|
```
