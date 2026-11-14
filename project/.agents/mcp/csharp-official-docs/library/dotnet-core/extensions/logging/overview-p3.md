---
title: "Logging in C# (part 3 of 4)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/logging/overview.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Logging in C# (part 3 of 4)

## Log level

The following table lists the `Microsoft.Extensions.Logging.LogLevel` values, the convenience `Log{LogLevel}` extension method, and the suggested usage:

| LogLevel | Value | Method | Description |
|--|--|--|--|
| Trace | 0 | `Microsoft.Extensions.Logging.LoggerExtensions.LogTrace*` | Contain the most detailed messages. These messages might contain sensitive app data. These messages are disabled by default and should ***not*** be enabled in production. |
| Debug | 1 | `Microsoft.Extensions.Logging.LoggerExtensions.LogDebug*` | For debugging and development. Use with caution in production due to the high volume. |
| Information | 2 | `Microsoft.Extensions.Logging.LoggerExtensions.LogInformation*` | Tracks the general flow of the app. Might have long-term value. |
| Warning | 3 | `Microsoft.Extensions.Logging.LoggerExtensions.LogWarning*` | For abnormal or unexpected events. Typically includes errors or conditions that don't cause the app to fail. |
| Error | 4 | `Microsoft.Extensions.Logging.LoggerExtensions.LogError*` | For errors and exceptions that can't be handled. These messages indicate a failure in the current operation or request, not an app-wide failure. |
| Critical | 5 | `Microsoft.Extensions.Logging.LoggerExtensions.LogCritical*` | For failures that require immediate attention. Examples: data loss scenarios, out of disk space. |
| None | 6 |  | Specifies that no messages should be written. |

In the previous table, the `LogLevel` is listed from lowest to highest severity.

The Log method's first parameter, `Microsoft.Extensions.Logging.LogLevel`, indicates the severity of the log. Rather than calling `Log(LogLevel, ...)`, most developers call the Log{LogLevel} extension methods. The `Log{LogLevel}` extension methods call the `Log` method and specify the `LogLevel`. For example, the following two logging calls are functionally equivalent and produce the same log:

```csharp
public void LogDetails()
{
    var logMessage = "Details for log.";

    _logger.Log(LogLevel.Information, AppLogEvents.Details, logMessage);
    _logger.LogInformation(AppLogEvents.Details, logMessage);
}
```

`AppLogEvents.Details` is the event ID, and is implicitly represented by a constant `System.Int32` value. `AppLogEvents` is a class that exposes various named identifier constants and is displayed in the Log event ID section.

The following code creates `Information` and `Warning` logs:

```csharp
public async Task<T> GetAsync<T>(string id)
{
    _logger.LogInformation(AppLogEvents.Read, "Reading value for {Id}", id);

    var result = await _repository.GetAsync(id);
    if (result is null)
    {
        _logger.LogWarning(AppLogEvents.ReadNotFound, "GetAsync({Id}) not found", id);
    }

    return result;
}
```

In the preceding code, the first `Log{LogLevel}` parameter, `AppLogEvents.Read`, is the Log event ID. The second parameter is a message template with placeholders for argument values provided by the remaining method parameters. The method parameters are explained in the message template section later in this article.

Configure the appropriate log level and call the correct `Log{LogLevel}` methods to control how much log output is written to a particular storage medium. For example:

- In production:
  - Logging at the `Trace` or `Debug` levels produces a high-volume of detailed log messages. To control costs and not exceed data storage limits, log `Trace` and `Debug` level messages to a high-volume, low-cost data store. Consider limiting `Trace` and `Debug` to specific categories.
  - Logging at `Warning` through `Critical` levels should produce few log messages.
    - Costs and storage limits usually aren't a concern.
    - Few logs allow more flexibility in data store choices.
- In development:
  - Set to `Warning`.
  - Add `Trace` or `Debug` messages when troubleshooting. To limit output, set `Trace` or `Debug` only for the categories under investigation.

The following JSON sets `Logging:Console:LogLevel:Microsoft:Information`:

```json
{
    "Logging": {
        "LogLevel": {
            "Microsoft": "Warning"
        },
        "Console": {
            "LogLevel": {
                "Microsoft": "Information"
            }
        }
    }
}
```
## Log event ID

Each log can specify an *event identifier*, the `Microsoft.Extensions.Logging.EventId` is a structure with an `Id` and optional `Name` readonly properties. The sample source code uses the `AppLogEvents` class to define event IDs:

```csharp
using Microsoft.Extensions.Logging;

internal static class AppLogEvents
{
    internal static EventId Create = new(1000, "Created");
    internal static EventId Read = new(1001, "Read");
    internal static EventId Update = new(1002, "Updated");
    internal static EventId Delete = new(1003, "Deleted");

    // These are also valid EventId instances, as there's
    // an implicit conversion from int to an EventId
    internal const int Details = 3000;
    internal const int Error = 3001;

    internal static EventId ReadNotFound = 4000;
    internal static EventId UpdateNotFound = 4001;

    // ...
}
```

> **Tip:**
> For more information on converting an `int` to an `EventId`, see EventId.Implicit(Int32 to EventId) Operator.

An event ID associates a set of events. For example, all logs related to reading values from a repository might be `1001`.

The logging provider might log the event ID in an ID field, in the logging message, or not at all. The Debug provider doesn't show event IDs. The console provider shows event IDs in brackets after the category:

```console
info: Example.DefaultService.GetAsync[1001]
      Reading value for a1b2c3
warn: Example.DefaultService.GetAsync[4000]
      GetAsync(a1b2c3) not found
```

Some logging providers store the event ID in a field, which allows for filtering on the ID.

## Log message template

Each log API uses a message template. The message template can contain placeholders for which arguments are provided. Use names for the placeholders, not numbers. The order of placeholders, not their names, determines which parameters are used to provide their values. In the following code, the parameter names are out of sequence in the message template:

```csharp
string p1 = "param1";
string p2 = "param2";
_logger.LogInformation("Parameter values: {p2}, {p1}", p1, p2);
```

The preceding code creates a log message with the parameter values in sequence:

```text
Parameter values: param1, param2
```

> **Note:**
> Be mindful when using multiple placeholders within a single message template, as they're ordinal-based. The names aren't used to align the arguments to the placeholders.

This approach lets logging providers implement semantic or structured logging. The arguments themselves are passed to the logging system, not just the formatted message template. This enables logging providers to store the parameter values as fields. Consider the following logger method:

```csharp
_logger.LogInformation("Getting item {Id} at {RunTime}", id, DateTime.Now);
```

For example, when logging to Azure Table Storage:

- Each Azure Table entity can have `ID` and `RunTime` properties.
- Tables with properties simplify queries on logged data. For example, a query can find all logs within a particular `RunTime` range without having to parse the time out of the text message.

### Log message template formatting

Log message templates support placeholder formatting. Templates can specify any valid format for the given type argument. For example, consider the following `Information` logger message template:

```csharp
_logger.LogInformation("Logged on {PlaceHolderName:MMMM dd, yyyy}", DateTimeOffset.UtcNow);
// Logged on January 06, 2022
```

In the preceding example, the `DateTimeOffset` instance is the type that corresponds to the `PlaceHolderName` in the logger message template. This name can be anything as the values are ordinal-based. The `MMMM dd, yyyy` format is valid for the `DateTimeOffset` type.

For more information on `DateTime` and `DateTimeOffset` formatting, see Custom date and time format strings.

#### Examples

The following examples show how to format a message template using the `{}` placeholder syntax. Additionally, an example of escaping the `{}` placeholder syntax is shown with its output. Finally, string interpolation with templating placeholders is also shown:

```csharp
logger.LogInformation("Number: {Number}", 1);               // Number: 1
logger.LogInformation("{{Number}}: {Number}", 3);           // {Number}: 3
logger.LogInformation($"{{{{Number}}}}: {{Number}}", 5);    // {Number}: 5
```

> **Tip:**
>
> - In most cases, you should use log message template formatting when logging. Use of string interpolation can cause performance issues.
> - Code analysis rule CA2254: Template should be a static expression helps alert you to places where your log messages don't use proper formatting.

## Log exceptions

The logger methods have overloads that take an exception parameter:

```csharp
public void Test(string id)
{
    try
    {
        if (id is "none")
        {
            throw new Exception("Default Id detected.");
        }
    }
    catch (Exception ex)
    {
        _logger.LogWarning(
            AppLogEvents.Error, ex,
            "Failed to process iteration: {Id}", id);
    }
}
```

Exception logging is provider-specific.

## Default log level

If the default log level isn't set, the default log level value is `Information`.

For example, consider the following worker service app:

- Created with the .NET Worker templates.
- *appsettings.json* and *appsettings.Development.json* deleted or renamed.

With the preceding setup, navigating to the privacy or home page produces many `Trace`, `Debug`, and `Information` messages with `Microsoft` in the category name.

The following code sets the default log level when the default log level isn't set in configuration:

```csharp
HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Logging.SetMinimumLevel(LogLevel.Warning);

using IHost host = builder.Build();

await host.RunAsync();
```

## Filter function

A filter function is invoked for all providers and categories that don't have rules assigned to them by configuration or code:

```csharp
HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Logging.AddFilter((provider, category, logLevel) =>
{
    return provider.Contains("ConsoleLoggerProvider")
        && (category.Contains("Example") || category.Contains("Microsoft"))
        && logLevel >= LogLevel.Information;
});

using IHost host = builder.Build();

await host.RunAsync();
```

The preceding code displays console logs when the category contains `Example` or `Microsoft` and the log level is `Information` or higher.

## Log scopes

A *scope* groups a set of logical operations. This grouping can attach the same data to each log that's created as part of a set. For example, every log created as part of processing a transaction can include the transaction ID.

A scope:

- Is an `System.IDisposable` type that's returned by the `Microsoft.Extensions.Logging.ILogger.BeginScope*` method.
- Lasts until it's disposed.

The following providers support scopes:

- `Console`
- AzureAppServicesFile and AzureAppServicesBlob
- ApplicationInsightsLoggerProvider

Use a scope by wrapping logger calls in a `using` block:

```csharp
public async Task<T> GetAsync<T>(string id)
{
    T result;
    var transactionId = Guid.NewGuid().ToString();

    using (_logger.BeginScope(new List<KeyValuePair<string, object>>
        {
            new KeyValuePair<string, object>("TransactionId", transactionId),
        }))
    {
        _logger.LogInformation(
            AppLogEvents.Read, "Reading value for {Id}", id);

        var result = await _repository.GetAsync(id);
        if (result is null)
        {
            _logger.LogWarning(
                AppLogEvents.ReadNotFound, "GetAsync({Id}) not found", id);
        }
    }

    return result;
}
```

The following JSON enables scopes for the console provider:

```json
{
    "Logging": {
        "Debug": {
            "LogLevel": {
                "Default": "Information"
            }
        },
        "Console": {
            "IncludeScopes": true,
            "LogLevel": {
                "Microsoft": "Warning",
                "Default": "Information"
            }
        },
        "LogLevel": {
            "Default": "Debug"
        }
    }
}
```
The following code enables scopes for the console provider:

```csharp
HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddSimpleConsole(options => options.IncludeScopes = true);

using IHost host = builder.Build();

await host.RunAsync();
```

## Create logs in Main

The following code logs in `Main` by getting an `ILogger` instance from DI after building the host:

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using IHost host = Host.CreateApplicationBuilder(args).Build();

var logger = host.Services.GetRequiredService<ILogger<Program>>();
logger.LogInformation("Host created.");

await host.RunAsync();
```

The preceding code relies on two NuGet packages:

- Microsoft.Extensions.Hosting
- Microsoft.Extensions.Logging

Its project file looks similar to the following:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Hosting" Version="7.0.1" />
    <PackageReference Include="Microsoft.Extensions.Logging" Version="7.0.0" />
  </ItemGroup>

</Project>
```

### No asynchronous logger methods

Logging should be so fast that it isn't worth the performance cost of asynchronous code. If a logging datastore is slow, don't write to it directly. Consider writing the log messages to a fast store initially, then moving them to the slow store later. For example, when logging to SQL Server, don't do so directly in a `Log` method, since the `Log` methods are synchronous. Instead, synchronously add log messages to an in-memory queue and have a background worker pull the messages out of the queue to do the asynchronous work of pushing data to SQL Server.

## Change log levels in a running app

The Logging API doesn't include a scenario to change log levels while an app is running. However, some configuration providers can reload configuration, which takes immediate effect on logging configuration. For example, the File Configuration Provider reloads logging configuration by default. If you change the configuration in code while an app is running, the app can call IConfigurationRoot.Reload to update the app's logging configuration.
