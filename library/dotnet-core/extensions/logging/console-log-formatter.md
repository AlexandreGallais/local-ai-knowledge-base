---
title: "Console log formatting (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/logging/console-log-formatter.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Console log formatting

The `Microsoft.Extensions.Logging.Console` namespace provides support for custom formatting in console logs. There are three predefined formatting options available: `Simple`, `Systemd`, and `Json`.

> **Important:**
> Prior to .NET 5, the `Microsoft.Extensions.Logging.Console.ConsoleLoggerFormat` enum allowed for selecting the desired log format, either human readable which was the `Default`, or single line which is also known as `Systemd`. However, these were **not** customizable, and are now deprecated.

In this article, you will learn about console log formatters. The sample source code demonstrates how to:

- Register a new formatter.
- Select a registered formatter to use, either through code or configuration.
- Implement a custom formatter. You update configuration via `Microsoft.Extensions.Options.IOptionsMonitor`1` and enable custom color formatting.

> **Tip:**
> All of the logging example source code is available in the **Samples Browser** for download. For more information, see Browse code samples: Logging in .NET.

## Register formatter

The `Console` logging provider has several predefined formatters, and exposes the ability to author your own custom formatter. To register any of the available formatters, use the corresponding `Add{Type}Console` extension method:

| Available types | Method to register type |
|-----------------|-------------------------|
| `Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Json` | `Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddJsonConsole*` |
| `Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Simple` | `Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddSimpleConsole*` |
| `Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Systemd` | `Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddSystemdConsole*` |

### Simple

To use the `Simple` console formatter, register it with `AddSimpleConsole`:

```csharp
﻿using Microsoft.Extensions.Logging;

using ILoggerFactory loggerFactory =
    LoggerFactory.Create(builder =>
        builder.AddSimpleConsole(options =>
        {
            options.IncludeScopes = true;
            options.SingleLine = true;
            options.TimestampFormat = "HH:mm:ss ";
        }));

ILogger<Program> logger = loggerFactory.CreateLogger<Program>();
using (logger.BeginScope("[scope is enabled]"))
{
    logger.LogInformation("Hello World!");
    logger.LogInformation("Logs contain timestamp and log level.");
    logger.LogInformation("Each log message is fit in a single line.");
}
```
In the preceding sample source code, the `Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Simple` formatter was registered. It provides logs with the ability to not only wrap information such as time and log level in each log message, but also allows for ANSI color embedding and indentation of messages.

When this sample app is run, the log messages are formatted as shown below:

### Systemd

The `Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Systemd` console logger:

- Uses the "Syslog" log level format and severities.
- Does **not** format messages with colors.
- Always logs messages in a single line.

This is commonly useful for containers, which often make use of `Systemd` console logging. The `Simple` console logger also enables a compact version that logs in a single line, and also allows for disabling colors as shown in an earlier sample.

```csharp
﻿using Microsoft.Extensions.Logging;

using ILoggerFactory loggerFactory =
    LoggerFactory.Create(builder =>
        builder.AddSystemdConsole(options =>
        {
            options.IncludeScopes = true;
            options.TimestampFormat = "HH:mm:ss ";
        }));

ILogger<Program> logger = loggerFactory.CreateLogger<Program>();
using (logger.BeginScope("[scope is enabled]"))
{
    logger.LogInformation("Hello World!");
    logger.LogInformation("Logs contain timestamp and log level.");
    logger.LogInformation("Systemd console logs never provide color options.");
    logger.LogInformation("Systemd console logs always appear in a single line.");
}
```
The example produces output similar to the following log messages:

### Json

To write logs in a JSON format, the `Json` console formatter is used. The sample source code shows how an ASP.NET Core app might register it. Using the `webapp` template, create a new ASP.NET Core app with the dotnet new command:

```dotnetcli
dotnet new webapp -o Console.ExampleFormatters.Json
```

When running the app, using the template code, you get the default log format below:

```console
info: Console.ExampleFormatters.Json.Startup[0]
      Hello .NET friends!
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:5001
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: .\snippets\logging\console-formatter-json
```

By default, the `Simple` console log formatter is selected with default configuration. You change this by calling `AddJsonConsole` in the *Program.cs*:

```csharp
﻿using System.Text.Json;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Logging.AddJsonConsole(options =>
{
    options.IncludeScopes = false;
    options.TimestampFormat = "HH:mm:ss ";
    options.JsonWriterOptions = new JsonWriterOptions
    {
        Indented = true
    };
});

using IHost host = builder.Build();

var logger =
    host.Services
        .GetRequiredService<ILoggerFactory>()
        .CreateLogger<Program>();

logger.LogInformation("Hello .NET friends!");

await host.RunAsync();
```
Alternatively, you can also configure this using logging configuration, such as that found in the _appsettings.json_ file:

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
            "FormatterName": "json",
            "FormatterOptions": {
                "SingleLine": true,
                "IncludeScopes": true,
                "TimestampFormat": "HH:mm:ss ",
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
Run the app again, with the above change, the log message is now formatted as JSON:

```json
{
  "Timestamp": "02:28:19 ",
  "EventId": 0,
  "LogLevel": "Information",
  "Category": "Console.ExampleFormatters.Json.Startup",
  "Message": "Hello .NET friends!",
  "State": {
    "Message": "Hello .NET friends!",
    "{OriginalFormat}": "Hello .NET friends!"
  }
}
{
  "Timestamp": "02:28:21 ",
  "EventId": 14,
  "LogLevel": "Information",
  "Category": "Microsoft.Hosting.Lifetime",
  "Message": "Now listening on: https://localhost:5001",
  "State": {
    "Message": "Now listening on: https://localhost:5001",
    "address": "https://localhost:5001",
    "{OriginalFormat}": "Now listening on: {address}"
  }
}
{
  "Timestamp": "02:28:21 ",
  "EventId": 14,
  "LogLevel": "Information",
  "Category": "Microsoft.Hosting.Lifetime",
  "Message": "Now listening on: http://localhost:5000",
  "State": {
    "Message": "Now listening on: http://localhost:5000",
    "address": "http://localhost:5000",
    "{OriginalFormat}": "Now listening on: {address}"
  }
}
{
  "Timestamp": "02:28:21 ",
  "EventId": 0,
  "LogLevel": "Information",
  "Category": "Microsoft.Hosting.Lifetime",
  "Message": "Application started. Press Ctrl\u002BC to shut down.",
  "State": {
    "Message": "Application started. Press Ctrl\u002BC to shut down.",
    "{OriginalFormat}": "Application started. Press Ctrl\u002BC to shut down."
  }
}
{
  "Timestamp": "02:28:21 ",
  "EventId": 0,
  "LogLevel": "Information",
  "Category": "Microsoft.Hosting.Lifetime",
  "Message": "Hosting environment: Development",
  "State": {
    "Message": "Hosting environment: Development",
    "envName": "Development",
    "{OriginalFormat}": "Hosting environment: {envName}"
  }
}
{
  "Timestamp": "02:28:21 ",
  "EventId": 0,
  "LogLevel": "Information",
  "Category": "Microsoft.Hosting.Lifetime",
  "Message": "Content root path: .\\snippets\\logging\\console-formatter-json",
  "State": {
    "Message": "Content root path: .\\snippets\\logging\\console-formatter-json",
    "contentRoot": ".\\snippets\\logging\\console-formatter-json",
    "{OriginalFormat}": "Content root path: {contentRoot}"
  }
}
```
> **Tip:**
> The `Json` console formatter, by default, logs each message in a single line. To make it more readable while configuring the formatter, set `System.Text.Json.JsonWriterOptions.Indented` to `true`.

> **Caution:**
> When using the JSON console formatter, don't pass in log messages that have already been serialized as JSON. The logging infrastructure itself manages the serialization of log messages. So if you pass in a log message that's already serialized, it will be double serialized, thus causing malformed output.

## Set formatter with configuration

The previous samples showed how to register a formatter programmatically. Alternatively, this can be done with configuration. Consider the previous web application sample source code, if you update the *appsettings.json* file rather than calling `ConfigureLogging` in the *Program.cs* file, you could get the same outcome. The updated `appsettings.json` file would configure the formatter as follows:

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
            "FormatterName": "json",
            "FormatterOptions": {
                "SingleLine": true,
                "IncludeScopes": true,
                "TimestampFormat": "HH:mm:ss ",
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
The two key <example-value> that need to be set are `"FormatterName"` and `"FormatterOptions"`. If a formatter with the value set for `"FormatterName"` is already registered, that formatter is selected, and its properties can be configured as long as they are provided as a key <example-value> the `"FormatterOptions"` node. The predefined formatter names are reserved under `Microsoft.Extensions.Logging.Console.ConsoleFormatterNames`:

- `Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Json`
- `Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Simple`
- `Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Systemd`
