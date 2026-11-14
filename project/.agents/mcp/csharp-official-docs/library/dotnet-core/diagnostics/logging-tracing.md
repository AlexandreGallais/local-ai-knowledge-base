---
title: "Logging and tracing - .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/logging-tracing.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET logging and tracing

Code can be instrumented to produce a log, which serves as a record of interesting events that occurred while the program was running. To understand the application's behavior, logs can be reviewed. .NET has accumulated several different logging APIs over its history and this article will help you understand what options are available.

> **Note:**
> Sometimes logging is also referred to as 'tracing', including in some of the older Windows and .NET APIs. In recent years, 'tracing' is more commonly used as an abbreviation for Distributed tracing, but that isn't the meaning in this article.

## .NET logging APIs

### ILogger

For most cases, whether adding logging to an existing project or creating a new project, the ILogger infrastructure is a good default choice. `ILogger` supports fast structured logging, flexible configuration, and a collection of common sinks including the console, which is what you see when running an ASP.NET app. Additionally, the `ILogger` interface can also serve as a facade over many third party logging implementations that offer rich functionality and extensibility.

ILogger provides the logging story for the OpenTelemetry implementation for .NET, which enables egress of logs from your application to a variety of APM systems for further analysis.

### EventSource

EventSource is an older, high-performance API with structured logging. It was originally designed to integrate well with Event Tracing for Windows (ETW), but was later extended to support EventPipe cross-platform tracing and `System.Diagnostics.Tracing.EventListener` for custom sinks. In comparison to `ILogger`, `EventSource` has relatively few premade logging sinks and there's no built-in support to configure via separate configuration files. `EventSource` is excellent if you want tighter control over ETW or EventPipe integration, but for general purpose logging, `ILogger` is more flexible and easier to use.

### Trace

`System.Diagnostics.Trace` and `System.Diagnostics.Debug` are .NET's oldest logging APIs. These classes have flexible configuration APIs and a large ecosystem of sinks, but only support unstructured logging. On .NET Framework they can be configured via an app.config file, but in .NET Core, there's no built-in, file-based configuration mechanism. They are typically used to produce diagnostics output for the developer while running under the debugger. The .NET team continues to support these APIs for backward-compatibility purposes, but no new functionality will be added. These APIs are a fine choice for applications that are already using them. For newer apps that haven't already committed to a logging API, `ILogger` may offer better functionality.

## Specialized logging APIs

### Console

The `System.Console` class has the `System.Console.Write*` and `System.Console.WriteLine*` methods that can be used in simple logging scenarios. These APIs are very easy to get started with but the solution won't be as flexible as a general purpose logging API. Console only allows unstructured logging and there is no configuration support to select which log messages are enabled or to retarget to a different sink. Using the ILogger or Trace APIs with a console sink doesn't take much additional effort and keeps the logging configurable.

### DiagnosticSource

`System.Diagnostics.DiagnosticSource` is intended for logging where the log messages will be analyzed synchronously in-process rather than serialized to any storage. This allows the source and listener to exchange arbitrary .NET objects as messages, whereas most logging APIs require the log event to be serializable. This technique can also be extremely fast, handling log events in tens of nanoseconds if the listener is implemented efficiently. Tools that use these APIs often act more like in-process profilers, though the API doesn't impose any constraint here.

### EventLog

`System.Diagnostics.EventLog` is a Windows only API that writes messages to the Windows EventLog. In many cases using ILogger with an optional EventLog sink when running on Windows may give similar functionality without coupling the app tightly to the Windows OS.

## Logging terminology

### Structured and unstructured logging

Logging can either be structured or unstructured:

- Unstructured: Log entries are encoded as free-form text that humans can read but it is difficult to programmatically parse and query.
- Structured: Log entries have a well defined schema and can be encoded in different binary and textual formats. These logs are designed to be machine translatable and queryable so that both humans and automated systems can work with them easily.

Good structured logging APIs can offer more functionality and performance with only a small increase in usage complexity.

### Sinks

Most logging APIs allow log messages to be sent to different destinations called sinks. Some APIs have a large number of pre-made sinks, whereas others only have a few. If no pre-made sink exists, there's usually an extensibility API that will let you author a custom sink, although this requires writing a bit more code.
