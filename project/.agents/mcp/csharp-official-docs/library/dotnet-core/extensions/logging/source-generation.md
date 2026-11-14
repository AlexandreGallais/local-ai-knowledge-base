---
title: "Compile-time logging source generation (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/logging/source-generation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Compile-time logging source generation

Source-generated logging is designed to deliver a highly usable and highly performant logging solution for modern .NET apps. The auto-generated source code relies on the `Microsoft.Extensions.Logging.ILogger` interface in conjunction with `Microsoft.Extensions.Logging.LoggerMessage.Define*` functionality.

The source generator is triggered when `Microsoft.Extensions.Logging.LoggerMessageAttribute` is used on `partial` logging methods. When triggered, it autogenerates the implementation of the `partial` methods it's decorating. If there's a problem, it produces compile-time diagnostics with hints about proper usage. This compile-time logging solution is considerably faster at runtime than previously available logging approaches. It eliminates boxing, temporary allocations, and copies to the maximum extent possible.

## Basic usage

> **Tip:**
> The examples in this article use the following namespace:
>
> ```csharp
> using Microsoft.Extensions.Logging;
> ```

To use the `LoggerMessageAttribute`, the consuming class and method need to be `partial`. The code generator is triggered at compile time and generates an implementation of the `partial` method.

```csharp
public static partial class Log
{
    [LoggerMessage(
        EventId = 0,
        Level = LogLevel.Critical,
        Message = "Could not open socket to `{HostName}`")]
    public static partial void CouldNotOpenSocket(
        ILogger logger, string hostName);
}
```
In the preceding example, the logging method is `static` and the log level is specified in the attribute definition. When you use `LoggerMessageAttribute` in a static context, the `ILogger` instance must be passed as an argument. Or, add the `this` modifier to the `ILogger` parameter to define the method as an extension method.

```csharp
public static partial class Log
{
    [LoggerMessage(
        EventId = 0,
        Level = LogLevel.Critical,
        Message = "Could not open socket to `{HostName}`")]
    public static partial void CouldNotOpenSocket(
        this ILogger logger, string hostName);
}
```
You can choose to use the attribute in a non-static context as well. Consider the following example where the logging method is declared as an instance method. In this context, the logging method gets the logger by accessing an `ILogger` field in the containing class.

```csharp
public partial class InstanceLoggingExample
{
    private readonly ILogger _logger;

    public InstanceLoggingExample(ILogger logger)
    {
        _logger = logger;
    }

    [LoggerMessage(
        EventId = 0,
        Level = LogLevel.Critical,
        Message = "Could not open socket to `{HostName}`")]
    public partial void CouldNotOpenSocket(string hostName);
}
```
Starting with .NET 9, the logging method can additionally get the logger from an `ILogger` primary constructor parameter in the containing class.

```csharp
public partial class InstanceLoggingExample(ILogger logger)
{
    [LoggerMessage(
        EventId = 0,
        Level = LogLevel.Critical,
        Message = "Could not open socket to `{HostName}`")]
    public partial void CouldNotOpenSocket(string hostName);
}
```
If there's both an `ILogger` field and a primary constructor parameter, the logging method gets the logger from the field.

### Dynamic log level

Sometimes, the log level needs to be dynamic rather than statically built into the code. You can do this by omitting the log level from the attribute and instead requiring it as a parameter to the logging method.

```csharp
public static partial class Log
{
    [LoggerMessage(
        EventId = 0,
        Message = "Could not open socket to `{HostName}`")]
    public static partial void CouldNotOpenSocket(
        ILogger logger,
        LogLevel level,
        string hostName);
}
```
### `Message` property

The `Microsoft.Extensions.Logging.LoggerMessageAttribute.Message` property on `LoggerMessageAttribute` is optional. If you omit it, `System.String.Empty` is used for the message. However, if the logging method has parameters without corresponding template placeholders, the compiler emits a SYSLIB1015 warning. Those parameters are stored in the log state but don't appear in the formatted log output. Only structured logging providers that enumerate the log state surface them.

## Log method constraints

Logging methods that are decorated with `LoggerMessageAttribute` must meet the following requirements:

- Logging methods must be `partial` and return `void`.
- Logging method names must *not* start with an underscore.
- Parameter names of logging methods must *not* start with an underscore.
- Logging methods support generic type parameters, but the C# 13 `allows ref struct` anti-constraint isn't supported.
- Logging method parameters can't use the `params`, `scoped`, or `out` modifiers, and can't be `ref struct` types.
- If a logging method is `static`, the `ILogger` instance is required as a parameter.

The code-generation model depends on code being compiled with a modern C# compiler, that is, version 9 or later. For information about changing the language version, see C# language versioning.

## Log method anatomy

The `Microsoft.Extensions.Logging.ILogger.Log*` signature accepts the `Microsoft.Extensions.Logging.LogLevel` and optionally an `System.Exception`, as shown in the following code example.

```csharp
public interface ILogger
{
    void Log<TState>(
        Microsoft.Extensions.Logging.LogLevel logLevel,
        Microsoft.Extensions.Logging.EventId eventId,
        TState state,
        System.Exception? exception,
        Func<TState, System.Exception?, string> formatter);
}
```

As a general rule, the first instance of `ILogger`, `LogLevel`, and `Exception` are treated specially in the log method signature of the source generator. Subsequent instances are treated like normal parameters to the message template:

```csharp
// This is a valid attribute usage
[LoggerMessage(
    EventId = 110, Level = LogLevel.Debug, Message = "M1 {Ex3} {Ex2}")]
public static partial void ValidLogMethod(
    ILogger logger,
    Exception ex,
    Exception ex2,
    Exception ex3);
```
The following shows a usage that produces a compiler diagnostic:

```csharp
// This causes a warning
[LoggerMessage(
    EventId = 0, Level = LogLevel.Debug, Message = "M1 {Ex} {Ex2}")]
public static partial void WarningLogMethod(
    ILogger logger,
    Exception ex,
    Exception ex2);
```

> **Important:**
> The warnings emitted provide details as to the correct usage of the `LoggerMessageAttribute`. In the preceding example, the `WarningLogMethod` reports a `DiagnosticSeverity.Warning` of `SYSLIB0025`.
>
> ```console
> Don't include a template for `ex` in the logging message since it is implicitly taken care of.
> ```

### Case-insensitive template name support

The generator does a case-insensitive comparison between items in the message template and argument names in the log message. This means that when the `ILogger` enumerates the state, the argument is picked up by the message template, which can make the logs nicer to consume:

```csharp
public partial class LoggingExample
{
    private readonly ILogger _logger;

    public LoggingExample(ILogger logger)
    {
        _logger = logger;
    }

    [LoggerMessage(
        EventId = 10,
        Level = LogLevel.Information,
        Message = "Welcome to {City} {Province}!")]
    public partial void LogMethodSupportsPascalCasingOfNames(
        string city, string province);

    public void TestLogging()
    {
        LogMethodSupportsPascalCasingOfNames("Vancouver", "BC");
    }
}
```
Consider the example logging output when using the `JsonConsole` formatter:

```json
{
  "EventId": 13,
  "LogLevel": "Information",
  "Category": "LoggingExample",
  "Message": "Welcome to Vancouver BC!",
  "State": {
    "Message": "Welcome to Vancouver BC!",
    "City": "Vancouver",
    "Province": "BC",
    "{OriginalFormat}": "Welcome to {City} {Province}!"
  }
}
```

### Indeterminate parameter order

There are no constraints on the ordering of log method parameters. A developer could define the `ILogger` as the last parameter, although it might appear a bit awkward.

```csharp
[LoggerMessage(
    EventId = 110,
    Level = LogLevel.Debug,
    Message = "M1 {Ex3} {Ex2}")]
static partial void LogMethod(
    Exception ex,
    Exception ex2,
    Exception ex3,
    ILogger logger);
```
> **Tip:**
> The order of the parameters on a log method isn't required to correspond to the order of the template placeholders. Instead, the placeholder names in the template are expected to match the parameters. Consider the following `JsonConsole` output and the order of the errors.
>
> ```json
> {
>   "EventId": 110,
>   "LogLevel": "Debug",
>   "Category": "ConsoleApp.Program",
>   "Message": "M1 System.Exception: Third time's the charm. System.Exception: This is the second error.",
>   "State": {
>     "Message": "M1 System.Exception: Third time's the charm. System.Exception: This is the second error.",
>     "ex2": "System.Exception: This is the second error.",
>     "ex3": "System.Exception: Third time's the charm.",
>     "{OriginalFormat}": "M1 {Ex3} {Ex2}"
>   }
> }
> ```

## More logging examples

The following samples demonstrate how to retrieve the event name, set the log level dynamically, and format logging parameters. The logging methods are:

- `LogWithCustomEventName`: Retrieve event name via `LoggerMessage` attribute.
- `LogWithDynamicLogLevel`: Set log level dynamically, to allow log level to be set based on configuration input.
- `UsingFormatSpecifier`: Use format specifiers to format logging parameters.

```csharp
public partial class LoggingSample
{
    private readonly ILogger _logger;

    public LoggingSample(ILogger logger)
    {
        _logger = logger;
    }

    [LoggerMessage(
        EventId = 20,
        Level = LogLevel.Critical,
        Message = "Value is {Value:E}")]
    public static partial void UsingFormatSpecifier(
        ILogger logger, double value);

    [LoggerMessage(
        EventId = 9,
        Level = LogLevel.Trace,
        Message = "Fixed message",
        EventName = "CustomEventName")]
    public partial void LogWithCustomEventName();

    [LoggerMessage(
        EventId = 10,
        Message = "Welcome to {City} {Province}!")]
    public partial void LogWithDynamicLogLevel(
        string city, LogLevel level, string province);

    public void TestLogging()
    {
        LogWithCustomEventName();

        LogWithDynamicLogLevel("Vancouver", LogLevel.Warning, "BC");
        LogWithDynamicLogLevel("Vancouver", LogLevel.Information, "BC");

        UsingFormatSpecifier(_logger, 12345.6789);
    }
}
```
Consider the example logging output when using the `SimpleConsole` formatter:

```console
trce: LoggingExample[9]
      Fixed message
warn: LoggingExample[10]
      Welcome to Vancouver BC!
info: LoggingExample[10]
      Welcome to Vancouver BC!
crit: LoggingExample[20]
      Value is 1.234568E+004
```

Consider the example logging output when using the `JsonConsole` formatter:

```json
{
  "EventId": 9,
  "LogLevel": "Trace",
  "Category": "LoggingExample",
  "Message": "Fixed message",
  "State": {
    "Message": "Fixed message",
    "{OriginalFormat}": "Fixed message"
  }
}
{
  "EventId": 10,
  "LogLevel": "Warning",
  "Category": "LoggingExample",
  "Message": "Welcome to Vancouver BC!",
  "State": {
    "Message": "Welcome to Vancouver BC!",
    "city": "Vancouver",
    "province": "BC",
    "{OriginalFormat}": "Welcome to {City} {Province}!"
  }
}
{
  "EventId": 10,
  "LogLevel": "Information",
  "Category": "LoggingExample",
  "Message": "Welcome to Vancouver BC!",
  "State": {
    "Message": "Welcome to Vancouver BC!",
    "city": "Vancouver",
    "province": "BC",
    "{OriginalFormat}": "Welcome to {City} {Province}!"
  }
}
{
  "EventId": 20,
  "LogLevel": "Critical",
  "Category": "LoggingExample",
  "Message": "Value is 1.234568E+004",
  "State": {
    "Message": "Value is 1.234568E+004",
    "value": 12345.6789,
    "{OriginalFormat}": "Value is {Value:E}"
  }
}
```

## Redacting sensitive information in logs

When logging sensitive data, it's important to prevent accidental exposure. Even with compile-time generated logging methods, logging raw sensitive values can lead to data leaks and compliance issues.

The Microsoft.Extensions.Telemetry library provides advanced logging and telemetry enrichment capabilities for .NET applications. It extends the logging pipeline to automatically apply redaction to classified data when writing logs. It enables you to enforce data protection policies throughout your application by integrating redaction into your logging workflow. It's built for applications needing sophisticated telemetry and logging insights.

To enable redaction, use the Microsoft.Extensions.Compliance.Redaction library. This library provides **redactors**—components that transform sensitive data (for example, by erasing, masking, or hashing it) so that it's safe to output. Redactors are selected based on **data classification**, which lets you label data according to its sensitivity (such as personal, private, or public).

The redaction examples require the following namespaces:

```csharp
using Microsoft.Extensions.Compliance.Classification;
using Microsoft.Extensions.Compliance.Redaction;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
```
To use redaction with source-generated logging methods, you should:

1. Classify your sensitive data using a data classification system.
2. Register and configure redactors for each classification in your DI container.
3. Enable redaction in the logging pipeline.
4. Check your logs to ensure no sensitive data is exposed.

For example, if you have a log message that has a parameter that is considered private:

```csharp
public static partial class LogRedactionExample
{
    [LoggerMessage(0, LogLevel.Information, "User SSN: {SSN}")]
    public static partial void LogPrivateInformation(
        this ILogger logger,
        [MyTaxonomyClassifications.Private] string SSN);
}
```
You'll need to have a setting similar to this:

```csharp
var services = new ServiceCollection();
services.AddLogging(builder =>
{
    // Enable redaction.
    builder.EnableRedaction();
});

services.AddRedaction(builder =>
{
    // Configure redactors for your data classifications.
    builder.SetRedactor<StarRedactor>(MyTaxonomyClassifications.Private);
});
```
The output should be like this: `User SSN: *****`.

This approach ensures that only redacted data is logged, even when using compile-time generated logging APIs. You can use different redactors for different data types or classifications, and update your redaction logic centrally.

For more information about how to classify your data, see Data classification in .NET.
For more information about redaction and redactors, see Data redaction in .NET.
