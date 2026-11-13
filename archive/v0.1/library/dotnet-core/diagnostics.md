---
title: "Diagnostics tools overview - .NET Core"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Diagnostics in .NET

Software doesn't always behave as you would expect, but .NET has tools and APIs that will help you diagnose these issues quickly and effectively.

Native AOT deployment is an application model that's been available since .NET 7. For information about .NET 8 diagnostic support for Native AOT apps, see Native AOT diagnostics.

This article helps you find the various tools you need.

## Debuggers

Debuggers allow you to interact with your program. Pausing, incrementally executing, examining,  and resuming gives you insight into the behavior of your code. A debugger is a good choice for diagnosing functional problems that can be easily reproduced.

## Profilers

Profilers allow you to analyze your program's performance. You can collect data on memory usage, CPU usage, and other metrics to diagnose and understand performance issues.

## Instrumentation for observability

.NET supports industry standard instrumentation techniques using metrics, logs, and distributed traces, commonly known as the *three pillars of observability*.

Instrumentation is code that is added to a software project to record what it is doing. This information can then be collected in files, databases, or in-memory and analyzed to understand how a software program is operating. This is often used in production environments to monitor for problems and diagnose them. The .NET runtime has built-in instrumentation that can be optionally enabled and APIs that allow you to add custom instrumentation specialized for your application.

### Logs

Logging is a technique where code is instrumented to produce a log, a record of interesting events that occurred while the program was running. Often a baseline set of log events are configured on by default and more extensive logging can be enabled on-demand to diagnose particular problems. Performance overhead is variable depending on how much data is being logged.

For most cases, whether adding logging to an existing project or creating a new project, the ILogger infrastructure is a good default choice. `ILogger` supports fast structured logging, flexible configuration, and a collection of common sinks including the console, which is what you see when running an ASP.NET app. Additionally, the `ILogger` interface can also serve as a facade over many third party logging implementations that offer rich functionality and extensibility.

### Metrics

Metrics are numerical measurements recorded over time to monitor application performance and health. Metrics are often used to generate alerts when potential problems are detected. Metrics have very low performance overhead and many services configure them as always-on telemetry. Exceptions are often recorded as metrics, and can be summarized to reduce the cardinality of the data. For more information, see Exception summarization.

### Distributed traces

Distributed Tracing is a specialized form of logging that helps you localize failures and performance issues within applications distributed across multiple machines or processes. This technique tracks requests through an application correlating together work done by different application components and separating it from other work the application may be doing for concurrent requests. It is possible to trace every request and sampling can be optionally employed to bound the performance overhead.

### Collect instrumentation

There are multiple ways that the instrumentation data can be egressed from the application, including:

- OpenTelemetry - a cross-platform, vendor-neutral standard for collecting and exporting telemetry
- .NET CLI tools such as dotnet-counters
- dotnet-monitor - an agent for collecting traces and telemetry
- Third-party libraries or app code can read the information from the `System.Diagnostics.Metrics`, `Microsoft.Extensions.Logging.ILogger`1`, and `System.Diagnostics.Activity` APIs.

## Specialized diagnostics

If debugging or observability is not sufficient, .NET supports additional diagnostic mechanisms such as EventSource, Dumps, DiagnosticSource. For more information, see the specialized diagnostics article.

## Diagnostics tools

.NET supports a number of CLI tools that can be used to diagnose your applications.

## .NET Core diagnostics tutorials

### Debug a memory leak

Tutorial: Debug a memory leak walks through finding a memory leak. The dotnet-counters tool is used to confirm the leak and the dotnet-dump tool is used to diagnose the leak.

### Debug high CPU usage

Tutorial: Debug high CPU usage walks you through investigating high CPU usage. It uses the dotnet-counters tool to confirm the high CPU usage. It then walks you through using Trace for performance analysis utility (`dotnet-trace`) or Linux `perf` to collect and view CPU usage profile.

### Debug deadlock

Tutorial: Debug deadlock shows you how to use the dotnet-dump tool to investigate threads and locks.

### Debug ThreadPool Starvation

Tutorial: Debug threadPool starvation shows you how to use the dotnet-counters and dotnet-stack tools to investigate ThreadPool starvation.

### Debug a StackOverflow

Tutorial: Debug a StackOverflow demonstrates how to debug a `System.StackOverflowException` on Linux.

### Debug Linux dumps

Debug Linux dumps explains how to collect and analyze dumps on Linux.

### Measure performance using EventCounters

Tutorial: Measure performance using EventCounters in .NET shows you how to use the `System.Diagnostics.Tracing.EventCounter` API to measure performance in your .NET app.

### Write your own diagnostic tool

The diagnostics client library lets you write your own custom diagnostic tool best suited for your diagnostic scenario. For more information, see the Microsoft.Diagnostics.NETCore.Client API reference.
