---
title: "Logging in .NET and ASP.NET Core (part 3 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/logging/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Logging in .NET and ASP.NET Core (part 3 of 5)

## Log level

The following table describes the logging levels from lowest to highest severity, their corresponding `enum` values, and their convenience extension methods.

`LogLevel` | Value | Method | Description
--- | --- | --- | ---
`Microsoft.Extensions.Logging.LogLevel.Trace` | 0 | `Microsoft.Extensions.Logging.LoggerExtensions.LogTrace*` | Contain the most detailed messages. These messages may contain sensitive app data. These messages are disabled by default and should ***not*** be enabled in production.
`Microsoft.Extensions.Logging.LogLevel.Debug` | 1 | `Microsoft.Extensions.Logging.LoggerExtensions.LogDebug*` | For debugging and development. Use with caution in production due to the high volume of messages logged.
`Microsoft.Extensions.Logging.LogLevel.Information` | 2 | `Microsoft.Extensions.Logging.LoggerExtensions.LogInformation*` | Tracks the general flow of the app.
`Microsoft.Extensions.Logging.LogLevel.Warning` | 3 | `Microsoft.Extensions.Logging.LoggerExtensions.LogWarning*` | For abnormal or unexpected events. Typically includes errors or conditions that don't cause the app to fail.
`Microsoft.Extensions.Logging.LogLevel.Error` | 4 | `Microsoft.Extensions.Logging.LoggerExtensions.LogError*` | Typically used for unhandled errors and exceptions. These messages indicate a failure in the current operation or request, not an app-wide failure.
`Microsoft.Extensions.Logging.LogLevel.Critical` | 5 | `Microsoft.Extensions.Logging.LoggerExtensions.LogCritical*` | For failures that require immediate attention, such as data loss or out of disk space.
`Microsoft.Extensions.Logging.LogLevel.None` | 6 | — | Specifies that a logging category shouldn't write messages.

The `Microsoft.Extensions.Logging.LoggerExtensions.Log*` method's first parameter, `Microsoft.Extensions.Logging.LogLevel`, indicates the severity of the log. Rather than calling `Log(LogLevel, ...)`, most developers call `Microsoft.Extensions.Logging.LoggerExtensions` methods. For example, the following two logging calls are functionally equivalent and produce the same based on an injected `ILogger<T>` instance (`Logger`) in a Razor component:

```csharp
Logger.Log(LogLevel.Information, LogEvent.TestItem, routeInfo);

Logger.LogInformation(LogEvent.TestItem, routeInfo);
```

> **Note:**
> `LogEvent.TestItem` is a log event ID.

Log at an appropriate level to control how much log output is written to a particular storage medium:

* In production:
  * Logging at the `Microsoft.Extensions.Logging.LogLevel.Trace`, `Microsoft.Extensions.Logging.LogLevel.Debug`, or `Microsoft.Extensions.Logging.LogLevel.Information` levels produces a high-volume of detailed log messages. To control costs and not exceed data storage limits, log at these levels to a high-volume, low-cost data store. Consider limiting these levels to specific categories.
  * Logging at `Microsoft.Extensions.Logging.LogLevel.Warning` through `Microsoft.Extensions.Logging.LogLevel.Critical` levels usually produces few log messages.
    * Costs and storage limits usually aren't a concern.
    * Few logs allow more flexibility in data store choices.
* In development:
  * We recommend the `Microsoft.Extensions.Logging.LogLevel.Information` level (`"Default": "Information"`) for default logging and the `Microsoft.Extensions.Logging.LogLevel.Warning` level for Microsoft ASP.NET Core assemblies (`"Microsoft.AspNetCore": "Warning"`).
  * Add `Microsoft.Extensions.Logging.LogLevel.Trace` and `Microsoft.Extensions.Logging.LogLevel.Debug`, or `Microsoft.Extensions.Logging.LogLevel.Information` messages when troubleshooting. To limit output, only set these logging levels for the categories under investigation.

## Change log levels in a running app

The Logging API doesn't include support for changing log levels while an app is running. However, some configuration providers are capable of reloading configuration, which takes immediate effect on logging configuration. For example, the File Configuration Provider, reloads logging configuration by default. If configuration is changed in code while an app is running, the app can call `Microsoft.Extensions.Configuration.IConfigurationRoot.Reload*` to update the app's logging configuration.

## How filtering rules are applied

When an `Microsoft.Extensions.Logging.ILogger`1` object is created, the `Microsoft.Extensions.Logging.ILoggerFactory` object selects a single rule per provider to apply to that logger. All messages written by an `Microsoft.Extensions.Logging.ILogger` instance are filtered based on the selected rules. The most specific rule for each provider and category pair is selected from the available rules.

The following algorithm is used for each provider when an `Microsoft.Extensions.Logging.ILogger` is created for a given category:

* Select all rules that match the provider or its alias. If no match is found, select all rules with an empty provider.
* From the result of the preceding step, select rules with longest matching category prefix. If no match is found, select all rules that don't specify a category.
* If multiple rules are selected, take the *last* one.
* If no rules are selected, use `MinimumLevel`.

## `ILogger` and `ILoggerFactory`

The `Microsoft.Extensions.Logging.ILogger`1` and `Microsoft.Extensions.Logging.ILoggerFactory` interfaces and implementations are included in the .NET SDK. They are also available in the following NuGet packages:

* The interfaces are in the `Microsoft.Extensions.Logging.Abstractions` NuGet package.
* The default implementations are in the `Microsoft.Extensions.Logging` NuGet package.

## Log exceptions

The logger methods have overloads that take an exception parameter:

```csharp
try
{
   ...

   throw new Exception("Test exception");
}
catch (Exception ex)
{
    Logger.LogWarning(LogEvent.GetItemNotFound, ex, "Test exception at {DT}", 
        DateTime.UtcNow);
}
```

Exception logging is provider-specific.

### Default log level

If the default log level isn't explicitly set, the default log level is `Microsoft.Extensions.Logging.LogLevel.Information`.

If the default log level isn't set in configuration, it can be set with `Microsoft.Extensions.Logging.LoggingBuilderExtensions.SetMinimumLevel*`. The following example sets the `Microsoft.Extensions.Logging.LogLevel.Warning` level as the default logging level:

```csharp
var builder = WebApplication.CreateBuilder();

builder.Logging.SetMinimumLevel(LogLevel.Warning);
```

We recommend setting the minimum default log level in configuration, not in C# code.

### Filter function

A filter function is invoked for all providers and categories that don't have rules assigned to them by configuration or code. The following example displays console logs when the category contains `Page` or `Microsoft` and the log level is `Microsoft.Extensions.Logging.LogLevel.Information` or higher:

```csharp
var builder = WebApplication.CreateBuilder();

builder.Logging.AddFilter((provider, category, logLevel) =>
{
    if (provider is not null && category is not null)
    {
        return provider.Contains("ConsoleLoggerProvider")
            && (category.Contains("Page") || category.Contains("Microsoft"))
            && logLevel >= LogLevel.Information;
    }

    return false;
});
```

<!-- Would insisting that the 'provider' and 'category' be non-null
     with the null-forgiving operator be safe for the preceding
     example? It's cleaner not having to check, but I have a healthy
     fear of taking this approach generally ........

```csharp
var builder = WebApplication.CreateBuilder();

builder.Logging.AddFilter((provider, category, logLevel) =>
{
    return provider!.Contains("ConsoleLoggerProvider")
        && (category!.Contains("Page") || category!.Contains("Microsoft"))
        && logLevel >= LogLevel.Information;
});
```

-->

We recommend specifying log levels in configuration and not in code with filter functions.

## ASP.NET Core categories

The following table contains some of the logging categories used by ASP.NET Core.

| Category                              | Notes |
| ------------------------------------- | ----- |
| `Microsoft.AspNetCore`                | General ASP.NET Core diagnostics. |
| `Microsoft.AspNetCore.DataProtection` | Which data protection keys were considered, found, and used. |
| `Microsoft.AspNetCore.HostFiltering`  | Hosts allowed. |
| `Microsoft.AspNetCore.Hosting`        | How long HTTP requests took to complete and what time they started. Which hosting startup assemblies were loaded. |
| `Microsoft.AspNetCore.Mvc`            | MVC and Razor diagnostics. Model binding, filter execution, view compilation, and action selection. |
| `Microsoft.AspNetCore.Routing`        | Route matching information. |
| `Microsoft.AspNetCore.Server`         | Connection start, stop, and keep alive responses. HTTPS certificate information. |
| `Microsoft.AspNetCore.StaticFiles`    | Files served. |

To study more categories using the `Console` logger, set `appsettings.Development.json` in a test app:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Trace",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  }
}
```

> **Warning:**
> Reset the logging configuration back to its prior levels in `appsettings.Development.json` after studying the `Console` logger output.

For a list of Entity Framework categories, see Simple Logging: Message categories (EF Core documentation).

## Log scopes

A *scope* can group a set of logical operations. This grouping can be used to attach the same data to each log that's created as part of a set. For example, every log created as part of processing a transaction can include the transaction ID.

A scope:

* Is an `System.IDisposable` type that's returned by the `Microsoft.Extensions.Logging.ILogger.BeginScope*` method.
* Lasts until it's disposed.

The following providers support scopes:

* `Console`
* `AzureAppServicesFile` and `AzureAppServicesBlob`

Use a scope by wrapping logger calls in a `using` block:

```csharp
public async Task<TodoItem> GetTodoItem(long id)
{
    TodoItem todoItem;
    var transactionId = Guid.NewGuid().ToString();

    using (Logger.BeginScope(new List<KeyValuePair<string, object>>
    {
        new("TransactionId", transactionId),
    }))
    {
        Logger.LogInformation(LogEvent.GetItem, "Getting item {Id}", id);

        todoItem = await TodoItemsService.FindAsync(id);

        if (todoItem == null)
        {
            Logger.LogWarning(LogEvent.GetItemNotFound, "Get({Id}) NOT FOUND", id);

            return NotFound();
        }
    }

    return todoItem;
}
```
