---
title: "High-performance logging"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/logging/high-performance-logging.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# High-performance logging in .NET

For high-performance logging scenarios in .NET 6 and later versions, use the `Microsoft.Extensions.Logging.LoggerMessageAttribute` with compile-time source generation. This approach provides the best performance by eliminating boxing, temporary allocations, and message template parsing at runtime.

Source-generated logging provides the following performance advantages over logger extension methods, such as `Microsoft.Extensions.Logging.LoggerExtensions.LogInformation*` and `Microsoft.Extensions.Logging.LoggerExtensions.LogDebug*`:

- **Eliminates boxing:** Logger extension methods require "boxing" (converting) value types, such as `int`, into `object`. Source-generated logging avoids boxing by using strongly typed parameters.
- **Parses templates at compile time:** Logger extension methods must parse the message template (named format string) every time a log message is written. Source-generated logging parses templates once at compile time.
- **Reduces allocations:** The source generator creates optimized code that minimizes object allocations and temporary memory usage.

The sample app demonstrates high-performance logging features with a priority queue processing worker service. The app processes work items in priority order. As these operations occur, log messages are generated using source-generated logging.

> **Tip:**
> All of the logging example source code is available in the **Samples Browser** for download. For more information, see Browse code samples: Logging in .NET.

## Define logger messages with source generation

To create high-performance log messages in .NET 6 and later, define `partial` methods decorated with `Microsoft.Extensions.Logging.LoggerMessageAttribute`. The source generator creates the implementation at compile time.

### Basic <example-value> method

For a simple log message, define a partial method with the attribute specifying the event ID, log level, and message template:

```csharp
public static partial class Log
{
    [LoggerMessage(
        EventId = 13,
        Level = LogLevel.Critical,
        Message = "Epic failure processing item!")]
    public static partial void FailedToProcessWorkItem(
        ILogger logger, Exception ex);
}
```

The message template uses placeholders that are filled by method parameters. Placeholder names should be descriptive and consistent across templates. They serve as property names within structured log data. We recommend Pascal casing for placeholder names. For example, `{Item}`, `{DateTime}`.

Call the logging method from your code. For example, when an exception occurs during work item processing:

```csharp
try
{
    // Process work item.
}
catch (Exception ex)
{
    Log.FailedToProcessWorkItem(logger, ex);
}
```

This code produces console output like:

```console
crit: WorkerServiceOptions.Example.Worker[13]
      Epic failure processing item!
      System.Exception: Failed to verify communications.
```

### Logging with parameters

To pass <example-value> to a log message, add them as method parameters. The parameter names match the placeholders in the message template:

```csharp
public static partial class Log
{
    [LoggerMessage(
        EventId = 1,
        Level = LogLevel.Information,
        Message = "Processing priority item: {Item}")]
    public static partial void PriorityItemProcessed(
        ILogger logger, WorkItem item);
}
```

Call the method with the logger and parameter values:

```csharp
var workItem = queue.Dequeue();
Log.PriorityItemProcessed(logger, workItem);
```

This code produces console output like:

```console
info: WorkerServiceOptions.Example.Worker[1]
      Processing priority item: Priority-Extreme (50db062a-9732-4418-936d-110549ad79e4): 'Verify communications'
```

Structured logging stores can use the event name when it's supplied with the event ID to enrich logging. For example, Serilog uses the event name.

## Define logger message scope with source generation

You can define log scopes to wrap a series of log messages with additional context. With source-generated logging, you combine the `LoggerMessageAttribute` methods with the standard `ILogger.BeginScope` method.

Enable `IncludeScopes` in the console logger section of *appsettings.json*:

```json
{
    "Logging": {
        "Console": {
            "IncludeScopes": true
        },
        "LogLevel": {
            "Default": "Information",
            "Microsoft": "Warning",
            "Microsoft.Hosting.Lifetime": "Information"
        }
    }
}
```
Create source-generated logging methods and wrap them in a scope using `BeginScope`:

```csharp
public static partial class Log
{
    [LoggerMessage(
        EventId = 1,
        Level = LogLevel.Information,
        Message = "Processing priority item: {Item}")]
    public static partial void PriorityItemProcessed(
        ILogger logger, WorkItem item);
}
```

Use the logging method within a scope in your application code:

```csharp
using (_logger.BeginScope("Processing scope, started at: {DateTime}", DateTime.Now))
{
    Log.PriorityItemProcessed(_logger, workItem);
}
```

Inspect the log messages in the app's console output. The following result shows priority ordering of log messages with the log scope message included:

```console
info: WorkerServiceOptions.Example.Worker[1]
      => Processing scope, started at: 04/11/2024 11:27:52
      Processing priority item: Priority-Extreme (7d153ef9-8894-4282-836a-8e5e38319fb3): 'Verify communications'
```

## Legacy approach: LoggerMessage.Define (for .NET Framework and .NET Core 3.1)

Before source-generated logging was introduced in .NET 6, the recommended high-performance logging approach was to use the `Microsoft.Extensions.Logging.LoggerMessage.Define*` method to create cacheable delegates. While this approach is still supported for backward compatibility, new code should use source-generated logging with `LoggerMessageAttribute` instead.

The `Microsoft.Extensions.Logging.LoggerMessage` class exposes functionality to create cacheable delegates that require fewer object allocations and reduced computational overhead compared to logger extension methods, such as `Microsoft.Extensions.Logging.LoggerExtensions.LogInformation*` and `Microsoft.Extensions.Logging.LoggerExtensions.LogDebug*`. `Microsoft.Extensions.Logging.LoggerMessage` provides the following performance advantages over logger extension methods:

- Logger extension methods require "boxing" (converting) value types, such as `int`, into `object`. The `Microsoft.Extensions.Logging.LoggerMessage` pattern avoids boxing by using static `System.Action` fields and extension methods with strongly typed parameters.
- Logger extension methods must parse the message template (named format string) every time a log message is written. `Microsoft.Extensions.Logging.LoggerMessage` only requires parsing a template once when the message is defined.

> **Note:**
> If you're maintaining code that uses `LoggerMessage.Define`, consider migrating to source-generated logging. For .NET Framework or .NET Core 3.1 applications, continue using `LoggerMessage.Define`.

### Define a logger message

Use Define(LogLevel, EventId, String) to create an `System.Action` delegate for logging a message. `Microsoft.Extensions.Logging.LoggerMessage.Define*` overloads permit passing up to six type parameters to a named format string (template).

The string provided to the `Microsoft.Extensions.Logging.LoggerMessage.Define*` method is a template and not an interpolated string. Placeholders are filled in the order that the types are specified. Placeholder names in the template should be descriptive and consistent across templates. They serve as property names within structured log data. We recommend Pascal casing for placeholder names. For example, `{Item}`, `{DateTime}`.

Each log message is an `System.Action` held in a static field created by LoggerMessage.Define. For example, the sample app creates a field to describe a log message for the processing of work items:

```csharp
private static readonly Action<ILogger, Exception> s_failedToProcessWorkItem;
```
For the `System.Action`, specify:

- The log level.
- A unique event identifier (`Microsoft.Extensions.Logging.EventId`) with the name of the static extension method.
- The message template (named format string).

As work items are dequeued for processing, the worker service app sets the:

- Log level to `Microsoft.Extensions.Logging.LogLevel.Critical`.
- Event ID to `13` with the name of the `FailedToProcessWorkItem` method.
- Message template (named format string) to a string.

```csharp
s_failedToProcessWorkItem = LoggerMessage.Define(
    LogLevel.Critical,
    new EventId(13, nameof(FailedToProcessWorkItem)),
    "Epic failure processing item!");
```
The `Microsoft.Extensions.Logging.LoggerMessage.Define*` method is used to configure and define an `System.Action` delegate, which represents a log message.

Structured logging stores can use the event name when it's supplied with the event ID to enrich logging. For example, Serilog uses the event name.

The `System.Action` is invoked through a strongly typed extension method. The `PriorityItemProcessed` method logs a message every time a work item is processed. `FailedToProcessWorkItem` is called if and when an exception occurs:

```csharp
protected override async Task ExecuteAsync(
    CancellationToken <example-value>)
{
    using (IDisposable? scope = logger.ProcessingWorkScope(DateTime.Now))
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                WorkItem? nextItem = priorityQueue.ProcessNextHighestPriority();

                if (nextItem is not null)
                {
                    logger.PriorityItemProcessed(nextItem);
                }
            }
            catch (Exception ex)
            {
                logger.FailedToProcessWorkItem(ex);
            }

            await Task.Delay(1_000, stoppingToken);
        }
    }
}
```
Inspect the app's console output:

```console
crit: WorkerServiceOptions.Example.Worker[13]
      Epic failure processing item!
      System.Exception: Failed to verify communications.
         at WorkerServiceOptions.Example.Worker.ExecuteAsync(CancellationToken <example-value>) in
         ..\Worker.cs:line 27
```

To pass <example-value> to a log message, define up to six types when creating the static field. The sample app logs the work item details when processing items by defining a `WorkItem` type for the `System.Action` field:

```csharp
private static readonly Action<ILogger, WorkItem, Exception> s_processingPriorityItem;
```
The delegate's log message template receives its placeholder values from the types provided. The sample app defines a delegate for adding a work item where the item parameter is a `WorkItem`:

```csharp
s_processingPriorityItem = LoggerMessage.Define<WorkItem>(
    LogLevel.Information,
    new EventId(1, nameof(PriorityItemProcessed)),
    "Processing priority item: {Item}");
```
The static extension method for logging that a work item is being processed, `PriorityItemProcessed`, receives the work item argument value and passes it to the `System.Action` delegate:

```csharp
public static void PriorityItemProcessed(
    this ILogger logger, WorkItem workItem) =>
    s_processingPriorityItem(logger, workItem, default!);
```
In the worker service's `ExecuteAsync` method, `PriorityItemProcessed` is called to log the message:

```csharp
protected override async Task ExecuteAsync(
    CancellationToken <example-value>)
{
    using (IDisposable? scope = logger.ProcessingWorkScope(DateTime.Now))
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                WorkItem? nextItem = priorityQueue.ProcessNextHighestPriority();

                if (nextItem is not null)
                {
                    logger.PriorityItemProcessed(nextItem);
                }
            }
            catch (Exception ex)
            {
                logger.FailedToProcessWorkItem(ex);
            }

            await Task.Delay(1_000, stoppingToken);
        }
    }
}
```
Inspect the app's console output:

```console
info: WorkerServiceOptions.Example.Worker[1]
      Processing priority item: Priority-Extreme (50db062a-9732-4418-936d-110549ad79e4): 'Verify communications'
```

## Log-level guarded optimizations

You can optimize performance by checking the `Microsoft.Extensions.Logging.LogLevel` with `Microsoft.Extensions.Logging.ILogger.IsEnabled(Microsoft.Extensions.Logging.LogLevel)` before invoking the corresponding `Log*` method. When logging isn't configured for the given `LogLevel`, `Microsoft.Extensions.Logging.ILogger.Log*` isn't called. In addition, value-type boxing and an allocation of `object[]` (to represent the parameters) are avoided.

For more information, see:

- Micro benchmarks in the .NET runtime
- Background and motivation for log-level checks

## See also

- Logging in .NET
- Compile-time logging source generation
